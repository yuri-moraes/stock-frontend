import PropTypes from "prop-types";
import UserListItem from "../UserDashboard/UserListItem";

function UserList({ users, onUserClick, onDelete }) {
  return (
    <ul className="list-none p-0 m-0">
      {users.map((user) => (
        <UserListItem
          key={user.id}
          user={user}
          onUserClick={onUserClick}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}

UserList.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
    })
  ).isRequired,
  onUserClick: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default UserList;
