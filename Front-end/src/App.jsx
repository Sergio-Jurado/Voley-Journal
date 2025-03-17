
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import AuthPage from './pages/register/AuthPage'
import ProtectedRoute from './utils/ProtectedRoute'
import MainPage from './pages/general/MainPage'
import Footer from './components/Footer'
import { Header } from './components/Header'



function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/" element={
            <ProtectedRoute>
              <Header />
              <MainPage />
            </ProtectedRoute>

          } />
        </Routes>
        <Footer />
      </Router>
    </>
  );
};

export default App
