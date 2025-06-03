import { useNavigate } from 'react-router-dom';

const ControlPanel = () => {
    const navigate = useNavigate();

    return (
        <div className="max-w-6xl mx-auto mt-16 p-8 bg-white rounded-2xl shadow-2xl border border-blue-100 flex flex-col items-center">
            <h1 className="text-3xl font-black text-blue-700 mb-8 tracking-tight drop-shadow text-center">Panel de Administración</h1>
            <div className="flex flex-col md:flex-row gap-6 w-full justify-center">
                <button
                    onClick={() => navigate('/createLeague')}
                    className="w-full md:w-auto bg-gradient-to-r from-blue-500 to-blue-700 text-white py-3 px-8 rounded-lg font-bold text-lg shadow hover:from-blue-600 hover:to-blue-800 transition"
                >
                    Crear Liga
                </button>
                <button
                    onClick={() => navigate('/showUsers')}
                    className="w-full md:w-auto bg-gradient-to-r from-green-500 to-green-700 text-white py-3 px-8 rounded-lg font-bold text-lg shadow hover:from-green-600 hover:to-green-800 transition"
                >
                    Ver Usuarios
                </button>
                <button
                    onClick={() => navigate('/deleteLeague')}
                    className="w-full md:w-auto bg-gradient-to-r from-red-500 to-red-700 text-white py-3 px-8 rounded-lg font-bold text-lg shadow hover:from-red-600 hover:to-red-900 transition"
                >
                    Eliminar Liga
                </button>
            </div>
        </div>
    );
};

export default ControlPanel;