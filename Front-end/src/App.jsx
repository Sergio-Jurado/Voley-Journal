import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import AuthPage from './pages/register/AuthPage'
import ProtectedRoute from './utils/ProtectedRoute'
import MainPage from './pages/general/MainPage'
import { Header } from './components/Header'
import CreateLeague from './pages/admin/CreateLeague'



function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/createLeague" element={
            <CreateLeague />
          } />
          <Route path="/" element={
            <ProtectedRoute>
              <Header />
              <MainPage />
            </ProtectedRoute>

          } />
        </Routes>
      </Router>
    </>
  );
};

export default App
