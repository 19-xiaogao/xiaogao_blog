import React from 'react';
import { Modal } from 'antd';
import { BlogData } from '../../index'
import CreateBlog from '../../../../components/createBlog/index'
interface IModal {
    visible: boolean
    title: string
    onOK: () => void
    onCancel: () => void
    data: BlogData | null
}
const ListModal: React.FC<IModal> = (props) => {
    const { visible, title, onOK, onCancel, data } = props
    console.log(data)
    // TODO:  每次父组件更新,子组件也会跟着更新 性能优化 
    return <Modal visible={visible} title={title} onOk={() => onOK()} onCancel={onCancel} width={1200}>
        <CreateBlog {...props.data} WhetherToCreate />
    </Modal>
}

export default ListModal