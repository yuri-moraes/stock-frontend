import PropTypes from "prop-types";

function PasswordChangeForm({
  newPassword,
  setNewPassword,
  handleChangePassword,
  handleLogout,
}) {
  return (
    <div className="mb-6">
      <input
        type="password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        placeholder="Nova Senha"
        className="w-full px-3 mb-4 py-2 bg-gray-600 border border-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        className="w-full p-2 bg-gray-900 rounded hover:bg-gray-500 transition duration-300 mb-2"
        onClick={handleChangePassword}
      >
        Alterar Senha
      </button>
      <button
        className="w-full p-2 bg-gray-700 rounded hover:bg-gray-600 transition duration-300"
        onClick={handleLogout}
      >
        Sair
      </button>
    </div>
  );
}

PasswordChangeForm.propTypes = {
  newPassword: PropTypes.string.isRequired,
  setNewPassword: PropTypes.func.isRequired,
  handleChangePassword: PropTypes.func.isRequired,
  handleLogout: PropTypes.func.isRequired,
};

export default PasswordChangeForm;
