"use client";

import { LogoSSHOP } from "../../../../assets/images";
import { Button } from "antd";
import { CheckIcon2, CloseIcon } from "../../../../assets/icons";
import { formatCurrency } from "../../../../utils/helpers";

const Section6 = (props) => {
  const { gotoLoginPage } = props;

  const featureList = [
    {
      id: 1,
      name: "5 tài khoản chủ shop",
      basicPackage: true,
      advancedPackage: true,
    },
    {
      id: 2,
      name: "5 tài khoản chủ shop",
      basicPackage: true,
      advancedPackage: true,
    },
    {
      id: 3,
      name: "5 tài khoản chủ shop",
      basicPackage: true,
      advancedPackage: true,
    },
    {
      id: 4,
      name: "5 tài khoản chủ shop",
      basicPackage: false,
      advancedPackage: true,
    },
    {
      id: 5,
      name: "5 tài khoản chủ shop",
      basicPackage: false,
      advancedPackage: true,
    },
    {
      id: 6,
      name: "5 tài khoản chủ shop",
      basicPackage: false,
      advancedPackage: true,
    },
  ];

  return (
    <div id="service-price-list" className="section section-6">
      <div className="section-content">
        <h2 className="section-heading txt-green-color">
          Báo giá dịch vụ app SShop
        </h2>

        <div className="content-overflow-x">
          <table className="table-border-radius">
            <thead>
              <tr>
                <th>
                  <img className="logo-sshop" src={LogoSSHOP} />
                </th>

                <th>Gói cơ bản</th>

                <th>Gói năng cao</th>
              </tr>
            </thead>

            <tbody>
              {featureList.map((feature) => (
                <tr key={feature.id}>
                  <td>{feature.name}</td>

                  <td>
                    {feature.basicPackage ? (
                      <CheckIcon2 className="check-icon" />
                    ) : (
                      <CloseIcon className="close-icon" />
                    )}
                  </td>

                  <td>
                    {feature.advancedPackage ? (
                      <CheckIcon2 className="check-icon" />
                    ) : (
                      <CloseIcon className="close-icon" />
                    )}
                  </td>
                </tr>
              ))}

              {/* <tr className='txt-bold'>
                <td>
                  Giá gói cước 3 tháng
                </td>

                <td>
                  {formatCurrency(20000)}
                </td>

                <td>
                  {formatCurrency(20000)}
                </td>
              </tr> */}

              <tr>
                <td></td>

                <td>
                  <Button
                    className="btn-1"
                    type="primary"
                    size="large"
                    onClick={gotoLoginPage}
                  >
                    ĐĂNG KÝ NGAY
                  </Button>
                </td>

                <td>
                  <Button
                    className="btn-2"
                    type="primary"
                    size="large"
                    onClick={gotoLoginPage}
                  >
                    ĐĂNG KÝ NGAY
                  </Button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Section6;
