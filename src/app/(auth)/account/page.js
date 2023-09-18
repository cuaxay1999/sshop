"use client";

import React from "react";
import { Button, message } from "antd";
import { ACCOUNT_STATE } from "../../../utils/constants/config";
import CheckPhoneNumber from "./components/checkPhoneNumber";
import VerifyOTP from "./components/verifyOTP";
import Login from "./components/login";
import Register from "./components/register";
import ChainList from "./components/chainList";
import { useSelector } from "react-redux";
import { actionGenerateOTP, actionSigninByFirebase } from "./actions";
import { get } from "lodash";
import AppSupport from "@/components/appSupport";
import { LogoSSHOPText } from "../../../assets/images";
import { useSearchParams } from "next/navigation";
import Image from "next/image";

import "./css/index.scss";

const SystemAccount = () => {
  const search = useSearchParams();
  const urlParams = new URLSearchParams(search);
  const actionState = urlParams.get("act");
  const texts = useSelector((state) => state.system.texts);
  const mobileNumber = urlParams.get("mobile");
  const refId = urlParams.get("refId");
  const resetPwd = urlParams.get("resetPwd");
  const authFirebase = urlParams.get("authFirebase") == "true" ? true : false;
  const idToken = urlParams.get("idToken");

  const forgotPwd = (
    authFirebase,
    mobileNumber,
    refId,
    renderedOtp = false
  ) => {
    if (authFirebase) {
      handleForgotPwdByFirebase(mobileNumber, renderedOtp);
    } else {
      handleForgotPwd(mobileNumber, refId);
    }
  };

  const handleForgotPwd = async (mobileNumber, renderedOtp, refId) => {
    const query = {
      act: ACCOUNT_STATE.VERIFY_OTP,
      mobile: mobileNumber,
      refId,
      resetPwd: true,
    };

    if (renderedOtp && refId) {
      window.navigatePage("ACCOUNT", null, query);
    } else {
      try {
        const { data } = await actionGenerateOTP({
          username: mobileNumber,
          type: "FORGOT_PASSWORD",
        });
        const code = get(data, "status.code");
        if (code == 200) {
          query.refId = get(data, "data.otpReferenceId");
          window.navigatePage("ACCOUNT", null, query);
        } else {
          const resMsg = get(
            data,
            "status.message",
            texts?.ERROR_CORE_GENERAL_ERROR
          );
          message.error(resMsg);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleForgotPwdByFirebase = async (mobileNumber, renderedOtp) => {
    const query = {
      act: ACCOUNT_STATE.VERIFY_OTP,
      mobile: mobileNumber,
      resetPwd: true,
      authFirebase: true,
    };

    if (renderedOtp) {
      window.navigatePage("ACCOUNT", null, query);
    } else {
      await actionSigninByFirebase(`+${mobileNumber}`);
      if (window.confirmationResult) {
        window.navigatePage("ACCOUNT", null, query);
      } else {
        const errorLabel = window.confirmationError;
        message.error(texts[errorLabel]);
      }
    }
  };

  return (
    <div className="auth-page account-page">
      <div className="account-wrapper">
        <div
          className="account-main-content"
          style={{ marginTop: "40px", textAlign: "center" }}
        >
          <Image
            className="page-logo"
            style={{
              width: "160px",
              height: "64px",
              marginBottom: "18px",
              objectFit: "contain",
            }}
            src={LogoSSHOPText}
            alt="LogoSSHOPText"
          />
        </div>
        <div className="account-main-content">
          {(!actionState || actionState == ACCOUNT_STATE.GENERATE_OTP) && (
            <CheckPhoneNumber
              resetPwd={resetPwd}
              authFirebase={authFirebase}
              forgotPwd={forgotPwd}
            />
          )}

          {actionState == ACCOUNT_STATE.PASSWORD && (
            <Login
              mobileNumber={mobileNumber}
              authFirebase={authFirebase}
              forgotPwd={forgotPwd}
            />
          )}

          {actionState == ACCOUNT_STATE.VERIFY_OTP && (
            <VerifyOTP
              authFirebase={authFirebase}
              mobileNumber={mobileNumber}
              refId={refId}
              resetPwd={resetPwd}
            />
          )}

          {actionState == ACCOUNT_STATE.REGISTER && (
            <Register
              mobileNumber={mobileNumber}
              refId={refId}
              idToken={idToken}
              resetPwd={resetPwd}
              authFirebase={authFirebase}
            />
          )}

          {actionState == ACCOUNT_STATE.CHAIN_LIST && <ChainList />}
        </div>

        <div className="support-info">
          <span>
            {texts.LABEL_CONTACT_SUPPORT_WEB || "Liên hệ tổng đài hỗ trợ"}
          </span>
          {/*<Button type="link">84902624006</Button>*/}
        </div>

        <AppSupport
          supportZalo={texts?.SUPPORT_ZALO}
          supportPhone={texts?.SUPPORT_PHONE}
          supportMessenger={texts?.SUPPORT_MESSENGER}
          supportFanpage={texts?.SUPPORT_FANPAGE}
        />
      </div>
    </div>
  );
};

export default SystemAccount;
