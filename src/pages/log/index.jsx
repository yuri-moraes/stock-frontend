import { useEffect, useState } from "react";
import LogActivity from "@/components/LogActivity";
import api from "@/api";

function Log() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Função para buscar logs da API
  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await api.get("/logs");
        setLogs(response.data);
      } catch (error) {
        setError("Erro ao carregar logs");
        console.error("Erro ao buscar logs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLogs();
  }, []);

  if (loading) {
    return <div className="text-center text-white">Carregando logs...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div>
      <LogActivity logs={logs} />
    </div>
  );
}

export default Log;
