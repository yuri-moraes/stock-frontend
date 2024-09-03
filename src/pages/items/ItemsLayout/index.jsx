import { Link, Outlet, useLocation } from "react-router-dom";

export default function ItemsLayout() {
  const { pathname } = useLocation();

  return (
    <main>
      <nav className="mb-4 border-b border-white">
        <ul className="list-none p-0 flex">
          <li className="mr-4">
            <Link
              to="/items"
              className={`block text-white no-underline p-2 ${
                pathname === "/items" ? "bg-blue-600" : ""
              }`}
            >
              Todos items
            </Link>
          </li>
          <li>
            <Link
              to="/items/new"
              className={`block text-white no-underline p-2 ${
                pathname === "/items/new" ? "bg-blue-600" : ""
              }`}
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
