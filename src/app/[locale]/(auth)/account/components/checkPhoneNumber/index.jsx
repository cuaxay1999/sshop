import React, { useEffect, useState } from "react";
import { MailOutlined } from "@ant-design/icons";
import { Button, Form, Input, message } from "antd";
import {
  ACCOUNT_STATE,
  EMAIL_PATTERN,
  PHONE_PATTERN,
} from "@/utils/constants/config";
import { actionGenerateOTP, actionSigninByFirebase } from "../../actions";
import { get } from "lodash";
import { useSelector } from "react-redux";
import PhoneInput from "react-phone-number-input";

const CheckPhoneNumber = (props) => {
  const texts = useSelector((state) => state.system.texts);
  const { resetPwd, forgotPwd } = props;
  const [form] = Form.useForm();
  const [callingAPI, setCallingAPI] = useState(false);
  const [usePhone, setUsePhone] = useState(true);

  const handleSubmit = async (values) => {
    try {
      setCallingAPI(true);
      const { data } = await actionGenerateOTP({
        ...values,
        type: "REGISTRATION",
      });

      const code = get(data, "status.code");
      const registerInfo = {
        ...(data?.data || {}),
        isFirebase: data?.data?.isFirebase || false,
        otpReferenceId: data?.data?.otpReferenceId || "",
        ...values,
      };

      const username = values.username.replace("+", "");

      if (code === "SSHOP-613") {
        if (resetPwd) {
          forgotPwd(false, username);
        } else {
          const query = {
            act: ACCOUNT_STATE.PASSWORD,
            mobile: username,
            authFirebase: registerInfo.isFirebase,
          };
          window.navigatePage("ACCOUNT", {}, query);
        }
      } else if (code == 200) {
        if (resetPwd) {
          forgotPwd(
            registerInfo.isFirebase,
            username,
            true,
            registerInfo.otpReferenceId
          );
        } else if (registerInfo.isFirebase) {
          await actionSigninByFirebase(values.username);
          if (window.confirmationResult) {
            const query = {
              act: ACCOUNT_STATE.VERIFY_OTP,
              mobile: username,
              refId: registerInfo.otpReferenceId,
              authFirebase: registerInfo.isFirebase,
            };
            window.navigatePage("ACCOUNT", null, query);
          } else {
            const errorLabel = window.confirmationError;
            message.error(texts[errorLabel]);
          }
        } else {
          const query = {
            act: ACCOUNT_STATE.VERIFY_OTP,
            mobile: username,
            refId: registerInfo.otpReferenceId,
          };
          window.navigatePage("ACCOUNT", null, query);
        }
      } else {
        const resMsg = get(
          data,
          "status.message",
          texts?.ERROR_CORE_GENERAL_ERROR
        );
        message.error(resMsg);
      }
      setCallingAPI(false);
    } catch (error) {
      message.error(
        texts[error?.data?.status?.label] ||
          error?.data?.status?.message ||
          texts?.ERROR_CORE_GENERAL_ERROR
      );
      setCallingAPI(false);
    }
  };

  return (
    <div className="check-phone-number">
      <div className="form-heading">
        <div className="header-text">
          {texts.LABEL_LOGIN} {texts?.LABEL_OR}{" "}
          {texts.LABEL_REGISTER?.toLowerCase()}
        </div>
      </div>

      <div className="TabPane">
        <Button
          className="button-email-or-phone"
          type={usePhone ? "ghost" : "text"}
          onClick={() => setUsePhone(true)}
        >
          {texts?.LABEL_PHONE_NUMBER}
        </Button>

        <Button
          className="button-email-or-phone"
          type={!usePhone ? "ghost" : "text"}
          onClick={() => setUsePhone(false)}
        >
          {texts?.LABEL_EMAIL}
        </Button>
      </div>

      <Form
        form={form}
        name="loginForm"
        onFinish={handleSubmit}
        size="large"
        className="form-content"
      >
        {!usePhone && (
          <Form.Item
            name="username"
            rules={[
              { required: true, message: texts.PROFILE_VALIDATE_EMAIL_EMPTY },
              {
                pattern: EMAIL_PATTERN,
                message: texts.PROFILE_VALIDATE_EMAIL,
              },
            ]}
          >
            <Input
              prefix={<MailOutlined />}
              disabled={callingAPI}
              placeholder={texts.LABEL_INPUT_EMAIL}
              autoFocus
            />
          </Form.Item>
        )}

        {usePhone && (
          <Form.Item
            name="username"
            rules={[
              { required: true, message: texts.LABEL_PHONE_CANNOT_BLANK },
              {
                pattern: PHONE_PATTERN,
                message: texts.ERROR_CORE_INVALID_MOBILE_NUMBER_FORMAT,
              },
            ]}
          >
            <PhoneInput
              className="phone-input"
              defaultCountry="VN"
              disabled={callingAPI}
              placeholder={texts.LABEL_ENTER_PHONE}
            />
          </Form.Item>
        )}

        <Form.Item className="form-item-btn" style={{ marginBottom: "24px" }}>
          <Button
            type="primary"
            htmlType="submit"
            className="btn-green-color btn-action w-full"
            loading={callingAPI}
          >
            {texts.LABEL_NEXT}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default React.memo(CheckPhoneNumber);
