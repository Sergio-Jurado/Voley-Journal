import { Link } from "react-router-dom";

const LandingPage = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 flex flex-col items-center justify-center px-2">
            <div className="bg-white bg-opacity-95 rounded-xl shadow-xl p-8 w-full max-w-4xl flex flex-col items-center border border-blue-200">
                <img
                    src="/media/Logo.png"
                    alt="Voley Journal Logo"
                    className="w-20 h-20 mb-4 rounded-full shadow border-2 border-blue-200"
                />
                <h1 className="text-3xl font-extrabold text-blue-800 mb-3 text-center drop-shadow">Bienvenido a Voley Journal</h1>
                <p className="text-base text-blue-900 mb-5 text-center">
                    <span className="font-bold">Voley Journal</span> es la plataforma definitiva para la gestión y seguimiento de ligas, equipos, jugadores y noticias de voleibol.<br />
                    Crea y administra ligas, gestiona equipos y jugadores, consulta clasificaciones, partidos y mantente informado con las últimas noticias del voleibol.
                </p>
                <ul className="mb-7 text-blue-800 text-sm list-disc list-inside text-left w-full max-w-2xl mx-auto space-y-2">
                    <li>
                        <span className="font-semibold">Administradores:</span>
                        <ul className="list-disc list-inside ml-5 space-y-1">
                            <li>Crear, editar y eliminar ligas.</li>
                            <li>Gestionar equipos y usuarios.</li>
                            <li>Ver y eliminar usuarios.</li>
                            <li>Editar nombre y logo de cualquier liga.</li>
                            <li>Generar y gestionar partidos de las ligas.</li>
                            <li>Editar resultados de partidos.</li>
                            <li>Finalizar ligas.</li>
                        </ul>
                    </li>
                    <li>
                        <span className="font-semibold">Coaches:</span>
                        <ul className="list-disc list-inside ml-5 space-y-1">
                            <li>Crear y editar su propio equipo.</li>
                            <li>Editar nombre y logo de su equipo.</li>
                            <li>Añadir y eliminar jugadores.</li>
                            <li>Inscribir su equipo en una liga disponible.</li>
                            <li>Consultar partidos y clasificaciones de la liga.</li>
                        </ul>
                    </li>
                    <li>
                        <span className="font-semibold">Periodistas:</span>
                        <ul className="list-disc list-inside ml-5 space-y-1">
                            <li>Publicar, editar y eliminar noticias.</li>
                            <li>Ver y gestionar todas las noticias de la plataforma.</li>
                        </ul>
                    </li>
                    <li>
                        <span className="font-semibold">Usuarios registrados:</span>
                        <ul className="list-disc list-inside ml-5 space-y-1">
                            <li>Ver ligas, equipos, jugadores y noticias.</li>
                            <li>Consultar clasificaciones y partidos.</li>
                        </ul>
                    </li>
                    <li>
                        <span className="font-semibold">Visitantes:</span>
                        <ul className="list-disc list-inside ml-5 space-y-1">
                            <li>Consultar noticias públicas.</li>
                            <li>Ver información general de ligas y equipos.</li>
                        </ul>
                    </li>
                </ul>
                <div className="flex flex-col sm:flex-row gap-3 w-full justify-center mt-2">
                    <Link
                        to="/auth"
                        className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-6 rounded-lg shadow transition text-center"
                    >
                        Iniciar Sesión
                    </Link>
                    <Link
                        to="/news"
                        className="bg-white border border-blue-400 text-blue-700 font-bold py-2 px-6 rounded-lg shadow hover:bg-blue-100 transition text-center"
                    >
                        Ver Noticias
                    </Link>
                    <Link
                        to="/main"
                        className="bg-white border border-green-400 text-green-700 font-bold py-2 px-6 rounded-lg shadow hover:bg-green-100 transition text-center"
                    >
                        Ver Ligas
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;