import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import Signup from './authentication/Signup';
import Login from "./authentication/Login";
import Home from "./components/Home";
import { UserProvider } from "./hooks/UserProvider";
import ProtectedRoute from "./routes/ProtectedRoute";
import ErrorBoundary from "./components/ErrorBoundary";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          
          {/* Wrap only the Home route with UserProvider */}
          <Route
            path="/home"
            element={
              <ErrorBoundary>
                <UserProvider>
                  <ProtectedRoute>
                    <Home />
                  </ProtectedRoute>
                </UserProvider>
              </ErrorBoundary>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
