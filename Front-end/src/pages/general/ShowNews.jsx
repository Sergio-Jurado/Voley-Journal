import { useState, useEffect } from "react";
import NewsCard from "../../components/NewsCard";

const ShowNews = () => {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await fetch("https://voley-journal.onrender.com/api/news/get");
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

    // Función para eliminar noticia
    const handleDeleteNews = async (newsId) => {
        try {
            const response = await fetch(`https://voley-journal.onrender.com/api/news/delete/${newsId}`, {
                method: "DELETE",
            });
            if (!response.ok) {
                throw new Error("Error al eliminar la noticia");
            }
            setNews((prevNews) => prevNews.filter((n) => n._id !== newsId));
        } catch (err) {
            setError(err.message);
        }
    };

    if (loading) {
        return <p className="text-gray-500 text-lg text-center">Cargando noticias...</p>;
    }

    if (error) {
        return <p className="text-red-500 text-lg text-center">{error}</p>;
    }

    return (
        <div className="max-w-8xl mx-auto p-6 bg-white shadow-md rounded-lg">
            <h1 className="text-4xl font-bold text-center text-blue-600 mb-8">Noticias</h1>
            {news.length === 0 ? (
                <p className="text-gray-500 text-lg text-center">No hay noticias disponibles.</p>
            ) : (
                <div className="space-y-8">
                    {news.map((item) => (
                        <NewsCard key={item._id} newsItem={item} onDelete={handleDeleteNews} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default ShowNews;