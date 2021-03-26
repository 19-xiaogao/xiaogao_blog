import React from 'react'

import { Card, Row, Col, Input, Button, Switch, message, Table } from 'antd'

import { CheckOutlined, CloseOutlined } from '@ant-design/icons'

import './index.scss'

import moment from 'moment'

import { httpGetGetComment } from '../../api/api'


interface Comment {
    id: number
    articleId: number
    commentName: string
    commentEmail: string
    context: string
    createTime: string
    show: number
    key: number
}

interface ICommentProps { }

interface ICommentState {
    loading: boolean
    pageNo: number
    pageSize: number
    commentList: Comment[]
    total: number
}

class Comment extends React.Component<ICommentProps, ICommentState> {

    state = {
        loading: false,
        pageNo: 1,
        pageSize: 10,
        commentList: [],
        total: 0
    }

    private columns = [
        {
            title: '刁民',
            dataIndex: 'commentName',
            key: 'commentName',
        },
        {
            title: '联系方式(email)',
            dataIndex: 'commentEmail',
            key: 'commentEmail',
        },
        {
            title: '某时某刻',
            dataIndex: 'createTime',
            key: 'createTime',
        },
        // TODO:
        // {
        //     title: "关联博客",
        // },
        {
            title: '吐槽干货',
            dataIndex: 'context',
            key: 'context',
        },
        {
            title: "是否屏蔽",
            dataIndex: 'show',
            key: 'show',
            render: (text: any, row: any) => <Switch
                checkedChildren={<CheckOutlined />}
                unCheckedChildren={<CloseOutlined />}
                defaultChecked={text === 1 ? true : false} loading={this.state.loading}
                onClick={(checked) => this.switchClick(checked, row)} />
        }
    ];

    private switchClick(checked: boolean, row: any) {

    }

    private async initComment(pageNo: number, pageSize: number, params?: any) {

        const { data, success } = await httpGetGetComment({ pageNo, pageSize, ...params })

        if (!success) return message.error('博客列表服务报错')

        this.setState({ commentList: this.disposeCommentData(data.list), total: data.total })
        
    }

    private disposeCommentData(data: Comment[]) {

        data.forEach((item) => {
            item.key = item.id
            item.createTime = moment(item.createTime).format('YYYY-MM-DD HH:MM:SS')
        })

        return data
    }

    componentDidMount() {

        this.initComment(this.state.pageNo, this.state.pageSize)

    }

    render() {

        return <div className='comment_box'>
            <Card className='comment_header'>
                <Row>
                    <Col span={6} className='flex'>
                        <span>博客:</span>
                        <Input type="text" placeholder='搜索博客名称' />
                    </Col>
                    <Col span={6} className='flex'>
                        <span>关键字:</span>
                        <Input type="text" placeholder='搜索关键字' />
                    </Col>
                    <Col span={6} className='flex'>
                        <Button type='primary'>查询</Button>
                        <Button type='primary' style={{ marginLeft: '10px' }}>重置</Button>
                    </Col>
                </Row>
            </Card>
            <Card className="comment_table">
                <Table dataSource={this.state.commentList} bordered columns={this.columns} />
            </Card>
        </div>

    }

}

export default Comment