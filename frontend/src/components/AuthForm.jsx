import { useState, useContext, useEffect, useRef } from "react";
import { AuthContext } from "../AuthContext";
import { motion, AnimatePresence } from "framer-motion";

const AuthForm = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordErrors, setPasswordErrors] = useState([]);
  const [strength, setStrength] = useState(0);
  const [usernameExists, setUsernameExists] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const iconRef = useRef();
  const passWordRef = useRef();

  const { login, signup } = useContext(AuthContext);

  useEffect(() => {
    if (username.length > 3) {
      checkUsernameAvailability(username);
    }
  }, [username]);

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const checkUsernameAvailability = async (username) => {
    try {
      const response = await fetch(
        `http://localhost:3000/check-username/${username}`
      );
      const data = await response.json();
      console.log(data);
      setUsernameExists(data.exists);
    } catch (error) {
      console.error("Error checking username:", error);
    }
  };

  const generateUsername = () => {
    const randomNum = Math.floor(1000 + Math.random() * 9000); // Generate a 4-digit random number
    setUsername(`${firstname}${lastname}${randomNum}`); // Unique username
  };

  // Function to validate password strength
  const validatePassword = (password) => {
    let errors = [];
    let score = 0;

    if (password.length >= 8) score += 1;
    else errors.push("Must be at least 8 characters.");

    if (/[A-Z]/.test(password)) score += 1;
    else errors.push("Must contain at least one uppercase letter.");

    if (/[a-z]/.test(password)) score += 1;
    else errors.push("Must contain at least one lowercase letter.");

    if (/\d/.test(password)) score += 1;
    else errors.push("Must contain at least one number.");

    if (/[\W_]/.test(password)) score += 1;
    else errors.push("Must contain at least one special character.");

    setPasswordErrors(errors);
    setStrength(score);
    return errors.length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSignup) {
      if (!validatePassword(password)) return;
      await signup(firstname, lastname, username, password);
    } else {
      await login(username, password);
    }
  };

  // Function to get strength label and color
  const getStrengthLabel = () => {
    if (strength <= 1) return { label: "Weak", color: "bg-red-500" };
    if (strength <= 3) return { label: "Medium", color: "bg-yellow-400" };
    if (strength >= 4) return { label: "Strong", color: "bg-green-500" };
  };

  return (
    <>
      <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>
      <div
        className={`flex items-center justify-center relative ${
          !isSignup && "align-middle h-full"
        }`}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative bg-white/5 backdrop-blur-lg p-8 rounded-3xl shadow-[0px_0px_20px_rgba(255,255,255,0.1)] w-96 text-center border border-gray-700"
        >
          <motion.h2
            key={isSignup ? "signup" : "login"}
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="text-white text-3xl font-extrabold mb-6 tracking-wider"
          >
            {isSignup ? "Create an Account" : "Welcome Back"}
          </motion.h2>

          <form onSubmit={handleSubmit} className="flex flex-col space-y-6">
            <AnimatePresence>
              {isSignup && (
                <>
                  <motion.input
                    type="text"
                    placeholder="First Name"
                    value={firstname}
                    onChange={(e) => setFirstname(e.target.value)}
                    required
                    className="input-field"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  />

                  <motion.input
                    type="text"
                    placeholder="Last Name"
                    value={lastname}
                    onChange={(e) => setLastname(e.target.value)}
                    required
                    className="input-field"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  />
                </>
              )}
            </AnimatePresence>

            <div className="relative">
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className={`mb-0 input-field ${
                  isSignup && usernameExists ? "border-red-500" : ""
                }`}
              />

              {isSignup && (
                <>
                  {/* Icons Container */}
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
                    {/* Validation Icon */}
                    {usernameExists ? (
                      <span className="text-red-500">❌</span>
                    ) : (
                      username && <span className="text-green-500">✔</span>
                    )}

                    {/* Generate Username Button */}
                    <div className="group cursor-pointer relative">
                      <button
                        type="button"
                        onClick={generateUsername}
                        className="text-blue-400 hover:text-white"
                      >
                        ⚡
                      </button>
                      <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-xs text-white bg-gray-900 px-2 py-1 rounded-md shadow-lg">
                        Generate Username
                      </span>
                    </div>
                  </div>

                  {/* Error Message - Now Absolutely Positioned */}
                  {usernameExists && (
                    <p className="absolute left-3 -bottom-5 text-red-500 text-sm">
                      Username already exists
                    </p>
                  )}
                </>
              )}
            </div>
            <div className="relative w-full">
              <input
                ref={passWordRef}
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (isSignup) validatePassword(e.target.value);
                }}
                required
                className="input-field"
              />
              <i
                ref={iconRef}
                className={`fa-solid ${
                  showPassword ? "fa-eye-slash" : "fa-eye"
                } absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer`}
                onClick={toggleShowPassword}
              ></i>
            </div>

            {/* Display password errors dynamically */}
            <div className="text-left text-red-400 text-sm">
              {passwordErrors.map((error, index) => (
                <p key={index} className="mt-1">
                  • {error}
                </p>
              ))}
            </div>

            {/* Password Strength Meter */}
            {isSignup && password.length > 0 && (
              <div className="mt-3">
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${getStrengthLabel().color}`}
                    style={{ width: `${(strength / 5) * 100}%` }}
                  ></div>
                </div>
                <p className="text-white text-xs mt-2">
                  {getStrengthLabel().label}
                </p>
              </div>
            )}

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className={`relative overflow-hidden bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 text-white font-semibold py-3 rounded-full shadow-[0px_0px_20px_rgba(0,0,255,0.4)] transition-all duration-300 cursor-pointer ${
                passwordErrors.length > 0 ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={passwordErrors.length > 0}
            >
              {isSignup ? "Sign Up" : "Log In"}
            </motion.button>
          </form>

          <p className="text-gray-400 mt-6">
            {isSignup ? "Already have an account?" : "New here?"}
            <button
              onClick={() => {
                setIsSignup(!isSignup);
                setPasswordErrors([]);
                setStrength(0);
                setUsername("");
                setPassword("");
              }}
              className="text-green-400 hover:text-white ml-1 font-semibold transition-all duration-300 cursor-pointer"
            >
              {isSignup ? "Log In" : "Sign Up"}
            </button>
          </p>
        </motion.div>
      </div>
    </>
  );
};

export default AuthForm;
