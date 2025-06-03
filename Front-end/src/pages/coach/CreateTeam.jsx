import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CreateTeam = () => {
    const [teamName, setTeamName] = useState("");
    const [teamLogo, setTeamLogo] = useState(null);
    const [teamLogoPreview, setTeamLogoPreview] = useState(null);
    const [createdBy, setCreatedBy] = useState("");
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const navigate = useNavigate();

    // Obtener el username del usuario (entrenador)
    useEffect(() => {
        const token = localStorage.getItem("token");
        const fetchUser = async () => {
            if (token) {
                try {
                    const response = await fetch(`https://voley-journal.onrender.com/api/users/getby/${token}`);
                    if (response.ok) {
                        const user = await response.json();
                        setCreatedBy(user.username);
                    } else {
                        setCreatedBy("");
                    }
                } catch {
                    setCreatedBy("");
                }
            }
        };
        fetchUser();
    }, []);

    const handleLogoChange = (e) => {
        const file = e.target.files[0];
        setTeamLogo(file);
        if (file) {
            const reader = new FileReader();
            reader.onload = () => setTeamLogoPreview(reader.result);
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        if (!teamName || !teamLogo || !createdBy) {
            setError("Todos los campos son obligatorios.");
            return;
        }

        try {
            const formData = new FormData();
            formData.append("name", teamName);
            formData.append("logo", teamLogo);
            formData.append("coach", createdBy);

            const response = await fetch("https://voley-journal.onrender.com/api/teams/create", {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                throw new Error("Error al crear el equipo");
            }

            setSuccess("¡Equipo creado exitosamente!");
            setTeamName("");
            setTeamLogo(null);
            setTeamLogoPreview(null);

            setTimeout(() => navigate("/myteam"), 1500);
        } catch (err) {
            setError(err.message);
        }
    };

    if (!createdBy) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <span className="text-blue-600 text-xl font-semibold">Cargando usuario...</span>
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto p-8 bg-white rounded-2xl shadow-2xl border border-blue-100 mt-10">
            <h1 className="text-3xl font-black text-blue-700 mb-8 text-center">Crear Equipo</h1>
            <form onSubmit={handleSubmit} className="space-y-8">
                <div>
                    <label className="block text-lg font-semibold text-blue-900 mb-2">Nombre del Club</label>
                    <input
                        type="text"
                        value={teamName}
                        onChange={(e) => setTeamName(e.target.value)}
                        className="w-full p-3 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                        placeholder="Introduce el nombre del club"
                    />
                </div>
                <div>
                    <label className="block text-lg font-semibold text-blue-900 mb-2">Imagen del Club</label>
                    <input
                        type="file"
                        onChange={handleLogoChange}
                        className="w-full p-3 border border-blue-200 rounded-lg bg-blue-50"
                    />
                </div>
                {/* Preview estilizado */}
                <div>
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Vista Previa</h2>
                    <div className="flex flex-col md:flex-row bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl shadow-lg overflow-hidden border border-blue-200 hover:shadow-2xl transition-shadow duration-300">
                        {teamLogoPreview && (
                            <div className="md:w-1/3 flex-shrink-0 flex items-center justify-center">
                                <img
                                    src={teamLogoPreview}
                                    alt="Logo del club"
                                    className="w-32 h-32 object-cover rounded-full border-4 border-blue-300 shadow m-6"
                                />
                            </div>
                        )}
                        <div className="p-6 flex flex-col justify-center md:w-2/3">
                            <h2 className="text-2xl font-extrabold text-blue-700 mb-2">
                                {teamName || "Nombre del club"}
                            </h2>
                            <hr className="mb-4 border-blue-200" />
                            <span className="text-sm text-gray-500">
                                Entrenador: {createdBy}
                            </span>
                        </div>
                    </div>
                </div>
                {error && <div className="text-red-500 text-center font-semibold">{error}</div>}
                {success && <div className="text-green-600 text-center font-semibold">{success}</div>}
                <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white py-3 rounded-lg font-bold text-lg shadow hover:from-blue-600 hover:to-blue-800 transition"
                >
                    Crear Equipo
                </button>
            </form>
        </div>
    );
};

export default CreateTeam;