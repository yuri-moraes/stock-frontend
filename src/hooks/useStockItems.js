import { useContext } from "react";
import { StockContext } from "../context/StockContext";

export default function useStockItems() {
  return useContext(StockContext);
}
