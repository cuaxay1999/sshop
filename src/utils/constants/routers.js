import {
  HomeOutlined,
  PhoneOutlined,
  ContainerOutlined,
} from "@ant-design/icons";

export default {
  LANDING_PAGE: [
    {
      name: "HOME_PAGE",
      path: "/",
      element: "HomePage",
      label: "HOMEPAGE",
      onMenu: true,
      icon: <HomeOutlined />,
    },
    {
      name: "NEWS",
      path: "/news",
      element: "NewsPage",
      label: "LABEL_NEWS",
      onMenu: true,
      icon: <ContainerOutlined />,
    },
    {
      name: "PRICING_PAGE",
      path: "/bang-gia",
      element: "PricingPage",
      label: "PRICE_LIST",
      onMenu: true,
    },
    {
      name: "CONTACT_PAGE",
      path: "/contact",
      element: "ContactPage",
      label: "CONTACT",
      onMenu: true,
      icon: <PhoneOutlined />,
    },
    {
      name: "VIEW_NEWS_DETAIL",
      path: "/view-news-detail",
      element: "ViewNewsDetail",
      onMenu: false,
      icon: <ContainerOutlined />,
    },
    {
      name: "NEWS_DETAIL",
      path: "/news/:slug/:locale",
      element: "ViewNewsDetail",
      onMenu: false,
    },
    {
      name: "GUIDES",
      path: "/guides",
      element: "Guide",
      label: "LABEL_GUIDE",
      onMenu: true,
      icon: <ContainerOutlined />,
    },
    {
      name: "GUIDE_DETAIL",
      path: "/guides/:slug/:locale",
      element: "ViewNewsDetail",
      onMenu: false,
    },
  ],

  AUTH_PAGE: [
    {
      name: "CHAIN",
      path: "/chain",
      element: "Chain",
    },
    {
      name: "PROFILE",
      path: "/profile",
      element: "Profile",
    },
    {
      name: "SHOP",
      path: "/shop",
      element: "Shop",
    },
    {
      name: "ACCOUNT",
      path: "/account",
      element: "SystemAccount",
    },
    {
      name: "FACEBOOK_LOGIN",
      path: "/facebook-login",
      element: "FacebookLogin",
    },
  ],
};
