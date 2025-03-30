import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const ShowLeague = () => {
    const { id } = useParams();
    const [league, setLeague] = useState(null);
    const [teams, setTeams] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchLeagueData = async () => {
            try {
                const leagueResponse = await fetch(`http://localhost:5000/api/leagues/getby/${id}`);
                if (!leagueResponse.ok) {
                    throw new Error("Error al obtener los datos de la liga");
                }
                const leagueData = await leagueResponse.json();
                setLeague(leagueData);

                const teamsResponse = await fetch(`http://localhost:5000/api/teams/getby/${id}`);
                if (!teamsResponse.ok) {
                    throw new Error("Error al obtener los equipos de la liga");
                }
                const teamsData = await teamsResponse.json();
                setTeams(teamsData);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchLeagueData();
    }, [id]);

    if (loading) {
        return <p className="text-gray-500 text-lg text-center">Cargando datos de la liga...</p>;
    }

    if (error) {
        return <p className="text-red-500 text-lg text-center">{error}</p>;
    }

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
            <div className="text-center mb-6">
                {league?.logo && (
                    <img
                        src={`http://localhost:5000/media/${league.logo}`}
                        alt={league.name}
                        className="w-32 h-32 object-cover rounded-full mx-auto mb-4"
                    />
                )}
                <h1 className="text-3xl font-bold text-blue-600">{league.name}</h1>
            </div>

            <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Equipos</h2>
                {teams.length === 0 ? (
                    <p className="text-red-500 text-lg">No hay equipos registrados en esta liga.</p>
                ) : (
                    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {teams.map((team) => (
                            <li
                                key={team._id}
                                className="bg-gray-100 p-4 rounded-lg shadow-md flex flex-col items-center"
                            >
                                {team.logo && (
                                    <img
                                        src={`http://localhost:5000/media/${team.logo}`}
                                        alt={team.name}
                                        className="w-20 h-20 object-cover rounded-full mb-2"
                                    />
                                )}
                                <p className="text-lg font-medium text-gray-800">{team.name}</p>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default ShowLeague;