import { useContext } from "react";
import { StockContext } from "./StockContext";

// Custom hook para acessar o contexto facilmente
export function useStock() {
  return useContext(StockContext);
}
