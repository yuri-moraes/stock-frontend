import PropTypes from "prop-types";

function EditProfileForm({ updatedUser, setUpdatedUser, handleEditProfile }) {
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
      <input
        type="text"
        value={updatedUser.role}
        onChange={(e) =>
          setUpdatedUser({ ...updatedUser, role: e.target.value })
        }
        placeholder="Role"
        className="w-full p-2 bg-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
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
