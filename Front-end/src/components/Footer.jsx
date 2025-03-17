function Footer() {
    return (
        <footer className="footer footer-center bg-base-200 text-base-content absolute bottom-0 left-0 w-full bg-gray-800 text-white p-4 text-center py-4" >
            <div className="container mx-auto text-center">
                <p className="text-sm">
                    Voley Journal. Proyecto realizado por Sergio Jurado Trillo.
                </p>
                <div className="flex justify-center space-x-4 mt-2">
                    <a href="https://github.com/Sergio-Jurado" className="hover:text-gray-400">GitHub</a>
                    <a href="https://www.linkedin.com/in/sergio-jurado-trillo-6b7a1a231/" className="hover:text-gray-400">Linkedin</a>
                </div>
            </div>
        </footer >
    );
}

export default Footer;