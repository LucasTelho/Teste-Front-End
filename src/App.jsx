// App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/home/home';
import Ofertas from './pages/ofertas/ofertas';
import PrimaryAppSearchBar from './components/search'; 

function App() {
  return (
    <BrowserRouter>
      <PrimaryAppSearchBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ofertas" element={<Ofertas />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
