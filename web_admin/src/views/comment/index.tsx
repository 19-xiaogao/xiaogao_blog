import React from 'react'

import { Card, Row, Col, Input, Button, Switch } from 'antd'

import { CheckOutlined, CloseOutlined } from '@ant-design/icons'

import './index.scss'

interface ICommentProps { }

interface ICommentState {
    loading: boolean
}

class Comment extends React.Component<ICommentProps, ICommentState> {

    state = {
        loading: false
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
        {
            title: "关联博客",
        },
        {
            title: '吐槽干货',
            dataIndex: 'createTime',
            key: 'createTime',
        },
        {
            title: "是否屏蔽",
            dataIndex: 'show',
            render: (text: any, row: any) => <Switch
                checkedChildren={<CheckOutlined />}
                unCheckedChildren={<CloseOutlined />}
                defaultChecked={text === 1 ? true : false} loading={this.state.loading}
                onClick={(checked) => this.switchClick(checked, row)} />
        }
    ];

    private switchClick(checked: boolean, row: any) {

    }

    componentDidMount() { }

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
        </div>

    }

}

export default Comment