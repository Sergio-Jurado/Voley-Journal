import LeagueCard from "../../components/LeagueCard"
import LeagueSearch from "../../components/LeagueSearch"


const MainPage = () => {
    return (
        <>
            <LeagueSearch />
            <div className="text-center p-2">
                <h1 className="text-3xl font-black">Ligas</h1>

            </div>
            <div className="bg-gray-100 min-h-screen p-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    <LeagueCard />
                    <LeagueCard />
                    <LeagueCard />
                    <LeagueCard />
                    <LeagueCard />
                </div>
            </div>

        </>
    )
}

export default MainPage