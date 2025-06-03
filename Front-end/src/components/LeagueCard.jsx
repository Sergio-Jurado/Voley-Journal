import { Link } from "react-router-dom";

const LeagueCard = ({ league }) => {
    return (
        <div className="w-full max-w-xs bg-gradient-to-b from-blue-100 to-blue-50 rounded-2xl shadow-xl border border-blue-300 flex flex-col overflow-hidden mt-6 mx-auto hover:shadow-blue-300 transition-shadow duration-300">
            <div className="flex flex-col items-center py-8 px-4">
                <div className="bg-white rounded-full border-4 border-blue-200 shadow-lg mb-4">
                    <img
                        src={league.logo}
                        alt={league.name}
                        className="w-20 h-20 object-cover rounded-full"
                    />
                </div>
                <h2 className="text-2xl font-extrabold text-blue-700 mb-1 text-center tracking-wide">{league.name}</h2>
                <span className="block w-12 h-1 bg-gradient-to-r from-blue-400 to-blue-700 rounded-full mx-auto mb-4"></span>
                <Link
                    to={`/showLeague/${league._id}`}
                    className="mt-2 bg-blue-100 text-blue-700 font-bold px-6 py-2 rounded-xl shadow hover:bg-blue-200 hover:text-blue-900 transition"
                >
                    Ver Liga
                </Link>
            </div>
        </div>
    );
};

export default LeagueCard;