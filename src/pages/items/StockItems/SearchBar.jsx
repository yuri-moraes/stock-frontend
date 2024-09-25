import PropTypes from "prop-types";

function SearchBar({ searchTerm, setSearchTerm, onSearch, onShowAll }) {
  return (
    <div className="flex flex-col md:flex-row justify-center items-center mb-6 space-y-2 md:space-y-0 md:space-x-4">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Buscar por ID ou Nome"
        className="bg-gray-900 text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-64"
      />
      <button
        onClick={onSearch}
        className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition duration-200 ease-in-out w-full md:w-auto"
      >
        Buscar
      </button>
      <button
        onClick={onShowAll}
        className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition duration-200 ease-in-out w-full md:w-auto"
      >
        Mostrar Todos
      </button>
    </div>
  );
}

SearchBar.propTypes = {
  searchTerm: PropTypes.string.isRequired,
  setSearchTerm: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
  onShowAll: PropTypes.func.isRequired,
};

export default SearchBar;
