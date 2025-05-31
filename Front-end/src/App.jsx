import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthPage from "./pages/register/AuthPage";
import MainPage from "./pages/general/MainPage";
import CreateLeague from "./pages/admin/CreateLeague";
import CreateNews from "./pages/news/CreateNews";
import ShowLeague from "./pages/general/ShowLeague";
import ShowNews from "./pages/general/ShowNews";
import ShowUsers from "./pages/admin/ShowUsers";
import CreatePlayer from "./pages/admin/CreatePlayer";
import ProtectedLayout from "./utils/ProtectedLayaout";
import PublicLayaout from "./utils/PublicLayaout";
import ControlPanel from "./pages/admin/ControlPanel";
import LandingPage from "./pages/general/LandingPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<AuthPage />} />
        {/* Ruta pública */}
        <Route element={<PublicLayaout />}>

          <Route path="/main" element={<MainPage />} />
          <Route path="/news" element={<ShowNews />} />
        </Route>
        {/* Rutas protegidas */}
        <Route element={<ProtectedLayout />}>
          <Route path="/controlPanel" element={<ControlPanel />} />
          <Route path="/createLeague" element={<CreateLeague />} />
          <Route path="/showUsers" element={<ShowUsers />} />
          <Route path="/createNews" element={<CreateNews />} />
          <Route path="/showLeague/:id" element={<ShowLeague />} />
          <Route path="/createPlayer" element={<CreatePlayer />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;