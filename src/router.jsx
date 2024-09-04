import { createHashRouter } from "react-router-dom";
import RootLayout from "./pages/RootLayout";
import Home from "./pages/Home";
import StockItems from "./pages/items/StockItems";
import CreateItem from "./pages/items/CreateItem";
import ShowItem from "./pages/items/ShowItems";
import UpdateItem from "./pages/items/UpdateItem";
import ItemsLayout from "./pages/items/ItemsLayout";
import RegisterForm from "./pages/users/RegisterFrom";
import LoginForm from "./pages/users/LoginForm";
import UserProfile from "./pages/users/UserProfile";
import UserDashboard from "./pages/users/UserDashboard";
import EditProfileUser from "./pages/users/EditProfileUser";
import Forbidden from "./components/Error/Forbidden";
import PrivateRoute from "./components/Error/PrivateRoute";
import NotFound from "./components/Error/NotFound";
import api from "./api";

// Função para buscar itens
const fetchItem = async ({ params }) => {
  try {
    const response = await api.get(`/items/${params.id}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar o item:", error);
    throw new Response("Item não encontrado", { status: 404 });
  }
};

const router = createHashRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "users",
        element: (
          <PrivateRoute>
            <UserDashboard />
          </PrivateRoute>
        ),
      },
      {
        path: "users/register",
        element: <RegisterForm />,
      },
      {
        path: "users/login",
        element: <LoginForm />,
      },
      {
        path: "users/:id",
        element: (
          <PrivateRoute>
            <UserProfile />
          </PrivateRoute>
        ),
      },
      {
        path: "users/edit/:id",
        element: (
          <PrivateRoute role="admin">
            <EditProfileUser />
          </PrivateRoute>
        ),
      },
      {
        path: "items",
        element: (
          <PrivateRoute>
            <ItemsLayout />
          </PrivateRoute>
        ),
        children: [
          { index: true, element: <StockItems /> },
          {
            path: "new",
            element: (
              <PrivateRoute>
                <CreateItem />
              </PrivateRoute>
            ),
          },
          {
            path: ":id",
            element: <ShowItem />,
            loader: fetchItem,
          },
          {
            path: ":id/update",
            element: (
              <PrivateRoute role="admin">
                <UpdateItem />
              </PrivateRoute>
            ),
            loader: fetchItem,
          },
        ],
      },
      {
        path: "/forbidden",
        element: <Forbidden />,
      },
      {
        path: "*", // Captura todas as rotas não correspondentes
        element: <NotFound />,
      },
    ],
  },
]);

export default router;
