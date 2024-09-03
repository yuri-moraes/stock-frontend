import PropTypes from "prop-types";

function UserProfileForm({ currentUser, setCurrentUser, handleEditProfile }) {
  return (
    <div className="mb-6">
      <input
        type="text"
        value={currentUser.name}
        onChange={(e) =>
          setCurrentUser({ ...currentUser, name: e.target.value })
        }
        placeholder="Nome"
        className="w-full px-3 mb-4 py-2 bg-gray-600 border border-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="email"
        value={currentUser.email}
        onChange={(e) =>
          setCurrentUser({ ...currentUser, email: e.target.value })
        }
        placeholder="Email"
        className="w-full px-3 mb-4 py-2 bg-gray-600 border border-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        disabled
      />
      <input
        type="text"
        value={currentUser.role}
        onChange={(e) =>
          setCurrentUser({ ...currentUser, role: e.target.value })
        }
        placeholder="Role"
        className="w-full px-3 mb-4 py-2 bg-gray-600 border border-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        className="w-full p-2 bg-blue-500 rounded hover:bg-blue-400 transition duration-300"
        onClick={handleEditProfile}
      >
        Salvar Alterações
      </button>
    </div>
  );
}

UserProfileForm.propTypes = {
  currentUser: PropTypes.shape({
    email: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
  }).isRequired,
  setCurrentUser: PropTypes.func.isRequired,
  handleEditProfile: PropTypes.func.isRequired,
};

export default UserProfileForm;
