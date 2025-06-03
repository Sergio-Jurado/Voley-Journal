import { useEffect, useState } from "react";

const DeleteLeague = () => {
    const [leagues, setLeagues] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");

    // Obtener todas las ligas
    useEffect(() => {
        const fetchLeagues = async () => {
            setLoading(true);
            try {
                const res = await fetch("https://voley-journal.onrender.com/api/leagues/get");
                const data = await res.json();
                setLeagues(data);
            } catch {
                setLeagues([]);
            }
            setLoading(false);
        };
        fetchLeagues();
    }, [message]);

    // Eliminar liga y sus partidos asociados
    const handleDelete = async (leagueId) => {
        if (!window.confirm("¿Seguro que quieres eliminar esta liga y todos sus partidos?")) return;
        try {
            // Elimina los partidos asociados primero
            await fetch(`https://voley-journal.onrender.com/api/matches/deleteByLeague/${leagueId}`, {
                method: "DELETE",
            });
            // Luego elimina la liga
            const res = await fetch(`https://voley-journal.onrender.com/api/leagues/delete/${leagueId}`, {
                method: "DELETE",
            });
            if (res.ok) {
                setMessage("Liga eliminada correctamente.");
            } else {
                setMessage("No se pudo eliminar la liga.");
            }
        } catch {
            setMessage("Error al eliminar la liga.");
        }
    };

    return (
        <div className="max-w-4xl mx-auto mt-12 p-8 bg-white rounded-2xl shadow-2xl border border-blue-100">
            <h1 className="text-2xl font-black text-blue-700 mb-8 text-center">Eliminar Ligas</h1>
            {message && (
                <div className="mb-4 text-center font-semibold text-blue-700">{message}</div>
            )}
            {loading ? (
                <div className="text-center text-blue-600 font-bold">Cargando ligas...</div>
            ) : leagues.length === 0 ? (
                <div className="text-center text-gray-500">No hay ligas registradas.</div>
            ) : (
                <ul className="space-y-4">
                    {leagues.map((league) => (
                        <li key={league._id} className="flex items-center justify-between bg-blue-50 rounded-lg p-4 shadow border border-blue-100">
                            <div className="flex items-center gap-4">
                                <img
                                    src={league.logo}
                                    alt={league.name}
                                    className="w-14 h-14 object-cover rounded-full border-2 border-blue-300"
                                />
                                <div>
                                    <div className="font-bold text-blue-900 text-lg">{league.name}</div>
                                    <div className="text-blue-700 text-sm">{league.description}</div>
                                </div>
                            </div>
                            <button
                                onClick={() => handleDelete(league._id)}
                                className="bg-gradient-to-r from-red-500 to-red-700 hover:from-red-700 hover:to-red-900 text-white px-6 py-2 rounded-xl font-bold shadow transition"
                            >
                                Eliminar
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default DeleteLeague;