import React, { useState, useEffect, useContext } from "react";
import { FaLinkedin, FaGithub, FaEnvelope, FaSignOutAlt } from "react-icons/fa";
import { AuthContext } from "../AuthContext";
import { useNavigate } from 'react-router-dom'; 
import UserMenu from "./UserMenu";

const NavBar = () => {
  const { user, logout } = useContext(AuthContext);
  const [showContact, setShowContact] = useState(false);
  const [text, setText] = useState(""); // Typing animation
  const fullText = "<CipherKey/>";
  const [isGlowing, setIsGlowing] = useState(false); // Glow effect
  const navigate = useNavigate();

  useEffect(() => {
    let index = 0;
    const typingInterval = setInterval(() => {
      setText(fullText.slice(0, index));
      index++;
      if (index > fullText.length) clearInterval(typingInterval);
    }, 150); // Typing speed

    const glowInterval = setInterval(() => {
      setIsGlowing((prev) => !prev);
    }, 1000); // Toggle glow effect every second

    return () => {
      clearInterval(typingInterval);
      clearInterval(glowInterval);
    };
  }, []);

  return (
    <nav className="fixed top-0 w-full bg-[#1a1a1a] text-white flex justify-between items-center p-4 z-10">
      {/* Logo */}
      <h1
        className={`cursor-pointer font-mono text-xl md:text-2xl lg:text-3xl font-bold transition-all duration-500 ${
          isGlowing ? "text-green-500" : "text-white"
        }`} onClick={()=>{navigate("/")}}
      >
        {text}
      </h1>
      

      {/* Logout Button (Only if user is logged in) */}
      {user && <UserMenu />}
    </nav>
  );
};

export default NavBar;
