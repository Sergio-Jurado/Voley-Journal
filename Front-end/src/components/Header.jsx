import { useState, useEffect } from "react";
import useLogout from "../utils/useLogout";

export const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [role, setRole] = useState(null);
    const logout = useLogout();

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchRole = async () => {
            if (token) {
                try {
                    const response = await fetch(`https://voley-journal.onrender.com/api/users/getby/${token}`);
                    if (response.ok) {
                        const user = await response.json();
                        setRole(user.role || null);
                    } else {
                        setRole(null);
                    }
                } catch {
                    setRole(null);
                }
            } else {
                setRole(null);
            }
        };
        fetchRole();
    }, [token]);

    return (
        <header className="bg-blue-800 m-3 shadow-xl border border-blue-900 relative">
            <div className="container mx-auto flex items-center h-24 justify-between px-4 relative">
                <a href="/main" className="flex items-center group">
                    <img
                        className="h-16 md:h-20 transition-transform group-hover:scale-105"
                        src="/media/Logo.png"
                        alt="Logo"
                        style={{ borderRadius: "12px", border: "none" }}
                    />
                    <span className="ml-4 uppercase font-black text-xl md:text-3xl tracking-widest text-white group-hover:text-blue-200 transition drop-shadow-lg">
                        Voley Journal
                    </span>
                </a>
                {/* Botón hamburguesa solo visible en pantallas menores a sm */}
                <button
                    className="text-white sm:hidden focus:outline-none"
                    onClick={toggleMenu}
                >
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                    </svg>
                </button>
                {/* Menú responsive */}
                <nav className={`${isMenuOpen ? "block" : "hidden"} absolute top-full left-0 w-full bg-blue-800 sm:static sm:flex sm:w-auto z-50`}>
                    <ul className="text-white flex flex-col sm:flex-row gap-2 sm:gap-4 font-semibold text-base lg:text-lg px-2 sm:px-0 py-2 sm:py-0 w-full">
                        <li className="transition-all duration-200 px-4 py-2 sm:px-6 sm:py-3 rounded-full hover:bg-white hover:text-blue-800 hover:shadow-lg text-center sm:text-left whitespace-nowrap">
                            <a href="/news" className="transition hover:text-blue-800 block">Noticias</a>
                        </li>
                        {role === "admin" && (
                            <li className="transition-all duration-200 px-4 py-2 sm:px-6 sm:py-3 rounded-full hover:bg-white hover:text-blue-800 hover:shadow-lg text-center sm:text-left whitespace-nowrap">
                                <a href="/controlPanel" className="transition hover:text-blue-800 block">Panel de administración</a>
                            </li>
                        )}
                        {role === "coach" && (
                            <li className="transition-all duration-200 px-4 py-2 sm:px-6 sm:py-3 rounded-full hover:bg-white hover:text-blue-800 hover:shadow-lg text-center sm:text-left whitespace-nowrap">
                                <a href="/myteam" className="transition hover:text-blue-800 block">Mi equipo</a>
                            </li>
                        )}
                        {role === "journalist" && (
                            <li className="transition-all duration-200 px-4 py-2 sm:px-6 sm:py-3 rounded-full hover:bg-white hover:text-blue-800 hover:shadow-lg text-center sm:text-left whitespace-nowrap">
                                <a href="/createNews" className="transition hover:text-blue-800 block">Crear noticia</a>
                            </li>
                        )}
                        <li className="transition-all duration-200 px-4 py-2 sm:px-6 sm:py-3 rounded-full hover:bg-white hover:text-blue-800 hover:shadow-lg text-center sm:text-left whitespace-nowrap">
                            {token ? (
                                <a href="#" onClick={logout} className="transition hover:text-blue-800 block">Logout</a>
                            ) : (
                                <a href="/auth" className="transition hover:text-blue-800 block">Iniciar Sesión</a>
                            )}
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;