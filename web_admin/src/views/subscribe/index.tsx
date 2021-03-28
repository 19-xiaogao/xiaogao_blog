import React from 'react'
import './index.scss'
import moment from 'moment'

import { getSubscribeLst, ISubParams, delteSubscribeList } from '../../api/api'

import { Card, Row, Col, Input, Button, message, Table } from 'antd'

import { ColumnsType } from 'antd/es/table';
import { TableRowSelection } from 'antd/es/table/interface'
import { PaginationProps } from 'antd/es/pagination/Pagination'

export interface Isubscribe {
    id: number
    createTime: string
    email: string
    key: number
}

interface ISbuscribeState {
    pageNo: number
    pageSize: number
    loading: boolean
    subscribeData: Isubscribe[]
    total: number
    selectRowKeys: React.Key[] | number[]
    queryEmail: string | undefined

}
class Subscribe extends React.Component<{}, ISbuscribeState> {

    state = {
        pageNo: 1,
        pageSize: 10,
        loading: false,
        subscribeData: [],
        total: 0,
        selectRowKeys: [],
        queryEmail: undefined
    }
    private columns: ColumnsType<Isubscribe> = [
        {
            title: 'id',
            align: 'center',
            key: 'id',
            dataIndex: 'id',
        },
        {
            title: '订阅时间',
            dataIndex: 'createTime',
            key: 'createTime',
            align: 'center',
            render: (createDate) => moment(createDate).format('YYYY-MM-DD HH:MM')
        },
        {
            title: "订阅的邮箱",
            dataIndex: 'email',
            key: 'email',
            align: 'center',
        }
    ];
    private pagination = (): PaginationProps => ({
        current: this.state.pageNo,
        total: this.state.total,
        onChange: (page: number) => {
            this.setState({ pageNo: page })
            this.initSubscribeData({ pageNo: page, pageSize: this.state.pageSize, email: this.state.queryEmail })
        },
        showTotal: (total) => <span>共{total}条</span>
    })

    private rowSelection: TableRowSelection<Isubscribe> = {
        onChange: (selectedRowKeys) => {
            this.setState({ selectRowKeys: selectedRowKeys })
        },
    };

    componentDidMount() {
        const { pageNo, pageSize } = this.state
        this.initSubscribeData({ pageNo, pageSize, email: this.state.queryEmail })
    }

    private async initSubscribeData(params: ISubParams) {
        this.setState({ loading: true })

        const { data, success } = await getSubscribeLst(params)

        if (!success) return message.error('服务器错误')

        this.setState({ loading: false, subscribeData: this.disposeBlogData(data.list), total: data.total })
    }
    private disposeBlogData(data: Isubscribe[]) {
        data.forEach((item) => {
            item.key = item.id
        })
        return data
    }

    private querySubscribe = async () => {
        const { pageNo, pageSize } = this.state
        this.initSubscribeData({ pageNo, pageSize, email: this.state.queryEmail })
    }

    private deleteSubscribe = async () => {
        const { success } = await delteSubscribeList({ id: this.state.selectRowKeys })
        if (!success) return message.warn('删除失败')
        message.success('删除成功')
        const { pageNo, pageSize } = this.state
        this.initSubscribeData({ pageNo, pageSize, email: this.state.queryEmail })
        
    }


    render() {
        const { loading, subscribeData, selectRowKeys } = this.state
        return <div className='subscribeBox'>
            <Card>
                <Row>
                    <Col span='5' className='flex'>
                        <span>邮箱</span>
                        <Input placeholder='输入查询的邮箱' type='email' width='60' value={this.state.queryEmail} onChange={(e) => this.setState({ queryEmail: e.target.value })} />
                    </Col>
                    <Col span='4' className='flex'>
                        <Button type='primary' onClick={this.querySubscribe}>查询</Button>
                        <Button type='primary' style={{ marginLeft: '5px' }} disabled={selectRowKeys.length === 0} onClick={this.deleteSubscribe}>删除</Button>
                    </Col>
                </Row>
            </Card>
            <Card>
                <Table bordered columns={this.columns} loading={loading} rowSelection={{ ...this.rowSelection }} dataSource={subscribeData} pagination={this.pagination()} />
            </Card>
        </div>
    }
}

export default Subscribe