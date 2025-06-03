const PlayerCard = ({ player }) => {
    return (
        <div className="relative bg-blue-50 rounded-2xl shadow-xl p-5 flex flex-row items-center border-2 border-blue-200 hover:shadow-2xl transition-shadow duration-300">
            {player.image && (
                <img
                    src={player.image}
                    alt={`${player.name} ${player.lastName}`}
                    className="w-20 h-20 object-cover rounded-full border-4 border-blue-400 shadow-md mr-6"
                />
            )}
            <div className="flex-1">
                <h2 className="text-2xl font-extrabold text-blue-700 mb-1 tracking-tight">
                    {player.name} {player.lastName}
                </h2>
                <div className="flex items-center gap-3 mb-2">
                    <span className="bg-blue-100 text-blue-700 font-bold px-3 py-1 rounded-full text-lg shadow">
                        #{player.number}
                    </span>
                    <span className="text-blue-500 font-semibold">{player.position}</span>
                </div>
                <p className="text-sm text-blue-900 font-medium">{player.nationality}</p>
            </div>
        </div>
    );
};

export default PlayerCard;