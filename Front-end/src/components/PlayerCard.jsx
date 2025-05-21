const PlayerCard = ({ player, onEdit }) => {
    return (
        <div className="mb-4 p-4 border border-gray-300 rounded">
            <h3 className="text-lg font-bold">
                {player.name} {player.lastName}
            </h3>
            <p>Número: {player.number}</p>
            <p>Posición: {player.position}</p>
            <p>Nacionalidad: {player.nationality}</p>
            <button
                onClick={onEdit}
                className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700 mt-2"
            >
                Editar Jugador
            </button>
        </div>
    );
};

export default PlayerCard;