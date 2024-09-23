import PropTypes from "prop-types";

const LogActivity = ({ logs }) => {
  return (
    <div className="p-4 max-w-3xl mx-auto bg-gray-800 rounded-lg shadow-lg text-white">
      <h2 className="text-2xl font-semibold mb-6 text-center">
        Log de Atividades
      </h2>

      <input
        type="text"
        placeholder="BUSCA"
        className="border border-gray-700 rounded-lg p-2 mb-6 w-full bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <div className="space-y-4">
        {logs.map((log, index) => (
          <div
            key={index}
            className="border border-gray-700 rounded-lg p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center bg-gray-900 shadow-sm"
          >
            <div className="text-red-500 font-bold text-sm sm:text-base mb-2 sm:mb-0">
              {log.userEmail}
            </div>
            <div className="text-green-400 text-sm sm:text-base mb-2 sm:mb-0">
              {log.action}
            </div>
            <div className="text-blue-400 text-sm sm:text-base">{log.date}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

LogActivity.propTypes = {
  logs: PropTypes.arrayOf(
    PropTypes.shape({
      userEmail: PropTypes.string.isRequired,
      action: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default LogActivity;
