"use client";

import { useState, useEffect } from "react";
// import { useSearchParams, useParams, useNavigate } from "react-router-dom";
import moment from "moment";
import { ClockCircleOutlined } from "@ant-design/icons";
import { getDayff, getRouterByName } from "@/utils/helpers";
import { useSelector } from "react-redux";

import { actionGetPostsByIdAndLanguage, actionGetAllNews } from "./actions";

import { Row, Col, Divider, Spin, message, Button } from "antd";

import "./viewNewsDetail.scss";
import { getNewsIdFromUrl, navToNewsDetail } from "@/utils/helpers/common";
import { useRouter } from "next/navigation";

import { convertOembedToIframe } from "@/utils/helpers/common";

const NOW = new Date();

const News = ({ params }) => {
  const { slug, locale } = params;
  // const newsId = searchParams.get("newsId");
  // const locale = searchParams.get("locale");
  const [newsView, setNewsView] = useState();
  const [isFetching, setFetching] = useState(false);
  const texts = useSelector((state) => state.system.texts);
  const [newsList, setNewsList] = useState([]);
  const { push } = useRouter();

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
    let newData = [];

    data.forEach((it) => {
      // skip bài viết đang xem
      if (it.id != newsId) {
        newData.push(it);
      }
    });

    setNewsList(newData);
  };

  // lấy 10 bài viết cùng danh mục với bài viết xem
  const handleGetAllNews = async (params, newsId) => {
    setFetching(true);
    try {
      const { data } = await actionGetAllNews(params);
      const { status } = data;

      if (status.code == 200) {
        handleSetNewsList(data?.data.newsResponseList, newsId);
        setFetching(false);
      }
    } catch (error) {
      message.error(
        error?.data.status?.message || texts?.ERROR_CORE_GENERAL_ERROR
      );
    }
  };

  // lấy thông tin bài viết bởi id
  const handlePostsByIdAndLanguage = async (slug, languageCode) => {
    setFetching(true);
    try {
      let newsId = getNewsIdFromUrl(slug);
      const { status, data } = await actionGetPostsByIdAndLanguage(
        newsId,
        languageCode
      );

      if (status == 200) {
        data.data.content = convertOembedToIframe(data?.data?.content);
        setNewsView(data?.data);
        setFetching(false);

        // gọi API lấy danh sách bài viết cùng danh mục
        paramsGetAllNews.catId = data?.data.catId;
        handleGetAllNews(paramsGetAllNews, newsId);
      }
    } catch (error) {
      setFetching(true);

      message.error(
        error?.data.status?.message || texts?.ERROR_CORE_GENERAL_ERROR
      );
    }
  };

  // xem bài viết
  const handleViewNewsDetail = (newsId, newsTitle) => {
    // window.location.href = `${getRouterByName('VIEW_NEWS_DETAIL')?.path}?newsId=${newsId}&locale=${locale}`
    navToNewsDetail(newsTitle, newsId, locale, push);
  };

  useEffect(() => {
    if (slug && locale) {
      handlePostsByIdAndLanguage(slug, locale);
    }
  }, [slug, locale]);

  // useEffect(() => {
  //   if (newsView?.id) {
  //     document.querySelectorAll("oembed[url]").forEach((element) => {
  //       const anchor = document.createElement("a");
  //       anchor.setAttribute("href", element.getAttribute("url"));
  //       anchor.className = "embedly-card";
  //       element.appendChild(anchor);
  //     });

  //     // $('.card .provider')
  //   }
  // }, [newsView?.id]);

  return (
    <div className="view-news-detail">
      <Spin spinning={isFetching}>
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
                    <Col
                      span={24}
                      key={it.id}
                      onClick={() => handleViewNewsDetail(it.id, it?.title)}
                    >
                      <Row className="news-item">
                        <Col xxl={6} lg={8} sm={10} xs={24}>
                          <div
                            className="thumbnail"
                            style={{ backgroundImage: `url(${it.thumbnail})` }}
                            onClick={() =>
                              handleViewNewsDetail(it.id, it?.title)
                            }
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
                      </Row>
                    </Col>
                  ))}
              </Row>
            </Col>
          </Row>
        </div>
      </Spin>
    </div>
  );
};

export default News;
