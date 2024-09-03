import useStock from "@/hooks/useStockItems";
import { Link } from "react-router-dom";
import { getRecentItems } from "@/hooks/getRecentItems";

export default function TableData() {
  const { items } = useStock();

  const recentItems = getRecentItems(items);

  // Função para renderizar itens recentes
  const renderRecentItems = () => {
    return recentItems.map((item) => (
      <tr key={item.id} className="border-t border-gray-700">
        <td className="p-3">{item.title}</td>
        <td className="p-3">
          <Link
            to={`/items/${item.id}`}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Ver
          </Link>
        </td>
      </tr>
    ));
  };

  // Função para renderizar itens com baixa unidade
  const renderLowUnityItems = () => {
    const lowUnityItems = items.filter((item) => item.unity < 10);
    if (lowUnityItems.length === 0) {
      return (
        <tr>
          <td colSpan="3" className="p-3">
            Não há itens acabando!
          </td>
        </tr>
      );
    }

    return lowUnityItems.map((item) => (
      <tr key={item.id} className="border-t border-gray-700">
        <td className="p-3">{item.title}</td>
        <td className="p-3">{item.unity}</td>
        <td className="p-3">
          <Link
            to={`/items/${item.id}`}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Ver
          </Link>
        </td>
      </tr>
    ));
  };

  return (
    <div className="flex justify-around w-full my-0.5 gap-4 px-6">
      <table className="w-full border-collapse my-5">
        <thead>
          <tr>
            <th className="bg-gray-800 p-3 text-left">Itens Recentes</th>
            <th className="bg-gray-800 p-3 text-left">Ações</th>
          </tr>
        </thead>
        <tbody>{renderRecentItems()}</tbody>
      </table>
      <table className="w-full border-collapse my-5">
        <thead>
          <tr>
            <th className="bg-gray-800 p-3 text-left">Itens Acabando</th>
            <th className="bg-gray-800 p-3 text-left">Qtd.</th>
            <th className="bg-gray-800 p-3 text-left">Ações</th>
          </tr>
        </thead>
        <tbody>{renderLowUnityItems()}</tbody>
      </table>
    </div>
  );
}
