import { Bounce, toast } from "react-toastify";

export const showToast = (type, message) => {
  let Options = {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Bounce,
  };
  switch (type) {
    case 'info':
      toast.info(message, Options)
      break;
    case 'success':
      toast.success(message, Options)
      break;
    case 'warning':
      toast.warning(message, Options)
      break;
    case 'error':
      toast.error(message, Options)
      break;
    default:
        toast(message, Options);
      break;
  }

};
