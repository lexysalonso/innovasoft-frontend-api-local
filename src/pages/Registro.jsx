import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  Link,
  Stack,
  InputAdornment,
  IconButton,
} from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useCliente } from '../context/ClienteContext';

const Registro = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { registro } = useCliente();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validatePassword = (password) => {
    if (!password || password.length < 8) {
      return 'Mínimo 8 caracteres requeridos';
    }
    if (password.length > 20) {
      return 'Máximo 20 caracteres permitidos';
    }
    if (!/[A-Z]/.test(password)) {
      return 'Debe tener al menos una mayúscula';
    }
    if (!/[a-z]/.test(password)) {
      return 'Debe tener al menos una minúscula';
    }
    if (!/\d/.test(password)) {
      return 'Debe tener al menos un número';
    }
    return null;
  };

  const validateUsername = (username) => {
    if (!username || username.length < 3) {
      return 'Mínimo 3 caracteres requeridos';
    }
    return null;
  };

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!formData.username.trim()) {
      setError('El usuario es requerido');
      setLoading(false);
      return;
    }

    const userError = validateUsername(formData.username);
    if (userError) {
      setError(userError);
      setLoading(false);
      return;
    }

    if (!formData.email.trim()) {
      setError('El email es requerido');
      setLoading(false);
      return;
    }

    if (!validateEmail(formData.email)) {
      setError('Ingrese un correo electrónico válido');
      setLoading(false);
      return;
    }

    if (!formData.password.trim()) {
      setError('La contraseña es requerida');
      setLoading(false);
      return;
    }

    const pwError = validatePassword(formData.password);
    if (pwError) {
      setError(pwError);
      setLoading(false);
      return;
    }

    const result = await registro(formData.username, formData.email, formData.password);
    setLoading(false);
    
    if (result.success) {
      setSuccess(true);
      setTimeout(() => navigate('/home'), 2000);
    } else {
      setError(result.error || 'Error al registrar. Verifica los datos.');
    }
  };

  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <Paper elevation={6} sx={{ p: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Box sx={{ bgcolor: '#1a237e', p: 1.5, borderRadius: '50%', mb: 2 }}>
            <PersonAddIcon sx={{ color: 'white', fontSize: 32 }} />
          </Box>
          <Typography component="h1" variant="h5" sx={{ fontWeight: 'bold', color: '#1a237e', mb: 3 }}>
            Registro de Usuario
          </Typography>
          
          {error && (
            <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
              {error}
            </Alert>
          )}

          {success && (
            <Alert severity="success" sx={{ width: '100%', mb: 2 }}>
              Usuario creado correctamente. Redirigiendo...
            </Alert>
          )}

          <form onSubmit={handleSubmit} style={{ width: '100%' }}>
            <Stack spacing={2}>
              <TextField
                fullWidth
                label="Nombre de Usuario *"
                name="username"
                value={formData.username}
                onChange={handleChange}
              />
              <TextField
                fullWidth
                label="Dirección de Correo *"
                type="text"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
              <TextField
                fullWidth
                label="Contraseña *"
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                helperText="8-20 caracteres, número, mayúscula y minúscula"
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton size="small" onClick={() => setShowPassword(!showPassword)} edge="end">
                          {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  },
                }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={loading}
                sx={{ mt: 2, mb: 2, bgcolor: '#1a237e' }}
              >
                {loading ? 'REGISTRANDO...' : 'REGISTRARSE'}
              </Button>
            </Stack>
          </form>

          <Typography variant="body2">
            ¿Ya tiene una cuenta?{' '}
            <Link component="button" onClick={() => navigate('/')}>
              Iniciar Sesión
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default Registro;