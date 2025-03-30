import { useState } from "react";

const CreateNews = () => {
    const [newsTitle, setNewsTitle] = useState("");
    const [newsText, setNewsText] = useState("");
    const [newsImage, setNewsImage] = useState(null);
    const [newsImagePreview, setNewsImagePreview] = useState(null);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

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

        try {
            if (!newsTitle || !newsText || !newsImage) {
                throw new Error("Todos los campos son obligatorios");
            }

            const formData = new FormData();
            formData.append("title", newsTitle);
            formData.append("text", newsText);
            formData.append("image", newsImage);

            const response = await fetch("http://localhost:5000/api/news/create", {
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
        } catch (error) {
            setError(error.message);
        }
    };

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
                    <div className="border border-gray-300 p-4 rounded-lg bg-gray-50 flex flex-col md:flex-row items-center">
                        {newsImagePreview && (
                            <img
                                src={newsImagePreview}
                                alt="Vista previa"
                                className="w-full md:w-1/3 h-48 object-cover rounded-lg mb-4 md:mb-0 md:mr-4"
                            />
                        )}
                        <div className="flex-1">
                            <h3
                                className="text-2xl font-bold text-gray-800 mb-2 truncate"
                                style={{ wordWrap: "break-word" }}
                            >
                                {newsTitle || "Título de la noticia"}
                            </h3>
                            <p
                                className="text-gray-700 text-lg"
                                style={{ wordWrap: "break-word" }}
                            >
                                {newsText || "Texto de la noticia"}
                            </p>
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
                    className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition duration-200"
                >
                    Crear Noticia
                </button>
            </form>
        </div>
    );
};

export default CreateNews;