import useStock from "../hooks/useStockItems";
import { Link } from "react-router-dom";
import { getRecentItems } from "../hooks/getRecentItems";

export default function TableData() {
  const { items } = useStock();

  const recentItems = getRecentItems(items);

  // Função para renderizar itens recentes
  const renderRecentItems = () => {
    return recentItems.map((item) => (
      <tr key={item.id}>
        <td>{item.title}</td>
        <td>
          <Link to={`/items/${item.id}`} className="button view">
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
          <td colSpan="3">Não há itens acabando!</td>
        </tr>
      );
    }

    return lowUnityItems.map((item) => (
      <tr key={item.id}>
        <td>{item.title}</td>
        <td>{item.unity}</td>
        <td>
          <Link to={`/items/${item.id}`} className="button view">
            Ver
          </Link>
        </td>
      </tr>
    ));
  };

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Itens Recentes</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>{renderRecentItems()}</tbody>
      </table>
      <table>
        <thead>
          <tr>
            <th>Itens Acabando</th>
            <th>Qtd.</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>{renderLowUnityItems()}</tbody>
      </table>
    </div>
  );
}
