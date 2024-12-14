

function Footer() {
    return (
        <footer className=" absolute bottom-0 left-0 w-full bg-gray-800 text-white p-4 text-center py-4" >
            <div className="container mx-auto text-center">
                <p className="text-sm">
                    &copy; {new Date().getFullYear()} Tu Empresa. Todos los derechos reservados.
                </p>
                <div className="flex justify-center space-x-4 mt-2">
                    <a href="#" className="hover:text-gray-400">Política de privacidad</a>
                    <a href="#" className="hover:text-gray-400">Términos de servicio</a>
                    <a href="#" className="hover:text-gray-400">Contacto</a>
                </div>
            </div>
        </footer >
    );
}

export default Footer;