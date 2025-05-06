import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react'; // Ou l'icône que vous utilisez
import PropTypes from 'prop-types';

// Configuration de l'API
const api = axios.create({
  baseURL: 'http://localhost:8000',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'X-Requested-With': 'XMLHttpRequest'
  },
  withCredentials: true
});

const LogoutButton = ({ onClose }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // Récupérer le cookie CSRF
      await api.get('/sanctum/csrf-cookie');
      
      // Faire la requête de déconnexion
      await api.post('/api/logout', {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      localStorage.removeItem('token');
      navigate('/login'); // Redirige vers la page de connexion
      if (onClose) onClose(); // Ferme le menu si applicable
    } catch (error) {
      console.error('Erreur lors de la déconnexion :', error);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="
        w-full
        flex items-center gap-2
        px-3 py-2
        text-sm text-red-600
        rounded-md
        hover:bg-red-50
        transition-colors
      "
    >
      <LogOut className="w-5 h-5" />
      Déconnexion
    </button>
  );
};

LogoutButton.propTypes = {
  onClose: PropTypes.func,
};

export default LogoutButton;
