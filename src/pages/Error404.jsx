import { Box, Typography, Button, Container } from '@mui/material';
import WarningIcon from '@mui/icons-material/Warning';
import { Link } from 'react-router-dom';

const Error404 = () => {
  return (
    <Container maxWidth="md" sx={{ height: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <WarningIcon sx={{ fontSize: 80, color: '#90caf9', mr: 2 }} />
        <Typography variant="h1" sx={{ fontSize: 80, fontWeight: 'bold', color: '#90caf9' }}>
          404
        </Typography>
      </Box>
      <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#1a237e' }}>
        Oops... Page Not Found
      </Typography>
      <Button 
        variant="contained" 
        component={Link} 
        to="/home"
        sx={{ mt: 3, bgcolor: '#1a237e' }}
      >
        Volver al Inicio
      </Button>
    </Container>
  );
};

export default Error404;