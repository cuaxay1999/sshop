import React, { useEffect, useState } from "react";
import { Button, Form, Input, message } from "antd";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { get } from "lodash";
import { actionSetProfile } from "../../../profile/actions";

import {
  SSHOP_SPA_TOKEN,
  CURRENT_CHAIN,
  CONFIG_SERVER,
  APP_IDS,
} from "@/utils/constants/config";

import {
  actionLogin,
  actionRegisterAccount,
  actionResetPassword,
  actionGetChainsByCustomerId,
  getShopsByChainId,
  actionRegisterByFirebase,
  actionResetPasswordByFirebase,
} from "../../actions";

const Register = (props) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const texts = useSelector((state) => state.system.texts);
  const locale = useSelector((state) => state.system.locale);
  const [callingAPI, setCallingAPI] = useState(false);

  const { refId, mobileNumber, resetPwd, idToken, authFirebase } = props;

  const handleLogin = async (pwd) => {
    try {
      const { data } = await actionLogin({
        username: mobileNumber,
        password: pwd,
      });
      const code = get(data, "status.code");

      if (code == 200) {
        Cookies.set(SSHOP_SPA_TOKEN, data?.data?.token, { expires: 1 });
        dispatch(actionSetProfile(data?.data));

        if (resetPwd) {
          await handleGetChainList();
        } else {
          window.navigatePage("SHOP");
        }
      }
    } catch (error) {
      message.error(
        texts[error?.data?.status?.label] ||
          error?.data?.status?.message ||
          texts?.ERROR_CORE_GENERAL_ERROR
      );
    }
  };

  const handleGetChainList = async () => {
    setCallingAPI(true);
    try {
      const { data } = await actionGetChainsByCustomerId();
      const code = get(data, "status.code");
      if (code == 200) {
        const chains = data?.data || [];
        if (chains.length === 0) {
          window.navigatePage("SHOP");
        } else {
          let currentChain = Cookies.get(CURRENT_CHAIN);
          if (
            !currentChain ||
            (currentChain && !chains.find((c) => c.chainId == currentChain))
          ) {
            currentChain = chains[0].chainId;
          }

          const subDomain = chains.find(
            (c) => c.chainId == currentChain
          )?.subDomain;
          const response = await getShopsByChainId(currentChain);
          if (response?.data?.data?.length > 0) {
            const url = `http://${subDomain}.${
              CONFIG_SERVER.DOMAIN
            }?user-token=${Cookies.get(SSHOP_SPA_TOKEN)}&locale=${locale}`;
            window.open(url, "_blank").focus();
          } else {
            window.navigatePage("SHOP");
          }
        }
      }
    } catch (error) {
      console.log(error);
      message.error(
        texts[error?.data?.status?.label] ||
          error?.data?.status?.message ||
          texts?.ERROR_CORE_GENERAL_ERROR
      );
    }
    setCallingAPI(false);
  };

  const handleSubmit = async (values) => {
    setCallingAPI(true);
    try {
      let data = {};
      if (resetPwd && !authFirebase) {
        const { data: res } = await actionResetPassword({
          otpReferenceId: refId,
          username: mobileNumber,
          newPassword: values.password,
        });
        data = res;
      } else if (resetPwd && idToken && authFirebase) {
        const { data: res } = await actionResetPasswordByFirebase({
          username: mobileNumber,
          newPassword: values.password,
          idToken: idToken,
          appId: APP_IDS.SSHOP,
        });
        data = res;
      } else if (idToken && authFirebase) {
        const { data: res } = await actionRegisterByFirebase({
          name: values.name,
          username: mobileNumber,
          password: values.password,
          idToken: idToken,
          appId: APP_IDS.SSHOP,
        });
        data = res;
      } else {
        const { data: res } = await actionRegisterAccount({
          otpReferenceId: refId,
          name: values.name,
          username: mobileNumber,
          password: values.password,
          appId: APP_IDS.SSHOP,
        });
        data = res;
      }
      const code = get(data, "status.code");

      if (code == 200) {
        await handleLogin(values.password);
      } else {
        message.error(
          texts[data?.status?.label] ||
            data?.status?.message ||
            texts?.ERROR_CORE_GENERAL_ERROR
        );
      }
    } catch (error) {
      message.error(
        texts[error?.data?.status?.label] ||
          error?.data?.status?.message ||
          texts?.ERROR_CORE_GENERAL_ERROR
      );
    }
    setCallingAPI(false);
  };

  return (
    <div className="register-page">
      {/* <div className="form-heading">{texts?.LOGIN_CREATE_PASSWORD}</div> */}
      <Form
        form={form}
        name="loginForm"
        onFinish={handleSubmit}
        // className="form-content"
        layout="vertical"
        requiredMark={false}
      >
        {!resetPwd && (
          <Form.Item
            name="name"
            label={texts?.LABEL_FULL_NAME}
            rules={[
              {
                required: true,
                message: texts?.RSPASS_EMPTY_NAME,
              },
            ]}
          >
            <Input disabled={callingAPI} size="large" />
          </Form.Item>
        )}

        <Form.Item
          name="password"
          label={texts?.LOGIN_INPUT_PASSWORD}
          rules={[
            {
              required: true,
              message: texts?.LOGIN_GUID_INPUT_PASSWORD,
            },
            {
              validator(_, value) {
                if (value && value.split(" ").length > 1) {
                  return Promise.reject(
                    new Error(texts?.ERROR_AUTHEN_INVALID_PASSWORD)
                  );
                }
                if (value && value.trim().length < 6) {
                  return Promise.reject(new Error(texts?.RSPASS_REQUIRE));
                }
                return Promise.resolve();
              },
            },
          ]}
        >
          <Input.Password disabled={callingAPI} size="large" />
        </Form.Item>

        <Form.Item
          name="confirm"
          label={texts?.RSPASS_REENTER_PASS}
          dependencies={["password"]}
          rules={[
            {
              required: true,
              message: texts?.LOGIN_GUID_INPUT_PASSWORD,
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error(texts?.LOGIN_GUID_WARN_PASS_NOT_MATCH)
                );
              },
            }),
          ]}
        >
          <Input.Password disabled={callingAPI} size="large" />
        </Form.Item>

        <Form.Item className="form-item-btn">
          <Button
            size="large"
            type="primary"
            htmlType="submit"
            className="btn-green-color btn-action w-full"
            loading={callingAPI}
          >
            {texts?.LABEL_NEXT}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default React.memo(Register);
