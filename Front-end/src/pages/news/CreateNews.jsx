import { useState, useEffect } from "react";

const CreateNews = () => {
    const [newsTitle, setNewsTitle] = useState("");
    const [newsText, setNewsText] = useState("");
    const [newsImage, setNewsImage] = useState(null);
    const [createdBy, setCreatedBy] = useState("");
    const [newsImagePreview, setNewsImagePreview] = useState(null);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    // Obtener el id del usuario (token) de localStorage
    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchUser = async () => {
            if (token) {
                try {
                    const response = await fetch(`https://voley-journal.onrender.com/api/users/getby/${token}`);
                    if (response.ok) {
                        const user = await response.json();
                        setCreatedBy(user.username); // Guardar el username
                    } else {
                        setCreatedBy("");
                    }
                } catch (error) {
                    console.error("Error al obtener el usuario:", error);
                    setCreatedBy("");
                }
            } else {
                setCreatedBy("");
            }
        };
        fetchUser();
    }, [token]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setNewsImage(file);
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setNewsImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        // Asegúrate de que createdBy tiene valor
        if (!newsTitle || !newsText || !newsImage || !createdBy) {
            setError("Todos los campos son obligatorios");
            return;
        }

        try {
            const formData = new FormData();
            formData.append("title", newsTitle);
            formData.append("text", newsText);
            formData.append("image", newsImage);
            formData.append("createdBy", createdBy); // username

            const response = await fetch("https://voley-journal.onrender.com/api/news/create", {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                throw new Error("Error al crear la noticia");
            }

            setSuccess("Noticia creada exitosamente");
            setNewsTitle("");
            setNewsText("");
            setNewsImage(null);
            setNewsImagePreview(null);
            // NO limpiar createdBy aquí
        } catch (error) {
            setError(error.message);
        }
    };

    // Mostrar mensaje de carga si aún no tienes el username
    if (!createdBy) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <span className="text-blue-600 text-xl font-semibold">Cargando usuario...</span>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
            <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">Crear Noticia</h1>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-lg font-medium text-gray-700 mb-2">Título</label>
                    <input
                        type="text"
                        value={newsTitle}
                        onChange={(e) => setNewsTitle(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Introduce el título de la noticia"
                    />
                </div>
                <div>
                    <label className="block text-lg font-medium text-gray-700 mb-2">Texto</label>
                    <textarea
                        value={newsText}
                        onChange={(e) => setNewsText(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Introduce el texto de la noticia"
                        rows="5"
                    ></textarea>
                </div>
                <div>
                    <label className="block text-lg font-medium text-gray-700 mb-2">Imagen</label>
                    <input
                        type="file"
                        onChange={handleImageChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Vista Previa</h2>
                    <div className="flex flex-col md:flex-row bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 hover:shadow-2xl transition-shadow duration-300">
                        {newsImagePreview && (
                            <div className="md:w-1/3 flex-shrink-0">
                                <img
                                    src={newsImagePreview}
                                    alt={newsTitle}
                                    className="w-full h-56 object-cover md:h-full"
                                />
                            </div>
                        )}
                        <div className="p-6 flex flex-col justify-between md:w-2/3">
                            <h2 className="text-2xl font-extrabold text-blue-700 mb-2">
                                {newsTitle || "Título de la noticia"}
                            </h2>
                            <hr className="mb-4 border-blue-200" />
                            <p className="text-gray-700 text-base mb-4 leading-relaxed">
                                {newsText || "Texto de la noticia"}
                            </p>
                            <span className="text-sm text-gray-500">
                                Publicado por: {createdBy || "Periodista"}
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
                    disabled={!createdBy}
                    className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition duration-200"
                >
                    Crear Noticia
                </button>
            </form>
        </div>
    );
};

export default CreateNews;