import React, { useState } from "react";
import { FaLinkedin, FaGithub, FaEnvelope } from "react-icons/fa";

const Footer = () => {
  const [showContact, setShowContact] = useState(false);
  return (
    <div className="sticky bottom-0 w-full bg-[#1a1a1a] text-white flex flex-col justify-start items-start p-2 sm:justify-between sm:items-center">
      <div className="button absolute right-4 top-1/2 transform -translate-y-1/2 rounded-full bg-green-500 p-2">
        <button
          onClick={() => setShowContact(!showContact)}
          className="flex items-center gap-1 hover:font-bold transition-all duration-150 ease-in-out"
        >
          <lord-icon
            src="https://cdn.lordicon.com/srsgifqc.json"
            trigger="hover"
            colors="primary:#ffffff"
            className="hover:cursor-pointer w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10"
          ></lord-icon>
        </button>

        {/* Dropdown Content */}
        {showContact && (
          <div className="absolute right-0 bottom-full mb-2 bg-gray-800 text-white p-4 rounded-lg shadow-lg w-48">
            <ul className="flex flex-col gap-2 text-lg">
              <a
                href="https://www.linkedin.com/in/rohitashwa-pal-das-288a1b277/"
                target="_blank"
                className="flex items-center gap-2 hover:text-blue-400"
                rel="noopener noreferrer"
                onClick={() => setShowContact(false)}
              >
                <FaLinkedin /> LinkedIn
              </a>
              <a
                href="https://github.com/RohitashwaPalDas"
                target="_blank"
                className="flex items-center gap-2 hover:text-gray-400"
                rel="noopener noreferrer"
                onClick={() => setShowContact(false)}
              >
                <FaGithub /> GitHub
              </a>
              <a
                href="mailto:rohit090505pal@gmail.com"
                className="flex items-center gap-2 hover:text-red-400"
                onClick={() => setShowContact(false)}
              >
                <FaEnvelope /> Email
              </a>
            </ul>
          </div>
        )}
      </div>
      <h1 className="logo font-bold text-xl text-green-500">
        &lt;CipherKey/&gt;
      </h1>
      <div className="footer flex justify-center items-center">
        Created with{" "}
        <lord-icon
          src="https://cdn.lordicon.com/ulnswmkk.json"
          trigger="hover"
          colors="primary:#ff0000"
          className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10"
        ></lord-icon>
        by RohitashwaPalDas
      </div>
    </div>
  );
};

export default Footer;