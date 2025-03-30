import { useState, useEffect } from "react";

const ShowNews = () => {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await fetch("http://localhost:5000/api/news/get");
                if (!response.ok) {
                    throw new Error("Error al obtener las noticias");
                }
                const data = await response.json();
                setNews(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchNews();
    }, []);

    if (loading) {
        return <p className="text-gray-500 text-lg text-center">Cargando noticias...</p>;
    }

    if (error) {
        return <p className="text-red-500 text-lg text-center">{error}</p>;
    }

    return (
        <div className="max-w-6xl mx-auto p-6 bg-white shadow-md rounded-lg">
            <h1 className="text-4xl font-bold text-center text-blue-600 mb-8">Noticias</h1>
            {news.length === 0 ? (
                <p className="text-gray-500 text-lg text-center">No hay noticias disponibles.</p>
            ) : (
                <div className="space-y-8">
                    {news.map((item) => (
                        <div
                            key={item._id}
                            className="flex flex-col md:flex-row bg-gray-100 rounded-lg shadow-md overflow-hidden"
                        >
                            {item.image && (
                                <div className="md:w-1/3">
                                    <img
                                        src={`http://localhost:5000/media/${item.image}`}
                                        alt={item.title}
                                        className="w-full h-48 object-cover md:h-full"
                                    />
                                </div>
                            )}

                            <div className="p-6 flex flex-col justify-between">
                                <h2 className="text-2xl font-bold text-gray-800 mb-4">{item.title}</h2>
                                <p className="text-gray-700 text-base mb-4">{item.text}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ShowNews;