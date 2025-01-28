import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const textRef = useRef(null);
    const subTextRef = useRef(null);
    const navigate = useNavigate();
    const cursorRef = useRef(null);
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        // GSAP Animation for the "BUILD UR CV" text
        gsap.fromTo(
            textRef.current,
            { y: "-100%", opacity: 0 },
            {
                y: "0%",
                opacity: 1,
                duration: 1.5,
                ease: "elastic.out(1, 0.6)",
                delay: 0.5,
            }
        );

        // GSAP Animation for subtext
        gsap.fromTo(
            subTextRef.current,
            { opacity: 0, scale: 0.5 },
            {
                opacity: 1,
                scale: 1,
                duration: 1,
                ease: "power2.out",
                delay: 1.5,
            }
        );

        // Cursor movement tracking
        const moveCursor = (e) => {
            gsap.to(cursorRef.current, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.1,
                ease: "power2.out",
            });
        };

        window.addEventListener("mousemove", moveCursor);

        return () => {
            window.removeEventListener("mousemove", moveCursor);
        };
    }, []);

    return (
        <div className="h-screen bg-gradient-to-br from-purple-800 via-pink-600 to-yellow-500 flex justify-center items-center text-white relative overflow-hidden">
            <div
                ref={cursorRef}
                className={`fixed top-0 left-0 w-10 h-10 rounded-full bg-pink-400 opacity-0 pointer-events-none transition-transform ${isHovering ? "opacity-100 scale-125" : "opacity-50 scale-1"
                    }`}
                style={{
                    transform: "translate(-50%, -50%)",
                    mixBlendMode: "difference",
                }}
            ></div>

            <div className="text-center">
                <h1
                    ref={textRef}
                    className="text-6xl md:text-8xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 via-pink-400 to-purple-600"
                    onMouseEnter={() => gsap.to(textRef.current, { scale: 1.1, textShadow: "0 0 20px rgba(255,255,255,0.6)" })}
                    onMouseLeave={() => gsap.to(textRef.current, { scale: 1, textShadow: "none" })}
                >
                    BUILD UR CV
                </h1>

                <p
                    ref={subTextRef}
                    className="mt-6 text-xl md:text-2xl font-medium opacity-90 font-bold"
                    onMouseEnter={() => gsap.to(subTextRef.current, { color: "#7851AE", scale: 1.5 })}
                    onMouseLeave={() => gsap.to(subTextRef.current, { color: "white", scale: 1 })}
                >
                    Build your resume quickly and easily with our CV builder.
                </p>
                <div className="mt-10">
                    <button
                        onMouseEnter={() => setIsHovering(true)}
                        onMouseLeave={() => setIsHovering(false)}
                        onClick={() => navigate("/form")}
                        className="px-6 py-3 bg-yellow-400 hover:bg-yellow-300 text-gray-800 font-semibold rounded-lg shadow-lg transition-all duration-300 hover:scale-105"
                    >
                        Make one
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Home;
