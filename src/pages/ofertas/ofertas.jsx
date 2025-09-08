// ofertas.jsx
import { useState } from "react";
import produtosImg from "../../assets/images/oferta-semana.jpg";
import ResponsiveGrid from "../../components/rgrid";
import ProductFilter from "../../components/productFilter";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import useMediaQuery from "@mui/material/useMediaQuery";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

function Ofertas() {
  const [filters, setFilters] = useState({});
  const [drawerOpen, setDrawerOpen] = useState(false);
  const isSmallScreen = useMediaQuery("(max-width:600px)");

  return (
    <section className="flex flex-col items-center w-full main-section">
      <img
        src={produtosImg}
        alt="visual background"
        width={1600}
        height={100}
        className="w-400 h-50 object-cover"
      />

      {/* Gap entre título e main */}
      <div className="h-10" />
      {/* Título centralizado */}
      <Typography
        variant="h4"
        component="h1"
        textAlign="center"
        fontWeight="700"
        color="#222222"
      >
        Ofertas da Semana
      </Typography>
      <main className="p-10 max-w-400 justify-center m-auto flex gap-6 flex-col sm:flex-row w-full">
        {/* Desktop: aside fixo */}
        {!isSmallScreen && <ProductFilter onFilter={setFilters} />}

        <Box sx={{ flex: 1 }}>
          {/* Mobile: botão de filtro acima do grid */}
          {isSmallScreen && (
            <Box sx={{ mb: 2, textAlign: "right" }}>
              <Button
                variant="outlined"
                onClick={() => setDrawerOpen(true)}
              >
                Filtros
              </Button>
            </Box>
          )}

          {/* Grid de produtos */}
          <ResponsiveGrid filters={filters} />
        </Box>
      </main>

      {/* Drawer lateral (mobile) */}
      {isSmallScreen && (
        <Drawer
          anchor="right"
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
        >
          <div style={{ width: 280, padding: 16 }}>
            <ProductFilter
              onFilter={setFilters}
              onClose={() => setDrawerOpen(false)}
              isMobile
            />
          </div>
        </Drawer>
      )}
    </section>
  );
}

export default Ofertas;
