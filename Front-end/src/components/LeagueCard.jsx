

const LeagueCard = () => {
    return (
        <div className="max-w-sm bg-blue-100 rounded-lg shadow-lg overflow-hidden">
            {/* Imagen */}
            <img
                className="p-2 w-full h-48 object-cover rounded-xl"
                src="https://via.placeholder.com/400x200" // Reemplaza con tu imagen
                alt="League"
            />

            {/* Contenido */}
            <div className="p-4">
                {/* Título */}
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                    Liga Nacional de Voleibol
                </h2>

                {/* Descripción */}
                <p className="text-gray-600 text-sm mb-4">
                    Información básica de la liga, como detalles breves sobre equipos y jornadas.
                </p>

                {/* Botón */}
                <button
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition duration-300 w-full"
                >
                    Ver más
                </button>
            </div>
        </div>
    )
}

export default LeagueCard

