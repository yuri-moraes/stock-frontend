import PropTypes from "prop-types";
import DeleteUserButton from "@/components/DeleteUserButton";

function UserActions({ userId, onUserClick, onDelete }) {
  return (
    <div className="flex gap-1 sm:gap-2">
      <button
        className="bg-green-500 text-white px-2 py-1 sm:px-3 sm:py-2 rounded-lg transition-all duration-300 transform hover:bg-green-400 hover:scale-105 text-sm sm:text-base"
        onClick={() => onUserClick(userId)}
      >
        Editar
      </button>
      <DeleteUserButton userId={userId} onDelete={onDelete} />
    </div>
  );
}

UserActions.propTypes = {
  userId: PropTypes.string.isRequired,
  onUserClick: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default UserActions;
