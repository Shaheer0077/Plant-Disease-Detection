import React, { useState, useEffect } from "react";
import { Leaf, LogIn, UserPlus, Menu, X, LogOut, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
    const { user, logout } = useAuth();
    const [scrolled, setScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "glass shadow-sm py-3" : "bg-white py-5"
                }`}
        >
            <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-2 text-2xl font-bold text-brand-dark"
                >
                    <div className="bg-brand-primary p-1.5 rounded-lg text-white shadow-lg shadow-brand-primary/20">
                        <Leaf className="w-6 h-6" />
                    </div>
                    <span className="tracking-tight">PlantCare <span className="text-brand-primary">AI</span></span>
                </motion.div>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center gap-8">
                    {["Features", "About", "Disease Library", "Resources"].map((link) => (
                        <a
                            key={link}
                            href={`#${link.toLowerCase().replace(" ", "-")}`}
                            className="text-gray-600 hover:text-brand-primary font-medium transition-colors"
                        >
                            {link}
                        </a>
                    ))}
                </div>

                <div className="hidden md:flex items-center gap-4">
                    {user ? (
                        <>
                            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-light text-brand-dark font-semibold border border-brand-primary/20">
                                <User size={18} />
                                <span>{user.name} Profile</span>
                            </div>
                            <button
                                onClick={logout}
                                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-red-500 hover:bg-red-50 font-semibold transition-all border border-transparent hover:border-red-100 cursor-pointer"
                            >
                                <LogOut size={18} /> Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/auth" state={{ isSignup: false }} className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-brand-dark hover:bg-brand-light font-semibold transition-all">
                                <LogIn size={18} /> Login
                            </Link>
                            <Link to="/auth" state={{ isSignup: true }} className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-brand-primary text-white hover:bg-brand-dark hover:shadow-lg hover:shadow-brand-primary/30 font-semibold transition-all">
                                <UserPlus size={18} /> Sign Up
                            </Link>
                        </>
                    )}
                </div>

                {/* Mobile Toggle */}
                <button
                    className="md:hidden text-brand-dark p-2"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden glass border-t border-brand-light px-6 py-6 absolute top-full left-0 right-0"
                    >
                        <div className="flex flex-col gap-4">
                            {["Features", "About", "Disease Library", "Resources"].map((link) => (
                                <a
                                    key={link}
                                    href={`#${link.toLowerCase().replace(" ", "-")}`}
                                    className="text-lg font-medium text-gray-700 hover:text-brand-primary"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    {link}
                                </a>
                            ))}
                            <hr className="border-gray-100 my-2" />
                            <div className="flex flex-col gap-3">
                                {user ? (
                                    <>
                                        <div className="w-full py-3 px-4 rounded-xl bg-brand-light text-brand-dark font-semibold text-center border border-brand-primary/20 flex items-center justify-center gap-2">
                                            <User size={18} /> {user.name}
                                        </div>
                                        <button
                                            onClick={logout}
                                            className="w-full py-3 rounded-xl border border-red-200 text-red-500 font-semibold hover:bg-red-50 flex items-center justify-center gap-2"
                                        >
                                            <LogOut size={18} /> Logout
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <Link to="/auth" state={{ isSignup: false }} className="w-full text-center py-3 rounded-xl border border-brand-primary text-brand-primary font-semibold">
                                            Login
                                        </Link>
                                        <Link to="/auth" state={{ isSignup: true }} className="w-full text-center py-3 rounded-xl bg-brand-primary text-white font-semibold shadow-lg shadow-brand-primary/20">
                                            Sign Up
                                        </Link>
                                    </>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
