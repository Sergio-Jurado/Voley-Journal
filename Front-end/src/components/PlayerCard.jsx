const PlayerCard = ({ player, onEdit }) => {
    return (
        <div className="mb-6 p-6 bg-white rounded-xl shadow-md border border-gray-200 hover:shadow-xl transition-shadow duration-300 flex flex-col items-center">
            <div className="flex flex-col items-center mb-4">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-2">
                    <span className="text-2xl font-bold text-blue-700">
                        {player.number}
                    </span>
                </div>
                <h3 className="text-xl font-extrabold text-blue-800 text-center">
                    {player.name} {player.lastName}
                </h3>
            </div>
            <div className="text-center mb-4">
                <p className="text-gray-700">
                    <span className="font-semibold">Posición:</span> {player.position}
                </p>
                <p className="text-gray-700">
                    <span className="font-semibold">Nacionalidad:</span> {player.nationality}
                </p>
            </div>
            <button
                onClick={onEdit}
                className="bg-green-500 text-white py-2 px-6 rounded-lg hover:bg-green-600 transition-colors duration-200"
            >
                Editar Jugador
            </button>
        </div>
    );
};

export default PlayerCard;