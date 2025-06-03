import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

// Función de validación de marcador
function isValidScore(setsHome, setsAway) {
    if (
        typeof setsHome !== "number" ||
        typeof setsAway !== "number" ||
        isNaN(setsHome) ||
        isNaN(setsAway)
    ) return false;
    if (!((setsHome === 3 && setsAway <= 2) || (setsAway === 3 && setsHome <= 2))) return false;
    if (setsHome + setsAway > 5) return false;
    if (setsHome === 3 && setsAway === 3) return false;
    if (setsHome < 3 && setsAway < 3) return false;
    return true;
}

const ShowLeague = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [league, setLeague] = useState(null);
    const [role, setRole] = useState(null);
    const [team, setTeam] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [message, setMessage] = useState("");
    const [teamsInLeague, setTeamsInLeague] = useState([]);
    const [matches, setMatches] = useState([]);
    const [loading, setLoading] = useState(false);
    const [editScores, setEditScores] = useState({});
    const [isFinished, setIsFinished] = useState(false);

    // NUEVO: Estados para edición de liga
    const [editMode, setEditMode] = useState(false);
    const [editName, setEditName] = useState("");
    const [editLogo, setEditLogo] = useState(null);
    const [editPreview, setEditPreview] = useState(null);
    const [saving, setSaving] = useState(false);

    // PAGINACIÓN DE PARTIDOS
    const [matchesPage, setMatchesPage] = useState(0);
    const matchesPerPage = 11;
    const paginatedMatches = matches.slice(
        matchesPage * matchesPerPage,
        (matchesPage + 1) * matchesPerPage
    );

    useEffect(() => {
        const fetchLeagueAndTeams = async () => {
            try {
                const res = await fetch(`https://voley-journal.onrender.com/api/leagues/getby/${id}`);
                const data = await res.json();
                setLeague(data);

                if (data.teams && data.teams.length > 0) {
                    if (typeof data.teams[0] !== "object") {
                        const teamsRes = await fetch(`https://voley-journal.onrender.com/api/teams/getmany`, {
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
        const fetchMatches = async () => {
            try {
                const res = await fetch(`https://voley-journal.onrender.com/api/matches/byLeague/${id}`);
                if (res.ok) {
                    const data = await res.json();
                    setMatches(data);
                } else {
                    setMatches([]);
                }
            } catch {
                setMatches([]);
            }
        };
        fetchMatches();
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
                const userRes = await fetch(`https://voley-journal.onrender.com/api/users/getby/${token}`);
                const userData = await userRes.json();
                setRole(userData.role);

                if (userData.role === "coach") {
                    const teamRes = await fetch(`https://voley-journal.onrender.com/api/teams/getbycoach/${token}`);
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
        setLoading(true);
        try {
            const res = await fetch(`https://voley-journal.onrender.com/api/leagues/${league._id}/addTeam`, {
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
            }
        } catch (error) {
            setMessage("Error al inscribir el equipo.");
        }
        setLoading(false);
    };

    const handleStartLeague = async () => {
        if (!league) return;
        setLoading(true);
        try {
            const res = await fetch("https://voley-journal.onrender.com/api/leagues/start", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ leagueId: league._id }),
            });
            const data = await res.json();
            if (res.ok) {
                setMessage(data.message || "La liga ha comenzado.");
            } else {
                setMessage(data.message || "Error al iniciar la liga.");
            }
        } catch (error) {
            setMessage("Error al iniciar la liga.");
        }
        setLoading(false);
    };

    const handleScoreChange = (matchId, field, value) => {
        if (value === "" || /^[0-3]$/.test(value)) {
            setEditScores(prev => ({
                ...prev,
                [matchId]: {
                    ...prev[matchId],
                    [field]: value
                }
            }));
        }
    };

    const handleSaveScore = async (matchId) => {
        const match = matches.find(m => m._id === matchId);
        const setsHome = Number(editScores[matchId]?.setsHome ?? match.setsHome);
        const setsAway = Number(editScores[matchId]?.setsAway ?? match.setsAway);

        // Validación personalizada
        if (!isValidScore(setsHome, setsAway)) {
            setMessage("El resultado debe ser 3:x o x:3 (x entre 0 y 2) y la suma máxima de sets es 5.");
            return;
        }

        try {
            const res = await fetch(`https://voley-journal.onrender.com/api/matches/update/${matchId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ setsHome, setsAway }),
            });
            if (res.ok) {
                setMessage("Marcador actualizado");
                setEditScores(prev => {
                    const copy = { ...prev };
                    delete copy[matchId];
                    return copy;
                });
                const data = await res.json();
                setMatches(matches.map(m => m._id === matchId ? { ...m, setsHome: data.setsHome, setsAway: data.setsAway } : m));
            } else {
                setMessage("Error al actualizar el marcador");
            }
        } catch {
            setMessage("Error al actualizar el marcador");
        }
    };

    // ----------- EDICIÓN DE LIGA (ADMIN) -----------
    const startEdit = () => {
        setEditName(league.name);
        setEditLogo(null);
        setEditPreview(null);
        setEditMode(true);
    };

    const handleLogoChange = (e) => {
        const file = e.target.files[0];
        setEditLogo(file);
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setEditPreview(reader.result);
            reader.readAsDataURL(file);
        } else {
            setEditPreview(null);
        }
    };

    const handleEditLeague = async (e) => {
        e.preventDefault();
        setSaving(true);
        const formData = new FormData();
        formData.append("name", editName);
        if (editLogo) formData.append("logo", editLogo);

        try {
            const res = await fetch(`https://voley-journal.onrender.com/api/leagues/update/${league._id}`, {
                method: "PUT",
                body: formData,
            });
            if (res.ok) {
                // Refresca la liga tras editar
                const updatedRes = await fetch(`https://voley-journal.onrender.com/api/leagues/getby/${league._id}`);
                if (updatedRes.ok) {
                    const updatedLeague = await updatedRes.json();
                    setLeague(updatedLeague);
                }
                setEditMode(false);
                setMessage("Liga actualizada correctamente.");
            } else {
                setMessage("No se pudo actualizar la liga.");
            }
        } catch {
            setMessage("Error al actualizar la liga.");
        }
        setSaving(false);
    };
    // -----------------------------------------------

    if (!league) {
        return <div className="text-center py-10 text-blue-700 font-bold">Cargando liga...</div>;
    }

    const isTeamAlreadyInLeague =
        team && league.teams && league.teams.some(t => (typeof t === "object" ? t._id : t) === team._id);

    // Calcular clasificación por sets ganados
    const standings = teamsInLeague.map(team => {
        const setsWon = matches.reduce((acc, match) => {
            if (match.homeTeam?._id === team._id || match.homeTeam === team._id) {
                return acc + (match.setsHome || 0);
            }
            if (match.awayTeam?._id === team._id || match.awayTeam === team._id) {
                return acc + (match.setsAway || 0);
            }
            return acc;
        }, 0);
        return {
            ...team,
            setsWon
        };
    }).sort((a, b) => b.setsWon - a.setsWon);

    // NUEVO: comprobar si todos los partidos están finalizados (uno de los dos equipos tiene 3 sets)
    const allMatchesFinished = matches.length > 0 && matches.every(
        m => m.setsHome === 3 || m.setsAway === 3
    );

    return (
        <div className="max-w-8xl mx-auto mt-10 p-8 bg-gradient-to-b from-blue-100 to-blue-50 rounded-2xl shadow-2xl border border-blue-200">
            {/* EDICIÓN DE LIGA (ADMIN) */}
            <div className="flex items-center justify-center mb-8 gap-6 flex-wrap">
                {(editMode ? (editPreview || league.logo) : league.logo) && (
                    <img
                        src={editMode ? (editPreview || league.logo) : league.logo}
                        alt={league.name}
                        className="w-32 h-32 object-cover rounded-full border-4 border-blue-300 shadow-lg"
                    />
                )}
                {editMode ? (
                    <input
                        type="text"
                        className="text-3xl font-black text-blue-700 drop-shadow text-center border-b-2 border-blue-400 bg-blue-50 px-2 py-1 rounded"
                        value={editName}
                        onChange={e => setEditName(e.target.value)}
                        maxLength={40}
                    />
                ) : (
                    <h1 className="text-4xl font-black text-blue-700 mb-4 text-center">{league.name}</h1>
                )}
            </div>
            {isAuthenticated && role === "admin" && !editMode && (
                <div className="flex justify-center mb-4">
                    <button
                        onClick={startEdit}
                        className="flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-white px-6 py-2 rounded-xl font-bold shadow transition-all duration-200"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536M9 13l6-6m2 2l-6 6m2 2l-6 6m2 2l-6 6" />
                        </svg>
                        Editar liga
                    </button>
                </div>
            )}
            {isAuthenticated && role === "admin" && editMode && (
                <form onSubmit={handleEditLeague} className="max-w-md mx-auto mb-8 bg-white rounded-xl shadow p-6 flex flex-col gap-4 border border-blue-100">
                    <label className="font-semibold text-blue-800">
                        Nombre de la liga:
                        <input
                            type="text"
                            className="block w-full mt-1 border border-blue-300 rounded px-3 py-2"
                            value={editName}
                            onChange={e => setEditName(e.target.value)}
                            maxLength={40}
                            required
                        />
                    </label>
                    <label className="font-semibold text-blue-800">
                        Logo de la liga:
                        <input
                            type="file"
                            accept="image/*"
                            className="block w-full mt-1"
                            onChange={handleLogoChange}
                        />
                    </label>
                    {editPreview && (
                        <img src={editPreview} alt="Previsualización" className="w-24 h-24 object-cover rounded-full border-2 border-blue-300 mx-auto" />
                    )}
                    <div className="flex gap-4 justify-center mt-2">
                        <button
                            type="submit"
                            disabled={saving}
                            className="bg-gradient-to-r from-green-500 to-green-700 text-white px-6 py-2 rounded-xl font-bold shadow hover:from-green-700 hover:to-green-900 transition"
                        >
                            {saving ? "Guardando..." : "Guardar cambios"}
                        </button>
                        <button
                            type="button"
                            onClick={() => setEditMode(false)}
                            className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-6 py-2 rounded-xl font-bold shadow"
                        >
                            Cancelar
                        </button>
                    </div>
                </form>
            )}

            <p className="text-lg text-blue-900 font-semibold text-center mb-6">{league.description}</p>

            {/* Mostrar equipos inscritos */}
            <div className="mt-8">
                <h2 className="text-2xl font-bold text-blue-800 mb-2 text-center">Equipos inscritos</h2>
                {teamsInLeague.length === 12 && (
                    <div className="text-center text-green-600 font-bold text-lg mb-4">
                        Ya están todos los equipos inscritos.
                    </div>
                )}
                {teamsInLeague.length > 0 ? (
                    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {teamsInLeague.map((t) => (
                            <li
                                key={t._id}
                                className="bg-white rounded-xl shadow p-3 flex flex-col items-center border border-blue-100 hover:shadow-lg transition-shadow duration-300"
                            >
                                <div className="w-16 h-16 mb-2 flex items-center justify-center bg-blue-50 rounded-full border-2 border-blue-200 shadow">
                                    <img
                                        src={t.logo ? t.logo : "/default-team.png"}
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

            {/* Tabla de clasificación */}
            {matches.length > 0 && (
                <div className="mt-12 mb-8">
                    <h2 className="text-2xl font-bold text-blue-800 mb-4 text-center drop-shadow">Clasificación</h2>
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white rounded-2xl shadow-2xl border border-blue-200">
                            <thead>
                                <tr className="bg-gradient-to-r from-blue-400 to-blue-200 text-blue-900">
                                    <th className="py-4 px-6 text-center font-extrabold text-lg rounded-tl-2xl">Posición</th>
                                    <th className="py-4 px-6 text-center font-extrabold text-lg">Equipo</th>
                                    <th className="py-4 px-6 text-center font-extrabold text-lg rounded-tr-2xl">Sets ganados</th>
                                </tr>
                            </thead>
                            <tbody>
                                {standings.map((team, idx) => (
                                    <tr
                                        key={team._id}
                                        className={`border-t transition group ${idx % 2 === 0 ? "bg-blue-50" : "bg-white"
                                            } hover:bg-blue-100`}
                                    >
                                        <td className="py-4 px-6 text-center font-bold text-blue-700 text-lg">{idx + 1}</td>
                                        <td className="py-4 px-6 flex items-center gap-3 justify-center">
                                            <img
                                                src={team.logo ? team.logo : "/default-team.png"}
                                                alt={team.name}
                                                className="w-10 h-10 object-cover rounded-full border-2 border-blue-300 shadow"
                                            />
                                            <span className="font-bold text-blue-900 text-lg">{team.name}</span>
                                        </td>
                                        <td className="py-4 px-6 text-center text-green-700 font-extrabold text-lg">{team.setsWon}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Mostrar partidos programados con paginación */}
            {matches.length > 0 && (
                <div className="mt-12">
                    <h2 className="text-2xl font-bold text-blue-800 mb-6 text-center drop-shadow">Partidos programados</h2>
                    {/* Mensaje de éxito o error */}
                    {message && (
                        <div className="text-center mb-4 font-semibold text-blue-700">{message}</div>
                    )}
                    {/* Mensaje de liga finalizada */}
                    {isFinished && (
                        <div className="text-center mb-4 font-bold text-red-700 text-xl">
                            La liga ha finalizado. Los marcadores ya no se pueden editar.
                        </div>
                    )}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                        {paginatedMatches.map((match) => (
                            <div
                                key={match._id}
                                className="bg-white rounded-xl shadow-lg p-6 border border-blue-100 flex flex-col items-center"
                            >
                                <div className="flex items-center w-full justify-between mb-4">
                                    {/* Equipo local */}
                                    <div className="flex flex-col items-center w-1/3">
                                        <img
                                            src={match.homeTeam?.logo ? match.homeTeam.logo : "/default-team.png"}
                                            alt={match.homeTeam?.name || match.homeTeam}
                                            className="w-14 h-14 object-cover rounded-full border-2 border-blue-300 shadow mb-2"
                                        />
                                        <span className="font-bold text-blue-900 text-sm text-center">{match.homeTeam?.name || match.homeTeam}</span>
                                    </div>
                                    {/* Marcador */}
                                    <div className="flex flex-col items-center w-1/3">
                                        <span className="text-3xl font-extrabold text-blue-700 mb-1">
                                            {match.setsHome} <span className="mx-2 text-blue-400">:</span> {match.setsAway}
                                        </span>
                                        <span className="text-xs text-blue-500">{new Date(match.date).toLocaleString()}</span>
                                    </div>
                                    {/* Equipo visitante */}
                                    <div className="flex flex-col items-center w-1/3">
                                        <img
                                            src={match.awayTeam?.logo ? match.awayTeam.logo : "/default-team.png"}
                                            alt={match.awayTeam?.name || match.awayTeam}
                                            className="w-14 h-14 object-cover rounded-full border-2 border-blue-300 shadow mb-2"
                                        />
                                        <span className="font-bold text-blue-900 text-sm text-center">{match.awayTeam?.name || match.awayTeam}</span>
                                    </div>
                                </div>
                                {/* Si eres admin, muestra inputs para editar el marcador SOLO si la liga NO está finalizada */}
                                {isAuthenticated && role === "admin" && !isFinished && (
                                    <div className="flex items-center justify-center gap-2 mt-2">
                                        <input
                                            type="number"
                                            min={0}
                                            max={3}
                                            step={1}
                                            className="w-12 text-center border rounded font-bold text-green-700"
                                            value={
                                                editScores[match._id]?.setsHome !== undefined
                                                    ? editScores[match._id].setsHome
                                                    : match.setsHome !== undefined
                                                        ? match.setsHome
                                                        : ""
                                            }
                                            onChange={e => handleScoreChange(match._id, "setsHome", e.target.value)}
                                        />
                                        <span className="text-2xl font-bold text-blue-900 mx-1">:</span>
                                        <input
                                            type="number"
                                            min={0}
                                            max={3}
                                            step={1}
                                            className="w-12 text-center border rounded font-bold text-red-700"
                                            value={
                                                editScores[match._id]?.setsAway !== undefined
                                                    ? editScores[match._id].setsAway
                                                    : match.setsAway !== undefined
                                                        ? match.setsAway
                                                        : ""
                                            }
                                            onChange={e => handleScoreChange(match._id, "setsAway", e.target.value)}
                                        />
                                        <button
                                            className="ml-2 px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-700"
                                            onClick={() => handleSaveScore(match._id)}
                                        >
                                            Guardar
                                        </button>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                    {/* Paginación */}
                    <div className="flex justify-center mt-6 gap-2">
                        <button
                            className="px-4 py-2 bg-blue-200 rounded disabled:opacity-50"
                            onClick={() => setMatchesPage(matchesPage - 1)}
                            disabled={matchesPage === 0}
                        >
                            Anterior
                        </button>
                        <span className="px-4 py-2 font-bold text-blue-700">
                            Página {matchesPage + 1} de {Math.ceil(matches.length / matchesPerPage)}
                        </span>
                        <button
                            className="px-4 py-2 bg-blue-200 rounded disabled:opacity-50"
                            onClick={() => setMatchesPage(matchesPage + 1)}
                            disabled={(matchesPage + 1) * matchesPerPage >= matches.length}
                        >
                            Siguiente
                        </button>
                    </div>
                    {/* Botón para finalizar liga */}
                    {isAuthenticated && role === "admin" && allMatchesFinished && !isFinished && (
                        <div className="flex justify-center mt-8">
                            <button
                                className="bg-red-600 hover:bg-red-800 text-white px-6 py-3 rounded-xl font-bold shadow"
                                onClick={() => setIsFinished(true)}
                            >
                                Finalizar liga
                            </button>
                        </div>
                    )}
                </div>
            )}

            {/* Botones solo para entrenadores autenticados */}
            {isAuthenticated && role === "coach" && (
                <div className="flex flex-col sm:flex-row gap-4 mt-8 justify-center">
                    {team && !isTeamAlreadyInLeague && teamsInLeague.length < 12 && matches.length === 0 && (
                        <button
                            onClick={handleInscribirEquipo}
                            className="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-6 py-3 rounded-xl font-bold shadow hover:from-blue-700 hover:to-blue-900 transition"
                            disabled={loading}
                        >
                            {loading ? "Inscribiendo..." : "Inscribir mi equipo en la liga"}
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

            {/* Botón para empezar la liga (solo admin, 12 equipos y SIN partidos) */}
            {isAuthenticated && role === "admin" && teamsInLeague.length === 12 && matches.length === 0 && (
                <div className="flex justify-center mt-8">
                    <button
                        onClick={handleStartLeague}
                        className="bg-gradient-to-r from-green-500 to-green-700 text-white px-6 py-3 rounded-xl font-bold shadow hover:from-green-700 hover:to-green-900 transition"
                        disabled={loading}
                    >
                        {loading ? "Generando partidos..." : "Empezar liga (generar partidos)"}
                    </button>
                </div>
            )}
        </div>
    );
};

export default ShowLeague;