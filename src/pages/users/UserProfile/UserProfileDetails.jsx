import PropTypes from "prop-types";

function UserProfileDetails({ currentUser }) {
  return (
    <div className="mb-6">
      <p className="mb-2">
        <strong>Nome:</strong> {currentUser.name}
      </p>
      <p className="mb-2">
        <strong>Email:</strong> {currentUser.email}
      </p>
      <p className="mb-4">
        <strong>Role:</strong> {currentUser.role}
      </p>
    </div>
  );
}

UserProfileDetails.propTypes = {
  currentUser: PropTypes.shape({
    email: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
  }).isRequired,
};

export default UserProfileDetails;
