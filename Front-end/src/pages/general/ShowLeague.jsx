import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const ShowLeague = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [league, setLeague] = useState(null);
    const [role, setRole] = useState(null);
    const [team, setTeam] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [message, setMessage] = useState("");
    const [teamsInLeague, setTeamsInLeague] = useState([]);

    useEffect(() => {
        const fetchLeagueAndTeams = async () => {
            try {
                const res = await fetch(`http://localhost:5000/api/leagues/getby/${id}`);
                const data = await res.json();
                setLeague(data);

                // Si league.teams es un array de IDs, obtenemos los datos de los equipos
                if (data.teams && data.teams.length > 0) {
                    // Si el primer elemento NO es un objeto, asumimos que son IDs
                    if (typeof data.teams[0] !== "object") {
                        const teamsRes = await fetch(`http://localhost:5000/api/teams/getmany`, {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({ teamIds: data.teams }),
                        });
                        const teamsData = await teamsRes.json();
                        setTeamsInLeague(teamsData);
                    } else {
                        setTeamsInLeague(data.teams);
                    }
                } else {
                    setTeamsInLeague([]);
                }
            } catch {
                setLeague(null);
                setTeamsInLeague([]);
            }
        };
        fetchLeagueAndTeams();
    }, [id, message]);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            setIsAuthenticated(false);
            setRole(null);
            setTeam(null);
            return;
        }
        setIsAuthenticated(true);
        const fetchUserAndTeam = async () => {
            try {
                const userRes = await fetch(`http://localhost:5000/api/users/getby/${token}`);
                const userData = await userRes.json();
                setRole(userData.role);

                if (userData.role === "coach") {
                    const teamRes = await fetch(`http://localhost:5000/api/teams/getbycoach/${token}`);
                    const teamData = await teamRes.json();
                    setTeam(teamData && teamData._id ? teamData : null);
                }
            } catch {
                setRole(null);
                setTeam(null);
            }
        };
        fetchUserAndTeam();
    }, []);

    const handleInscribirEquipo = async () => {
        if (!team || !league) return;
        try {
            const res = await fetch(`http://localhost:5000/api/leagues/${league._id}/addTeam`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ teamId: team._id }),
            });
            if (res.ok) {
                setMessage("¡Equipo inscrito correctamente en la liga!");
            } else {
                const error = await res.json();
                setMessage(error.message || "Error al inscribir el equipo.");
                console.log(error);
            }
        } catch (error) {
            console.error(error);
            setMessage("Error al inscribir el equipo.");
        }
    };

    if (!league) {
        return <div className="text-center py-10 text-blue-700 font-bold">Cargando liga...</div>;
    }

    const isTeamAlreadyInLeague =
        team && league.teams && league.teams.some(t => (typeof t === "object" ? t._id : t) === team._id);

    return (
        <div className="max-w-8xl mx-auto mt-10 p-8 bg-gradient-to-b from-blue-100 to-blue-50 rounded-2xl shadow-2xl border border-blue-200">
            <h1 className="text-4xl font-black text-blue-700 mb-4 text-center">{league.name}</h1>
            <div className="flex justify-center mb-8">
                <img
                    src={`http://localhost:5000/media/${league.logo}`}
                    alt={league.name}
                    className="w-32 h-32 object-cover rounded-full border-4 border-blue-300 shadow-lg"
                />
            </div>
            <p className="text-lg text-blue-900 font-semibold text-center mb-6">{league.description}</p>

            {/* Mostrar equipos inscritos */}
            <div className="mt-8">
                <h2 className="text-2xl font-bold text-blue-800 mb-2 text-center">Equipos inscritos</h2>
                {teamsInLeague.length > 0 ? (
                    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {teamsInLeague.map((t) => (
                            <li
                                key={t._id}
                                className="bg-white rounded-xl shadow p-3 flex flex-col items-center border border-blue-100 hover:shadow-lg transition-shadow duration-300"
                            >
                                <div className="w-16 h-16 mb-2 flex items-center justify-center bg-blue-50 rounded-full border-2 border-blue-200 shadow">
                                    <img
                                        src={t.logo ? `http://localhost:5000/media/${t.logo}` : "/default-team.png"}
                                        alt={t.name}
                                        className="w-14 h-14 object-cover rounded-full"
                                    />
                                </div>
                                <span className="font-bold text-blue-900 text-base text-center">{t.name}</span>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <div className="text-center text-blue-600">No hay equipos inscritos aún.</div>
                )}
            </div>

            {/* Mensaje de éxito o error */}
            {message && (
                <div className="text-center mb-4 font-semibold text-blue-700">{message}</div>
            )}

            {/* Botones solo para entrenadores autenticados */}
            {isAuthenticated && role === "coach" && (
                <div className="flex flex-col sm:flex-row gap-4 mt-8 justify-center">
                    {team && !isTeamAlreadyInLeague && (
                        <button
                            onClick={handleInscribirEquipo}
                            className="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-6 py-3 rounded-xl font-bold shadow hover:from-blue-700 hover:to-blue-900 transition"
                        >
                            Inscribir mi equipo en la liga
                        </button>
                    )}
                    {!team && (
                        <button
                            onClick={() => navigate("/createTeam")}
                            className="bg-gradient-to-r from-blue-400 to-blue-600 text-white px-6 py-3 rounded-xl font-bold shadow hover:from-blue-600 hover:to-blue-800 transition"
                        >
                            Crear mi equipo
                        </button>
                    )}
                </div>
            )}
        </div>
    );
};

export default ShowLeague;