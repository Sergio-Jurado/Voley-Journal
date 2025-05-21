const NewsCard = ({ newsItem }) => {
    return (
        <div className="flex flex-col md:flex-row bg-gray-100 rounded-lg shadow-md overflow-hidden">
            {newsItem.image && (
                <div className="md:w-1/3">
                    <img
                        src={`http://localhost:5000/media/${newsItem.image}`}
                        alt={newsItem.title}
                        className="w-full h-48 object-cover md:h-full"
                    />
                </div>
            )}

            <div className="p-6 flex flex-col justify-between">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">{newsItem.title}</h2>
                <p className="text-gray-700 text-base mb-4">{newsItem.text}</p>
            </div>
        </div>
    );
};

export default NewsCard;