import { Link } from "react-router-dom";

export default function Nav() {
  return (
    <nav>
      <Link to={"/"}>
        <span>React Stock</span>
      </Link>
      <div className="buttons">
        <Link to={"/"}>
          <button>Início</button>
        </Link>
        <Link to={"/items"}>
          <button>Itens</button>
        </Link>
      </div>
    </nav>
  );
}
