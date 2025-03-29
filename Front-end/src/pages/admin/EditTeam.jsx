import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const EditTeam = ({ teamId }) => {
    const [teamName, setTeamName] = useState('');
    const [teamLogo, setTeamLogo] = useState(null);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    // Obtener los datos actuales del equipo
    useEffect(() => {
        fetch(`http://localhost:5000/api/teams/${teamId}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Error al obtener los datos del equipo');
                }
                return response.json();
            })
            .then((data) => {
                setTeamName(data.name);
            })
            .catch((error) => setError(error.message));
    }, [teamId]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', teamName);
        if (teamLogo) {
            formData.append('logo', teamLogo);
        }

        fetch(`http://localhost:5000/api/teams/${teamId}`, {
            method: 'PUT',
            body: formData,
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Error al actualizar el equipo');
                }
                return response.json();
            })
            .then(() => {
                setSuccess('Equipo actualizado exitosamente');
                setError(null);
            })
            .catch((error) => {
                setError(error.message);
                setSuccess(null);
            });
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Editar Equipo</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700">Nombre del Equipo</label>
                    <input
                        type="text"
                        value={teamName}
                        onChange={(e) => setTeamName(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Logo del Equipo</label>
                    <input
                        type="file"
                        onChange={(e) => setTeamLogo(e.target.files[0])}
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
EditTeam.propTypes = {
    teamId: PropTypes.string.isRequired,
};

export default EditTeam;
