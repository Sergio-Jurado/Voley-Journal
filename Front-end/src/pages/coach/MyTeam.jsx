import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PlayerCard from "../../components/PlayerCard"; // Ajusta la ruta si es necesario

const MyTeam = () => {
    const [team, setTeam] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [editName, setEditName] = useState("");
    const [editLogo, setEditLogo] = useState(null);
    const [editPreview, setEditPreview] = useState(null);
    const [saving, setSaving] = useState(false);
    const navigate = useNavigate();

    // Obtener el id del usuario (token) de localStorage
    const token = localStorage.getItem("token"); // token debe ser el _id del usuario

    useEffect(() => {
        const fetchTeam = async () => {
            try {
                const res = await fetch(`https://voley-journal.onrender.com/api/teams/getbycoach/${token}`);
                if (!res.ok) {
                    throw new Error("No se pudo obtener el equipo");
                }
                const data = await res.json();
                setTeam(data);
            } catch (error) {
                setError(error.message);
                setTeam(null);
            } finally {
                setLoading(false);
            }
        };
        if (token) fetchTeam();
        else setLoading(false);
    }, [token]);

    // Función para eliminar jugador
    const handleDeletePlayer = async (playerId, playerName) => {
        if (window.confirm(`¿Seguro que quieres eliminar a ${playerName}?`)) {
            try {
                const res = await fetch(`http://localhost:5000/api/players/delete/${playerId}`, {
                    method: "DELETE",
                });
                if (res.ok) {
                    setTeam(prev => ({
                        ...prev,
                        players: prev.players.filter(p => p._id !== playerId)
                    }));
                } else {
                    alert("No se pudo eliminar el jugador.");
                }
            } catch {
                alert("Error al eliminar el jugador.");
            }
        }
    };

    // Función para guardar cambios del equipo
    const handleEditTeam = async (e) => {
        e.preventDefault();
        setSaving(true);
        const formData = new FormData();
        formData.append("name", editName);
        if (editLogo) formData.append("logo", editLogo);

        try {
            const res = await fetch(`http://localhost:5000/api/teams/update/${team._id}`, {
                method: "PUT",
                body: formData,
            });
            if (res.ok) {
                setTimeout(async () => {
                    const updatedRes = await fetch(`http://localhost:5000/api/teams/getbycoach/${token}`);
                    if (updatedRes.ok) {
                        const updatedTeam = await updatedRes.json();
                        setTeam(updatedTeam);
                    }
                    setEditMode(false);
                }, 500); // 500ms de espera
            } else {
                alert("No se pudo actualizar el equipo.");
            }
        } catch {
            alert("Error al actualizar el equipo.");
        }
        setSaving(false);
    };

    // Al entrar en modo edición, inicializa los valores
    const startEdit = () => {
        setEditName(team.name);
        setEditLogo(null);
        setEditPreview(null);
        setEditMode(true);
    };

    // Previsualización de imagen
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

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[40vh]">
                <span className="text-blue-600 text-2xl font-bold animate-pulse">Cargando equipo...</span>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-[40vh]">
                <span className="text-red-600 text-xl font-semibold">{error}</span>
            </div>
        );
    }

    if (!team || Object.keys(team).length === 0) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[40vh] bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl shadow-lg p-10">
                <p className="mb-6 text-xl text-blue-900 font-semibold text-center">
                    Todavía no tienes un equipo, créalo ahora mismo.
                </p>
                <button
                    onClick={() => navigate("/createTeam")}
                    className="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-8 py-3 rounded-xl font-bold shadow-lg hover:from-blue-600 hover:to-blue-800 transition text-lg"
                >
                    Crear equipo
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-8xl mx-auto p-8 bg-gradient-to-b from-blue-200 to-blue-50 rounded-2xl shadow-2xl border border-blue-100">
            {/* Imagen y nombre del club alineados horizontalmente */}
            <div className="flex items-center justify-center mb-8 gap-6 flex-wrap">
                {(editMode ? (editPreview || team.logo) : team.logo) && (
                    <img
                        src={editMode ? (editPreview || team.logo) : team.logo}
                        alt={team.name}
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
                    <h1 className="text-4xl font-black text-blue-700 drop-shadow text-center">{team.name}</h1>
                )}
            </div>
            {/* Botón editar equipo solo si eres el entrenador */}
            {!editMode && (
                <div className="flex justify-center mb-4">
                    <button
                        onClick={startEdit}
                        className="flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-white px-6 py-2 rounded-xl font-bold shadow transition-all duration-200"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536M9 13l6-6m2 2l-6 6m2 2l-6 6m2 2l-6 6" />
                        </svg>
                        Editar equipo
                    </button>
                </div>
            )}
            {/* Formulario de edición */}
            {editMode && (
                <form onSubmit={handleEditTeam} className="max-w-md mx-auto mb-8 bg-white rounded-xl shadow p-6 flex flex-col gap-4 border border-blue-100">
                    <label className="font-semibold text-blue-800">
                        Nombre del equipo:
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
                        Logo del equipo:
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
            {/* Nombre del entrenador */}
            <p className="text-lg text-blue-900 font-semibold text-center mb-6">
                Entrenador: {team.coach}
            </p>
            {(!team.players || team.players.length === 0) ? (
                <div className="flex flex-col items-center mt-8">
                    <p className="mb-4 text-lg text-gray-700 font-medium">
                        ¡Aún no tienes jugadores en tu equipo!
                    </p>
                    <button
                        onClick={() => navigate("/createPlayer")}
                        className="bg-gradient-to-r from-blue-400 to-blue-600 text-white px-8 py-3 rounded-xl font-bold shadow-lg hover:from-blue-600 hover:to-blue-800 transition text-lg"
                    >
                        Añadir jugadores
                    </button>
                </div>
            ) : (
                <>
                    {/* Título jugadores */}
                    <h2 className="text-2xl font-bold text-blue-800 mt-10 mb-6 text-center tracking-wide">Jugadores</h2>
                    <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                        {team.players.map((player) => (
                            <div key={player._id} className="relative">
                                <PlayerCard player={player} />
                                <button
                                    onClick={() => handleDeletePlayer(player._id, player.name)}
                                    className="absolute top-2 right-2 flex items-center gap-1 bg-gradient-to-r from-red-500 to-red-700 hover:from-red-700 hover:to-red-900 text-white px-4 py-2 rounded-full font-bold shadow-lg text-xs transition-all duration-200 border-2 border-white/80 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-400"
                                    title="Eliminar jugador"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                    Eliminar jugador
                                </button>
                            </div>
                        ))}
                    </div>
                    {team.players.length < 12 && (
                        <div className="flex flex-col items-center mt-8">
                            <button
                                onClick={() => navigate("/createPlayer")}
                                className="bg-gradient-to-r from-blue-400 to-blue-600 text-white px-8 py-3 rounded-xl font-bold shadow-lg hover:from-blue-600 hover:to-blue-800 transition text-lg"
                            >
                                Añadir jugadores
                            </button>
                            <p className="mt-2 text-gray-500 text-sm">
                                Puedes añadir hasta 12 jugadores.
                            </p>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default MyTeam;