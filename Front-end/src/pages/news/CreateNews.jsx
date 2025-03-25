import { useState } from 'react';

function CreateNews() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (title === '' || content === '' || category === '') {
            setError('Por favor, completa todos los campos');
            setSuccess(null);
        } else {
            setError(null);
            fetch('/api/news/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title, content, category }),
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error al crear la noticia');
                }
                return response.json();
            })
            .then(data => {
                setSuccess('Noticia creada exitosamente');
                setTitle('');
                setContent('');
                setCategory('');
            })
            .catch(error => {
                setError(error.message);
                setSuccess(null);
            });
        }
    };

    return (
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <h2 className="text-3xl font-bold mb-4">Crear Noticia</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                        Título
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="title"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="content">
                        Contenido
                    </label>
                    <textarea
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="content"
                        rows="4"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">
                        Categoría
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="category"
                        type="text"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    />
                </div>
                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
                        <span className="block sm:inline">{error}</span>
                    </div>
                )}
                {success && (
                    <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">
                        <span className="block sm:inline">{success}</span>
                    </div>
                )}
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit"
                >
                    Crear Noticia
                </button>
            </form>
        </div>
    );
}

export default CreateNews;