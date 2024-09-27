import PropTypes from "prop-types";

function UserProfileForm({ currentUser, setCurrentUser, handleEditProfile }) {
  const toggleRole = () => {
    setCurrentUser({
      ...currentUser,
      role: currentUser.role === "admin" ? "user" : "admin",
    });
  };

  return (
    <div className="mb-6">
      <div className="flex flex-col items-start mb-4">
        <input
          type="text"
          value={currentUser.name}
          onChange={(e) =>
            setCurrentUser({ ...currentUser, name: e.target.value })
          }
          placeholder="Nome"
          className="w-full px-3 py-2 bg-gray-600 border border-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="flex flex-col items-start mb-4">
        <input
          type="email"
          value={currentUser.email}
          onChange={(e) =>
            setCurrentUser({ ...currentUser, email: e.target.value })
          }
          placeholder="Email"
          className="w-full px-3 py-2 bg-gray-600 border border-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled
        />
      </div>
      <div className="flex items-center mb-6">
        <div
          onClick={toggleRole}
          className={`relative inline-block w-12 h-6 cursor-pointer transition-colors duration-300 ${
            currentUser.role === "admin" ? "bg-green-500" : "bg-gray-500"
          } rounded-full`}
        >
          <span
            className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow transition-transform duration-300 transform ${
              currentUser.role === "admin" ? "translate-x-6" : "translate-x-0"
            }`}
          ></span>
        </div>
        <span className="text-white ml-4">
          {currentUser.role === "admin" ? "Administrador" : "User"}
        </span>
      </div>
      <button
        className="w-full p-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-400 transition duration-300"
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
