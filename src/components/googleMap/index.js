import React, { useState } from 'react';
import { Modal } from 'antd';
import { EnvironmentFilled } from '@ant-design/icons';
import GoogleMapReact from 'google-map-react';
import { isEmpty } from '../../utils/helpers';
import { REACT_APP_KEY_GG_MAP } from '../../utils/constants/config';

import './css/index.scss';

const MarkerIcon = () => (
  <div className="click-info">
    <EnvironmentFilled className="map-marker" />
  </div>
);

const GoogleMap = (props) => {
  const { isOpen = false, onCancel, onOk } = props;
  const [latLngInfo, setlatLngInfo] = useState();
  const defaultProps = {
    center: {
      lat: 21.036187638754793,
      lng: 105.82838482920164,
    },
    zoom: 11,
  };

  const handleOk = () => {
    if (onOk) onOk(latLngInfo);
  };

  const handleCancel = () => {
    if (onCancel) onCancel();
  };

  const handleOnClick = ({ lat, lng }) => {
    setlatLngInfo({ lat, lng });
  };

  return (
    <Modal
      title=""
      visible={isOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      closable={false}
      className="google-map-modal"
      width="100%"
    >
      <div className="google-map-content">
        <GoogleMapReact
          defaultCenter={defaultProps.center}
          defaultZoom={defaultProps.zoom}
          onClick={handleOnClick}
          yesIWantToUseGoogleMapApiInternals
        >
          {!isEmpty(latLngInfo) && (
            <MarkerIcon lat={latLngInfo.lat} lng={latLngInfo.lng} />
          )}
        </GoogleMapReact>
      </div>
    </Modal>
  );
};

export default React.memo(GoogleMap);
