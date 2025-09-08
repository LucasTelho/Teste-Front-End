import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import { useNavigate } from 'react-router-dom';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

export default function PrimaryAppSearchBar() {
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [suggestions, setSuggestions] = React.useState([]);

  const pages = [
    { name: 'Home', path: '/' },
    { name: 'Ofertas', path: '/ofertas' },
  ];

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.length > 0) {
      const filtered = pages.filter((p) =>
        p.name.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  };

  const handleSelect = (item) => {
    setSearchTerm('');
    setSuggestions([]);
    navigate(item.path);
  };

  const handleNavigate = (path) => {
    navigate(path);
    setDrawerOpen(false);
  };

  const drawerList = (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onKeyDown={() => setDrawerOpen(false)}
    >
      <List>
        {pages.slice(0, 3).map((item) => (
          <ListItemButton key={item.name} onClick={() => handleNavigate(item.path)}>
            <ListItemText primary={item.name} />
          </ListItemButton>
        ))}
      </List>
      <Divider />
    </Box>
  );

  return (
    <Box sx={{ flexGrow: 0 }}>
      <AppBar position="static">
        <Toolbar>
          {/* Menu hamburguer */}
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
            onClick={() => setDrawerOpen(true)}
          >
            <MenuIcon />
          </IconButton>

          {/* Logo / título */}
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            eShop
          </Typography>

          {/* Barra de pesquisa */}
          <Box sx={{ position: 'relative', width: { xs: '100%', sm: 300 }, background:"#3a3a3a", borderRadius:"4px" }}>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Buscar no site..."
                value={searchTerm}
                onChange={handleInputChange}
                inputProps={{ 'aria-label': 'search' }}
              />
            </Search>

            {/* Sugestões */}
            {suggestions.length > 0 && (
              <Box
                sx={{
                  position: 'absolute',
                  top: '100%',
                  width: '100%',
                  left: 0,
                  right: 0,
                  bgcolor: '#272727',
                  boxShadow: 3,
                  zIndex: 10,
                }}
              >
                <List>
                  {suggestions.map((item) => (
                    <ListItemButton key={item.name} onClick={() => handleSelect(item)}>
                      <ListItemText primary={item.name} />
                    </ListItemButton>
                  ))}
                </List>
              </Box>
            )}
          </Box>

          {/* Ícone do carrinho */}
          <IconButton color="inherit" sx={{ ml: 2 }}  aria-label="Carrinho de compras">
            <ShoppingCartIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Drawer lateral */}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        {drawerList}
      </Drawer>
    </Box>
  );
}
