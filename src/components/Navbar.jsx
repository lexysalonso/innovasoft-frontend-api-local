import { AppBar, Toolbar, Typography, Button, Box, IconButton, Drawer, List, ListItem, ListItemText, useMediaQuery, Avatar, Divider } from '@mui/material';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import PersonIcon from '@mui/icons-material/Person';
import { useCliente } from '../context/ClienteContext';
import { useState } from 'react';

const Navbar = ({ children }) => {
  const { usuario, logout, isAuthenticated } = useCliente();
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [drawerOpen, setDrawerOpen] = useState(false);

  const displayUsername = usuario?.username || localStorage.getItem('username') || 'Usuario';

  if (!isAuthenticated || location.pathname === '/' || location.pathname === '/registro') {
    return <>{children}</>;
  }

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const menuItems = [
    { titulo: 'IN', subtexto: 'INICIO', ruta: '/home' },
    { titulo: 'CC', subtexto: 'Consulta de clientes', ruta: '/consulta' },
  ];

  const handleNavigate = (ruta) => {
    navigate(ruta);
    setDrawerOpen(false);
  };

  return (
    <>
      <AppBar position="static" sx={{ bgcolor: '#1a237e' }}>
        <Toolbar>
          <IconButton color="inherit" edge="start" onClick={() => setDrawerOpen(true)} sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Typography 
            variant="h6" 
            component={Link} 
            to="/home" 
            sx={{ flexGrow: 1, textDecoration: 'none', color: 'inherit', cursor: 'pointer' }}
          >
            COMPANIA PRUEBA
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="body2">
              {displayUsername}
            </Typography>
            <IconButton color="inherit" onClick={handleLogout}>
              <ExitToAppIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer anchor="left" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <Box sx={{ width: 260, pt: 2, minWidth: 260 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 2 }}>
            <Avatar sx={{ width: 60, height: 60, bgcolor: '#1a237e' }}>
              <PersonIcon sx={{ fontSize: 35 }} />
            </Avatar>
            <Typography variant="body1" sx={{ mt: 1, fontWeight: 'medium' }}>
              {displayUsername}
            </Typography>
          </Box>
          <Divider />
          <Box sx={{ py: 1.5, px: 2, textAlign: 'center' }}>
            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
              MENU
            </Typography>
          </Box>
          <Divider />
<List>
              {menuItems.map((item) => (
                <ListItem 
                  button 
                  key={item.titulo} 
                  onClick={() => handleNavigate(item.ruta)}
                  selected={location.pathname === item.ruta}
                  sx={{ 
                    cursor: 'pointer',
                    height: 'auto',
                    py: 1.5,
                    '&.Mui-selected': { bgcolor: '#e8eaf6' }
                  }}
                >
                  <Box sx={{ width: 28, textAlign: 'center', mr: 1, color: '#90caf9', flexShrink: 0 }}>
                    <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                      {item.titulo}
                    </Typography>
                  </Box>
                  <ListItemText 
                    primary={item.subtexto} 
                    primaryTypographyProps={{ 
                      fontWeight: 'bold',
                      textAlign: 'left',
                      noWrap: false,
                      fontSize: '0.875rem'
                    }} 
                  />
                </ListItem>
              ))}
            </List>
        </Box>
      </Drawer>

      {!isMobile && (
        <Box sx={{ display: 'flex', bgcolor: '#f5f5f5', minHeight: '100vh' }}>
          <Box sx={{ width: 260, bgcolor: 'white', p: 2, minWidth: 260 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 2 }}>
              <Avatar sx={{ width: 60, height: 60, bgcolor: '#1a237e' }}>
                <PersonIcon sx={{ fontSize: 35 }} />
              </Avatar>
              <Typography variant="body1" sx={{ mt: 1, fontWeight: 'medium' }}>
                {displayUsername}
              </Typography>
            </Box>
            <Divider />
            <Box sx={{ py: 1.5, px: 2, textAlign: 'center' }}>
              <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                MENU
              </Typography>
            </Box>
            <Divider />
            <List disablePadding>
              {menuItems.map((item) => (
                <ListItem 
                  button 
                  key={item.titulo} 
                  onClick={() => navigate(item.ruta)}
                  selected={location.pathname === item.ruta}
                  sx={{ 
                    borderRadius: 0,
                    cursor: 'pointer',
                    height: 'auto',
                    py: 1.5,
                    '&.Mui-selected': { bgcolor: '#e8eaf6' }
                  }}
                >
                  <Box sx={{ width: 28, textAlign: 'center', mr: 1, color: '#90caf9', flexShrink: 0 }}>
                    <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                      {item.titulo}
                    </Typography>
                  </Box>
                  <ListItemText 
                    primary={item.subtexto} 
                    primaryTypographyProps={{ 
                      fontWeight: 'bold',
                      textAlign: 'left',
                      noWrap: false,
                      fontSize: '0.875rem'
                    }} 
                  />
                </ListItem>
              ))}
            </List>
          </Box>
          <Box sx={{ flexGrow: 1, p: 3 }}>
            {children}
          </Box>
        </Box>
      )}

      {isMobile && (
        <Box sx={{ p: 2 }}>
          {children}
        </Box>
      )}
    </>
  );
};

export default Navbar;