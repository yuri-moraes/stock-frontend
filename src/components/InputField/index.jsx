import PropTypes from "prop-types";

function InputField({ label, type, value, onChange }) {
  return (
    <div className="mb-4 w-full">
      <label className="block text-gray-300 text-sm font-bold mb-2">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        required
        className="w-full px-3 py-2 bg-gray-600 border border-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}

InputField.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default InputField;
