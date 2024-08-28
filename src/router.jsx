import { createHashRouter } from "react-router-dom";
import RootLayout from "./pages/RootLayout";
import Home from "./pages/Home";
import StockItems from "./pages/items/StockItems/StockItems";
import CreateItem from "./pages/items/CreateItem";
import ShowItem from "./pages/items/ShowItem";
import UpdateItem from "./pages/items/UpdateItem";
import ItemsLayout from "./pages/items/ItemsLayout";
import RegisterForm from "./pages/users/RegisterForm";
import LoginForm from "./pages/users/LoginForm";
import api from "./api";
import UserProfile from "./pages/users/UserProfile";
import UserDashboard from "./pages/users/UserDashboard";
import EditProfileUser from "./pages/users/EditProfileUser";

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
        element: <UserDashboard />,
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
        element: <UserProfile />,
      },
      {
        path: "users/edit/:id",
        element: <EditProfileUser />,
      },
      {
        path: "items",
        element: <ItemsLayout />,
        children: [
          { index: true, element: <StockItems /> },
          { path: "new", element: <CreateItem /> },
          {
            path: ":id",
            element: <ShowItem />,
            loader: fetchItem,
          },
          {
            path: ":id/update",
            element: <UpdateItem />,
            loader: fetchItem,
          },
        ],
      },
    ],
  },
]);

export default router;
