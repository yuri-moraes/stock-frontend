import PropTypes from "prop-types";

function ChangePasswordForm({
  newPassword,
  setNewPassword,
  handleChangePassword,
}) {
  return (
    <div className="mt-6 space-y-4">
      <input
        type="password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        placeholder="Nova Senha"
        className="w-full p-2 bg-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleChangePassword}
      >
        Alterar Senha
      </button>
    </div>
  );
}

ChangePasswordForm.propTypes = {
  newPassword: PropTypes.string.isRequired,
  setNewPassword: PropTypes.func.isRequired,
  handleChangePassword: PropTypes.func.isRequired,
};

export default ChangePasswordForm;
