import PropTypes from "prop-types";

function ErrorMessage({ message }) {
  return <p className="text-red-500 text-sm mb-4">{message}</p>;
}

ErrorMessage.propTypes = {
  message: PropTypes.string.isRequired,
};

export default ErrorMessage;
