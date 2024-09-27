import PropTypes from "prop-types";
import { useState } from "react";
import { FaUserCircle, FaClock, FaSearch } from "react-icons/fa";

const LogActivity = ({ logs }) => {
  const [searchTerm, setSearchTerm] = useState("");

  // Função para filtrar os logs com base no termo de busca (email ou item ID)
  const filteredLogs = logs.filter(
    (log) =>
      log.userEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.action.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 max-w-4xl mx-auto bg-gray-800 rounded-lg shadow-lg text-white">
      <h2 className="text-3xl font-semibold mb-8 text-center">
        Log de Atividades
      </h2>

      <div className="relative mb-8">
        <input
          type="text"
          placeholder="Buscar por e-mail ou ID do item..."
          className="w-full pl-12 pr-4 py-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} // Atualiza o estado com o termo de busca
        />
        <FaSearch className="absolute left-4 top-3.5 text-gray-400" />
      </div>

      {/* Exibe os logs filtrados */}
      <div className="space-y-4">
        {filteredLogs.map((log, index) => (
          <div
            key={index}
            className="flex items-center p-4 bg-gray-900 rounded-lg shadow hover:bg-gray-700 transition-colors"
          >
            <FaUserCircle className="text-blue-400 text-3xl mr-4" />
            <div className="flex-1">
              <div className="text-lg font-medium">{log.userEmail}</div>
              <div className="text-sm text-gray-300">{log.action}</div>
            </div>
            <div className="flex items-center text-gray-400">
              <FaClock className="mr-1" />
              <span>
                {new Date(log.createdAt).toLocaleDateString("pt-BR", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })}{" "}
                {new Date(log.createdAt).toLocaleTimeString("pt-BR", {
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                })}
              </span>
            </div>
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
      createdAt: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default LogActivity;
