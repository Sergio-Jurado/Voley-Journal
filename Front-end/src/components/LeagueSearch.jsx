const LeagueSearch = ({ onSearch }) => {
    const handleSearchChange = (e) => {
        const searchTerm = e.target.value; // Obtener el valor del campo de búsqueda
        onSearch(searchTerm); // Llamar a la función pasada como prop
    };

    const handleSubmit = (e) => {
        e.preventDefault(); // Prevenir el comportamiento predeterminado del formulario
    };

    return (
        <form className="p-2" onSubmit={handleSubmit}>
            {/* Etiqueta oculta para accesibilidad */}
            <label
                htmlFor="default-search"
                className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300"
            >
                Search
            </label>

            <div className="relative">
                {/* Icono de búsqueda */}
                <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                    <svg
                        className="w-5 h-5 text-gray-500 dark:text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        ></path>
                    </svg>
                </div>

                {/* Campo de búsqueda */}
                <input
                    type="search"
                    id="default-search"
                    className="block p-4 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Buscar Ligas"
                    onChange={handleSearchChange} // Llamar a la función al cambiar el valor
                />
            </div>
        </form>
    );
};

export default LeagueSearch;