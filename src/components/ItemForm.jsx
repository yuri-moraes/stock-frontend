import PropTypes from "prop-types";
import { useRef, useState } from "react";
import { CATEGORIES } from "../entities/StockItem";
import useStockItems from "../hooks/useStockItems";

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
    <form onSubmit={handleSubmit}>
      <div className="row">
        <div>
          <label htmlFor="title">Título</label>
          <input
            type="text"
            name="title"
            id="title"
            ref={inputRef}
            required
            value={item.title}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="unity">Unidades</label>
          <input
            type="number"
            name="unity"
            id="unity"
            required
            min={0}
            step={1}
            value={item.unity}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="price">Preço</label>
          <input
            type="number"
            name="price"
            id="price"
            required
            min={0.0}
            step={0.01}
            value={item.price}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="category">Categoria</label>
          <select
            name="category"
            id="category"
            required
            value={item.category}
            onChange={handleChange}
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
      <div className="form-control">
        <label htmlFor="description">Descrição</label>
        <textarea
          name="description"
          id="description"
          required
          rows={6}
          value={item.description}
          onChange={handleChange}
        ></textarea>
      </div>
      <button className="descriptionBtn">Salvar</button>
    </form>
  );
}
