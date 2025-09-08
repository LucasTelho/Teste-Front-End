import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/ofertas");
  };

  return (
    <main className="flex flex-col items-center justify-center bg-gradient-to-b from-blue-900 to-blue-700 text-white px-4 text-center flex-1">
      <h1 className="text-5xl font-bold mb-4 drop-shadow-lg">eShop</h1>
      <p className="text-xl md:text-2xl max-w-xl drop-shadow-md mb-8">
        Os melhores produtos, disponíveis em um só lugar!
      </p>
      <button
        onClick={handleClick}
        className="bg-yellow-500 hover:bg-yellow-600 text-blue-900 font-bold py-3 px-6 rounded-lg shadow-lg transition duration-300 cursor-pointer"
      >
        Confira as ofertas da semana
      </button>
    </main>
  );
}

export default Home;
