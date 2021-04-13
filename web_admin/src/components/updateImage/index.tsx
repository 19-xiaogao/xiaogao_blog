import React, { useState, useEffect } from "react";
import { Upload, message, Modal } from "antd";
import { UploadChangeParam, RcFile } from "antd/lib/upload";
import { PlusOutlined } from "@ant-design/icons";
interface UpdateImageProps {
  className?: string;
  onUpdateImage: (value: any) => void;
  imgUrl?: string;
  isClear: boolean;
}
const UpdateImage: React.FC<UpdateImageProps> = (props) => {
  const file = props.imgUrl
    ? [
        {
          uid: "-1",
          name: "image.png",
          status: "done",
          url: props.imgUrl,
        },
      ]
    : [];
  const [previewVisible, setPreviewVisible] = useState<boolean>(false);
  const [previewImage, setPreviewImage] = useState<string>("");
  const [previewTitle, setPreviewTitle] = useState<string>("");
  const [fileList, setFileList] = useState<any[]>(file);
  const actionUrl = `${process.env.REACT_APP_API}/api/webAdmin/image/update_img`;
  const header = {
    Authorization: JSON.parse(localStorage.getItem("token") as string),
  };
  useEffect(() => {
    if (props.isClear) {
      setPreviewImage("");
      setFileList([
        {
          uid: "-1",
          name: "image.png",
          status: "done",
          url: props.imgUrl,
        },
      ]);
    }
  }, [props.imgUrl, props.isClear]);

  function getBase64(file: any) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }

  const handleCancel = () => setPreviewVisible(false);

  const handlePreview = async (file: any) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewVisible(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };

  const beforeUpload = (file: RcFile) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("请上传jpg/png图片");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("上传的图片必须小于2M");
    }
    return isJpgOrPng && isLt2M;
  };

  const handleChange = (info: UploadChangeParam) => {
    setFileList(info.fileList);
    if (info.file.response && info.file.response.success) {
      props.onUpdateImage(info.file.response.data);
    }
  };
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
  return (
    <>
      <Upload
        listType='picture-card'
        className={props.className}
        action={actionUrl}
        fileList={fileList}
        beforeUpload={beforeUpload}
        onPreview={handlePreview}
        headers={header}
        onChange={handleChange}>
        {fileList.length >= 1 ? null : uploadButton}
      </Upload>
      <Modal
        visible={previewVisible}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}>
        <img alt='example' style={{ width: "100%" }} src={previewImage} />
      </Modal>
    </>
  );
};
export default UpdateImage;
