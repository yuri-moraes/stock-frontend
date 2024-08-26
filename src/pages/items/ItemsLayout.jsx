import { Link, Outlet, useLocation } from "react-router-dom";

export default function ItemsLayout() {
  const { pathname } = useLocation();

  return (
    <main>
      <nav className="StockItemNav">
        <ul>
          <li>
            <Link
              to={"/items"}
              className={pathname === "/items" ? "active" : ""}
            >
              Todos items
            </Link>
          </li>
          <li>
            <Link
              to={"/items/new"}
              className={pathname === "/items/new" ? "active" : ""}
            >
              Novo Item
            </Link>
          </li>
        </ul>
      </nav>
      <Outlet />
    </main>
  );
}
