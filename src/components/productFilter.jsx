import { useState } from "react";

export default function ProductFilter({ onFilter, onClose, isMobile = false }) {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedPrice, setSelectedPrice] = useState("");

  const handleCategoryChange = (e) => {
    const value = e.target.value;
    if (e.target.checked) {
      setSelectedCategories((prev) => [...prev, value]);
    } else {
      setSelectedCategories((prev) => prev.filter((c) => c !== value));
    }
  };

  const handlePriceChange = (e) => {
    setSelectedPrice(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onFilter({
      categoria: selectedCategories,
      preco: selectedPrice,
    });
    if (onClose) onClose();
  };

  const handleClear = () => {
    setSelectedCategories([]);
    setSelectedPrice("");
    onFilter({});
  };

  return (
    <aside
      className={`w-full max-w-50 p-4 bg-white ${
        isMobile ? "" : "border border-gray-300 rounded-md shadow-sm"
      }`}
      aria-label="Filtro de produtos"
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <fieldset>
          <legend className="font-bold">Categoria</legend>
          <div id="categorias">
            <label>
              <input
                type="checkbox"
                value="electronics"
                checked={selectedCategories.includes("electronics")}
                onChange={handleCategoryChange}
              />{" "}
              Eletrônicos
            </label>
            <label>
              <input
                type="checkbox"
                value="jewelery"
                checked={selectedCategories.includes("jewelery")}
                onChange={handleCategoryChange}
              />{" "}
              Joias
            </label>
            <label>
              <input
                type="checkbox"
                value="men's clothing"
                checked={selectedCategories.includes("men's clothing")}
                onChange={handleCategoryChange}
              />{" "}
              Roupas Masculinas
            </label>
            <label>
              <input
                type="checkbox"
                value="women's clothing"
                checked={selectedCategories.includes("women's clothing")}
                onChange={handleCategoryChange}
              />{" "}
              Roupas Femininas
            </label>
          </div>
        </fieldset>

        <fieldset className="mt-4">
          <legend className="font-bold">Preço</legend>
          <div id="precos">
            <label>
              <input
                type="radio"
                name="preco"
                value="0-50"
                checked={selectedPrice === "0-50"}
                onChange={handlePriceChange}
              />{" "}
              Até R$50
            </label>
            <label>
              <input
                type="radio"
                name="preco"
                value="50-150"
                checked={selectedPrice === "50-150"}
                onChange={handlePriceChange}
              />{" "}
              R$50 - R$150
            </label>
            <label>
              <input
                type="radio"
                name="preco"
                value="150+"
                checked={selectedPrice === "150+"}
                onChange={handlePriceChange}
              />{" "}
              Acima de R$150
            </label>
          </div>
        </fieldset>

        <div className="mt-4 flex gap-2">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Filtrar
          </button>
          <button
            type="button"
            onClick={handleClear}
            className="px-4 py-2 bg-gray-800 text-white rounded"
          >
            Limpar
          </button>
        </div>
      </form>
    </aside>
  );
}
