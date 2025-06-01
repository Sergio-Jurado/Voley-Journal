import { useNavigate } from 'react-router-dom';

const useLogout = () => {
    const navigate = useNavigate();

    const logout = () => {
        localStorage.clear(); // Limpia todo el localStorage.
        navigate('/'); // Redirige a la página de login
    };

    return logout;
};

export default useLogout;
