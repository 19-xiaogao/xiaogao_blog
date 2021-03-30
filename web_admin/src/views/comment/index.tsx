import React from 'react'

import { Card, Row, Col, Input, Button, Switch, message, Table } from 'antd'

import { ColumnsType } from 'antd/es/table';
import { TableRowSelection } from 'antd/es/table/interface'
import { PaginationProps } from 'antd/es/pagination/Pagination'

import { CheckOutlined, CloseOutlined } from '@ant-design/icons'

import './index.scss'

import moment from 'moment'

import { httpGetGetComment, httpDeleteComment, httpshieldingComment } from '../../api/api'


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

interface ICommentState {
    loading: boolean
    pageNo: number
    pageSize: number
    commentList: Comment[]
    total: number
    selectRowKeys: React.Key[] | number[]
    blogName: string
}

class Comment extends React.Component<{}, ICommentState> {

    state = {
        loading: false,
        pageNo: 1,
        pageSize: 10,
        commentList: [],
        total: 0,
        selectRowKeys: [],
        blogName: ''
    }
    protected rowSelection: TableRowSelection<Comment> = {
        onChange: (selectedRowKeys) => {
            this.setState({ selectRowKeys: selectedRowKeys })
        },

    };
    private columns: ColumnsType<Comment> = [
        {
            align: 'center',
            title: '刁民',
            dataIndex: 'commentName',
            key: 'commentName',
        },
        {
            title: '联系方式(email)',
            align: 'center',
            dataIndex: 'commentEmail',
            key: 'commentEmail',
        },
        {
            title: '某时某刻',
            dataIndex: 'createTime',
            align: 'center',
            key: 'createTime',
        },

        {
            title: "关联博客",
            dataIndex: 'blogTitle',
            align: 'center',
            key: "blogTitle"
        },
        {
            title: '吐槽干货',
            align: 'center',
            dataIndex: 'context',
            key: 'context',
        },
        {
            title: "是否屏蔽",
            dataIndex: 'show',
            align: 'center',
            key: 'show',
            render: (text: any, row: any) => <Switch
                checkedChildren={<CheckOutlined />}
                unCheckedChildren={<CloseOutlined />}
                defaultChecked={text === '0' ? true : false} loading={this.state.loading}
                onClick={(checked) => this.switchClick(checked, row)} />
        },
    ];
    private pagination = (): PaginationProps => ({
        current: this.state.pageNo,
        total: this.state.total,
        onChange: (page: number) => {
            this.setState({ pageNo: page })
            this.initComment(page, 10)
        },
        showTotal: (total) => <span>共{total}条</span>
    })

    private switchClick = async (checked: boolean, row: any) => {
        this.setState({ loading: true })
        const { success } = await httpshieldingComment({ id: row.key, show: checked ? '0' : '1' })
        if (!success) return message.error('服务器错误')
        this.setState({ loading: false })
        this.initComment(this.state.pageNo, this.state.pageSize)
    }

    private onDeleteComment = async () => {

        this.setState({ loading: true })

        const { success } = await httpDeleteComment({ id: [...this.state.selectRowKeys] })
        if (!success) return

        this.setState({ loading: false })

        message.success('删除成功')

        this.initComment(this.state.pageNo, this.state.pageSize)

    }


    private async initComment(pageNo: number, pageSize: number, params?: any) {

        this.setState({ loading: true })

        const { data, success } = await httpGetGetComment({ pageNo, pageSize, ...params })
        if (!success) return message.error('博客列表服务报错')

        this.setState({ loading: false })

        this.setState({ commentList: this.disposeCommentData(data.list), total: data.total })



    }

    private disposeCommentData(data: Comment[]) {

        data.forEach((item) => {
            item.key = Number(item.id)
            item.createTime = moment(item.createTime).format('YYYY-MM-DD HH:MM:SS')
        })

        return data
    }

    private blogNameInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ blogName: e.target.value })
    }
    private query = () => {
        this.initComment(this.state.pageNo, this.state.pageSize, { blogName: this.state.blogName })
    }

    componentDidMount() {

        this.initComment(this.state.pageNo, this.state.pageSize)

    }

    render() {

        const { selectRowKeys, loading, blogName } = this.state
        return <div className='comment_box'>
            <Card className='comment_header'>
                <Row>
                    <Col span={6} className='flex'>
                        <span>博客:</span>
                        <Input type="text" placeholder='搜索博客名称' value={blogName} onChange={this.blogNameInput} />
                    </Col>
                    <Col span={6} className='flex'>
                        <Button type='primary' onClick={this.query}>查询</Button>
                        <Button type='primary' style={{ margin: ' 0 10px' }} disabled={selectRowKeys.length === 0} onClick={this.onDeleteComment}>删除</Button>
                    </Col>
                </Row>
            </Card>
            <Card className="comment_table">
                <Table dataSource={this.state.commentList} loading={loading} pagination={this.pagination()} rowSelection={{ ...this.rowSelection }} bordered columns={this.columns} />
            </Card>
        </div>

    }

}

export default Comment