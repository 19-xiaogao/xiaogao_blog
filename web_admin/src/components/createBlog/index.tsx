import React from "react";
import Styles from "./index.module.scss";
import { Row, Col, Input, Button, message, DatePicker, Space } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import moment, { Moment } from "moment";
import {
  httpPostInsertBlog,
  httpPostUpdateBlog,
  postSendSubscribeEmail,
} from "../../api/api";
import MarkDowns from "../MdEditor";
import UpdateImage from "../updateImage";
interface ICreateBlogProps {
  title?: string;
  imgUrl?: string;
  content?: string;
  createTime?: any;
  id?: number;
  WhetherToCreate: boolean;
}
interface ICreateArticleState {
  updateContext: any;
  createTime: Moment | undefined | string;
  imgUrl: string | undefined;
  title: string | undefined;
  clearImage: boolean;
  loading: boolean;
}
const dateFormat = "YYYY-MM-DD mm:ss";
class CreateBlog extends React.PureComponent<
  ICreateBlogProps,
  ICreateArticleState
> {
  state = {
    updateContext: this.props.content,
    createTime: moment(this.props.createTime),
    imgUrl: this.props.imgUrl,
    title: this.props.title,
    clearImage: false,
    loading: false,
  };
  private titleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ title: e.target.value });
  };
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
          updateContext: e.target?.result ? e.target?.result : "",
        });
      };
    }
  };
  //选择时间
  private onSelectTimeOk = (value: any) => {
    this.setState({
      createTime: value,
    });
  };
  private updateBlog = async () => {
    const { title, imgUrl, createTime, updateContext } = this.state;
    this.setState({ loading: true });
    if (this.props.WhetherToCreate) {
      const { success } = await httpPostInsertBlog({
        title,
        content: updateContext,
        imgUrl,
        createDate: moment(createTime).format(dateFormat),
        number_words: updateContext ? updateContext.length : undefined,
      });

      if (!success) {
        return message.error("创建失败");
      }
      message.success("创建成功");
      postSendSubscribeEmail()
        .then((res) => message.success("邮件发送成功"))
        .catch((err) => message.error("邮件发送失败"));
    } else {
      const { success: successful } = await httpPostUpdateBlog({
        title,
        content: updateContext,
        imgUrl,
        id: this.props.id ? this.props.id : 0,
      });
      if (!successful) {
        return message.error("修改失败");
      }
      message.success("修改成功");
    }
    this.setState({
      updateContext: "",
      createTime: "",
      imgUrl: "",
      title: "",
      clearImage: true,
      loading: false,
    });
  };
  public componentWillUnmount() {
    this.setState({
      updateContext: "",
      createTime: undefined,
      imgUrl: "",
      title: "",
    });
  }
  // markDown文档
  private handleEditorChange = ({
    html,
    text,
  }: {
    html: string;
    text: string;
  }) => {
    this.setState({
      updateContext: text,
    });
  };
  private onUpdateImage = (value: string) => {
    this.setState({ imgUrl: value });
  };
  // 渲染头部input栏
  private renderInput = () => {
    return (
      <Row gutter={16} style={{ width: "100%" }}>
        <Col className={Styles.gutter_row1} span={6}>
          <span>文章标题:</span>
          <Input
            placeholder='请输入文章标题'
            value={this.state.title}
            onChange={this.titleChange}
          />
        </Col>
        <Col className={Styles.gutter_row} span={3}>
          <Button icon={<UploadOutlined />} className={Styles.updateBtn}>
            上传博客
            <input type='file' value='' onChange={this.updateFile} />
          </Button>
        </Col>
        <Col className={Styles.gutter_row} span={4}>
          <Space direction='vertical' size={12}>
            <DatePicker
              showTime
              onOk={this.onSelectTimeOk}
              placeholder='请选择日期时间'
              disabled={!this.props.WhetherToCreate}
              value={this.props.id ? this.state.createTime : undefined}
              onChange={this.onSelectTimeOk}
            />
          </Space>
        </Col>
        <Col className={Styles.gutter_row} span={6}>
          <Button
            size='middle'
            type='primary'
            onClick={this.updateBlog}
            loading={this.state.loading}>
            提交
          </Button>
        </Col>
      </Row>
    );
  };
  render() {
    return (
      <>
        <div className={Styles.creatArticle_header}>{this.renderInput()}</div>
        <div className='markDownUpdate'>
          <div className='markDown'>
            <MarkDowns
              context={this.state.updateContext ? this.state.updateContext : ""}
              onchange={this.handleEditorChange}
            />
          </div>
          <UpdateImage
            className={"updateImg"}
            onUpdateImage={this.onUpdateImage}
            isClear={this.state.clearImage}
            imgUrl={this.state.imgUrl}
          />
        </div>
      </>
    );
  }
}

export default CreateBlog;
