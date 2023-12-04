import React, { useState } from "react";
import { LockOutlined } from "@ant-design/icons";
import { Button, Form, Input, Spin, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { actionSetProfile } from "../../../profile/actions";
import { get } from "lodash";

import {
  SSHOP_SPA_TOKEN,
  CURRENT_CHAIN,
  CONFIG_SERVER,
} from "@/utils/constants/config";

import {
  actionLogin,
  actionGetChainsByCustomerId,
  getShopsByChainId,
} from "../../actions";

const Login = (props) => {
  const { mobileNumber, authFirebase, forgotPwd, autoLogin } = props;
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const texts = useSelector((state) => state.system.texts);
  const locale = useSelector((state) => state.system.locale);

  const handleSubmit = async (values) => {
    try {
      const { data } = await actionLogin({
        username: mobileNumber,
        ...values,
      });
      const code = get(data, "status.code");

      if (code == 200) {
        Cookies.set(SSHOP_SPA_TOKEN, data?.data?.token, { expires: 1 });
        dispatch(actionSetProfile(data?.data));
        await handleGetChainList();
      } else {
        message.error(texts.RSPASS_VALIDATE);
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
          //find available shop
          let availableChain = chains.filter((v) => {
            return v.shopId && v.shopId > 0;
          });

          if (availableChain.length > 0)
            currentChain = availableChain[0].chainId;
          else currentChain = chains[0].chainId;
        }

        Cookies.set(CURRENT_CHAIN, currentChain);
        const subDomain = chains.find(
          (c) => c.chainId == currentChain
        )?.subDomain;
        const response = await getShopsByChainId(currentChain);

        if (response?.data?.data?.length > 0) {
          const url = `https://${subDomain}.${
            CONFIG_SERVER.DOMAIN
          }?user-token=${Cookies.get(SSHOP_SPA_TOKEN)}&locale=${locale}`;
          window.open(url, "_self").focus();
        } else {
          const search = {
            id: currentChain,
            sub: subDomain,
          };
          window.navigatePage("SHOP", null, search);
        }
      }
    }
  };

  if (autoLogin) {
    handleGetChainList()
  }

  const [error, setError] = useState(false);

  return (
    <div className="login-component">
      <Spin spinning={autoLogin}>
        <div className="form-heading">
          <span>{texts.LOGIN_INPUT_PASSWORD}</span>
        </div>

        <Form
          form={form}
          name="loginForm"
          onFinish={handleSubmit}
          size="large"
          className="form-content"
        >
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: texts.LOGIN_GUID_INPUT_PASSWORD,
              },
            ]}
          >
            <Input.Password
              autoFocus
              prefix={<LockOutlined />}
              placeholder={texts?.LOGIN_INPUT_PASSWORD}
              onChange={() => setError(false)}
            />
          </Form.Item>
          <Form.Item>
            <Button
              className="btn-green-color w-full btn-action"
              type="primary"
              htmlType="submit"
            >
              {texts.LABEL_NEXT}
            </Button>
          </Form.Item>
          <div style={{ textAlign: "center" }}>
            <Button
              onClick={() => forgotPwd(authFirebase, mobileNumber)}
              type="link"
            >
              {" "}
              {texts.LABEL_FORGOT_PASSWORD}
            </Button>
          </div>
        </Form>
      </Spin>
    </div>
  );
};

export default React.memo(Login);
