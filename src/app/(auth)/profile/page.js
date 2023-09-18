"use client";

import React, { useCallback, useEffect, useState } from "react";
import {
  Button,
  Form,
  Input,
  message,
  Typography,
  Select,
  DatePicker,
} from "antd";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import AppLogo from "@/components/appLogo";
import UploadAvatar from "@/components/uploadAvatar";
import { chain_banner } from "@/assets/images";
import {
  actionSetProfile,
  actionUpdateProfile,
  actionUploadAvatar,
} from "./actions";
import { get, isEmpty } from "lodash";
import { actionGetRegion } from "../system/systemAction";
import moment from "moment";
import { trimObject, getRouterByName } from "@/utils/helpers";
import Image from "next/image";

const { Option } = Select;

import "./css/index.scss";

const ADDRESS_TYPE = {
  NATIONAL: 0,
  PROVINCE: 1,
  DISTRICT: 2,
  WARD: 3,
};
const Profile = () => {
  // const navigate = useNavigate();
  const { push } = useRouter();
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const userInfo = useSelector((state) => state.profile.userInfo);
  const [provinceList, setProvinceList] = useState([]);
  const [districtList, setDistrictList] = useState([]);
  const [wardList, setWardList] = useState([]);
  const texts = useSelector((state) => state.system.texts);

  useEffect(() => {
    if (!isEmpty(userInfo)) {
      form.setFieldsValue({
        ...userInfo,
        provinceId: userInfo.provinceId || null,
        districtId: userInfo.districtId || null,
        wardId: userInfo.wardId || null,
        birthday: userInfo.birthday ? moment(userInfo.birthday) : null,
      });
    }
  }, [userInfo]);

  useEffect(() => {
    fetchRegion(0);
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

  const onSelectAddress = (value, type) => {
    fetchRegion(value, type);
  };

  const handleSubmit = async (values) => {
    try {
      let rqBody = { ...values };
      if (values.birthday) {
        rqBody.birthday = moment(values.birthday).toISOString();
      }
      if (values.provinceId) {
        const findItem = provinceList.find(
          (it) => it.dictItemId === values.provinceId
        );
        rqBody.provinceName = findItem?.itemName || "";
      }
      if (values.districtId) {
        const findItem = districtList.find(
          (it) => it.dictItemId === values.districtId
        );
        rqBody.districtName = findItem?.itemName || "";
      }
      if (values.wardId) {
        const findItem = wardList.find((it) => it.dictItemId === values.wardId);
        rqBody.wardName = findItem?.itemName || "";
      }
      delete rqBody.phone;

      const { data } = await actionUpdateProfile(
        userInfo?.customerId,
        trimObject(rqBody)
      );
      const code = get(data, "status.code");
      if (code == 200) {
        dispatch(actionSetProfile(data?.data));
        push(getRouterByName("CHAIN"?.path));
      } else {
        const resMsg = get(
          data,
          "status.message",
          texts?.ERROR_AUTHEN_GENERAL_ERROR
        );
        message.error(resMsg);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onCropImage = useCallback(
    async (imgData, fileName) => {
      try {
        await actionUploadAvatar(userInfo.customerId, {
          imageBase64: imgData,
          imageName: fileName,
        });
      } catch (error) {}
    },
    [userInfo]
  );

  return (
    <div className="auth-page profile-page">
      <div className="auth-page-content profile-content">
        <div className="left-content">
          <div className="header-section">
            <div className="title-section">
              <label>{texts?.LABEL_REGISTER}</label>
              <AppLogo size="small" />
            </div>
            <div className="sub-title">{texts?.SSPA_PLATFORM}</div>
          </div>

          <div className="banner-content">
            {/* <div
              style={{ backgroundImage: "url(" + chain_banner + ")" }}
              className="img-banner"
            ></div> */}
            <Image
              className="img-banner"
              src={chain_banner}
              alt="imgBanner"
              style={{ objectFit: "contain" }}
            />
          </div>
        </div>
        <div className="right-content">
          <div className="title-section">{texts?.LABEL_REGISTER}</div>
          <Form
            form={form}
            name="form"
            onFinish={handleSubmit}
            className="form-content"
            layout="vertical"
            size="large"
            initialValues={{ phone: userInfo?.phone }}
          >
            <Form.Item
              name="name"
              label={texts?.LABEL_FULL_NAME}
              rules={[
                {
                  required: true,
                  message: texts?.RSPASS_EMPTY_NAME,
                },
              ]}
            >
              <Input placeholder={texts?.LABEL_FULL_NAME} />
            </Form.Item>

            <Form.Item
              label={texts?.LABEL_ADDRESS}
              name="provinceId"
              className="mb-12"
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

            <Form.Item name="districtId" className="mb-12">
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

            <Form.Item name="wardId" className="mb-12">
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

            <Form.Item name="address">
              <Input placeholder={texts?.ENTER_DETAIL_ADDRESS} />
            </Form.Item>

            <Form.Item name="birthday" label={texts?.LABEL_DOB}>
              <DatePicker
                style={{ width: "100%" }}
                showToday={false}
                placeholder={texts?.LABEL_DOB_PICK}
                allowClear={false}
              />
            </Form.Item>

            <Form.Item
              name="email"
              label="Email"
              rules={[
                {
                  type: "email",
                  message: texts?.PROFILE_VALIDATE_EMAIL,
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item name="phone" label={texts?.LABEL_PHONE_NUMBER}>
              <Input disabled />
            </Form.Item>

            <Form.Item label={texts?.PROFILE_AVATAR}>
              <UploadAvatar onCropSuccess={onCropImage} />
            </Form.Item>

            <Form.Item className="form-item-btn">
              <Button
                type="primary"
                htmlType="submit"
                className="btn-green-color form-btn-action"
              >
                {texts?.LABEL_REGISTER}
              </Button>
            </Form.Item>

            <div className="privacy">
              <span>{texts?.READED_AND_AGREE}</span>
              <Typography.Link
                href="https://sites.google.com/view/smartspa"
                target="_blank"
              >
                {texts?.SSPA_TERM_CONDITION}
              </Typography.Link>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
