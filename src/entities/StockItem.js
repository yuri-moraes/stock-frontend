export const CATEGORIES = ["Jogos", "Livros", "Brinquedos", "Acessórios"];

export default class StockItem {
  constructor({ id, title, description, unity, price, category }) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.unity = +unity;
    this.price = +price;
    this.category = category;
    this.createdAt = new Date();
    this.updatedAt = new Date();
    this.#validate();
  }

  #validate() {
    const validTitle = typeof this.title === "string";
    const validDescription = typeof this.description === "string";
    const validUnity =
      typeof this.unity === "number" && Number.isInteger(this.unity);
    const validPrice = typeof this.price === "number";
    const validCategory = CATEGORIES.includes(this.category);
    if (
      !(
        validTitle &&
        validDescription &&
        validUnity &&
        validPrice &&
        validCategory
      )
    ) {
      throw new Error("Invalid item!");
    }
  }
}
