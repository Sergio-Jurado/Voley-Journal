import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthPage from "./pages/register/AuthPage";
import MainPage from "./pages/general/MainPage";
import CreateLeague from "./pages/admin/CreateLeague";
import CreateNews from "./pages/news/CreateNews";
import ShowLeague from "./pages/general/ShowLeague";
import ShowNews from "./pages/general/ShowNews";
import ShowUsers from "./pages/admin/ShowUsers";
import CreatePlayer from "./pages/coach/CreatePlayer";
import ProtectedLayout from "./utils/ProtectedLayaout";
import PublicLayaout from "./utils/PublicLayaout";
import ControlPanel from "./pages/admin/ControlPanel";
import LandingPage from "./pages/general/LandingPage";
import MyTeam from "./pages/coach/MyTeam";
import CreateTeam from "./pages/coach/CreateTeam";
import DeleteLeague from "./pages/admin/DeleteLeague";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<AuthPage />} />
        {/* Ruta pública */}
        <Route element={<PublicLayaout />}>
          <Route path="/main" element={<MainPage />} />
          <Route path="/showLeague/:id" element={<ShowLeague />} />
          <Route path="/news" element={<ShowNews />} />
        </Route>
        {/* Rutas protegidas */}
        <Route element={<ProtectedLayout />}>
          <Route path="/myTeam" element={<MyTeam />} />
          <Route path="/createTeam" element={<CreateTeam />} />
          <Route path="/controlPanel" element={<ControlPanel />} />
          <Route path="/createLeague" element={<CreateLeague />} />
          <Route path="/showUsers" element={<ShowUsers />} />
          <Route path="/deleteLeague" element={<DeleteLeague />} />
          <Route path="/createNews" element={<CreateNews />} />
          <Route path="/createPlayer" element={<CreatePlayer />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;