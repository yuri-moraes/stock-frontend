import { Outlet } from "react-router-dom";
import Nav from "../components/Nav";

export default function RootLayout() {
  return (
    <>
      <header>
        <Nav />
      </header>
      <main>
        <Outlet />
      </main>
      <footer>&copy; 2024 Yuri Moraes. Todos os direitos reservados.</footer>
    </>
  );
}
