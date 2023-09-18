"use client";

import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import { getDayff } from "../../../utils/helpers";
import { ClockCircleOutlined } from "@ant-design/icons";

import { message, Row, Col, Spin, Button, Menu, Pagination, Tag } from "antd";

import {
  actionGetAllCategory,
  actionGetAllNews,
} from "../../../utils/service/newsService";

import "./newsPage.scss";
import { navToGuideDetail } from "../../../utils/helpers/common";
import { APP_IDS } from "../../../utils/constants/config";
import { useRouter } from "next/navigation";

const Guide = () => {
  const locale = useSelector((state) => state.system.locale);
  const texts = useSelector((state) => state.system.texts);
  const { push } = useRouter();

  const [itemsCategory, setItemsCategory] = useState([]);
  const [newsList, setNewsList] = useState([]);
  const [dataInfo, setDataInfo] = useState();
  const [isFetching, setFetching] = useState(false);
  const [selectedCat, setSelectedCat] = useState();

  const [newsParams, setNewsParams] = useState({
    keyword: "",
    page: 0,
    pageSize: 10,
    languageCode: "vi",
    appId: APP_IDS.SSHOP_GUIDE,
  });

  const [catParams, setCatParams] = useState({
    keyword: "",
    page: 0,
    pageSize: 10,
    active: true,
    languageCode: "vi",
    appId: APP_IDS.SSHOP_GUIDE,
  });

  useEffect(() => {
    if (locale) {
      setCatParams({ ...catParams, languageCode: locale });
      setNewsParams({ ...newsParams, languageCode: locale });
    }
  }, [locale]);

  useEffect(() => {
    handleGetAllCategory();
  }, [catParams]);

  useEffect(() => {
    handleGetAllNews();
  }, [newsParams]);

  // lấy tất cả bài viết
  const handleGetAllNews = async (params) => {
    setFetching(true);
    try {
      let res = await actionGetAllNews({ ...newsParams, ...params });

      if (res?.data?.status?.code == 200) {
        setNewsList(res?.data?.data.newsResponseList);
        setDataInfo(res?.data?.data);
        setFetching(false);
      }
    } catch (error) {
      const { status } = error?.data;
      message.error(status?.message);
    }
  };

  // lấy danh sách danh mục
  const handleGetAllCategory = async (locale) => {
    try {
      let res = await actionGetAllCategory(locale, catParams);

      if (res?.data?.status.code == 200) {
        let data = res?.data?.data || [];
        data = data.map((e) => ({ ...e, label: e.name, key: e.id }));
        setItemsCategory(data);

        // gọi API lấy danh sách bài viết
        if (data.length > 0 && !selectedCat) {
          onSelectTag(data[0]);
        }
      }
    } catch (error) {
      const { status } = error?.data;
      message.error(status?.message || texts?.ERROR_CORE_GENERAL_ERROR);
    }
  };

  // phân trang cho danh sách bài viết
  const onChangePage = (pageNum, pageSize) => {
    setNewsParams({
      ...newsParams,
      page: pageNum - 1,
    });
  };

  // xem bài viết
  const handleViewNewsDetail = (newsId, newsTitle) => {
    navToGuideDetail(newsTitle, newsId, locale, push);
  };

  const onSelectTag = (tag) => {
    setSelectedCat(tag);
    setCatParams({
      ...catParams,
      catId: tag?.id,
    });
    setNewsParams({
      ...newsParams,
      catId: tag?.id,
    });
  };

  return (
    <div className="news-page">
      <div className="page-content">
        <div className="w-full flexbox-center">
          <div className="package-title-page">HƯỚNG DẪN SỬ DỤNG</div>
        </div>

        <div style={{ marginTop: 12 }}>
          {itemsCategory.map((tag) => (
            <Tag
              key={tag?.id}
              color={
                selectedCat && tag?.id === selectedCat?.id
                  ? "var(--app-primary-color)"
                  : null
              }
              style={{ cursor: "pointer", marginTop: 12 }}
              onClick={() => onSelectTag(tag)}
            >
              {tag?.label}
            </Tag>
          ))}
        </div>

        <div className="section section-list-news" style={{ marginTop: 24 }}>
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
                            style={{ backgroundImage: `url(${it.thumbnail})` }}
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

                {dataInfo.totalPage > 1 && (
                  <Pagination
                    size="small"
                    current={newsParams.page + 1}
                    pageSize={newsParams.pageSize}
                    total={dataInfo.totalNews || 0}
                    showTotal={(total) =>
                      `${texts?.TOTAL} ${total} ${texts?.ELEMENT}`
                    }
                    onChange={onChangePage}
                  />
                )}
              </div>
            )}
          </Spin>
        </div>
      </div>
    </div>
  );
};

export default Guide;
