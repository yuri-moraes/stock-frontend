import { RouterProvider } from "react-router-dom";
import router from "./router.jsx";
import { StockContextProvider } from "./context/StockContext.jsx";

export default function App() {
  return (
    <StockContextProvider>
      <RouterProvider router={router} />
    </StockContextProvider>
  );
}
