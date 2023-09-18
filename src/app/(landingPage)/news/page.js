"use client";

import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
import $ from "jquery";
import moment from "moment";
import { getDayff } from "../../../utils/helpers";
import { ClockCircleOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";

import { message, Row, Col, Spin, Button, Menu, Pagination } from "antd";

import {
  actionGetTop1News,
  actionGetAllCategory,
  actionGetAllNews,
} from "./actions";

import "./newsPage.scss";
import { navToNewsDetail } from "../../../utils/helpers/common";

// tham số truyền lên để lấy danh sách bài viết
let paramsGetAllNews = {
  keyword: "",
  page: 0,
  pageSize: 10,
  active: true,
};

const NOW = new Date();

const NewsPage = () => {
  const locale = useSelector((state) => state.system.locale);
  const texts = useSelector((state) => state.system.texts);
  // const navigate = useNavigate();
  const { push } = useRouter();

  const [newTop1, setNewTop1] = useState([]);
  const [itemsCategory, setItemsCategory] = useState([]);
  const [newsList, setNewsList] = useState([]);
  const [currentMenuCategory, setCurrentMenuCategory] = useState();
  const [totalNews, setTotalNews] = useState();
  const [isFetching, setFetching] = useState(false);
  const [defaultPageSize, setDefaultPageSize] = useState(4);

  const pageSizeOptions = [4, 10, 20, 50, 100];

  // lấy các bài viết top 1
  const handleGetTop1News = async (locale) => {
    try {
      const { data } = await actionGetTop1News(locale);
      const { status } = data;

      if (status.code == 200) {
        setNewTop1(data?.data);
      }
    } catch (error) {
      const { status } = error?.data;
      message.error(status?.message);
    }
  };

  // lấy tất cả bài viết
  const handleGetAllNews = async (params) => {
    params.languageCode = locale;
    setFetching(true);
    try {
      const { data } = await actionGetAllNews(params);
      const { status } = data;

      if (status.code == 200) {
        setNewsList(data?.data.newsResponseList);
        setTotalNews(data?.data.totalNews);
        setFetching(false);
      }
    } catch (error) {
      const { status } = error?.data;
      message.error(status?.message);
    }
  };

  // xử lý về dạng items để hiển thị menu
  const handleSetListCategory = (data = []) => {
    let items = [];

    data.forEach((it) => {
      items.push({
        label: it.name,
        key: it.id,
      });
    });

    setItemsCategory(items);
  };

  // lấy danh sách danh mục
  const handleGetAllCategory = async (locale) => {
    try {
      const { data } = await actionGetAllCategory(locale);
      const { status } = data;

      if (status.code == 200) {
        handleSetListCategory(data?.data);

        // gọi API lấy danh sách bài viết
        if (data?.data.length > 0) {
          setCurrentMenuCategory(data?.data[0].id);
          paramsGetAllNews.catId = data?.data[0].id;
        } else {
          paramsGetAllNews.catId = "";
        }

        handleGetAllNews(paramsGetAllNews);
      }
    } catch (error) {
      const { status } = error?.data;
      message.error(status?.message || texts?.ERROR_CORE_GENERAL_ERROR);
    }
  };

  useEffect(() => {
    if (locale) {
      // lấy ra kích thước của trang
      const pageWidth = $(".news-page").width();

      // nếu trên mobile và table thì mặc định lấy ra 10 bài viết
      if (pageWidth < 1023) {
        paramsGetAllNews.pageSize = 10;
        setDefaultPageSize(10);
      }
      paramsGetAllNews.page = 0;

      handleGetTop1News(locale);
      handleGetAllCategory(locale);
    }
  }, [locale]);

  // lấy bài viết theo danh mục
  const onChangeCategory = (e) => {
    setCurrentMenuCategory(e.key);

    // gọi API lấy danh sách bài viết
    paramsGetAllNews.page = 0;
    paramsGetAllNews.catId = e.key;
    handleGetAllNews(paramsGetAllNews);
  };

  // xem bài viết
  const handleViewNewsDetail = (newsId, newsTitle) => {
    // const query = { newsId, locale }
    // window.navigatePage('VIEW_NEWS_DETAIL', null, query);
    //   console.log('123');
    navToNewsDetail(newsTitle, newsId, locale, push);
  };

  // phân trang cho danh sách bài viết
  const onChangePage = (pageNum, pageSize) => {
    paramsGetAllNews.page = pageNum - 1;
    paramsGetAllNews.pageSize = pageSize;

    handleGetAllNews(paramsGetAllNews);
  };

  return (
    <div className="news-page">
      <div className="page-content">
        <Row gutter={[0, 32]}>
          <Col span={24} className="section section-news-top-1">
            {newTop1.length > 0 && (
              <Row gutter={[32, 16]}>
                {newTop1.map((it) => (
                  <Col key={it.id} lg={8} md={24} xs={24}>
                    <Row key={it.id} className="news-item">
                      <Col lg={24} md={10} xs={24}>
                        <div
                          className="thumbnail"
                          style={{ backgroundImage: `url(${it.thumbnail})` }}
                          onClick={() => handleViewNewsDetail(it.id, it?.title)}
                        />
                      </Col>

                      <Col lg={24} md={14} xs={24} className="news-item-right">
                        <h3
                          className="news-title"
                          onClick={() => handleViewNewsDetail(it.id, it?.title)}
                        >
                          {it.title}
                        </h3>

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
            )}
          </Col>

          <Col span={24} className="section section-category">
            {itemsCategory.length > 0 && (
              <Menu
                className="menu-category"
                onClick={onChangeCategory}
                mode="horizontal"
                items={itemsCategory}
                selectedKeys={[currentMenuCategory]}
              />
            )}
          </Col>

          <Col span={24} className="section section-list-news">
            <Spin spinning={isFetching}>
              {newsList.length > 0 && (
                <div>
                  <Row gutter={[16, 16]}>
                    {newsList.map((it) => (
                      <Col lg={12} md={24} xs={24} key={it.id}>
                        <Row className="news-item">
                          <Col lg={8} md={10} xs={24}>
                            <div
                              className="thumbnail"
                              style={{
                                backgroundImage: `url(${it.thumbnail})`,
                              }}
                              onClick={() =>
                                handleViewNewsDetail(it.id, it?.title)
                              }
                            />
                          </Col>

                          <Col
                            lg={16}
                            md={14}
                            xs={24}
                            className="news-item-right"
                          >
                            <h3
                              className="news-title"
                              onClick={() =>
                                handleViewNewsDetail(it.id, it?.title)
                              }
                            >
                              {it.title}
                            </h3>

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

                  {totalNews > defaultPageSize && (
                    <Pagination
                      total={totalNews}
                      showSizeChanger
                      pageSize={defaultPageSize}
                      pageSizeOptions={pageSizeOptions}
                      onChange={onChangePage}
                    />
                  )}
                </div>
              )}
            </Spin>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default NewsPage;
