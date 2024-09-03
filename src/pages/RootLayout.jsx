import { Outlet } from "react-router-dom";
import Nav from "@/components/Nav";

export default function RootLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      {" "}
      {/* Define o layout flexível de toda a página */}
      <header>
        <Nav />
      </header>
      <main className="flex-grow">
        {" "}
        {/* Permite que o main ocupe o espaço restante */}
        <Outlet />
      </main>
      <footer className="bg-gray-900 text-gray-400 text-center py-4 border-t border-gray-700 mt-auto">
        <div className="container mx-auto">
          &copy; 2024 Yuri Moraes & Marcos. Todos os direitos reservados.
        </div>
      </footer>
    </div>
  );
}
