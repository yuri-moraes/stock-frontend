import PropTypes from "prop-types";
import { useRef, useState } from "react";
import { CATEGORIES } from "@/entities/StockItem";
import useStockItems from "@/hooks/useStockItems";

ItemForm.propTypes = {
  itemToUpdate: PropTypes.object,
};

export default function ItemForm({ itemToUpdate }) {
  const defaultItem = {
    title: "",
    description: "",
    unity: 0,
    price: 0,
    category: "",
  };

  const [item, setItem] = useState(itemToUpdate ? itemToUpdate : defaultItem);
  const { addItem, updateItem } = useStockItems();
  const inputRef = useRef();

  const handleChange = (ev) => {
    setItem((currentState) => {
      return {
        ...currentState,
        [ev.target.name]: ev.target.value,
      };
    });
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    try {
      if (itemToUpdate) {
        await updateItem(itemToUpdate.id, item);
        alert("Item atualizado!");
      } else {
        await addItem(item);
        setItem(defaultItem);
        alert("Item cadastrado com sucesso!");
      }
    } catch (err) {
      console.error("Erro ao salvar o item:", err.message);
    } finally {
      inputRef.current.focus();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mx-auto p-5">
      <div className="flex flex-wrap gap-5">
        <div className="flex flex-col flex-1 min-w-[200px]">
          <label htmlFor="title" className="mb-2 font-bold text-white">
            Título
          </label>
          <input
            type="text"
            name="title"
            id="title"
            ref={inputRef}
            required
            value={item.title}
            onChange={handleChange}
            className="bg-gray-900 p-2 rounded text-white focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="flex flex-col flex-1 min-w-[200px]">
          <label htmlFor="unity" className="mb-2 font-bold text-white">
            Unidades
          </label>
          <input
            type="number"
            name="unity"
            id="unity"
            required
            min={0}
            step={1}
            value={item.unity}
            onChange={handleChange}
            className="bg-gray-900 p-2 rounded text-white focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="flex flex-col flex-1 min-w-[200px]">
          <label htmlFor="price" className="mb-2 font-bold text-white">
            Preço
          </label>
          <input
            type="number"
            name="price"
            id="price"
            required
            min={0.0}
            step={0.01}
            value={item.price}
            onChange={handleChange}
            className="bg-gray-900 p-2 rounded text-white focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="flex flex-col flex-1 min-w-[200px]">
          <label htmlFor="category" className="mb-2 font-bold text-white">
            Categoria
          </label>
          <select
            name="category"
            id="category"
            required
            value={item.category}
            onChange={handleChange}
            className="bg-gray-900 p-2 rounded text-white focus:outline-none focus:border-blue-500"
          >
            <option disabled value="">
              Selecione uma categoria...
            </option>
            {CATEGORIES.map((category) => (
              <option
                key={category}
                value={category}
                defaultChecked={item.category === category}
              >
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="flex flex-col mt-4">
        <label htmlFor="description" className="mb-2 font-bold text-white">
          Descrição
        </label>
        <textarea
          name="description"
          id="description"
          required
          rows={6}
          value={item.description}
          onChange={handleChange}
          className="bg-gray-900 p-2 rounded text-white focus:outline-none focus:border-blue-500 resize-vertical"
        ></textarea>
      </div>
      <button
        type="submit"
        className="w-full mt-5 py-3 text-lg text-white bg-blue-500 rounded hover:bg-blue-700 transition-colors"
      >
        Salvar
      </button>
    </form>
  );
}
