import img from "../../../media/Logo.png";
import { useState } from "react";
import useLogout from "../utils/useLogout";
//import useUserInfo from "../utils/useUserInfo";

export const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    //const { userInfo } = useUserInfo();
    const logout = useLogout();

    //console.log(userInfo.role);

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

                        {/*userInfo.role === 'admin' && (
                            <li className="p-3 md:p-5 xl:p-8">
                                <a href="/">Panel de Administrador</a>
                            </li>
                        )*/}

                        <li className="p-3 md:p-5 xl:p-8">
                            <a href="/">Home</a>
                        </li>

                        <li className='p-3 md:p-5 xl:p-8'>
                            <a onClick={logout}>Logout</a>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};


