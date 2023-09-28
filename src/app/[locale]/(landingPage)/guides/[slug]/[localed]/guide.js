// "use client";

import moment from "moment";
import { ClockCircleOutlined } from "@ant-design/icons";
import { getDayff } from "@/utils/helpers";

import { actionGetPostsByIdAndLanguage, actionGetAllNews } from "./actions";

import { Row, Col, Divider, Spin, message, Button } from "antd";

import "./viewNewsDetail.scss";
import {
  getNewsIdFromUrl,
  navToNewsDetail,
  genNewsSlug,
} from "@/utils/helpers/common";
// import { useRouter } from "next/navigation";

import { convertOembedToIframe } from "@/utils/helpers/common";
import Link from "next/link";

const NOW = new Date();

const Guide = async ({ params }) => {
  const newsList = [];
  let newsView = null;

  const { slug, locale } = params;

  // lấy ra 5 bài viết cùng danh mục với bài viết vừa xem
  const paramsGetAllNews = {
    keyword: "",
    page: 0,
    pageSize: 5,
    active: true,
    languageCode: locale,
  };

  // set danh sách top 1 bài viết cùng danh mục
  const handleSetNewsList = (data, newsId) => {
    data.forEach((it) => {
      // skip bài viết đang xem
      if (it.id != newsId) {
        newsList.push(it);
      }
    });
  };

  // lấy 10 bài viết cùng danh mục với bài viết xem
  const handleGetAllNews = async (params, newsId) => {
    const { data } = await actionGetAllNews(params);
    const { status } = data;

    if (status.code == 200) {
      handleSetNewsList(data?.data.newsResponseList, newsId);
    }
  };

  // lấy thông tin bài viết bởi id
  const handlePostsByIdAndLanguage = async (slug, languageCode) => {
    try {
      let newsId = getNewsIdFromUrl(slug);
      const { status, data } = await actionGetPostsByIdAndLanguage(
        newsId,
        languageCode
      );
      if (status == 200) {
        data.data.content = convertOembedToIframe(data?.data?.content);
        newsView = data?.data;

        // gọi API lấy danh sách bài viết cùng danh mục
        paramsGetAllNews.catId = data?.data.catId;
        await handleGetAllNews(paramsGetAllNews, newsId);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const generateLinkHref = (newsId, newsTitle = "") => {
    return `/guides/${genNewsSlug(newsTitle, newsId)}/${locale}`;
  };

  if (slug && locale) {
    await handlePostsByIdAndLanguage(slug, locale);
  }

  return (
    <div className="view-news-detail">
      <div className="page-content">
        <Row gutter={[32, 32]}>
          {newsView && (
            <Col lg={16} sm={24} className="page-content-left">
              <div>
                <h1 className="new-title">{newsView.title}</h1>
                <div className="box-render-time">
                  <ClockCircleOutlined />
                  {` ${moment(newsView.timeCreate).format(
                    "HH:mm - DD/MM/YYYY"
                  )}`}
                </div>
                <Divider />
              </div>

              <div
                className="ck-content"
                dangerouslySetInnerHTML={{ __html: newsView.content }}
              />

              {newsView?.tags && (
                <Row className="list-key-word" gutter={[8, 8]}>
                  <Col>
                    <span className="txt-key-word">Từ khóa:</span>
                  </Col>

                  <Col>
                    <Row gutter={[8, 8]}>
                      {newsView?.tags.split(",").map((it, index) => (
                        <Col key={index}>
                          <Button size="small" type="primary">
                            {it}
                          </Button>
                        </Col>
                      ))}
                    </Row>
                  </Col>
                </Row>
              )}
            </Col>
          )}

          <Col lg={8} sm={24} className="page-content-right">
            <Row gutter={[0, 16]}>
              {newsList.length > 0 &&
                newsList.map((it) => (
                  <Col span={24} key={it.id}>
                    <Row className="news-item">
                      <Link
                        href={generateLinkHref(it.id, it.title)}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          width: "100%",
                        }}
                      >
                        <Col xxl={6} lg={8} sm={10} xs={24}>
                          <div
                            className="thumbnail"
                            style={{ backgroundImage: `url(${it.thumbnail})` }}
                          />
                        </Col>

                        <Col
                          xxl={18}
                          lg={16}
                          sm={14}
                          xs={24}
                          className="news-item-right"
                        >
                          <h3 className="news-title">{it.title}</h3>

                          <div className="box-render-time">
                            <div>{getDayff(it.timeCreate)}</div>

                            <div>
                              <ClockCircleOutlined />
                              {` ${moment(it.timeCreate).format(
                                "HH:mm - DD/MM/YYYY"
                              )}`}
                            </div>
                          </div>
                        </Col>
                      </Link>
                    </Row>
                  </Col>
                ))}
            </Row>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Guide;
