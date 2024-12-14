import img from "../../../media/Logo.png";
import { useState } from "react";

export const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <header className="bg-blue-900 rounded-md m-2 text-white relative">
            <div className="container mx-auto flex items-center h-24 justify-between px-4 relative">
                {/* Logo */}
                <a href="/" className="flex items-center">
                    <img className="h-12 md:h-16" src={img} alt="Logo" />
                    <span className="ml-4 uppercase font-black text-sm md:text-lg">
                        Voley Journal
                    </span>
                </a>

                {/* Botón de menú móvil */}
                <button
                    className="text-white md:hidden focus:outline-none"
                    onClick={toggleMenu}
                >
                    <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 6h16M4 12h16m-7 6h7"
                        ></path>
                    </svg>
                </button>

                {/* Navegación */}
                <nav
                    className={`${isMenuOpen ? "block" : "hidden"} absolute top-full left-0 w-full bg-blue-900 md:static md:block md:w-auto z-50 rounded-md`}
                >
                    <ul className="flex flex-col md:flex-row md:space-x-3 font-semibold text-base lg:text-lg">
                        <li className="p-3 md:p-5 xl:p-8 active">
                            <a href="/">Home</a>
                        </li>
                        <li className="p-3 md:p-5 xl:p-8">
                            <a href="/about">About</a>
                        </li>
                        <li className="p-3 md:p-5 xl:p-8">
                            <a href="/projects">Projects</a>
                        </li>
                        <li className="p-3 md:p-5 xl:p-8">
                            <a href="/services">Services</a>
                        </li>
                        <li className="p-3 md:p-5 xl:p-8">
                            <a href="/blog">Blog</a>
                        </li>
                    </ul>
                </nav>

                {/* Botón de Login */}
                <button className="hidden md:block border border-white rounded-full font-bold px-4 py-2">
                    Logout
                </button>
            </div>
        </header>
    );
};


