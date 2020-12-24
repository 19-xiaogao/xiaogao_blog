import React from "react";
import { Row, Col, Input, Button, message, DatePicker, Space } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import moment from 'moment';
import MarkDowns from './components/MdEditor'
import UpdateImage from './components/updateImage'
import { SaveIcon } from '../../styles/icon'
import { httpPostInsertBlog } from '../../api/api'
import "./index.scss";
interface ICreateArticleState {
  updateContext: any;
  createTime: string
  imgUrl: string
  title: string
}
const dateFormat = 'YYYY-MM-DD mm:ss';
export default class CreateArticle extends React.Component<{}, ICreateArticleState> {
  state = {
    updateContext: '',
    createTime: '',
    imgUrl: '',
    title: ''
  }
  // markDown文档
  private handleEditorChange = ({ html, text }: { html: string, text: string }) => {
    this.setState({
      updateContext: text
    })
  }
  // 上传文件
  private updateFile = (e: any) => {
    const fileStream = e.nativeEvent.target.files[0];
    if (fileStream.name.split(".")[1] !== "md") {
      return message.warning("请上传md类型文件");
    }
    if (!!fileStream) {
      const reader = new FileReader();
      reader.readAsText(fileStream, "utf-8");
      reader.onload = (e) => {
        this.setState({
          updateContext: e.target?.result ? e.target?.result : ''
        })
      };
    }
  };
  //选择时间
  private onSelectTimeOk = (value: any) => {
    this.setState({
      createTime: moment(value).format(dateFormat)
    })
  }
  private titleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ title: e.target.value })
  }
  private updateBlog = async () => {
    const { title, imgUrl, createTime, updateContext } = this.state
    const { success } = await httpPostInsertBlog({ title, content: updateContext, imgUrl, createDate: createTime, number_words: updateContext.length })
    if (!success) { return message.error('创建失败') }
    message.success('创建成功')
    this.setState({
      updateContext: '',
      createTime: '',
      imgUrl: '',
      title: ''
    })
  }
  private onUpdateImage = (value: string) => {
    this.setState({ imgUrl: value })
  }
  // 渲染头部input栏
  private renderInput = () => {
    return (
      <Row gutter={16} style={{ width: "100%" }}>
        <Col className="gutter-row" span={6}>
          <span>文章标题:</span>
          <Input placeholder="请输入文章标题" value={this.state.title} onChange={this.titleChange} />
        </Col>
        <Col className="gutter-row" span={6}>
          <Button icon={<UploadOutlined />} className="updateBtn">
            上传博客
            <input type="file" value="" onChange={this.updateFile} />
          </Button>
        </Col>
        <Col className="gutter-row" span={6}>
          <Space direction="vertical" size={12}>
            <DatePicker showTime onOk={this.onSelectTimeOk} onChange={this.onSelectTimeOk} />
          </Space>
        </Col>
        <Col className="gutter-row" span={6}>
          <Button size="large" type="text" icon={<SaveIcon className="icon" />} onClick={this.updateBlog}>
          </Button>
        </Col>
      </Row>
    );
  };
  render() {
    return (
      <>
        <div className="creatArticle_header" >{this.renderInput()}</div>
        <div className="markDownUpdate">
          <div className="markDown"><MarkDowns context={this.state.updateContext} onchange={this.handleEditorChange} /></div>
          <UpdateImage className={'updateImg'} onUpdateImage={this.onUpdateImage} />
        </div>
      </>
    );
  }
}
