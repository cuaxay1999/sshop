"use client";

import { useState, useEffect } from "react";
// import { useSearchParams, useParams, useNavigate } from "react-router-dom";
import { ClockCircleOutlined, FacebookFilled } from "@ant-design/icons";
import FacebookLoginButton from "react-facebook-login/dist/facebook-login-render-props";
import { Button } from "antd";
import { CONFIG_SERVER, SSHOP_SPA_TOKEN } from "@/utils/constants/config";
import { buildRequestParams } from "@/utils/helpers/common";
// import {FacebookFilled, CloseOutlined, RightOutlined} from '@ant-design/icons';
import { useSearchParams } from "next/navigation";

const FacebookLogin = () => {
  const searchParams = useSearchParams();

  console.log("searchParams", searchParams);

  const subDomain = searchParams.get("subDomain");
  const userToken = searchParams.get("user-token");
  const locale = searchParams.get("locale") || "vi";

  const [autoLoad, setAutoLoad] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setAutoLoad(true);
    }, 3000);
  }, []);

  const responseFacebook = async (response) => {
    console.log("responseFacebook", response);
    if (!response?.accessToken) return;

    let { accessToken, id, name, signedRequest, userID } = response;

    let params = buildRequestParams({
      mode: "config",
      "user-token": userToken,
      locale,
      fbAccessToken: accessToken,
      fbId: id,
    });

    const url = `https://${subDomain}.${CONFIG_SERVER.DOMAIN}/facebook-index?${params}`;
    // const url = `http://localhost:3000/facebook-index?${params}`;

    window.open(url, "_blank");

    // location.replace(url);

    // let res = await getFacebookPageByUserAccessToken(props, id, accessToken);
    // console.log('getFacebookPageByUserAccessToken', res);

    // if(res?.status == 200){
    //     let pages = res?.data?.data || [];
    //     pages = pages.map(e => ({
    //         namePage: e?.name,
    //         // pageAccessToken: e?.access_token,
    //         // accessToken,
    //         pageId: e?.id,
    //         urlAvatar: e?.picture?.data?.url
    //     }));
    //
    //     let resConfig = await actionShopConfigFacebook(shopId, accessToken, pages);
    //     console.log('resConfig', resConfig);
    //     if(resConfig?.data?.status?.code == 200){
    //         console.log('configSuccess');
    //         // configSuccess();
    //         // navToChat();
    //     }
    // }
  };

  return (
    <div style={{ margin: 24 }}>
      <div style={{ fontWeight: "500", fontSize: 16 }}>Chat Messenger</div>
      <div style={{ marginTop: 12 }}>
        Để sử dụng tính năng chăm sóc khách hàng qua Facebook Messenger, bạn
        phải đăng nhập và uỷ quyền cho ứng dụng được phép truy cập và quản lý
        Page của bạn
      </div>
      <div style={{ marginTop: 12 }}>
        Không xuất hiện popup đăng nhập, có thể popup đã bị chặn bởi trình duyệt
        web. Hãy cho phép hiển thị popup và thử lại
      </div>
      <div style={{ marginTop: 12 }}>
        Đăng nhập bị lỗi, click vào nút &ldquo;Đăng nhập bằng Facebook&rdquo; ở
        phía dưới để thử lại
      </div>

      <div style={{ marginTop: 24 }}></div>

      <FacebookLoginButton
        // appId="1991046794570233"
        appId="428306655775996"
        fields="name,email,picture"
        scope="public_profile,pages_messaging,pages_show_list,pages_manage_metadata,pages_read_engagement"
        // scope='public_profile'
        // autoLoad={autoLoad}
        callback={responseFacebook}
        render={(renderProps) => (
          <Button
            onClick={renderProps.onClick}
            type="primary"
            icon={<FacebookFilled style={{ fontSize: 24 }} />}
            style={{
              backgroundColor: "#1783F4",
              borderColor: "#1783F4",
              display: "inline-flex",
            }}
          >
            Đăng nhập bằng Facebook
          </Button>
        )}
      />
    </div>
  );
};

export default FacebookLogin;
