import { useState, useEffect } from "react";

const CreatePlayer = () => {
    const [player, setPlayer] = useState({
        name: "",
        lastName: "",
        number: "",
        position: "",
        nationality: "",
        image: null,
        team: ""
    });
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);

    // Obtener el id del usuario (token) de localStorage
    const token = localStorage.getItem("token"); // token debe ser el _id del usuario

    // Obtener el equipo del entrenador
    useEffect(() => {
        const fetchTeam = async () => {
            try {
                const response = await fetch(`https://voley-journal.onrender.com/api/teams/getbycoach/${token}`);
                if (!response.ok) throw new Error("Error al obtener el equipo");
                const data = await response.json();
                if (data && data._id) {
                    setPlayer(prev => ({ ...prev, team: data._id }));
                }
            } catch (err) {
                console.error("Error fetching team:", err);
                setError("No se pudo obtener tu equipo. Crea un equipo antes de añadir jugadores.");
            }
        };
        if (token) fetchTeam();
    }, [token]);

    const handlePlayerChange = (field, value) => {
        setPlayer(prev => ({ ...prev, [field]: value }));
    };

    const handleImageChange = (file) => {
        setPlayer(prev => ({ ...prev, image: file }));
        if (file) {
            const reader = new FileReader();
            reader.onload = () => setImagePreview(reader.result);
            reader.readAsDataURL(file);
        } else {
            setImagePreview(null);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        try {
            const { name, lastName, number, position, nationality, image, team } = player;
            if (!name || !lastName || !number || !position || !nationality || !image || !team) {
                throw new Error("Todos los campos son obligatorios");
            }

            const formData = new FormData();
            formData.append("name", name);
            formData.append("lastName", lastName);
            formData.append("number", number);
            formData.append("position", position);
            formData.append("nationality", nationality);
            formData.append("team", team);
            formData.append("image", image);

            const response = await fetch("https://voley-journal.onrender.com/api/players/create", {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                throw new Error("Error al crear el jugador");
            }

            setSuccess("Jugador creado exitosamente");
            setPlayer({
                name: "",
                lastName: "",
                number: "",
                position: "",
                nationality: "",
                image: null,
                team: team // Mantén el equipo para crear más jugadores
            });
            setImagePreview(null);
        } catch (error) {
            setError(error.message);
            console.error("Error al crear el jugador:", error);
        }
    };

    return (
        <div className="max-w-7xl mx-auto p-8 bg-white shadow-2xl rounded-2xl border border-blue-100 ">
            <h1 className="text-3xl font-black text-center text-blue-700 mb-8 tracking-tight drop-shadow">Crear Jugador</h1>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="flex flex-col md:flex-row gap-8">
                    <div className="flex-1">
                        <div className="mb-4">
                            <label className="block text-lg font-semibold text-blue-900 mb-2">Nombre</label>
                            <input
                                type="text"
                                value={player.name}
                                onChange={e => handlePlayerChange("name", e.target.value)}
                                className="w-full p-3 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                                placeholder="Introduce el nombre del jugador"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-lg font-semibold text-blue-900 mb-2">Apellido</label>
                            <input
                                type="text"
                                value={player.lastName}
                                onChange={e => handlePlayerChange("lastName", e.target.value)}
                                className="w-full p-3 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                                placeholder="Introduce el apellido del jugador"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-lg font-semibold text-blue-900 mb-2">Número</label>
                            <input
                                type="number"
                                value={player.number}
                                onChange={e => handlePlayerChange("number", e.target.value)}
                                className="w-full p-3 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                                placeholder="Introduce el número del jugador"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-lg font-semibold text-blue-900 mb-2">Posición</label>
                            <select
                                value={player.position}
                                onChange={e => handlePlayerChange("position", e.target.value)}
                                className="w-full p-3 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                            >
                                <option value="">Selecciona una posición</option>
                                <option value="Setter">Setter</option>
                                <option value="Middle-blocker">Middle-blocker</option>
                                <option value="Attacker">Attacker</option>
                                <option value="Opposite">Opposite</option>
                                <option value="Libero">Libero</option>
                            </select>
                        </div>
                        <div className="mb-4">
                            <label className="block text-lg font-semibold text-blue-900 mb-2">Nacionalidad</label>
                            <input
                                type="text"
                                value={player.nationality}
                                onChange={e => handlePlayerChange("nationality", e.target.value)}
                                className="w-full p-3 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                                placeholder="Introduce la nacionalidad del jugador"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-lg font-semibold text-blue-900 mb-2">Foto del Jugador</label>
                            <input
                                type="file"
                                onChange={e => handleImageChange(e.target.files[0])}
                                className="w-full p-3 border border-blue-200 rounded-lg bg-blue-50"
                            />
                        </div>
                    </div>
                    <div className="flex flex-col items-center justify-center flex-1">
                        <div className="w-40 h-40 rounded-full bg-blue-100 flex items-center justify-center mb-4 border-4 border-blue-200 shadow">
                            {imagePreview ? (
                                <img
                                    src={imagePreview}
                                    alt="Preview"
                                    className="w-full h-full object-cover rounded-full"
                                />
                            ) : (
                                <span className="text-5xl text-blue-300 font-bold">?</span>
                            )}
                        </div>
                        <div className="text-center">
                            <span className="block text-xl font-bold text-blue-800">
                                {player.name || "Nombre"} {player.lastName || "Apellido"}
                            </span>
                            <span className="block text-blue-600 font-semibold">
                                {player.position || "Posición"}
                            </span>
                            <span className="block text-blue-400">
                                {player.nationality || "Nacionalidad"}
                            </span>
                            <span className="block text-blue-400">
                                {player.number ? `#${player.number}` : "#"}
                            </span>
                        </div>
                    </div>
                </div>
                {error && (
                    <div className="text-red-500 text-center font-medium">{error}</div>
                )}
                {success && (
                    <div className="text-green-500 text-center font-medium">{success}</div>
                )}
                <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white py-3 rounded-lg font-bold text-lg shadow hover:from-blue-600 hover:to-blue-800 transition"
                >
                    Crear Jugador
                </button>
            </form>
        </div>
    );
};

export default CreatePlayer;