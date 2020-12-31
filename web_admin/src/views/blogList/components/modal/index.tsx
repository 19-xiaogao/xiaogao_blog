import React from 'react';
import { Modal } from 'antd';
import CreateBlog from '../../../../components/createBlog/index'
interface IModalProps {
    visible: boolean
    onOK: () => void
    onCancel: () => void
    data: any
}
const ListModal: React.FC<IModalProps> = (props) => {
    const { visible, onOK, onCancel, data } = props
    // TODO:  每次父组件更新,子组件也会跟着更新 性能优化 
    return <Modal visible={visible} title='修改博客' onOk={() => onOK()} onCancel={onCancel} width={1800} closable={false}  okText="确认"
    cancelText="取消">
        <CreateBlog {...data} WhetherToCreate={false} />
    </Modal>
}

export default ListModal