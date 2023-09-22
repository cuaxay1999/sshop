import { useLocale } from "next-intl";
import { notFound } from "next/navigation";
import { createTranslator, NextIntlClientProvider } from "next-intl";
import { RootStyleRegistry } from "@/lib/AntdRegistry";
import Provider from "@/redux/provider";
import "@/assets/css/index.scss";
import BaseLayout from "@/components/baselayout";
import Script from "next/script";

import { Roboto } from "next/font/google";

const roboto = Roboto({
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "SShop - smart shop",
  description:
    "SShop là phần mềm bán hàng miễn phí trên điện thoại hỗ trợ các chủ cửa hàng quản lý kho, kiểm soát thu chi, báo cáo chính xác kịp thời từ đó giúp chủ cửa hàng dễ dàng quản lý và tăng doanh số",
  keywords: ["SSHOP", "cửa hàng", "smart shop", "ứng dụng quản lý"],
};

export default function LocaleLayout({ children, params }) {
  const locale = useLocale();

  // Validate that the incoming `locale` parameter is a valid locale
  if (params.locale !== locale) {
    notFound();
  }

  return (
    <html className={roboto.className}>
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <RootStyleRegistry>
          <Provider>
            <NextIntlClientProvider locale={locale}>
              <BaseLayout className="app-container">{children}</BaseLayout>
              <div id="recaptcha-container"></div>
            </NextIntlClientProvider>
          </Provider>
        </RootStyleRegistry>
      </body>
      <Script src="https://www.googletagmanager.com/gtag/js?id=G-SCVT4EVZVB" />
      <Script id="google-analytics">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
 
          gtag('config', 'G-SCVT4EVZVB');
        `}
      </Script>
    </html>
  );
}
