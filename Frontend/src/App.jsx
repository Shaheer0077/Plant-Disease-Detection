import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import Dashboard from "./pages/DashBoard";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";
import { useTranslation } from "react-i18next";

function App() {
  const { i18n } = useTranslation();
  const isUrdu = i18n.language.startsWith('ur');

  return (
    <AuthProvider>
      <Router>
        <div className={`${isUrdu ? 'font-urdu' : 'font-outfit'} text-gray-800 min-h-screen`} dir={isUrdu ? 'rtl' : 'ltr'}>
          <style>
            {`@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&display=swap');`}
          </style>

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<Auth />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
