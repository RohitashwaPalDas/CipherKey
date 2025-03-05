import React from "react";
import { useRef, useState, useEffect } from "react";
import { toast } from "react-toastify";

const Manager = () => {
  const iconRef = useRef();
  const passWordRef = useRef();
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ site: "", username: "", password: "", id:"" });
  const [passwordArray, setPasswordArray] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  const setPasswords = async () => {
    let response = await fetch("http://localhost:3000/password/all", {
      method: "GET", 
      credentials: "include"
    });;
    let passwords = await response.json();
    console.log(passwords);
    if (passwords) {
      setPasswordArray(passwords.data);
    }
    console.log(passwordArray);
  };

  useEffect(() => {
    setPasswords();
  }, []);

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const fullText = "Your own Password Manager";
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const speed = isDeleting ? 100 : 150; // Typing and deleting speed

    const timeout = setTimeout(() => {
      setText(fullText.slice(0, index));

      if (!isDeleting && index === fullText.length) {
        setTimeout(() => setIsDeleting(true), 1000); // Pause before deleting
      } else if (isDeleting && index === 0) {
        setIsDeleting(false);
      }

      setIndex((prev) => (isDeleting ? prev - 1 : prev + 1));
    }, speed);

    return () => clearTimeout(timeout);
  }, [index, isDeleting]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const savePassword = async () => {
    console.log(form);
    const data = { ...form };
    const urlEncodedData = new URLSearchParams(data).toString();

    if (isEditing) {
      let res = await fetch(`http://localhost:3000/password/${form.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: urlEncodedData,
        credentials: "include"
      });
      let result = await res.json();
      console.log(result);
      if (result.error) {
        toast.error("Some error occurred");
        console.log(result.error);
      } else {
        setForm({ site: "", username: "", password: "" });
        setPasswords();
        toast.success("Password Details Updated");
        setIsEditing(false);
      }
      return;
    }

    const res = await fetch("http://localhost:3000/password/new", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: urlEncodedData,
      credentials: "include"
    });
    const result = await res.json();
    console.log(result);
    if (result.error) {
      toast.error("Some error occurred");
      console.log(result.error);
    } else {
      setForm({ site: "", username: "", password: "" });
      setPasswords();
      toast.success("Password Saved");
    }
  };

  const deletePassword = async (id) => {
    const res = await fetch(`http://localhost:3000/password/${id}`, {
      method: "DELETE",
      credentials: "include"
    });
    const result = await res.json();
    console.log(result);
    if (result.error) {
      toast.error("Some error occurred");
      console.log(result.error);
    } else {
      setPasswords();
      toast.success("Password Deleted");
    }
  };

  const editPassword = async (item) => {
    setIsEditing(true);
    setForm({
      site: item.site,
      username: item.username,
      password: item.password,
      id: item._id,
    });
  };

  const copyText = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => toast.success("Copied: " + text))
      .catch((err) => console.error("Failed to copy:", err));
  };

  return (
    <>
      <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>

      <div className="flex flex-col items-center justify-center gap-3 w-full max-w-lg mx-auto p-5 rounded-xl shadow-lg sm:p-8 md:max-w-2xl lg:max-w-3xl">
        <div className="title flex flex-col items-center justify-center gap-1.1">
          <h1 className="logo font-bold text-2xl text-green-500">
            {" "}
            &lt;CipherKey/&gt;
          </h1>
          <div className="text-green-500">{text || "\u00A0"}</div>
        </div>
        <div className="input-group flex flex-col items-center justify-center gap-2 ">
          <input
            value={form.site}
            onChange={handleChange}
            name="site"
            type="text"
            autoComplete="off"
            placeholder="Enter website URL"
            className="w-full rounded-2xl border-2 border-green-500 px-2 py-1 transition-all duration-200 hover:border-white hover:bg-gray-950 hover:text-whitefocus:border-white focus:ring-2 focus:ring-green-500 focus:bg-gray-950 focus:text-white"
          />
          <div className="flex flex-col gap-2 sm:flex-row w-full">
            <input
              value={form.username}
              onChange={handleChange}
              name="username"
              type="text"
              placeholder="Enter UserName"
              autoComplete="off"
              className="w-full rounded-2xl border-2 border-green-500 px-2 py-1 transition-all duration-200 hover:border-white hover:bg-gray-950 hover:text-whitefocus:border-white focus:ring-2 focus:ring-green-500 focus:bg-gray-950 focus:text-white"
            />
            <div className="relative w-full">
              <input
                value={form.password}
                onChange={handleChange}
                name="password"
                ref={passWordRef}
                type={showPassword ? "text" : "password"} // Controlled by state
                placeholder="Enter Password"
                autoComplete="off"
                className="w-full rounded-2xl border-2 border-green-500 px-2 py-1 transition-all duration-200 hover:border-white hover:bg-gray-950 hover:text-white focus:border-white focus:ring-2 focus:ring-green-500 focus:bg-gray-950 focus:text-white"
              />
              <i
                ref={iconRef}
                className={`fa-solid ${
                  showPassword ? "fa-eye-slash" : "fa-eye"
                } absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer`}
                onClick={toggleShowPassword}
              ></i>
            </div>
          </div>
        </div>
        <button
          className="flex justify-center items-center gap-1 rounded-full bg-green-600 px-3 py-1 cursor-pointer font-bold hover:bg-green-500 mt-1"
          onClick={savePassword}
        >
          <lord-icon
            src="https://cdn.lordicon.com/jgnvfzqg.json"
            trigger="hover"
            colors="primary:#fff"
          ></lord-icon>
          {isEditing ? "Update Password" : "Save Password"}
        </button>

        <div className="pwdcontainer w-full mt-5">
          <h1 className="mb-4 font-bold text-xl">Your Passwords</h1>
          {passwordArray.length === 0 || passwordArray.length === undefined ? (
            <div>
              <h1 className="text-white">No Passwords Saved</h1>
            </div>
          ) : (
            <div className="table-container w-full rounded-lg overflow-x-auto">
              <table className="w-full table-auto text-white text-sm sm:text-lg">
                <thead className="bg-green-700 font-bold ">
                  <tr>
                    <th className="py-1.5 px-2 border-0 border-transparent">Website URL</th>
                    <th className="py-1.5 px-2 border-0 border-transparent">Username</th>
                    <th className="py-1.5 px-2 border-0 border-transparent">Password</th>
                    <th className="py-1.5 px-2 border-0 border-transparent">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-green-600 font-bold">
                  {passwordArray.length > 0 &&
                    passwordArray.map((item, index) => {
                      return (
                        <tr>
                          <td className="text-center py-3 px-2 border-2 border-white border-l-0 border-b-0">
                            <div className="flex justify-center items-center gap-2">
                              <a href={item.site} target="_blank">
                                {item.site}
                              </a>
                              <i
                                className="fa-solid fa-copy scale-80 text-white text-2xl transition-transform duration-300 hover:scale-100 cursor-pointer"
                                onClick={() => {
                                  copyText(item.site);
                                }}
                              ></i>
                            </div>
                          </td>
                          <td className="text-center py-1.5 px-2 border-2 border-white border-b-0 ">
                            <div className="flex justify-center items-center gap-2">
                              {item.username}
                              <i
                                className="fa-solid fa-copy scale-80 text-white text-2xl transition-transform duration-300 hover:scale-100 cursor-pointer"
                                onClick={() => {
                                  copyText(item.username);
                                }}
                              ></i>
                            </div>
                          </td>
                          <td className="text-center py-1.5 px-2 border-2 border-white border-r-0 border-b-0 ">
                            <div className="flex justify-center items-center gap-2">
                              {"•".repeat(item.password.length)}
                              <i
                                className="fa-solid fa-copy scale-80 text-white text-2xl transition-transform duration-300 hover:scale-100 cursor-pointer"
                                onClick={() => {
                                  copyText(item.password);
                                }}
                              ></i>
                            </div>
                          </td>
                          <td className="text-center py-1.5 px-2 border-2 border-white border-r-0 border-b-0">
                            <div className="flex justify-center items-center gap-5">
                              <lord-icon
                                src="https://cdn.lordicon.com/nwfpiryp.json"
                                trigger="hover"
                                state="hover-line"
                                colors="primary:#ffffff,secondary:#ffffff,tertiary:#ffffff,quaternary:#000000"
                                className="cursor-pointer"
                                onClick={() => {
                                  editPassword(item);
                                }}
                              ></lord-icon>
                              <lord-icon
                                src="https://cdn.lordicon.com/skkahier.json"
                                trigger="hover"
                                colors="primary:#FFFFFF,secondary:#FFFFFF"
                                className="scale-90 cursor-pointer"
                                onClick={() => {
                                  deletePassword(item._id);
                                }}
                              ></lord-icon>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Manager;
