import Display from "./Display";
import useStock from "../hooks/useStockItems";
import { getRecentItems } from "../hooks/getRecentItems";

export default function ResultDisplay() {
  const { items } = useStock();

  const totalDiversity = () => {
    const categories = new Set(items.map((item) => item.category));
    return categories.size;
  };

  const inventoryTotal = items.reduce((sum, item) => +sum + +item.unity, 0);

  const countItemsLowUnity = () => {
    return items.filter((item) => item.unity < 10).length;
  };

  const recentItems = getRecentItems(items); // Usa a função importada
  const recentTotal = recentItems.length;

  return (
    <div className="resultsDisplay">
      <Display
        text={"Diversidade de itens"}
        number={totalDiversity()}
        className={"display"}
      />
      <Display
        text={"Inventário total"}
        number={inventoryTotal}
        className={"display"}
      />
      <Display
        text={"Itens recentes"}
        number={recentTotal}
        className={"display"}
      />
      <Display
        text={"Itens acabando"}
        number={countItemsLowUnity()}
        className={"display"}
      />
    </div>
  );
}
