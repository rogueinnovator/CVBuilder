import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
    const navigate = useNavigate();
    const { pathname } = useLocation(); // Destructure pathname for simplicity

    return (
        <nav className="w-full bg-gray-800 shadow-md">
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                {/* Logo Section */}
                <div
                    className="text-white text-2xl font-bold cursor-pointer"
                    onClick={() => navigate("/")}
                >
                    CV Builder
                </div>

                <div className="fixed flex ml-[600px] justify-center items-center gap-6">
                    <button
                        className={`text-white ${pathname === "/" ? "font-semibold text-yellow-400" : "hover:text-gray-300"
                            } transition`}
                        onClick={() => navigate("/")}
                    >
                        Home
                    </button>
                    <button
                        className={`text-white ${pathname === "/form" ? "font-semibold text-yellow-400" : "hover:text-gray-300"
                            } transition`}
                        onClick={() => navigate("/form")}
                    >
                        Create CV
                    </button>
                    <button
                        className={`text-white ${pathname === "/about" ? "font-semibold text-yellow-400" : "hover:text-gray-300"
                            } transition`}
                        onClick={() => navigate("/about")}
                    >
                        About
                    </button>
                    <button
                        className={`text-white ${pathname === "/contact" ? "font-semibold text-yellow-400" : "hover:text-gray-300"
                            } transition`}
                        onClick={() => navigate("/contact")}
                    >
                        Contact
                    </button>
                </div>

                {/* Conditional Download Button */}
                {pathname === "/form" && (
                    <button
                        className="bg-green-500 text-white px-4 py-1 rounded-lg hover:bg-green-600 transition"
                        onClick={() => navigate("/login")}
                    >
                        Download
                    </button>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
