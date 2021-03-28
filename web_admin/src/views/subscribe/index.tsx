import React from 'react'
import './index.scss'

import { Card, Row, Col, Input, Button } from 'antd'

class Subscribe extends React.Component {
    render() {
        return <div className='subscribeBox'>
            <Card>
                <Row>
                    <Col span='5' className='flex'>
                        <span>邮箱</span>
                        <Input placeholder='输入查询的邮箱' type='email' width='60' />
                    </Col>
                    <Col span='4' className='flex'>
                        <Button type='primary'>查询</Button>
                        <Button type='primary' style={{ marginLeft: '5px' }}>删除</Button>
                    </Col>
                </Row>
            </Card>

        </div>
    }
}

export default Subscribe