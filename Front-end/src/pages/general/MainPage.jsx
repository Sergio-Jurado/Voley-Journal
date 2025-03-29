import LeagueSearch from "../../components/LeagueSearch"




const MainPage = () => {
    return (
        <>
            <LeagueSearch />
            <div className="text-center p-2">
                <h1 className="text-3xl font-black">Ligas</h1>
                <div className=" min-h-screen p-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    </div>
                </div>
            </div>

        </>
    )
}

export default MainPage