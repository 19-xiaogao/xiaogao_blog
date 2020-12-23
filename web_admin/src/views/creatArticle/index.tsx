import React from "react";
import { Row, Col, Input, Button, message } from "antd";
import MdEditor from 'react-markdown-editor-lite'
import MarkdownIt from 'markdown-it'
import { UploadOutlined } from "@ant-design/icons";
import 'react-markdown-editor-lite/lib/index.css';
import "./index.scss";

interface ICreateArticleState {
  updateContext: any;
}
export default class CreateArticle extends React.Component<{}, ICreateArticleState> {
  private mdParser: any = null
  constructor(props: any) {
    super(props)
    this.state = {
      updateContext: '',
    }
    this.mdParser = new MarkdownIt(/* Markdown-it options */)
  }
  private handleEditorChange = ({ html, text }: { html: string, text: string }) => {
    this.setState({
      updateContext: text
    })
  }
  private updateFile = (e: any) => {
    const fileStream = e.nativeEvent.target.files[0];
    if (fileStream.name.split(".")[1] !== "md") {
      return message.warning("请上传md类型文件");
    }
    if (!!fileStream) {
      const reader = new FileReader();
      reader.readAsText(fileStream, "utf-8");
      reader.onload = (e) => {
        console.log(e.target?.result)
        this.setState({
          updateContext: e.target?.result ? e.target?.result : ''
        })
      };
    }
  };
  private renderInput = () => {
    return (
      <Row gutter={16} style={{ width: "100%" }}>
        <Col className="gutter-row" span={6}>
          <span>文章标题:</span>
          <Input placeholder="请输入文章标题" />
        </Col>
        <Col className="gutter-row" span={6}>
          <Button icon={<UploadOutlined />} className="updateBtn">
            文件md上传
            <input type="file" value="" onChange={this.updateFile} />
          </Button>
        </Col>
        <Col className="gutter-row" span={6}>
          <div>col-6</div>
        </Col>
        <Col className="gutter-row" span={6}>
          <div>col-6</div>
        </Col>
      </Row>
    );
  };

  render() {
    return (
      <>
        <div className="creatArticle_header">{this.renderInput()}</div>
        <MdEditor
          style={{ height: "500px" }}
          value={this.state.updateContext}
          renderHTML={(text) => this.mdParser.render(text)}
          onChange={this.handleEditorChange}
        />
      </>
    );
  }
}
