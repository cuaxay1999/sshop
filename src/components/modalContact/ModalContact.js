import { useSelector } from "react-redux";
import {
  Modal,
  Button,
  Row,
  Col,
  Form,
  Input,
  message,
  notification,
} from "antd";
import "./style.scss";
import { ImgSection2, LogoSSHOP } from "../../assets/images";
import AppSupport from "@/components/appSupport/index";
import { phoneRegex } from "../../utils/helpers/common";
import { actionRegister } from "../formContact/actions";
import { APP_ID } from "../../utils/constants/config";
import Image from "next/image";

const ModalContact = (props) => {
  const texts = useSelector((state) => state.system.texts);
  const [form] = Form.useForm();

  const {
    visible = true,
    handleOk = () => {},
    handleCancel = () => {},
  } = props;

  const handleSubmit = async () => {
    console.log("handleSubmit");
    form.validateFields().then(async (values) => {
      let { name, phone } = values;
      let res = await actionRegister({ name, phone, source: APP_ID });
      console.log("res", res);
      form.setFieldsValue({
        name: "",
        phone: "",
      });
      handleOk();
      openNotification();
      // message.success('Gửi yêu cầu thành công! Chúng tôi sẽ liên hệ cho bạn trong thời gian sớm nhất')
    });
  };

  return (
    <Modal
      visible={visible}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={null}
      width={900}
    >
      <Row gutter={[24, 24]} style={{ padding: 24 }}>
        <Col
          span={12}
          lg={12}
          md={12}
          sm={0}
          xs={0}
          className="contact-form-left"
        >
          {/*<img src={LogoSSHOP} className="contact-form-logo"/>*/}
          {/*<div>Cảm ơn bạn đã đến với SClinic!</div>*/}
          {/*<div>Chúng tôi ở đây để:</div>*/}
          {/*<div>*/}
          {/*- Đồng hành cùng sự phát triển của doanh nghiệp.*/}
          {/*- Lắng nghe và phục vụ bạn.*/}
          {/*- Mang đến những tính năng hữu ích nhất, thuận tiện nhất cho bạn.*/}

          {/*</div>*/}
          <Image
            src={ImgSection2}
            className="contact-form-img"
            alt="ImgSection2"
          />
          <h3 className="text-green-color mt-24">Liên hệ hỗ trợ</h3>

          <AppSupport
            supportZalo={texts?.SUPPORT_ZALO}
            supportPhone={texts?.SUPPORT_PHONE}
            supportMessenger={texts?.SUPPORT_MESSENGER}
            supportFanpage={texts?.SUPPORT_FANPAGE}
          />
        </Col>
        <Col
          span={12}
          lg={12}
          md={12}
          sm={24}
          xs={24}
          className="contact-form-right"
        >
          <Form
            className="form-contact"
            // onFinish={handleSubmit}
            form={form}
          >
            <h1 className="text-green-color">Sử dụng SShop miễn phí</h1>
            <div className="contact-form-desc">
              Để lại thông tin, chúng tôi sẽ liên hệ để tư vấn giải pháp và
              hướng dẫn sử dụng online hoặc trực tiếp tại cơ sở của bạn
            </div>

            <Form.Item
              name="name"
              rules={[{ required: true, message: texts?.RSPASS_EMPTY_NAME }]}
            >
              <Input placeholder={`${texts?.LABEL_FULL_NAME} (*)`} />
            </Form.Item>

            <Form.Item
              name="phone"
              rules={[
                {
                  required: true,
                  message: "Số điện thoại không được để trống",
                },
                {
                  pattern: new RegExp(phoneRegex),
                  message: "Số điện thoại không đúng!",
                },
              ]}
              style={{ marginTop: 36 }}
            >
              <Input placeholder={`${texts?.LABEL_PHONE_NUMBER} (*)`} />
            </Form.Item>

            <Button
              type="primary"
              className="btn-register-section"
              onClick={handleSubmit}
              style={{ marginTop: 36 }}
            >
              Gửi yêu cầu
            </Button>
          </Form>
        </Col>
      </Row>
    </Modal>
  );
};

export default ModalContact;
