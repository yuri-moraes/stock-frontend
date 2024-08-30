import { Link } from "react-router-dom";
import "./index.css";
import useStockItems from "../../../hooks/useStockItems";
import DeleteButton from "../../../components/DeleteButton";
import { useStock } from "../../../context/useStock";

export default function StockItems() {
  const { items } = useStockItems();
  const { user } = useStock(); // Obtenha o usuário do contexto

  return (
    <>
      <div className="table-div">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Em Estoque</th>
              <th>Categoria</th>
              <th>Ações</th>
            </tr>
          </thead>
          {items.length > 0 ? (
            items.map((item) => (
              <tbody key={item.id}>
                <tr>
                  <td>{item.id}</td>
                  <td>{item.title}</td>
                  <td>{item.unity} unid.</td>
                  <td>{item.category}</td>
                  <td>
                    <Link to={`/items/${item.id}`} className="button view">
                      Ver
                    </Link>
                    {user.role === "admin" && (
                      <>
                        <Link
                          to={`/items/${item.id}/update`}
                          className="button update"
                        >
                          Atualizar
                        </Link>
                        <DeleteButton itemId={item.id} itemName={item.title} />
                      </>
                    )}
                  </td>
                </tr>
              </tbody>
            ))
          ) : (
            <tbody>
              <tr>
                <td>Não há nada aqui!</td>
              </tr>
            </tbody>
          )}
        </table>
      </div>
    </>
  );
}
