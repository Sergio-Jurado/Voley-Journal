import { useState, useEffect } from "react";

const CreatePlayer = () => {
    const [players, setPlayers] = useState([
        { name: "", lastName: "", number: "", position: "", nationality: "", photo: null, team: "" }
    ]); // Lista de jugadores
    const [teams, setTeams] = useState([]); // Lista de equipos disponibles
    const [error, setError] = useState(null); // Manejo de errores
    const [success, setSuccess] = useState(null); // Manejo de éxito

    // Obtener la lista de equipos desde el backend
    useEffect(() => {
        const fetchTeams = async () => {
            try {
                const response = await fetch("http://localhost:5000/api/teams");
                if (!response.ok) {
                    throw new Error("Error al obtener los equipos");
                }
                const data = await response.json();
                setTeams(data);
            } catch (err) {
                console.error(err.message);
            }
        };

        fetchTeams();
    }, []);

    // Manejar el cambio de los datos del jugador
    const handlePlayerChange = (index, field, value) => {
        const updatedPlayers = [...players];
        updatedPlayers[index][field] = value;
        setPlayers(updatedPlayers);
    };

    // Manejar el cambio de la foto del jugador
    const handlePhotoChange = (index, file) => {
        const updatedPlayers = [...players];
        updatedPlayers[index].photo = file;
        setPlayers(updatedPlayers);
    };

    // Añadir un nuevo jugador
    const handleAddPlayer = () => {
        setPlayers([
            ...players,
            { name: "", lastName: "", number: "", position: "", nationality: "", photo: null, team: "" }
        ]);
    };

    // Manejar el envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        try {
            for (const player of players) {
                if (!player.name || !player.lastName || !player.number || !player.position || !player.nationality || !player.photo || !player.team) {
                    throw new Error("Todos los campos son obligatorios para cada jugador");
                }

                const formData = new FormData();
                formData.append("name", player.name);
                formData.append("lastName", player.lastName);
                formData.append("number", player.number);
                formData.append("position", player.position);
                formData.append("nationality", player.nationality);
                formData.append("team", player.team);
                formData.append("photo", player.photo);

                const response = await fetch("http://localhost:5000/api/players/create", {
                    method: "POST",
                    body: formData,
                });

                if (!response.ok) {
                    throw new Error("Error al crear un jugador");
                }
            }

            setSuccess("Jugadores creados exitosamente");
            setPlayers([{ name: "", lastName: "", number: "", position: "", nationality: "", photo: null, team: "" }]); // Reiniciar el formulario
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
            <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">Crear Jugadores</h1>
            <form onSubmit={handleSubmit} className="space-y-6">
                {players.map((player, index) => (
                    <div
                        key={index}
                        className="border border-gray-300 p-4 rounded-lg bg-gray-50 shadow-sm mb-4"
                    >
                        <h3 className="text-xl font-bold text-gray-700 mb-4">
                            Jugador {index + 1}
                        </h3>
                        <div className="mb-4">
                            <label className="block text-lg font-medium text-gray-700 mb-2">
                                Nombre
                            </label>
                            <input
                                type="text"
                                value={player.name}
                                onChange={(e) =>
                                    handlePlayerChange(index, "name", e.target.value)
                                }
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Introduce el nombre del jugador"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-lg font-medium text-gray-700 mb-2">
                                Apellido
                            </label>
                            <input
                                type="text"
                                value={player.lastName}
                                onChange={(e) =>
                                    handlePlayerChange(index, "lastName", e.target.value)
                                }
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Introduce el apellido del jugador"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-lg font-medium text-gray-700 mb-2">
                                Número
                            </label>
                            <input
                                type="number"
                                value={player.number}
                                onChange={(e) =>
                                    handlePlayerChange(index, "number", e.target.value)
                                }
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Introduce el número del jugador"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-lg font-medium text-gray-700 mb-2">
                                Posición
                            </label>
                            <select
                                value={player.position}
                                onChange={(e) =>
                                    handlePlayerChange(index, "position", e.target.value)
                                }
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                            <label className="block text-lg font-medium text-gray-700 mb-2">
                                Nacionalidad
                            </label>
                            <input
                                type="text"
                                value={player.nationality}
                                onChange={(e) =>
                                    handlePlayerChange(index, "nationality", e.target.value)
                                }
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Introduce la nacionalidad del jugador"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-lg font-medium text-gray-700 mb-2">
                                Equipo
                            </label>
                            <select
                                value={player.team}
                                onChange={(e) =>
                                    handlePlayerChange(index, "team", e.target.value)
                                }
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">Selecciona un equipo</option>
                                {teams.map((team) => (
                                    <option key={team._id} value={team._id}>
                                        {team.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-lg font-medium text-gray-700 mb-2">
                                Foto del Jugador
                            </label>
                            <input
                                type="file"
                                onChange={(e) => handlePhotoChange(index, e.target.files[0])}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>
                ))}
                <button
                    type="button"
                    onClick={handleAddPlayer}
                    className="mt-4 bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition duration-200"
                >
                    Añadir Jugador
                </button>
                {error && (
                    <div className="text-red-500 text-center font-medium">{error}</div>
                )}
                {success && (
                    <div className="text-green-500 text-center font-medium">{success}</div>
                )}
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition duration-200"
                >
                    Crear Jugadores
                </button>
            </form>
        </div>
    );
};

export default CreatePlayer;