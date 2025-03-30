import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthPage from "./pages/register/AuthPage";
import MainPage from "./pages/general/MainPage";
import CreateLeague from "./pages/admin/CreateLeague";
import CreateNews from "./pages/news/CreateNews";
import ShowLeague from "./pages/general/ShowLeague";
import ShowNews from "./pages/general/ShowNews";
import ShowUsers from "./pages/admin/ShowUsers";
import ProtectedLayout from "./components/ProtectedLayaout"; // Importar el nuevo layout

function App() {
  return (
    <Router>
      <Routes>
        {/* Ruta pública */}
        <Route path="/auth" element={<AuthPage />} />

        {/* Rutas protegidas */}
        <Route element={<ProtectedLayout />}>
          <Route path="/" element={<MainPage />} />
          <Route path="/createLeague" element={<CreateLeague />} />
          <Route path="/showUsers" element={<ShowUsers />} />
          <Route path="/createNews" element={<CreateNews />} />
          <Route path="/showLeague/:id" element={<ShowLeague />} />
          <Route path="/news" element={<ShowNews />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;