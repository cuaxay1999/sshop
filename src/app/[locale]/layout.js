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
  title: "SShop - Phần mềm quản lý bán hàng và kho hàng đa nền tảng - Chuyên nghiệp, hiệu quả, dễ dàng sử dụng",
  description:
    "SShop - Phần mềm quản lý bán hàng thông minh, giúp bạn dễ dàng quản lý sản phẩm, kho hàng, kiểm soát thu chi, báo cáo chính xác và hiệu quả. Tối ưu hóa doanh nghiệp và cửa hàng của bạn ngay hôm nay với SShop",
  keywords: ["SSHOP", "cửa hàng", "smart shop", "ứng dụng quản lý", "hiệu quả", "thông minh"],
};

export default async function LocaleLayout({ children, params }) {
  const locale = useLocale();

  let messages;
  try {
    messages = (await import(`../../messages/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }

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
            <NextIntlClientProvider locale={locale} messages={messages}>
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
