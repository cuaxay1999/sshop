"use client";

import { useState } from "react";
import { actionRegister } from "./actions.js";
import { useSelector } from "react-redux";
import { get } from "lodash";

import { Form, Row, Col, Input, Checkbox, message, Button } from "antd";

import "./css/index.scss";

const FormContact = () => {
  const [ischecked, setchecked] = useState(false);
  const texts = useSelector((state) => state.system.texts);

  const size = "large";

  const handleSubmit = async (values) => {
    if (!ischecked) {
      message.warn("Bạn chưa đồng ý với điều khoản !");
      return;
    }

    try {
      const { data } = await actionRegister({});
      const code = get(data, "status.code");

      if (code == 200) {
        message.success(
          "Bạn đã đăng ký tài khoản thành công, nhân viên sẽ liên hệ cho bạn trong thời gian"
        );
      }
    } catch (error) {
      message.error(
        texts[error?.data?.status?.label] ||
          error?.data?.status?.message ||
          texts?.ERROR_CORE_GENERAL_ERROR
      );
    }
  };

  return (
    <Form className="form-contact" onFinish={handleSubmit}>
      <Row gutter={[0, 24]}>
        <Col span={24}>
          <h2 className="form-heading">{texts?.TRY_SSHOP_FOR_FREE}</h2>
          <span>+30.000 {texts?.BUSIBESS_AND_SHOP_TRUST}</span>
        </Col>

        <Col span={24}>
          <Form.Item
            name="name"
            rules={[{ required: true, message: texts?.RSPASS_EMPTY_NAME }]}
          >
            <Input size={size} placeholder={`${texts?.LABEL_FULL_NAME} (*)`} />
          </Form.Item>

          <Row gutter={[16, 0]}>
            <Col xs={24} md={24} lg={12}>
              <Form.Item
                name="phone"
                rules={[
                  { required: true, message: texts?.LABEL_PHONE_CANNOT_BLANK },
                ]}
              >
                <Input
                  size={size}
                  placeholder={`${texts?.LABEL_PHONE_NUMBER} (*)`}
                />
              </Form.Item>
            </Col>

            <Col xs={24} md={24} lg={12}>
              <Form.Item
                name="source"
                rules={[{ required: true, message: texts?.ADD_SPA_ENTER_NAME }]}
              >
                <Input size={size} placeholder={`${texts?.ADD_SPA_NAME} (*)`} />
              </Form.Item>
            </Col>
          </Row>

          <div>
            <Checkbox
              checked={ischecked}
              onChange={() => setchecked(!ischecked)}
            />
            <span>{texts?.I_AGREE_WITH}</span>
            <span className="text-green-color"> {texts?.USAGE_RULES}</span>
            <span> {texts?.AND}</span>
            <span className="text-green-color"> {texts?.PRIVACY_POLYCY}</span>
            <span> {texts?.OF}</span>
            <span className="text-green-color"> SSHOP</span>
          </div>
        </Col>

        <Col span={24}>
          <Button htmlType="submit" size={size} type="primary">
            {texts?.SIGN_UP_TRIAL}
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default FormContact;
