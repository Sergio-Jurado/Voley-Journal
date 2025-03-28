import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ShowTeam = ({ teamId }) => {
    const [team, setTeam] = useState(null);
    const [players, setPlayers] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    // Obtener los datos del equipo y sus jugadores
    useEffect(() => {
        fetch(`http://localhost:5000/api/teams/${teamId}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Error al obtener los datos del equipo');
                }
                return response.json();
            })
            .then((data) => {
                setTeam(data.team);
                setPlayers(data.players);
            })
            .catch((error) => setError(error.message));
    }, [teamId]);

    const handleEditTeam = () => {
        navigate(`/edit-team/${teamId}`);
    };

    const handleEditPlayer = (playerId) => {
        navigate(`/edit-player/${playerId}`);
    };

    if (error) {
        return <div className="text-red-500">{error}</div>;
    }

    if (!team) {
        return <div>No se ha encontrado el equipo</div>;
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Detalles del Equipo</h1>
            <div className="mb-4 p-4 border border-gray-300 rounded">
                <h2 className="text-xl font-bold">Nombre del Equipo: {team.name}</h2>
                <img
                    src={`http://localhost:5000/media/${team.logo}`}
                    alt="Logo del equipo"
                    className="w-32 h-32 object-cover mt-4"
                />
                <button
                    onClick={handleEditTeam}
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 mt-4"
                >
                    Editar Equipo
                </button>
            </div>
            <h2 className="text-xl font-bold mb-4">Jugadores</h2>
            {players.map((player) => (
                <div key={player._id} className="mb-4 p-4 border border-gray-300 rounded">
                    <h3 className="text-lg font-bold">
                        {player.name} {player.lastName}
                    </h3>
                    <p>Número: {player.number}</p>
                    <p>Posición: {player.position}</p>
                    <p>Nacionalidad: {player.nationality}</p>
                    <button
                        onClick={() => handleEditPlayer(player._id)}
                        className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700 mt-2"
                    >
                        Editar Jugador
                    </button>
                </div>
            ))}
        </div>
    );
};

export default ShowTeam;