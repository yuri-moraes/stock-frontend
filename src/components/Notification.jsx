import PropTypes from "prop-types";

function Notification({ message, type }) {
  if (!message) return null;

  const color = type === "error" ? "text-red-500" : "text-green-500";

  return <p className={`text-center mt-4 ${color}`}>{message}</p>;
}

Notification.propTypes = {
  message: PropTypes.string,
  type: PropTypes.oneOf(["success", "error"]).isRequired,
};

export default Notification;
