import img from "../../../Back-end/media/logo.png";
import { useState, useEffect } from "react";
import useLogout from "../utils/useLogout";
import ControlPanel from "../pages/admin/ControlPanel";

export const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [role, setRole] = useState(null);
    const logout = useLogout();

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchRole = async () => {
            if (token) {
                try {
                    const response = await fetch(`http://localhost:5000/api/users/getby/${token}`);
                    if (response.ok) {
                        const user = await response.json();
                        setRole(user.role || null);
                    } else {
                        setRole(null);
                    }

                } catch (error) {
                    console.error(error);
                    setRole(null);
                }
            } else {
                setRole(null);
            }
        };
        fetchRole();
    }, [token]);

    return (
        <header className="bg-blue-900 rounded-md m-2 text-white relative">
            <div className="container mx-auto flex items-center h-24 justify-between px-4 relative">
                <a href="/main" className="flex items-center">
                    <img className="h-12 md:h-16" src={img} alt="Logo" />
                    <span className="ml-4 uppercase font-black text-sm md:text-lg">
                        Voley Journal
                    </span>
                </a>
                <button
                    className="text-white md:hidden focus:outline-none"
                    onClick={toggleMenu}
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                    </svg>
                </button>
                <nav className={`${isMenuOpen ? "block" : "hidden"} absolute top-full left-0 w-full bg-blue-900 md:static md:block md:w-auto z-50 rounded-md`}>
                    <ul className="flex flex-col md:flex-row md:space-x-3 font-semibold text-base lg:text-lg">
                        <li className="p-3 md:p-5 xl:p-8">
                            <a href="/news">Noticias</a>
                        </li>
                        {role === "admin" && (
                            <li className="p-3 md:p-5 xl:p-8">
                                <a href="/controlPanel">Panel de administración</a>
                            </li>
                        )}
                        {role === "coach" && (
                            <li className="p-3 md:p-5 xl:p-8">
                                <a href="/my-team">Mi equipo</a>
                            </li>
                        )}
                        {role === "journalist" && (
                            <li className="p-3 md:p-5 xl:p-8">
                                <a href="/createNews">Crear noticia</a>
                            </li>
                        )}
                        <li className="p-3 md:p-5 xl:p-8">
                            {token ? (
                                <a href="#" onClick={logout}>Logout</a>
                            ) : (
                                <a href="/auth">Iniciar Sesión</a>
                            )}
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};