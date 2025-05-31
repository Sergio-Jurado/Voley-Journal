import { Link } from "react-router-dom";
import logo from "../../../../Back-end/media/logo.png"; // Asegúrate de que la ruta al logo sea correcta

const LandingPage = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 flex flex-col items-center justify-center px-4">
            <div className="bg-white bg-opacity-90 rounded-2xl shadow-2xl p-10 max-w-2xl w-full flex flex-col items-center">
                <img src={logo} alt="Voley Journal Logo" className="w-24 h-24 mb-6 rounded-full shadow-lg border-4 border-blue-200" />
                <h1 className="text-4xl font-extrabold text-blue-800 mb-4 text-center drop-shadow">Bienvenido a Voley Journal</h1>
                <p className="text-lg text-blue-900 mb-6 text-center">
                    <span className="font-bold">Voley Journal</span> es la plataforma definitiva para la gestión y seguimiento de ligas, equipos, jugadores y noticias de voleibol.
                    Aquí podrás crear y administrar tus propias ligas, gestionar equipos, registrar jugadores y mantenerte informado con las últimas noticias del mundo del voleibol.
                </p>
                <ul className="mb-8 text-blue-800 text-base list-disc list-inside text-left w-full max-w-md mx-auto">
                    <li><span className="font-semibold">Administradores:</span> Gestiona ligas, equipos y usuarios fácilmente.</li>
                    <li><span className="font-semibold">Coaches:</span> Administra tu equipo y jugadores de forma sencilla.</li>
                    <li><span className="font-semibold">Periodistas:</span> Publica y edita noticias para la comunidad.</li>
                </ul>
                <div className="flex flex-col md:flex-row gap-4 w-full justify-center">
                    <Link
                        to="/auth"
                        className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-3 px-8 rounded-lg shadow transition text-center"
                    >
                        Iniciar Sesión
                    </Link>
                    <Link
                        to="/news"
                        className="bg-white border border-blue-400 text-blue-700 font-bold py-3 px-8 rounded-lg shadow hover:bg-blue-100 transition text-center"
                    >
                        Ver Noticias
                    </Link>
                    <Link
                        to="/main"
                        className="bg-white border border-green-400 text-green-700 font-bold py-3 px-8 rounded-lg shadow hover:bg-green-100 transition text-center"
                    >
                        Ver Ligas
                    </Link>
                </div>
            </div>
            <footer className="mt-10 text-blue-700 text-sm opacity-70">
                &copy; {new Date().getFullYear()} Voley Journal. Todos los derechos reservados.
            </footer>
        </div>
    );
};

export default LandingPage;