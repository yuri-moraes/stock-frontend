import LogActivity from "@/components/LogActivity";

const logsData = [
  {
    userEmail: "user-email@example.com",
    action: "X QTD REMOVIDAS",
    date: "2024-09-22",
  },
  {
    userEmail: "username@example.com",
    action: "X QTD ADICIONADAS",
    date: "2024-09-18",
  },
  {
    userEmail: "username@example.com",
    action: "ITEM X REMOVIDO",
    date: "2024-09-21",
  },
  {
    userEmail: "username@example.com",
    action: "ITEM Y CRIADO",
    date: "2024-09-20",
  },
  {
    userEmail: "username@example.com",
    action: "ITEM Z ATUALIZADO",
    date: "2024-09-19",
  },
];

function Log() {
  return (
    <div>
      <LogActivity logs={logsData} />
    </div>
  );
}

export default Log;
