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
    return <Modal visible={visible} title='修改博客' destroyOnClose onOk={() => onOK()} onCancel={onCancel}  width={1800} closable={true} footer ={null}>
        <CreateBlog {...data} WhetherToCreate={false} />
    </Modal>
}

export default ListModal