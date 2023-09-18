import React, { useState } from 'react';
import { Upload } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import ImageCropper from '../imageCropper';
import { useSelector } from "react-redux";

import './css/index.scss';

const UploadAvatar = (props) => {
  const { onCropSuccess, isUploading = false } = props;
  const [fileList, setFileList] = useState([]);
  const [openCropper, setOpenCropper] = useState(false);
  const [cropData, setCropData] = useState('');
  const [fileName, setFileName] = useState('');
  const texts = useSelector(state => state.system.texts)

  const propsUpload = {
    name: 'files',
    showUploadList: false,
    fileList: fileList,
    accept: 'image/*',
    beforeUpload: async (file) => {
      const fileType = file.type;
      const isJpgOrPng = fileType.includes('image');

      if (!isJpgOrPng) {
        message.error(texts?.ASSERT_IMAGE);
      }

      const isLt20M = file.size / 1024 / 1024 < 0.8;
      if (!isLt20M) {
        message.error(texts?.UPLOAD_IMAGE_800KB);
      }

      if (isJpgOrPng && isLt20M) {
        setFileName(file.name||'fileName.jpg');
        setFileList([file]);
        setOpenCropper(true);
      }

      return false;
    },
  };

  const onOk = (imgData) => {
    setCropData(imgData);
    if (onCropSuccess) {
      onCropSuccess(imgData, fileName);
    }
  };

  const uploadButton = (
    <div>
      {isUploading ? <LoadingOutlined /> : <PlusOutlined />}
      <div
        style={{
          marginTop: 8,
        }}
      >
        {texts?.LABEL_ADD_IMAGE}
      </div>
    </div>
  );

  return (
    <div className="upload-avatar-content">
      <div className="lb-title">
        320 x 320 px | JPEG, JPG | {texts?.LABEL_MAX} 800KB
      </div>
      <div className="upload-info">
        <Upload
          {...propsUpload}
          showUploadList={false}
          className="avatar-uploader"
        >
          {cropData ? (
            <img
              src={cropData}
              alt="avatar"
              className="crop-img"
              style={{ width: '100%' }}
            />
          ) : (
            uploadButton
          )}
        </Upload>
        <div className="upload-des">{texts?.CAN_UPDATE_AFTER_COMPLETE_PROFIE}</div>
      </div>

      {openCropper && (
        <ImageCropper
          image={fileList[0]}
          onCancel={() => setOpenCropper(false)}
          onOk={(data) => {
            onOk(data);
            setOpenCropper(false);
          }}
        />
      )}
    </div>
  );
};

export default React.memo(UploadAvatar);
