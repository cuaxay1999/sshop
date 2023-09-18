"use client";
import { Layout } from "antd";
import AppHeader from "@/components/appHeader";

const AuthLayout = ({ children }) => {
  return (
    <Layout className="auth-layout">
      <Layout.Header>
        <AppHeader />
      </Layout.Header>
      <Layout.Content>{children}</Layout.Content>
    </Layout>
  );
};

export default AuthLayout;
