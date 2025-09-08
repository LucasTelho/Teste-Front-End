import { useEffect, useState, useMemo } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { getProducts } from "../services/api";

export default function ResponsiveGrid({ filters }) {
  const [products, setProducts] = useState([]);
  const [visible, setVisible] = useState(8);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (err) {
        console.error("Erro ao carregar produtos:", err);
      }
    }
    fetchData();
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      let categoryMatch = true;
      let priceMatch = true;

      if (filters.categoria?.length) {
        categoryMatch = filters.categoria.includes(p.category);
      }

      if (filters.preco) {
        const price = p.price;
        if (filters.preco === "0-50") priceMatch = price <= 50;
        if (filters.preco === "50-150") priceMatch = price > 50 && price <= 150;
        if (filters.preco === "150+") priceMatch = price > 150;
      }

      return categoryMatch && priceMatch;
    });
  }, [products, filters]);

  const handleLoadMore = () => {
    setVisible((prev) => prev + 6);
  };

  return (
    <Box
      component="section"
      aria-label="Lista de produtos"
      sx={{ flexGrow: 1, p: 2 }}
    >
      {/* Wrapper com grid responsivo */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: 3,
        }}
      >
        {filteredProducts.slice(0, visible).map((product) => (
          <Box
            key={product.id}
            component="article"
            title={product.title}
            aria-labelledby={`product-${product.id}-title`}
            sx={{ cursor: "pointer" }}
          >
            <Card
              component="div"
              sx={{
                width: "100%",
                height: 400,
                textAlign: "center",
                p: 2,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                cursor: "pointer",
                transition: "transform 0.3s",
                "&:hover img": {
                  transform: "scale(1.05)",
                  transition: "transform 0.3s",
                },
              }}
            >
              <CardMedia
                component="img"
                image={product.image}
                alt={product.title}
                loading="lazy"
                sx={{
                  width: 200,
                  height: 162,
                  objectFit: "contain",
                  margin: "0 auto",
                }}
              />
              <CardContent>
                <Typography
                  id={`product-${product.id}-title`}
                  variant="h6"
                  component="h2"
                  sx={{
                    display: "-webkit-box",
                    WebkitBoxOrient: "vertical",
                    WebkitLineClamp: 2,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {product.title}
                </Typography>
                <Typography variant="body1" component="p" color="text.secondary">
                  R$ {product.price}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ mt: 2 }}
                  fullWidth
                >
                  Comprar
                </Button>
              </CardContent>
            </Card>

          </Box>
        ))}
      </Box>

      {visible < filteredProducts.length && (
        <Box sx={{ textAlign: "center", mt: 4 }}>
          <Button
            variant="outlined"
            onClick={handleLoadMore}
            sx={{
              mt: 2,
              backgroundColor: "#003366", 
              color: "#ffffff",           
              borderColor: "#003366",     
              "&:hover": {
                backgroundColor: "#002244", 
                borderColor: "#002244",
              },
            }}
          >
            Carregar mais
          </Button>
        </Box>
      )}
    </Box>
  );
}
