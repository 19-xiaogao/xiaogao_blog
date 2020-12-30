import React, { useState } from 'react';
import { Modal, Row, Col, Input } from 'antd';
import { BlogData } from '../../index'
// import CreateBlog from '../../../../components/createBlog/index'
interface IModalProps {
    visible: boolean
    title: string
    onOK: () => void
    onCancel: () => void
    data: BlogData
}
const ListModal: React.FC<IModalProps> = (props) => {
    const { visible, title, onOK, onCancel, data } = props
    const [ModalData, setModalData] = useState<BlogData>(data)
    
    // const titleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     const obj = {
    //         ...ModalData, title: e.target.value
    //     }
    //     setModalData(obj)
    // }
    const renderInput = () => {
        return <Row gutter={16} style={{ width: "100%" }}>
            {/* <Col className="gutter-row" span={6}>
                <span>文章标题:</span>
                <Input placeholder="请输入文章标题" value={ModalData.title} onChange={titleChange} />
            </Col> */}
            {/* <Col className="gutter-row" span={6}>
                <Button icon={<UploadOutlined />} className="updateBtn">
                    上传博客
            <input type="file" value="" onChange={this.updateFile} />
                </Button>
            </Col> */}
            {/* <Col className="gutter-row" span={6}>
                <Space direction="vertical" size={12}>
                    <DatePicker showTime onOk={this.onSelectTimeOk} placeholder="请选择日期时间" value={this.state.createTime} onChange={this.onSelectTimeOk} />
                </Space>
            </Col>
            <Col className="gutter-row" span={6}>
                <Button size="large" type="text" icon={<SaveIcon className="icon" />} onClick={this.updateBlog}>
                </Button>
            </Col> */}
        </Row>
    }
    // TODO:  每次父组件更新,子组件也会跟着更新 性能优化 
    return <Modal visible={visible} title={title} onOk={() => onOK()} onCancel={onCancel} width={1800}>
        <div className="creatArticle_header" >{renderInput()}</div>

    </Modal>
}

export default ListModal