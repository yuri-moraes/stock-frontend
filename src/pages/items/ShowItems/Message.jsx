import PropTypes from "prop-types";

function Message({ type, message }) {
  const messageStyle =
    type === "error"
      ? "text-red-500 bg-red-100 p-2 rounded mb-4"
      : "text-green-500 bg-green-100 p-2 rounded mb-4";

  return <p className={messageStyle}>{message}</p>;
}

Message.propTypes = {
  type: PropTypes.oneOf(["error", "success"]).isRequired,
  message: PropTypes.string.isRequired,
};

export default Message;
