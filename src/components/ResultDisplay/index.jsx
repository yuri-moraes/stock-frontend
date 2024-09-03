import Display from "../Display";
import useStock from "@/hooks/useStockItems";
import { getRecentItems } from "@/hooks/getRecentItems";

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

  const recentItems = getRecentItems(items);
  const recentTotal = recentItems.length;

  return (
    <div className="flex justify-center">
      <Display
        text={"Diversidade de itens"}
        number={totalDiversity()}
        className="bg-gray-800 p-5 m-2.5 w-72 text-center rounded-lg"
      />
      <Display
        text={"Inventário total"}
        number={inventoryTotal}
        className="bg-gray-800 p-5 m-2.5 w-72 text-center rounded-lg"
      />
      <Display
        text={"Itens recentes"}
        number={recentTotal}
        className="bg-gray-800 p-5 m-2.5 w-72 text-center rounded-lg"
      />
      <Display
        text={"Itens acabando"}
        number={countItemsLowUnity()}
        className="bg-gray-800 p-5 m-2.5 w-72 text-center rounded-lg"
      />
    </div>
  );
}
