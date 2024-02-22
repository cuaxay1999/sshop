"use client";

import React, { useCallback, useEffect, useState } from "react";

import {
  Button,
  Form,
  Input,
  Typography,
  Select,
  Result,
  message,
  Checkbox,
} from "antd";
import { get } from "lodash";

import { ArrowRightOutlined } from "@ant-design/icons";
import { useSearchParams } from "next/navigation";
import { useSelector } from "react-redux";
import AppLogo from "@/components/appLogo";
import GoogleMap from "@/components/googleMap";
import { chain_banner } from "@/assets/images";
import { actionGetRegion } from "../system/systemAction";
import { isEmpty } from "@/utils/helpers";
import cookie from "js-cookie";
import Image from "next/image";

import {
  actionAddInventory,
  actionAddShop,
  actionAddChain,
  getShopCategories,
  createDataSample,
} from "./actions";

import {
  CURRENCIES,
  CONFIG_SERVER,
  SSHOP_SPA_TOKEN,
  PHONE_PATTERN,
  PHONE_EMAIL_PATTERN,
} from "@/utils/constants/config";

import "./css/index.scss";

const { Option } = Select;

const ADDRESS_TYPE = {
  NATIONAL: 0,
  PROVINCE: 1,
  DISTRICT: 2,
  WARD: 3,
};

