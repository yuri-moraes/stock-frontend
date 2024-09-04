import PropTypes from "prop-types";

function EditProfileForm({ updatedUser, setUpdatedUser, handleEditProfile }) {
  const toggleRole = () => {
    setUpdatedUser({
      ...updatedUser,
      role: updatedUser.role === "admin" ? "user" : "admin",
    });
  };

  return (
    <div className="space-y-4">
      <input
        type="text"
        value={updatedUser.name}
        onChange={(e) =>
          setUpdatedUser({ ...updatedUser, name: e.target.value })
        }
        placeholder="Nome"
        className="w-full p-2 bg-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="email"
        value={updatedUser.email}
        onChange={(e) =>
          setUpdatedUser({ ...updatedUser, email: e.target.value })
        }
        placeholder="Email"
        className="w-full p-2 bg-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        disabled
      />
      <div className="flex items-center mb-4">
        <span className="text-white mr-2">Role:</span>
        <div
          onClick={toggleRole}
          className={`relative inline-block w-12 h-6 cursor-pointer transition-colors duration-300 ${
            updatedUser.role === "admin" ? "bg-green-500" : "bg-gray-500"
          } rounded-full`}
        >
          <span
            className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow transition-transform duration-300 transform ${
              updatedUser.role === "admin" ? "translate-x-6" : "translate-x-0"
            }`}
          ></span>
        </div>
        <span className="ml-3 text-white">
          {updatedUser.role === "admin" ? "Administrador" : "Usuário"}
        </span>
      </div>
      <button
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2"
        onClick={handleEditProfile}
      >
        Salvar Alterações
      </button>
    </div>
  );
}

EditProfileForm.propTypes = {
  updatedUser: PropTypes.shape({
    email: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
  }).isRequired,
  setUpdatedUser: PropTypes.func.isRequired,
  handleEditProfile: PropTypes.func.isRequired,
};

export default EditProfileForm;
