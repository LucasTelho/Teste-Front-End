import { useState } from "react";
import produtosImg from "../../assets/images/oferta-semana.webp";
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
        loading="lazy"
      />

      <div className="h-10" />
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

        {!isSmallScreen && <ProductFilter onFilter={setFilters} />}

        <Box sx={{ flex: 1 }}>
          {isSmallScreen && (
            <Box sx={{ mb: 2, textAlign: "center" }}>
              <Button
                variant="outlined"
                onClick={() => setDrawerOpen(true)}
                sx={{
                  backgroundColor: "#003366", 
                  color: "#ffffff",           
                  borderColor: "#003366",     
                  "&:hover": {
                    backgroundColor: "#002244", 
                    borderColor: "#002244",
                  },
                }}
              >
                Filtros
              </Button>
            </Box>
          )}

          <ResponsiveGrid filters={filters} />
        </Box>
      </main>

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
