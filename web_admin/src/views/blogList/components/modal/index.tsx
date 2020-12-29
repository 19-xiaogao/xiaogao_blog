import React, { useMemo } from 'react';
import { Modal } from 'antd';
import { BlogData } from '../../index'
interface IModal {
    visible: boolean
    title: string
    onOK: () => void
    onCancel: () => void
    data: BlogData | null
}
const ListModal: React.FC<IModal> = (props) => {
    const { visible, title, onOK, onCancel, data } = props
    return <Modal visible={visible} title={title} onOk={() => onOK()} onCancel={onCancel} />
}

export default ListModal