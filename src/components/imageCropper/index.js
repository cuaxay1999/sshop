import React, { useEffect, useRef, useState } from "react";
import Cropper from "react-cropper";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";
import "cropperjs/dist/cropper.css";
import { Modal, Slider } from "antd";
import { useSelector } from "react-redux";

import "./css/index.scss";

function ImageCropper({ image, onCancel, onOk }) {
  const cropper = useRef(null);
  const [src, setSrc] = useState();
  const [updateOption, setUpdateOption] = useState(true);
  const [sliderValue, setSliderValue] = useState(50);
  const texts = useSelector((state) => state.system.texts);

  React.useEffect(() => {
    if (image) {
      const reader = new FileReader();
      reader.onload = () => setSrc(reader.result);
      reader.readAsDataURL(image);
    }
  }, [image]);

  useEffect(() => {
    if (updateOption && cropper && cropper.current && cropper.current.cropper) {
      cropper.current.cropper.options.data = {
        width: 320,
        height: 320,
      };
    }
  });

  function cropImage(callback) {
    try {
      const cropData = cropper.current.cropper
        .getCroppedCanvas({
          width: 320,
          height: 320,
          imageSmoothingQuality: "high",
        })
        .toDataURL();
      callback(cropData);
    } catch (error) {}
  }

  const handleChangeZoom = (newValue) => {
    if (sliderValue === newValue) return;
    if (sliderValue > newValue) {
      cropper.current.cropper.zoom(-(sliderValue - newValue) / 100);
    } else {
      cropper.current.cropper.zoom((newValue - sliderValue) / 100);
    }
    setSliderValue(newValue);
    if (updateOption) {
      setUpdateOption(false);
    }
  };

  const handleOk = () => {
    cropImage(onOk);
  };
  const handleCancel = () => {
    onCancel();
  };

  return (
    <Modal
      visible={true}
      title={texts?.CROP_PHOTO}
      onOk={handleOk}
      onCancel={handleCancel}
      className="common-modal"
      maskClosable={false}
      okButtonProps={{ className: "btn-ok", size: "large" }}
      cancelButtonProps={{ className: "btn-cancel", size: "large" }}
    >
      <div className="crop-image-container">
        <Cropper
          style={{ height: 230, width: "100%" }}
          initialAspectRatio={1 / 1}
          preview=".img-preview"
          zoomable={true}
          guides={false}
          responsive={false}
          // viewMode={3}
          movable={true}
          cropBoxResizable={false}
          dragMode="move"
          zoomOnWheel={false}
          // minCropBoxWidth={120}
          // minCropBoxHeight={120}
          src={src}
          ref={cropper}
        />
        {cropper && (
          <div className="zoom-slider">
            <MinusOutlined className="zoom-ic zoom-out-ic" color={"#777"} />
            <Slider
              max={100}
              min={0}
              step={5}
              value={sliderValue}
              onChange={handleChangeZoom}
              aria-labelledby="continuous-slider"
              className="slider-bar"
            />
            <PlusOutlined className="zoom-ic zoom-out-ic" color={"#777"} />
          </div>
        )}
        <div className="preview-box">
          {texts?.PREVIEW}
          <div className="img-preview" />
        </div>
      </div>
    </Modal>
  );
}

export default ImageCropper;
