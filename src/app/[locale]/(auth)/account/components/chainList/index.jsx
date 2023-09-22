import React, { useEffect, useState } from "react";
import { Button, Radio, Space, Spin, Typography } from "antd";
import { CONFIG_SERVER, SSHOP_SPA_TOKEN } from "@/utils/constants/config";
import {
  actionGetChainsByCustomerId,
  getShopsByChainId,
} from "../../actions.js";
import { get } from "lodash";
import cookie from "js-cookie";
import { useSelector } from "react-redux";

const ChainList = () => {
  const [chainList, setChainList] = useState([]);
  const [isFetchingData, setFetchingData] = useState(false);
  const [isCheckedData, setCheckedData] = useState(false);
  const [headingTitle, setHeadingTitle] = useState("");
  const [chainSelected, setChainSelected] = useState({});
  const locale = useSelector((state) => state.system.locale);
  const texts = useSelector((state) => state.system.texts);

  useEffect(() => {
    handleGetChainList();
  }, []);

  const handleGetChainList = async () => {
    try {
      setFetchingData(true);
      const { data } = await actionGetChainsByCustomerId();
      const code = get(data, "status.code");
      if (code == 200) {
        const chains = data?.data || [];
        if (chains.length > 0) {
          setChainSelected(chains[0]);
          setHeadingTitle(texts?.SELECT_CHAIN);
        } else {
          setHeadingTitle(texts?.SELECT_CHAIN_WITHOUT_NO_CHAIN);
        }
        setChainList(chains);
      }
      setCheckedData(true);
      setFetchingData(false);
    } catch (error) {
      setCheckedData(true);
      setFetchingData(false);
    }
  };

  const goChainPage = () => {
    window.navigatePage("CHAIN");
  };

  const handleOnChange = (chainId) => {
    const findItem = chainList.find((it) => it.chainId === chainId);
    setChainSelected(findItem || {});
  };

  const handleOk = async () => {
    if (chainList.length > 0) {
      if (chainSelected) {
        const response = await getShopsByChainId(chainSelected.chainId);
        if (response?.data?.data?.length > 0) {
          const url = `http://${chainSelected.subDomain}.${
            CONFIG_SERVER.DOMAIN
          }?user-token=${cookie.get(SSHOP_SPA_TOKEN)}&locale=${locale}`;
          window.open(url, "_blank").focus();
        } else {
          const search = {
            id: chainSelected.chainId,
            sub: chainSelected.subDomain,
          };

          window.navigatePage("SHOP", null, search);
        }
      }
    } else {
      goChainPage();
    }
  };

  return (
    <>
      <div className="form-heading">{headingTitle}</div>
      <div className="form-content">
        <Spin spinning={isFetchingData}>
          {isCheckedData && (
            <div className="chain-list-content">
              {chainList.length > 0 && (
                <>
                  <div className="sub-des">
                    <span>{texts?.SELECT_CHAIN_GUID}</span>
                    <Typography.Link
                      onClick={() => goChainPage()}
                      className="btn-link"
                    >
                      {texts?.LABEL_CREATE_CHAIN}
                    </Typography.Link>
                  </div>

                  <Radio.Group
                    onChange={(event) => handleOnChange(event.target.value)}
                    value={chainSelected.chainId}
                    className="chain-list"
                  >
                    <Space direction="vertical">
                      {chainList.map((it) => (
                        <Radio
                          value={it.chainId}
                          key={it.chainId}
                        >{`${it.chainName}  (https://${it.subDomain}.smartspa.vn)`}</Radio>
                      ))}
                    </Space>
                  </Radio.Group>
                </>
              )}
              {chainList.length === 0 && (
                <div className="sub-des">
                  {texts?.SELECT_CHAIN_WITHOUT_NO_CHAIN_GUID}
                </div>
              )}

              <Button
                type="primary"
                htmlType="submit"
                className="btn-green-color btn-action"
                onClick={handleOk}
                size="large"
              >
                {chainList.length > 0
                  ? texts?.LABEL_NEXT
                  : texts?.SELECT_CHAIN_CREATE_CHAIN}
              </Button>
            </div>
          )}
        </Spin>
      </div>
    </>
  );
};

export default React.memo(ChainList);
