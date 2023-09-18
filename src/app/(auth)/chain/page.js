"use client";

import React, { useCallback, useEffect, useState } from "react";
import { Button, Form, Input, message, Typography } from "antd";
import AppLogo from "@/components/appLogo";
import { chain_banner } from "../../../assets/images";
import { actionAddChain } from "./actions";
import { get } from "lodash";
import { useSelector } from "react-redux";
import Image from "next/image";

import "./css/index.scss";

const Chain = () => {
  const [form] = Form.useForm();
  const nameValue = Form.useWatch("name", form);
  const texts = useSelector((state) => state.system.texts);

  useEffect(() => {
    if (nameValue) {
      handleCheckSubDomain(`${nameValue || ""}`);
    }
    form.setFieldValue(
      "subDomain",
      `${(nameValue || "")
        .toLocaleLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/đ/g, "d")
        .replace(/Đ/g, "D")
        .replace(/[^a-zA-Z]/g, "")}`
    );
  }, [nameValue]);

  const handleSubmit = async (values) => {
    try {
      const { data } = await actionAddChain({
        name: values.name,
        subDomain: `${values.subDomain || ""}`,
      });
      const code = get(data, "status.code");
      if (code == 200) {
        message.success(texts?.CREATE_CHAIN_SUCCESS);
        const query = {
          id: data?.data?.chainId,
          sub: data?.data?.subDomain,
        };
        window.navigatePage("SHOP", null, query);
      } else {
        const resMsg = get(
          data,
          "status.message",
          texts?.ERROR_AUTHEN_GENERAL_ERROR
        );
        message.error(resMsg);
      }
    } catch (error) {
      const resMsg = get(
        error,
        "data.status.message",
        texts?.ERROR_AUTHEN_GENERAL_ERROR
      );
      message.error(resMsg);
    }
  };

  return (
    <div className="auth-page chain-page">
      <div className="auth-page-content chain-content">
        <div className="left-content">
          <div className="header-section">
            <div className="title-section">
              <label>{texts?.SELECT_CHAIN_CREATE_CHAIN}</label>
              <AppLogo size="small" />
            </div>
            <div className="sub-title">{texts?.SSPA_PLATFORM}</div>
          </div>

          <div className="banner-content">
            <Image
              src={chain_banner}
              alt="chain banner"
              style={{ objectFit: "contain" }}
            />
          </div>
        </div>

        <div className="right-content">
          <div className="title-section">{texts?.LABEL_CREATE_CHAIN}</div>
          <Form
            form={form}
            name="form"
            onFinish={handleSubmit}
            className="form-content"
            layout="vertical"
            size="large"
          >
            <Form.Item
              name="name"
              label={texts?.CREATE_CHAIN_INPUT_NAME}
              rules={[
                {
                  required: true,
                  message: texts?.CREATE_CHAIN_REQUIRE_NAME,
                },
                {
                  validator(_, value) {
                    const subdomain = `${(value || "")
                      .toLocaleLowerCase()
                      .replace(/[^a-zA-Z]/g, "")}`;
                    if (!subdomain && value) {
                      return Promise.reject(
                        new Error(texts?.INVALID_STORE_NAME)
                      );
                    }
                    return Promise.resolve();
                  },
                },
              ]}
              hasFeedback={!!nameValue}
            >
              <Input showCount maxLength={35} />
            </Form.Item>

            <Form.Item label="Domain" name="subDomain">
              <Input readOnly showCount maxLength={35} />
            </Form.Item>

            <Form.Item className="form-item-btn">
              <Button
                type="primary"
                htmlType="submit"
                className="btn-green-color form-btn-action"
              >
                {texts?.LABEL_NEXT}
              </Button>
            </Form.Item>

            <div className="privacy">
              <span>{texts?.READED_AND_AGREE}</span>
              <Typography.Link
                href="https://sites.google.com/view/smartspa"
                target="_blank"
              >
                {texts?.SSPA_TERM_CONDITION}
              </Typography.Link>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Chain;
