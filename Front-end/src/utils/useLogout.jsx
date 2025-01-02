import { useNavigate } from 'react-router-dom';

const useLogout = () => {
    const navigate = useNavigate();

    const logout = () => {
        localStorage.clear(); // Limpia todo el localStorage.
        navigate('/auth'); // Redirige a la página de login
    };

    return logout;
};

export default useLogout;
