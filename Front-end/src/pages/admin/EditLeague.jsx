import { useState, useEffect } from 'react';

const EditLeague = ({ leagueId }) => {
    const [leagueName, setLeagueName] = useState('');
    const [leagueLogo, setLeagueLogo] = useState(null);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    // Obtener los datos actuales de la liga
    useEffect(() => {
        fetch(`http://localhost:5000/api/leagues/getby/${leagueId}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Error al obtener los datos de la liga');
                }
                return response.json();
            })
            .then((data) => {
                setLeagueName(data.name);
            })
            .catch((error) => setError(error.message));
    }, [leagueId]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', leagueName);
        if (leagueLogo) {
            formData.append('leagueLogo', leagueLogo);
        }

        fetch(`http://localhost:5000/api/leagues/update/${leagueId}`, {
            method: 'PUT',
            body: formData,
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Error al actualizar la liga');
                }
                return response.json();
            })
            .then(() => {
                setSuccess('Liga actualizada exitosamente');
                setError(null);
            })
            .catch((error) => {
                setError(error.message);
                setSuccess(null);
            });
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Editar Liga</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700">Nombre de la Liga</label>
                    <input
                        type="text"
                        value={leagueName}
                        onChange={(e) => setLeagueName(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Logo de la Liga</label>
                    <input
                        type="file"
                        onChange={(e) => setLeagueLogo(e.target.files[0])}
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>
                {error && <div className="text-red-500 mb-4">{error}</div>}
                {success && <div className="text-green-500 mb-4">{success}</div>}
                <button
                    type="submit"
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
                >
                    Guardar Cambios
                </button>
            </form>
        </div>
    );
};

export default EditLeague;