const Shop = () => {
  const [form] = Form.useForm();
  const nameValue = Form.useWatch("shopName", form);
  const search = useSearchParams();
  const userInfo = useSelector((state) => state.profile.userInfo);
  const texts = useSelector((state) => state.system.texts);
  const locale = useSelector((state) => state.system.locale);
  const urlParams = new URLSearchParams(search);
  const chainId = urlParams.get("id");
  const subDomain = urlParams.get("sub");

  const [newSubDomain, setNewSubDomain] = useState(subDomain);
  const [shopCategories, setShopCategories] = useState([]);
  const [provinceList, setProvinceList] = useState([]);
  const [districtList, setDistrictList] = useState([]);
  const [wardList, setWardList] = useState([]);
  const [visibleModal, setVisibleModal] = useState(false);
  const [latLngInfo, setlatLngInfo] = useState({});
  const [callingAPI, setCallingAPI] = useState(false);
  const [shopPhone, setShopPhone] = useState(userInfo.phone || "");
  const [numberAccounts] = useState([
    { text: texts?.COMPANY_SIZE_SMALL, number: "1-10" },
    { text: texts?.COMPANY_SIZE_BIG, number: "11+" },
  ]);

  const [checked, setChecked] = useState(false);

  useEffect(() => {
    fetchRegion(0);
    fetchShopCategories();
    form.setFieldsValue({
      shopPhone: shopPhone,
    });
  }, []);

  const fetchRegion = async (id, type = ADDRESS_TYPE.NATIONAL) => {
    try {
      const { data } = await actionGetRegion({ parent_id: id });
      if (type === ADDRESS_TYPE.NATIONAL) {
        setProvinceList(data?.data || []);
      } else if (type === ADDRESS_TYPE.PROVINCE) {
        setDistrictList(data?.data || []);
        form.setFieldValue("districtId", null);
        form.setFieldValue("wardId", null);
        setWardList([]);
      } else if (type === ADDRESS_TYPE.DISTRICT) {
        form.setFieldValue("wardId", null);
        setWardList(data?.data || []);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchShopCategories = async () => {
    try {
      const { data } = await getShopCategories();
      setShopCategories(data?.data || []);
    } catch (error) {
      setShopCategories([]);
      console.log(error);
    }
  };

  const onSelectAddress = (value, type) => {
    fetchRegion(value, type);
  };

  const handleSubmit = async (values) => {
    if (!isEmpty(values)) {
      setCallingAPI(true);
      if (chainId) {
        await handleCreateShop(values, chainId, newSubDomain);
      } else {
        await handleCreateChain(values);
      }
      setCallingAPI(false);
    }
  };

  const handleCreateShop = async (values, chainId, uniqueSubdomain) => {
    const catId = values.catId;
    try {
      let categories = [
        {
          id: 0,
          name: "shop",
        },
      ];
      let rqBody = {
        shopName: values.shopName,
        shopPhone: values.shopPhone,
        aproved: true,
        provinceId: values.provinceId || null,
        districtId: values.districtId || null,
        wardId: values.wardId || null,
        address: values.address || "",
        provinceName:
          provinceList.find((e) => {
            return e.dictItemId === values.provinceId;
          })?.itemName || "",
        districtName:
          districtList.find((e) => {
            return e.dictItemId === values.districtId;
          })?.itemName || "",
        wardName:
          wardList.find((e) => {
            return e.dictItemId === values.wardId;
          })?.itemName || "",
        categories,
        description: "",
        shippingMethod: [],
        termsOfService: "",
        chainID: parseInt(chainId),
        shopLat: 0,
        shopLong: 0,
      };

      if (!isEmpty(latLngInfo)) {
        rqBody.shopLat = latLngInfo?.lat;
        rqBody.shopLong = latLngInfo?.lng;
      }

      const { data, status } = await actionAddShop(
        userInfo?.customerId,
        rqBody
      );

      if (status == 200) {
        let inventoryData = {
          name: rqBody.shopName,
          phone: rqBody.shopPhone,
          inventoryLat: latLngInfo.lat || 0,
          inventoryLong: latLngInfo.lng || 0,
          isDefault: true,
          address: rqBody.address,
          provinceId: rqBody.provinceId,
          provinceName: rqBody.provinceName,
          districtId: rqBody.districtId,
          districtName: rqBody.districtName,
          wardId: rqBody.wardId,
          wardName: rqBody.wardName,
        };

        await actionAddInventory(data?.data?.shopId, inventoryData);
        /*
                await handleDataSample(data?.data?.shopId, chainId, catId);
*/

        window.location.replace(
          `http://${uniqueSubdomain}.${
            CONFIG_SERVER.DOMAIN
          }?user-token=${cookie.get(SSHOP_SPA_TOKEN)}&locale=${locale}`
        );
      } else {
        message.error(
          data?.status?.message || texts?.ERROR_AUTHEN_GENERAL_ERROR
        );
      }
    } catch (error) {
      message.error(
        error?.data?.status?.message || texts?.ERROR_AUTHEN_GENERAL_ERROR
      );
    }
  };

  const handleCreateChain = async (values) => {
    try {
      const { data } = await actionAddChain({
        name: values.shopName,
        subDomain: newSubDomain,
        configCurrency: values.configCurrency,
      });
      const code = get(data, "status.code");
      if (code == 200) {
        const newChainId = data?.data?.chainId;
        const uniqueSubdomain = data?.data?.subDomain
        setNewSubDomain(data?.data?.subDomain);
        await handleCreateShop(values, newChainId, uniqueSubdomain);
      } else {
        const resMsg = get(
          data,
          "status.message",
          texts?.ERROR_AUTHEN_GENERAL_ERROR
        );
        message.error(resMsg);
      }
    } catch (error) {
      const resMsg = get(
        error,
        "data.status.message",
        texts?.ERROR_AUTHEN_GENERAL_ERROR
      );
      message.error(resMsg);
    }
  };

  const handleDataSample = async (shopId, chainId, catId) => {
    try {
      const { data } = await createDataSample({
        shopId,
        chainId,
        shopCat: catId,
      });
      const code = get(data, "status.code");
      if (code == 200) {
      } else {
        const resMsg = get(
          data,
          "status.message",
          texts?.ERROR_AUTHEN_GENERAL_ERROR
        );
        message.error(resMsg);
      }
    } catch (error) {
      const resMsg = get(
        error,
        "data.status.message",
        texts?.ERROR_AUTHEN_GENERAL_ERROR
      );
      message.error(resMsg);
    }
  };

  return (
    <div className="auth-page shop-page">
      <div className="auth-page-content shop-content">
        <div className="left-content">
          <div className="header-section">
            <div className="title-section">
              <label>{texts?.OPEN_NEW_BRANCH}</label>
              <AppLogo size="small" />
            </div>
            <div className="sub-title">{texts?.LABEL_SSHOP_DESCRIPTION}</div>
          </div>

          <div className="banner-content">
            <Image
              src={chain_banner}
              alt="chain banner"
              style={{ objectFit: "contain" }}
            />
          </div>
        </div>

        <div className="right-content">
          <div className="title-section">{texts?.OPEN_NEW_BRANCH}</div>
          <Form
            form={form}
            name="form"
            onFinish={handleSubmit}
            className="form-content"
            layout="vertical"
            size="large"
            disabled={callingAPI}
          >
            <Form.Item
              name="shopName"
              label={<div>{texts?.ADD_SPA_NAME}</div>}
              rules={[
                {
                  required: true,
                  message: texts?.ADD_SPA_ENTER_NAME,
                },
                {
                  validator(_, value) {
                    const subdomain = `${(value || "")
                      .toLocaleLowerCase()
                      .replace(/[^a-zA-Z]/g, "")}`;
                    if (!subdomain && value) {
                      return Promise.reject(new Error(texts?.INVALID_VALUE));
                    }
                    if (!chainId) {
                      setNewSubDomain(subdomain);
                    }
                    return Promise.resolve();
                  },
                },
              ]}
              hasFeedback={!!nameValue}
            >
              <Input
                placeholder={texts?.ADD_SPA_ENTER_NAME}
                showCount
                maxLength={35}
              />
            </Form.Item>

            <Form.Item
              name="shopPhone"
              label={texts?.LABEL_PHONE_OR_EMAIL}
              rules={[
                {
                  required: true,
                  message: texts?.LABEL_PHONE_CANNOT_BLANK,
                },
                {
                  pattern: PHONE_EMAIL_PATTERN,
                  message: texts?.LOGIN_GUID_WARN_PHONE_MAIL_INVALID,
                },
              ]}
            >
              <Input
                placeholder={texts?.LABEL_ENTER_PHONE}
                onChange={(e) => setShopPhone(e.target.value)}
              />
            </Form.Item>
            {/*

            <Form.Item name="catId"
              label={texts?.BUSINESS_MODEL}
              rules={[
                {
                  required: true,
                  message: texts?.PLEASE_CHOOSE_BUSINESS_MODEL,
                },
              ]}
            >
              <Select
                placeholder={texts?.CHOOSE_BUSINESS_MODEL}
              >
                {shopCategories.map((item) => (
                  <Option key={item?.catId} value={item?.catId}>
                    <img className='shop-cat-img' src={item?.imageUrl}></img>
                    {texts[item.label]}
                  </Option>
                ))}
              </Select>
            </Form.Item>
*/}

            <Form.Item
              name="configCurrency"
              label={texts?.LABEL_MONEY_UNIT}
              rules={[
                {
                  required: true,
                  message: texts?.LABEL_MONEY_UNIT,
                },
              ]}
            >
              <Select placeholder={texts?.LABEL_MONEY_UNIT}>
                {CURRENCIES.map((item) => (
                  <Option key={item?.label} value={item?.label}>
                    {item.label}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            {/*            <Form.Item name="numAccountRegister"
              label={texts?.LABEL_STAFF_QUANTITY}
              rules={[
                {
                  required: true,
                  message: texts?.ADD_SPA_SELECT_NUMBER_EMP,
                },
              ]}
            >
              <Select
                placeholder={texts?.SELECT_NUM_STAFF}
              >
                {numberAccounts.map((item) => (
                  <Option key={item?.number} value={item?.number}>
                    {item?.text}
                  </Option>
                ))}
              </Select>
            </Form.Item>*/}

            <Form.Item
              name="provinceId"
              label={texts?.LABEL_ADDRESS}
              className="mb-12"
              rules={[
                {
                  required: false,
                  message: texts?.ADD_SPA_SELECT_CITY,
                },
              ]}
            >
              <Select
                placeholder={texts?.LABEL_CITY}
                onSelect={(v) => onSelectAddress(v, ADDRESS_TYPE.PROVINCE)}
                showSearch
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.children.toLowerCase().includes(input.toLowerCase())
                }
              >
                {provinceList.map((item) => (
                  <Option key={item?.dictItemId} value={item?.dictItemId}>
                    {item?.itemName}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              name="districtId"
              className="mb-12"
              rules={[
                {
                  required: false,
                  message: texts?.ADD_SPA_SELECT_DISTRICT,
                },
              ]}
            >
              <Select
                placeholder={texts?.LABEL_DISTRICT}
                onSelect={(v) => onSelectAddress(v, ADDRESS_TYPE.DISTRICT)}
                showSearch
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.children.toLowerCase().includes(input.toLowerCase())
                }
              >
                {districtList.map((item) => (
                  <Option key={item?.dictItemId} value={item?.dictItemId}>
                    {item?.itemName}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              name="wardId"
              className="mb-12"
              rules={[
                {
                  required: false,
                  message: texts?.ADD_SPA_SELECT_WARD,
                },
              ]}
            >
              <Select
                placeholder={texts?.LABEL_WARD}
                showSearch
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.children.toLowerCase().includes(input.toLowerCase())
                }
              >
                {wardList.map((item) => (
                  <Option key={item?.dictItemId} value={item?.dictItemId}>
                    {item?.itemName}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              name="address"
              rules={[
                {
                  required: false,
                  message: texts?.ENTER_DETAIL_ADDRESS,
                },
              ]}
            >
              <Input placeholder={texts?.ENTER_DETAIL_ADDRESS} />
            </Form.Item>

            <Form.Item label={texts?.ADD_SHOP_MAP}>
              <Input.Group compact>
                <Input
                  readOnly
                  value={`${latLngInfo?.lat || 0}, ${latLngInfo?.lng || 0}`}
                  addonAfter={
                    <ArrowRightOutlined onClick={() => setVisibleModal(true)} />
                  }
                />
              </Input.Group>
            </Form.Item>

            <Form.Item
              name="allowTerm"
              valuePropName="checked"
              rules={[
                {
                  required: true,
                  message: texts?.LABEL_CONDITION_REQUIRED_MESSAGE,
                },
              ]}
            >
              <Checkbox>
                <span style={{ marginRight: "5px" }}>
                  {texts?.READED_AND_AGREE}
                </span>
                <Typography.Link
                  href="https://sites.google.com/view/opensmartshop/trang-ch%E1%BB%A7"
                  target="_blank"
                >
                  {texts?.SSHOP_TERM_CONDITION?.toLowerCase()}
                </Typography.Link>
              </Checkbox>
            </Form.Item>

            <Form.Item className="form-item-btn">
              <Button
                loading={callingAPI}
                type="primary"
                htmlType="submit"
                className="btn-green-color form-btn-action"
              >
                {texts?.OPEN_NEW_BRANCH}
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>

      {visibleModal && (
        <GoogleMap
          isOpen={visibleModal}
          onCancel={() => setVisibleModal(false)}
          onOk={(data) => {
            setlatLngInfo(data);
            setVisibleModal(false);
          }}
        />
      )}
    </div>
  );
};

export default Shop;
