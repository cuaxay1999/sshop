import { Button } from "antd";
import "./css/index.scss";
import { useSelector } from "react-redux";

const BtnRegister = ({ onClick, txtBtn }) => {
  const texts = useSelector((state) => state.system.texts);
  const handleClick = () => {
    window?.navigatePage("ACCOUNT");
  };

  return (
    <Button
      className="btn-register-section"
      size={window?.isMobile ? "middle" : "large"}
      type="primary"
      onClick={onClick ? onClick : handleClick}
    >
      {txtBtn ? txtBtn : texts?.REGISTER_NOW}
    </Button>
  );
};

export default BtnRegister;
