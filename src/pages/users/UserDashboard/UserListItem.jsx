import PropTypes from "prop-types";
import UserActions from "../UserDashboard/UserActions";

function UserListItem({ user, onUserClick, onDelete }) {
  return (
    <li className="flex flex-col sm:flex-row justify-between items-center bg-gray-700 mb-2 p-3 sm:p-4 rounded-lg hover:bg-gray-600 transform hover:-translate-y-1 transition-all duration-300">
      <div className="flex flex-col items-start mb-3 sm:mb-0 text-lg sm:text-base">
        <span className="font-bold text-white">{user.name}</span>
        <span className="text-sm text-gray-300">{user.email}</span>
      </div>
      <UserActions
        userId={user.id}
        onUserClick={onUserClick}
        onDelete={onDelete}
      />
    </li>
  );
}

UserListItem.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  }).isRequired,
  onUserClick: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default UserListItem;
