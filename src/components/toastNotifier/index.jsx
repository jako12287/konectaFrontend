import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const useNotification = () => {
  const notify = (type, message, options = {}) => {
    const defaultOptions = {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      ...options,
    };

    switch (type) {
      case "success":
        toast.success(message, defaultOptions);
        break;
      case "error":
        toast.error(message, defaultOptions);
        break;
      case "info":
        toast.info(message, defaultOptions);
        break;
      case "warning":
        toast.warn(message, defaultOptions);
        break;
      default:
        toast(message, defaultOptions);
    }
  };

  return { notify };
};

const NotificationContainer = () => (
  <ToastContainer
    position="top-right"
    autoClose={3000}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
  />
);

export default NotificationContainer;
