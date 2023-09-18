import React, { useState, useEffect } from "react";
import { ACCOUNT_STATE } from "../../../../../utils/constants/config";
import { get } from "lodash";
import { useSelector } from "react-redux";

import { MessageOutlined } from "@ant-design/icons";

import { Button, Form, Input, message, Row, Col } from "antd";

import {
  actionVerifyOTP,
  actionReGenerateOTP,
  actionVerifyOTPByFirebase,
  actionSigninByFirebase,
} from "../../actions";

let countDownOTP;

const VerifyOTP = (props) => {
  const [form] = Form.useForm();
  const { refId, mobileNumber, resetPwd, authFirebase } = props;
  const [otpTime, setOtpTime] = useState(89);
  const texts = useSelector((state) => state.system.texts);
  const [callingAPI, setCallingAPI] = useState(false);

  useEffect(() => {
    checkOTPTime();
    return () => {
      clearInterval(countDownOTP);
    };
  }, []);

  const checkOTPTime = () => {
    clearInterval(countDownOTP);
    countDownOTP = setInterval(() => {
      setOtpTime((v) => v - 1);
    }, 1000);
  };

  useEffect(() => {
    if (otpTime <= 0) {
      clearInterval(countDownOTP);
    }
  }, [otpTime]);

  const verifyOTP = async (values) => {
    try {
      setCallingAPI(true);
      const { data } = await actionVerifyOTP({
        otpReferenceId: refId,
        ...values,
      });
      const code = get(data, "status.code");
      if (code == 200) {
        let query = {
          act: ACCOUNT_STATE.REGISTER,
          mobile: mobileNumber,
          refId: refId,
        };

        if (resetPwd) {
          query.resetPwd = resetPwd;
        }
        window.navigatePage("ACCOUNT", null, query);
      } else {
        const resMsg = get(
          data,
          "status.message",
          texts?.ERROR_AUTHEN_GENERAL_ERROR
        );
        message.error(resMsg);
      }
      setCallingAPI(false);
    } catch (error) {
      console.log(error);
      message.error(
        texts[error?.data?.status?.label] ||
          error?.data?.status?.message ||
          texts?.ERROR_CORE_GENERAL_ERROR
      );
      setCallingAPI(false);
    }
  };

  const verifyOTPByFirebase = async (values) => {
    try {
      setCallingAPI(true);
      const data = await actionVerifyOTPByFirebase(values.otpCode);
      if (data?._tokenResponse?.idToken) {
        const query = {
          act: ACCOUNT_STATE.REGISTER,
          mobile: mobileNumber,
          idToken: data._tokenResponse.idToken,
          authFirebase: true,
        };

        if (resetPwd) {
          query.resetPwd = resetPwd;
        }
        window.navigatePage("ACCOUNT", null, query);
      } else {
        message.error(texts.LABEL_OTP_NOT_CORRECT);
      }
      setCallingAPI(false);
    } catch (error) {
      console.log(error);
      setCallingAPI(false);
      message.error(
        texts[error?.data?.status?.label] ||
          error?.data?.status?.message ||
          texts?.ERROR_CORE_GENERAL_ERROR
      );
    }
  };

  const handleSubmit = async (values) => {
    if (authFirebase) {
      verifyOTPByFirebase(values);
    } else {
      verifyOTP(values);
    }
  };

  const handleResendOTP = async () => {
    form.setFieldValue("otpCode", "");
    try {
      const { data } = await actionReGenerateOTP({
        otpReferenceId: refId,
      });
      const code = get(data, "status.code");
      if (code == 200) {
        setOtpTime(89);
        checkOTPTime();
      } else {
        message.error(data?.status.message);
      }
    } catch (error) {
      console.log(error);
      message.error(
        error?.data?.status?.message || texts?.ERROR_AUTHEN_GENERAL_ERROR
      );
    }
  };

  const handleResendOTPByFirebase = async () => {
    await actionSigninByFirebase(`+${mobileNumber}`);
    if (window.confirmationResult) {
      setOtpTime(89);
      checkOTPTime();
    } else {
      const errorLabel = window.confirmationError;
      message.error(texts[errorLabel]);
    }
  };

  const resendOTP = async () => {
    if (authFirebase) {
      handleResendOTPByFirebase();
    } else {
      handleResendOTP();
    }
  };

  const getTime = () => {
    const minutes = parseInt(otpTime / 60);
    const seconds = parseInt(otpTime % 60);

    if (seconds < 10) {
      return `0${minutes}:0${seconds}`;
    }
    return `0${minutes}:${seconds}`;
  };

  return (
    <div className="verify-otp">
      <div className="form-heading">
        <span>
          {texts.WEB_LABEL_INPUT_OTP} {mobileNumber}
        </span>
      </div>

      <div className="otp-info">
        <div className="">
          <Row gutter={[6, 0]}>
            <Col>{`${texts?.LABEL_OTP_REMAIN} `}</Col>

            <Col>
              <div className="box-render-time">{getTime()}</div>
            </Col>
          </Row>
        </div>

        {otpTime === 0 && (
          <div>
            <Button size="small" type="link" onClick={resendOTP}>
              {texts?.VERIFY_PHONE_RESEND_OTP}
            </Button>
          </div>
        )}
      </div>

      <Form
        form={form}
        name="form"
        onFinish={handleSubmit}
        size="large"
        className="form-content"
      >
        <Form.Item
          name="otpCode"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input
            disabled={callingAPI}
            placeholder={texts?.VERIFY_PHONE_ENTER_OTP}
          />
        </Form.Item>

        <Form.Item>
          <Button
            className="btn-green-color btn-action w-full"
            type="primary"
            htmlType="submit"
            loading={callingAPI}
          >
            {texts.LABEL_NEXT}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default VerifyOTP;
