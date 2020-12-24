import React, { useState } from 'react'
import { Upload, message } from 'antd'
import { UploadChangeParam, RcFile } from 'antd/lib/upload'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
interface UpdateImageProps {
    className?: string
}

const UpdateImage: React.FC<UpdateImageProps> = (props) => {
    const [loading, setLoading] = useState<boolean>(false)
    const [imageUrl, setImageUrl] = useState<string>('')
    const actionUrl ='/devApi/api/image/update_img'

    function getBase64(img: any, callback: (res: any) => void) {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    }
    const beforeUpload = (file: RcFile) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('请上传jpg/png图片');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('上传的图片必须小于2M');
        }
        return isJpgOrPng && isLt2M;
    }
    const handleChange = (info: UploadChangeParam) => {
        if (info.file.status === 'uploading') {
            setLoading(true)
            return;
        }
        if (info.file.status === 'done') {
            getBase64(info.file.originFileObj, imageUrl => {
                setLoading(false)
                setImageUrl(imageUrl)
            });
        }
    }
    const uploadButton = (
        <div>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>上传图片</div>
        </div>
    );
    return <Upload
        name="avatar"
        listType="picture-card"
        className={props.className}
        showUploadList={false}
        action={actionUrl}
        beforeUpload={beforeUpload}
        onChange={handleChange}
    >
        {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
    </Upload>
}
export default UpdateImage