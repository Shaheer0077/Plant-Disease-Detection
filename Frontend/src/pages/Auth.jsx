import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, User, ArrowRight, Leaf, Sprout } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const Auth = () => {
    const location = useLocation();
    // Default to login if no state is provided, otherwise use the state value
    const [isLogin, setIsLogin] = useState(location.state?.isSignup ? false : true);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });

    const { name, email, password } = formData;
    const { login, user } = useAuth();

    // Redirect if already logged in
    React.useEffect(() => {
        if (user) {
            navigate('/dashboard');
        }
    }, [user, navigate]);

    const onChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const url = isLogin
                ? 'http://localhost:5000/api/auth/login'
                : 'http://localhost:5000/api/auth/register';

            const payload = isLogin ? { email, password } : { name, email, password };

            const response = await axios.post(url, payload);

            if (response.data) {
                if (!isLogin) {
                    // Successful Signup
                    setIsLogin(true);
                    setFormData({ name: '', email: '', password: '' });
                    alert('Account created! Please log in.');
                } else {
                    // Successful Login
                    login(response.data);
                    navigate('/dashboard');
                }
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    const toggleMode = () => {
        setIsLogin(!isLogin);
        setError('');
        setFormData({ name: '', email: '', password: '' });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4 relative overflow-hidden">

            {/* Background Decorations */}
            <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-brand-primary/10 blur-3xl" />
            <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-brand-secondary/10 blur-3xl" />


            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl h-[600px] flex overflow-hidden relative z-10 glass border border-white/50">

                {/* Left Side (Form) */}
                <div className={`w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center transition-all duration-700 ease-in-out absolute md:relative h-full ${isLogin ? 'z-20 opacity-100 translate-x-0' : 'z-10 opacity-0 -translate-x-full md:translate-x-0 md:opacity-100'}`}>
                    <div className="mb-8 text-center md:text-left">
                        <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-brand-dark to-brand-primary mb-2">
                            Welcome Back
                        </h2>
                        <p className="text-gray-500">
                            Please enter your details to sign in.
                        </p>
                    </div>

                    <form onSubmit={onSubmit} className="space-y-4">
                        {error && (
                            <div className="p-3 text-sm text-red-500 bg-red-50 rounded-lg border border-red-100">
                                {error}
                            </div>
                        )}

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Email</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                                <input
                                    type="email"
                                    name="email"
                                    value={email}
                                    onChange={onChange}
                                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all"
                                    placeholder="Enter your email"
                                    required={isLogin}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                                <input
                                    type="password"
                                    name="password"
                                    value={password}
                                    onChange={onChange}
                                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all"
                                    placeholder="••••••••"
                                    required={isLogin}
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-gradient-to-r from-brand-primary to-brand-secondary text-white py-3 rounded-xl font-semibold shadow-lg shadow-brand-primary/20 hover:shadow-xl hover:scale-[1.02] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                                <>Login <ArrowRight className="h-5 w-5" /></>
                            )}
                        </button>
                    </form>

                    <div className="mt-8 text-center md:hidden">
                        <p className="text-gray-500 text-sm">Don't have an account?</p>
                        <button onClick={toggleMode} className="text-brand-primary font-semibold text-sm hover:underline mt-1">
                            Sign Up
                        </button>
                    </div>
                </div>

                {/* Right Side (Register Form - positioned absolute or swapped) */}
                {/* Actually, to simulate the 'slider', I will put the Register form on the RIGHT side by default, but hidden/covered by the overlay when in Login mode. */}
                <div className={`w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center transition-all duration-700 ease-in-out absolute md:relative h-full ${!isLogin ? 'z-20 opacity-100 translate-x-0' : 'z-10 opacity-0 translate-x-full md:translate-x-0 md:opacity-100'}`}>
                    <div className="mb-8 text-center md:text-left">
                        <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-brand-dark to-brand-primary mb-2">
                            Create Account
                        </h2>
                        <p className="text-gray-500">
                            Join us to start detecting plant diseases.
                        </p>
                    </div>

                    <form onSubmit={onSubmit} className="space-y-4">
                        {error && (
                            <div className="p-3 text-sm text-red-500 bg-red-50 rounded-lg border border-red-100">
                                {error}
                            </div>
                        )}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Full Name</label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                                <input
                                    type="text"
                                    name="name"
                                    value={name}
                                    onChange={onChange}
                                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all"
                                    placeholder="Ente Your Name"
                                    required={!isLogin}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Email</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                                <input
                                    type="email"
                                    name="email"
                                    value={email}
                                    onChange={onChange}
                                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all"
                                    placeholder="Enter your email"
                                    required={!isLogin}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                                <input
                                    type="password"
                                    name="password"
                                    value={password}
                                    onChange={onChange}
                                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all"
                                    placeholder="Create a password"
                                    required={!isLogin}
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-gradient-to-r from-brand-primary to-brand-secondary text-white py-3 rounded-xl font-semibold shadow-lg shadow-brand-primary/20 hover:shadow-xl hover:scale-[1.02] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                                <>Sign Up <ArrowRight className="h-5 w-5" /></>
                            )}
                        </button>
                    </form>

                    <div className="mt-8 text-center md:hidden">
                        <p className="text-gray-500 text-sm">Already have an account?</p>
                        <button onClick={toggleMode} className="text-brand-primary font-semibold text-sm hover:underline mt-1">
                            Login
                        </button>
                    </div>
                </div>


                {/* Sliding Overlay Panel (Hidden on Mobile) */}
                <div
                    className={`hidden md:flex absolute top-0 left-0 h-full w-1/2 bg-gradient-to-br from-brand-dark via-brand-primary to-brand-secondary text-white transition-all duration-700 ease-in-out z-30 flex-col items-center justify-center p-12 text-center transform ${isLogin ? 'translate-x-[100%] rounded-l-[100px] rounded-r-none' : 'translate-x-0 rounded-r-[100px] rounded-l-none'}`}
                >
                    <div className="relative w-full h-full flex flex-col items-center justify-center">
                        {/* Shapes/Blobs for texture */}
                        <div className="absolute top-10 right-10 w-20 h-20 bg-white/10 rounded-full blur-xl animate-pulse" />
                        <div className="absolute bottom-20 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl" />

                        <AnimatePresence mode='wait'>
                            {isLogin ? (
                                <motion.div
                                    key="login-overlay"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.3 }}
                                    className="flex flex-col items-center"
                                >
                                    <div className="bg-white/20 p-4 rounded-2xl mb-6 backdrop-blur-sm">
                                        <Sprout size={48} className="text-white" />
                                    </div>
                                    <h2 className="text-3xl font-bold mb-4">Hello, Friend!</h2>
                                    <p className="text-brand-light mb-8 max-w-xs">Enter your personal details and start your journey with us.</p>
                                    <button
                                        onClick={toggleMode}
                                        className="px-8 py-3 border-2 border-white rounded-xl font-semibold hover:bg-white hover:text-brand-primary transition-all cursor-pointer"
                                    >
                                        Sign Up
                                    </button>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="signup-overlay"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.3 }}
                                    className="flex flex-col items-center"
                                >
                                    <div className="bg-white/20 p-4 rounded-2xl mb-6 backdrop-blur-sm">
                                        <Leaf size={48} className="text-white" />
                                    </div>
                                    <h2 className="text-3xl font-bold mb-4">Welcome Back!</h2>
                                    <p className="text-brand-light mb-8 max-w-xs">To keep connected with us please login with your personal info.</p>
                                    <button
                                        onClick={toggleMode}
                                        className="px-8 py-3 border-2 border-white rounded-xl font-semibold hover:bg-white hover:text-brand-primary transition-all cursor-pointer"
                                    >
                                        Login
                                    </button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Auth;
