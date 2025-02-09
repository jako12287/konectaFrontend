import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import styles from "../../styles/customNavigate.module.css";

const CustomNavigate = ({ text, route, onClick }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (route) {
      navigate(route);
    } else if (onClick) {
      onClick();
    }
  };

  return (
    <div className={styles.container} onClick={handleClick}>
      {text}
    </div>
  );
};

CustomNavigate.propTypes = {
  text: PropTypes.string.isRequired,
  route: PropTypes.string,
  onClick: PropTypes.func,
};

export default CustomNavigate;
