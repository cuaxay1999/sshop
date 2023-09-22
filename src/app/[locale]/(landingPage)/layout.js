"use client";

import { Layout, Modal } from "antd";
import AppHeader from "@/components/appHeader";
import AppFooter from "@/components/appFooter";
import SupportHorizontal from "@/components/appSupport/SupportHorizontal";

import React, { useState, useEffect } from "react";
import { notification } from "antd";
import { SmileOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import ModalContact from "@/components/modalContact/ModalContact";

const LandingLayout = ({ children }) => {
  const texts = useSelector((state) => state.system.texts);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [api, contextHolder] = notification.useNotification();

  useEffect(() => {
    autoOpenModal();
  }, []);

  const autoOpenModal = () => {
    setTimeout(() => {
      showModal();
    }, 12000);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    setTimeout(() => {
      openNotification();
    }, 1000);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const openNotification = () => {
    api.open({
      message: "Gửi yêu cầu thành công!",
      description: "Chúng tôi sẽ liên hệ cho bạn trong thời gian sớm nhất",
      icon: <SmileOutlined style={{ color: "#108ee9" }} />,
      placement: "bottomRight",
    });
  };

  return (
    <Layout className="landing-layout">
      <Layout.Header>
        <AppHeader />
      </Layout.Header>

      <Layout.Content>{children}</Layout.Content>

      <Layout.Footer>
        <AppFooter />
      </Layout.Footer>

      <SupportHorizontal
        supportZalo={texts?.SUPPORT_ZALO}
        supportPhone={texts?.SUPPORT_PHONE}
        supportMessenger={texts?.SUPPORT_MESSENGER}
        supportFanpage={texts?.SUPPORT_FANPAGE}
      />

      <ModalContact
        visible={isModalOpen}
        handleOk={handleOk}
        handleCancel={handleCancel}
      />

      {contextHolder}
    </Layout>
  );
};

export default LandingLayout;
