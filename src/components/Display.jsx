import PropTypes from "prop-types";

Display.propTypes = {
  text: PropTypes.string.isRequired,
  number: PropTypes.number,
  className: PropTypes.string,
};

export default function Display({ text, number, className }) {
  return (
    <div className={className}>
      <p>{text}</p>
      <p>{number}</p>
    </div>
  );
}
