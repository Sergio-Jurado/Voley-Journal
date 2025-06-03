import { useState } from 'react';

const CreateLeague = () => {
    const [leagueName, setLeagueName] = useState('');
    const [leagueLogo, setLeagueLogo] = useState(null);
    const [leagueLogoPreview, setLeagueLogoPreview] = useState(null);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleLeagueLogoChange = (e) => {
        const file = e.target.files[0];
        setLeagueLogo(file);
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setLeagueLogoPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        try {
            if (!leagueName || !leagueLogo) {
                throw new Error('El nombre y el logo de la liga son obligatorios');
            }

            // Crear la liga
            const leagueFormData = new FormData();
            leagueFormData.append('name', leagueName);
            leagueFormData.append('logo', leagueLogo);

            const leagueResponse = await fetch('https://voley-journal.onrender.com/api/leagues/create', {
                method: 'POST',
                body: leagueFormData,
            });

            if (!leagueResponse.ok) {
                throw new Error('Error al crear la liga');
            }

            setSuccess('Liga creada exitosamente');
            setLeagueName('');
            setLeagueLogo(null);
            setLeagueLogoPreview(null);
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center ">
            <div className="p-10 bg-white shadow-2xl rounded-2xl w-full max-w-3xl mb-10 border border-blue-100">
                <h1 className="text-4xl font-black text-center text-blue-700 mb-8 tracking-tight drop-shadow">Crear Liga</h1>
                <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="flex flex-col items-center">
                        <label className="block text-lg font-semibold text-blue-900 mb-2 w-full text-left">Nombre de la Liga</label>
                        <input
                            type="text"
                            value={leagueName}
                            onChange={(e) => setLeagueName(e.target.value)}
                            className="w-full p-3 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                            placeholder="Introduce el nombre de la liga"
                        />
                        <label className="block text-lg font-semibold text-blue-900 mb-2 mt-6 w-full text-left">Logo de la Liga</label>
                        <input
                            type="file"
                            onChange={handleLeagueLogoChange}
                            className="w-full p-3 border border-blue-200 rounded-lg bg-blue-50"
                        />
                        {/* Preview de la carta de la liga */}
                        <div className="w-full max-w-xs bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl shadow-lg border border-blue-200 p-6 flex flex-col items-center justify-center mt-6 mx-auto">
                            {leagueLogoPreview ? (
                                <img
                                    src={leagueLogoPreview}
                                    alt="Logo de la liga"
                                    className="w-28 h-28 object-cover rounded-full mb-4 border-4 border-blue-300 shadow"
                                />
                            ) : (
                                <div className="w-28 h-28 rounded-full bg-blue-100 flex items-center justify-center mb-4 text-blue-300 text-3xl font-bold border-4 border-blue-200">
                                    ?
                                </div>
                            )}
                            <h3 className="text-xl font-extrabold text-blue-800 mb-2 text-center">{leagueName || "Nombre de la liga"}</h3>
                        </div>
                    </div>
                    {error && <p className="text-red-500 text-center font-semibold">{error}</p>}
                    {success && <p className="text-green-600 text-center font-semibold">{success}</p>}
                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white py-3 rounded-lg font-bold text-lg shadow hover:from-blue-600 hover:to-blue-800 transition"
                    >
                        Crear Liga
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateLeague;