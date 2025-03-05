import { useContext } from "react";
import "./App.css";
import NavBar from "./components/NavBar";
import Manager from "./components/Manager";
import Footer from "./components/Footer";
import Profile from "./components/Profile";
import { AuthContext } from "./AuthContext";
import 'react-toastify/dist/ReactToastify.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import AuthForm from "./components/AuthForm";

function App() {
  const { user } = useContext(AuthContext);
  return (
    <div className="app-container">
      <NavBar />
      <div className="content">
        <Routes>
          {/* If user is not logged in, redirect to signup */}
          <Route
            path="/"
            element={user ? <Manager /> : <AuthForm isSignup={false} />}
          />
          <Route path="/login" element={<AuthForm isSignup={false} />} />
          <Route path="/signup" element={<AuthForm isSignup={true} />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
