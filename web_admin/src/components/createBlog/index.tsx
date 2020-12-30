import React from 'react'
import Styles from './index.module.css'
import { Row, Col, Input, Button, message, DatePicker, Space } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import moment, { Moment } from 'moment';
import { SaveIcon } from '../../styles/icon'
import { httpPostInsertBlog } from '../../api/api'

interface ICreateBlog {
    title?: string
    imgUrl?: string
    context?: string
    createTime?: any
    WhetherToCreate: boolean
}
interface ICreateArticleState {
    updateContext: any;
    createTime: Moment | undefined
    imgUrl: string
    title: string
}
const dateFormat = 'YYYY-MM-DD mm:ss';
class CreateBlog extends React.Component<ICreateBlog, ICreateArticleState> {
    state = {
        updateContext: '',
        createTime: undefined,
        imgUrl: '',
        title: ''
    }
    private titleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ title: e.target.value })
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
                this.setState({
                    updateContext: e.target?.result ? e.target?.result : ''
                })
            };
        }
    };
    //选择时间
    private onSelectTimeOk = (value: any) => {
        this.setState({
            createTime: value
        })
    }
    private updateBlog = async () => {
        const { title, imgUrl, createTime, updateContext } = this.state
        const { success } = await httpPostInsertBlog({ title, content: updateContext, imgUrl, createDate: moment(createTime).format(dateFormat), number_words: updateContext.length })
        if (!success) { return message.error('创建失败') }
        message.success('创建成功')
        this.setState({
            updateContext: '',
            createTime: undefined,
            imgUrl: '',
            title: ''
        })
    }
    // 渲染头部input栏
    private renderInput = () => {

        return (
            <Row gutter={16} style={{ width: "100%" }}>
                <Col className={Styles.gutter_row} span={6}>
                    <span>文章标题:</span>
                    <Input placeholder="请输入文章标题" value={this.props.title ? this.props.title : this.state.title} onChange={this.titleChange} />
                </Col>
                <Col className={Styles.gutter_row} span={6}>
                    <Button icon={<UploadOutlined />} className="updateBtn">
                        上传博客
            <input type="file" value="" onChange={this.updateFile} />
                    </Button>
                </Col>
                <Col className={Styles.gutter_row} span={6}>
                    <Space direction="vertical" size={12}>
                        <DatePicker showTime onOk={this.onSelectTimeOk} placeholder="请选择日期时间" value={this.props.createTime ? this.props.createTime : this.state.createTime} onChange={this.onSelectTimeOk} />
                    </Space>
                </Col>
                <Col className={Styles.gutter_row} span={6}>
                    <Button size="large" type="text" icon={<SaveIcon className="icon" />} onClick={this.updateBlog}>
                    </Button>
                </Col>
            </Row>
        );
    };
    render() {
        return <>
            <div className={Styles.creatArticle_header} >{this.renderInput()}</div>
        </>
    }


}

export default CreateBlog