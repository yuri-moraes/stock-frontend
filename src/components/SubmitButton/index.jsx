import PropTypes from "prop-types";

function SubmitButton({ text }) {
  return (
    <button
      type="submit"
      className="w-full py-2 px-4 bg-white text-gray-800 font-bold rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      {text}
    </button>
  );
}

SubmitButton.propTypes = {
  text: PropTypes.string.isRequired,
};

export default SubmitButton;
