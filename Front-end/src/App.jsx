import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthPage from "./pages/register/AuthPage";
import ProtectedRoute from "./utils/ProtectedRoute";
import MainPage from "./pages/general/MainPage";
import { Header } from "./components/Header";
import CreateLeague from "./pages/admin/CreateLeague";
import CreateNews from "./pages/news/CreateNews";
import ShowLeague from "./pages/general/ShowLeague"; // Importar ShowLeague
import ShowNews from "./pages/general/ShowNews";
import ShowUsers from "./pages/admin/ShowUsers"; //"

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/auth" element={<AuthPage />} />
          <Route
            path="/createLeague"
            element={
              <ProtectedRoute>
                <Header />
                <CreateLeague />
              </ProtectedRoute>
            }
          />
          <Route
            path="/showUsers"
            element={
              <ProtectedRoute>
                <Header />
                <ShowUsers />
              </ProtectedRoute>
            }
          />
          <Route
            path="/createNews"
            element={
              <ProtectedRoute>
                <Header />
                <CreateNews />
              </ProtectedRoute>
            }
          />
          <Route
            path="/showLeague/:id"
            element={
              <ProtectedRoute>
                <Header />
                <ShowLeague />
              </ProtectedRoute>
            }
          />
          <Route path="/news" element={
            <ProtectedRoute>
              <Header />
              <ShowNews />
            </ProtectedRoute>
          }
          />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Header />
                <MainPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;