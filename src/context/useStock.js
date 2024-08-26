import { useContext } from "react";
import { StockContext } from "./StockContext";

export function useStock() {
  return useContext(StockContext);
}
