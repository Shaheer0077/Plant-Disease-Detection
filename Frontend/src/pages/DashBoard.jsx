import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    LayoutDashboard,
    Upload,
    History,
    Settings,
    LogOut,
    Search,
    Bell,
    User,
    Sprout,
    ShieldCheck,
    AlertCircle,
    TrendingUp,
    ChevronRight,
    Camera,
    ScanLine,
    Activity,
    BookOpen,
    Leaf,
    CloudRain,
    Languages
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import sidebarPlant from '../assets/Plant-sidebar.png';
import RightSideImg from '../assets/RightSideImg.png';

const Dashboard = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('overview');

    const stats = [
        { label: 'Total Scans', value: '128', icon: Search, color: 'bg-blue-500' },
        { label: 'Healthy Plants', value: '84', icon: ShieldCheck, color: 'bg-emerald-500' },
        { label: 'Diseases Found', value: '44', icon: AlertCircle, color: 'bg-amber-500' },
        { label: 'Growth Rate', value: '+12%', icon: TrendingUp, color: 'bg-purple-500' },
    ];

    const recentDetections = [
        { id: 1, plant: 'Tomato', disease: 'Early Blight', date: '2 hours ago', status: 'Infected', severity: 'Medium' },
        { id: 2, plant: 'Potato', disease: 'Late Blight', date: '5 hours ago', status: 'Healthy', severity: 'Low' },
        { id: 3, plant: 'Pepper', disease: 'Bacterial Spot', date: 'Yesterday', status: 'Infected', severity: 'High' },
    ];

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    // Function to render content based on active tab
    const renderContent = () => {
        switch (activeTab) {
            case 'overview':
                return renderOverviewContent();
            case 'detection':
                return renderDetectionContent();
            case 'history':
                return renderHistoryContent();
            case 'Weather':
                return renderWeatherContent();
            case 'multilingual':
                return renderMultilingualContent();
            case 'help':
                return renderHelpContent();
            default:
                return renderOverviewContent();
        }
    };

    // Overview/Dashboard Content
    const renderOverviewContent = () => (
        <>
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {stats.map((stat, index) => (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        key={stat.label}
                        className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div className={`${stat.color} p-3 rounded-2xl text-white`}>
                                <stat.icon size={22} />
                            </div>
                            <span className="text-xs font-bold text-emerald-500 bg-emerald-50 px-2 py-1 rounded-lg">
                                +5%
                            </span>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-800">{stat.value}</h3>
                        <p className="text-gray-500 text-sm font-medium mt-1">{stat.label}</p>
                    </motion.div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Primary Action Card */}
                <div className="lg:col-span-2 space-y-8">
                    <section className="bg-gradient-to-br from-brand-primary to-brand-secondary rounded-[2rem] p-8 text-white relative overflow-hidden shadow-xl shadow-brand-primary/20">
                        <div className="relative z-10 w-full md:w-2/3">
                            <h2 className="text-3xl font-bold mb-4">Detect Disease Instantly</h2>
                            <p className="text-white/80 mb-8">Upload a photo of your plant's leaf to identify diseases and get treatment recommendations within seconds.</p>
                            <button
                                onClick={() => setActiveTab('detection')}
                                className="bg-white text-brand-primary px-8 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-brand-light transition-all cursor-pointer group"
                            >
                                <Camera size={20} />
                                Start Scanning
                                <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>
                        {/* Decorative elements */}
                        <div className="absolute top-[-20%] right-[-10%] w-[300px] h-[300px] rounded-full bg-white/10 blur-3xl" />
                        <div className="absolute bottom-[-20%] left-[20%] w-[200px] h-[200px] rounded-full bg-brand-dark/20 blur-2xl" />
                        <Sprout size={240} className="absolute right-[-40px] bottom-[-60px] text-white/10 rotate-12" />
                    </section>

                    {/* Recent Activity */}
                    <section className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold text-gray-800">Recent Detections</h2>
                            <button
                                onClick={() => setActiveTab('history')}
                                className="text-brand-primary text-sm font-semibold hover:underline"
                            >
                                View All
                            </button>
                        </div>
                        <div className="space-y-4">
                            {recentDetections.map((item) => (
                                <div key={item.id} className="flex items-center justify-between p-4 rounded-2xl hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100">
                                    <div className="flex items-center gap-4">
                                        <div className={`p-3 rounded-xl ${item.status === 'Healthy' ? 'bg-emerald-50 text-emerald-500' : 'bg-red-50 text-red-500'}`}>
                                            <Upload size={20} />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-800">{item.plant} - {item.disease}</h4>
                                            <p className="text-sm text-gray-500">{item.date} • Severity: <span className={
                                                item.severity === 'High' ? 'text-red-500' :
                                                    item.severity === 'Medium' ? 'text-amber-500' : 'text-emerald-500'
                                            }>{item.severity}</span></p>
                                        </div>
                                    </div>
                                    <div className={`px-4 py-1.5 rounded-full text-xs font-bold ${item.status === 'Healthy' ? 'bg-emerald-100 text-emerald-600' : 'bg-red-100 text-red-600'
                                        }`}>
                                        {item.status}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>

                {/* Right Column / Tips */}
                <div className="space-y-8">
                    <section className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                        <h2 className="text-xl font-bold text-gray-800 mb-6">Quick Tips</h2>
                        <div className="space-y-6">
                            <div className="flex gap-4">
                                <div className="w-2 h-2 rounded-full bg-brand-primary mt-2 flex-shrink-0"></div>
                                <p className="text-sm text-gray-600 font-medium">Capture the leaf under bright, indirect natural light for best results.</p>
                            </div>
                            <div className="flex gap-4">
                                <div className="w-2 h-2 rounded-full bg-brand-secondary mt-2 flex-shrink-0"></div>
                                <p className="text-sm text-gray-600 font-medium">Ensure the focus is sharp on the affected area of the plant.</p>
                            </div>
                            <div className="flex gap-4">
                                <div className="w-2 h-2 rounded-full bg-brand-dark mt-2 flex-shrink-0"></div>
                                <p className="text-sm text-gray-600 font-medium">Regular weekly scans help detect diseases in early stages.</p>
                            </div>
                        </div>
                        <button className="w-full mt-8 py-3 rounded-xl border border-dashed border-gray-300 text-gray-500 text-sm font-bold hover:border-brand-primary hover:text-brand-primary transition-all">
                            Read More Guides
                        </button>
                    </section>

                    <section className="bg-brand-light/50 rounded-3xl p-6 border border-brand-primary/10">
                        <div className="flex items-center gap-3 mb-4">
                            <ShieldCheck className="text-brand-primary" size={24} />
                            <h2 className="text-lg font-bold text-brand-dark">AI Accuracy</h2>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                            <div className="bg-brand-primary h-2 rounded-full w-[94%]"></div>
                        </div>
                        <p className="text-sm text-brand-dark/70 font-medium">Our models are currently performing with 94.2% accuracy on vegetable crops.</p>
                    </section>
                </div>
            </div>
        </>
    );

    // Disease & Quality Detection Content
    const renderDetectionContent = () => (
        <div className="max-w-4xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100"
            >
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-800 mb-3">Disease & Quality Detection</h2>
                    <p className="text-gray-500">Upload a photo of your plant to detect diseases and assess quality</p>
                </div>

                <div className="border-4 border-dashed border-gray-200 rounded-3xl p-16 text-center hover:border-brand-primary transition-all cursor-pointer bg-gray-50 hover:bg-brand-light/20">
                    <Camera size={64} className="mx-auto text-gray-300 mb-4" />
                    <h3 className="text-xl font-bold text-gray-800 mb-2">Drop your image here</h3>
                    <p className="text-gray-500 mb-6">or click to browse</p>
                    <button className="bg-brand-primary text-white px-8 py-3 rounded-xl font-bold hover:bg-brand-secondary transition-all">
                        Choose File
                    </button>
                </div>

                <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-brand-light/30 p-4 rounded-2xl">
                        <ShieldCheck className="text-brand-primary mb-2" size={24} />
                        <h4 className="font-bold text-gray-800 text-sm">Accurate Detection</h4>
                        <p className="text-xs text-gray-600 mt-1">94%+ accuracy rate</p>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-2xl">
                        <ScanLine className="text-blue-500 mb-2" size={24} />
                        <h4 className="font-bold text-gray-800 text-sm">Instant Results</h4>
                        <p className="text-xs text-gray-600 mt-1">Get results in seconds</p>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-2xl">
                        <BookOpen className="text-purple-500 mb-2" size={24} />
                        <h4 className="font-bold text-gray-800 text-sm">Treatment Tips</h4>
                        <p className="text-xs text-gray-600 mt-1">Detailed recommendations</p>
                    </div>
                </div>
            </motion.div>
        </div>
    );

    // Analysis History Content
    const renderHistoryContent = () => (
        <div>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Analysis History</h2>

                <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                    <div className="space-y-4">
                        {recentDetections.map((item) => (
                            <div key={item.id} className="flex items-center justify-between p-6 rounded-2xl hover:bg-gray-50 transition-colors border border-gray-100">
                                <div className="flex items-center gap-4">
                                    <div className={`p-4 rounded-xl ${item.status === 'Healthy' ? 'bg-emerald-50 text-emerald-500' : 'bg-red-50 text-red-500'}`}>
                                        <Sprout size={28} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-800 text-lg">{item.plant}</h4>
                                        <p className="text-gray-600 mt-1">{item.disease}</p>
                                        <p className="text-sm text-gray-500 mt-1">{item.date}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className={`px-4 py-2 rounded-full text-sm font-bold mb-2 ${item.status === 'Healthy' ? 'bg-emerald-100 text-emerald-600' : 'bg-red-100 text-red-600'}`}>
                                        {item.status}
                                    </div>
                                    <p className="text-sm">
                                        Severity: <span className={
                                            item.severity === 'High' ? 'text-red-500 font-bold' :
                                                item.severity === 'Medium' ? 'text-amber-500 font-bold' : 'text-emerald-500 font-bold'
                                        }>{item.severity}</span>
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </motion.div>
        </div>
    );

    // Weather Alerts Content
    const renderWeatherContent = () => (
        <div>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Weather Alerts</h2>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-3xl p-8 text-white shadow-lg">
                        <CloudRain size={48} className="mb-4" />
                        <h3 className="text-3xl font-bold mb-2">22°C</h3>
                        <p className="text-blue-100 text-lg">Partly Cloudy</p>
                        <div className="mt-6 pt-6 border-t border-white/20">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-blue-100 text-sm">Humidity</p>
                                    <p className="font-bold text-lg">65%</p>
                                </div>
                                <div>
                                    <p className="text-blue-100 text-sm">Wind</p>
                                    <p className="font-bold text-lg">12 km/h</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                        <h3 className="font-bold text-gray-800 mb-4">Active Alerts</h3>
                        <div className="space-y-3">
                            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4">
                                <div className="flex items-start gap-3">
                                    <AlertCircle className="text-amber-600 flex-shrink-0" size={20} />
                                    <div>
                                        <h4 className="font-bold text-amber-900 text-sm">Heavy Rain Expected</h4>
                                        <p className="text-amber-700 text-xs mt-1">Protect sensitive plants from waterlogging</p>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4">
                                <div className="flex items-start gap-3">
                                    <ShieldCheck className="text-blue-600 flex-shrink-0" size={20} />
                                    <div>
                                        <h4 className="font-bold text-blue-900 text-sm">Optimal Growing Conditions</h4>
                                        <p className="text-blue-700 text-xs mt-1">Perfect temperature for most crops</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-6 bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                    <h3 className="font-bold text-gray-800 mb-4">7-Day Forecast</h3>
                    <div className="grid grid-cols-7 gap-3">
                        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => (
                            <div key={day} className="text-center p-3 rounded-xl hover:bg-gray-50 transition-colors">
                                <p className="text-sm font-bold text-gray-600 mb-2">{day}</p>
                                <CloudRain size={24} className="mx-auto text-blue-500 mb-2" />
                                <p className="text-sm font-bold text-gray-800">22°</p>
                            </div>
                        ))}
                    </div>
                </div>
            </motion.div>
        </div>
    );

    // MultiLanguage Support Content
    const renderMultilingualContent = () => (
        <div className="max-w-3xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100"
            >
                <div className="text-center mb-8">
                    <Languages size={48} className="mx-auto text-brand-primary mb-4" />
                    <h2 className="text-3xl font-bold text-gray-800 mb-3">Language Settings</h2>
                    <p className="text-gray-500">Choose your preferred language for the application</p>
                </div>

                <div className="space-y-3">
                    {[
                        { name: 'English', code: 'EN', flag: '🇬🇧' },
                        { name: 'Español', code: 'ES', flag: '🇪🇸' },
                        { name: 'Français', code: 'FR', flag: '🇫🇷' },
                        { name: 'Deutsch', code: 'DE', flag: '🇩🇪' },
                        { name: '中文', code: 'ZH', flag: '🇨🇳' },
                        { name: 'اردو', code: 'UR', flag: '🇵🇰' },
                    ].map((language) => (
                        <button
                            key={language.code}
                            className="w-full flex items-center justify-between p-4 rounded-2xl border-2 border-gray-200 hover:border-brand-primary hover:bg-brand-light/20 transition-all cursor-pointer group"
                        >
                            <div className="flex items-center gap-4">
                                <span className="text-3xl">{language.flag}</span>
                                <div className="text-left">
                                    <h4 className="font-bold text-gray-800">{language.name}</h4>
                                    <p className="text-sm text-gray-500">{language.code}</p>
                                </div>
                            </div>
                            <div className="w-6 h-6 rounded-full border-2 border-gray-300 group-hover:border-brand-primary transition-colors"></div>
                        </button>
                    ))}
                </div>

                <div className="mt-8 p-4 bg-brand-light/30 rounded-2xl">
                    <p className="text-sm text-gray-600 text-center">
                        <span className="font-bold text-brand-dark">Note:</span> Language changes will apply to all interface elements and notifications.
                    </p>
                </div>
            </motion.div>
        </div>
    );

    // Guide & Help Content
    const renderHelpContent = () => (
        <div>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Guide & Help</h2>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                        <BookOpen className="text-brand-primary mb-4" size={32} />
                        <h3 className="text-xl font-bold text-gray-800 mb-3">Quick Start Guide</h3>
                        <p className="text-gray-600 mb-4">Learn how to use PlantCare effectively</p>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-3">
                                <ChevronRight className="text-brand-primary flex-shrink-0 mt-1" size={16} />
                                <span className="text-sm text-gray-700">How to scan a plant for diseases</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <ChevronRight className="text-brand-primary flex-shrink-0 mt-1" size={16} />
                                <span className="text-sm text-gray-700">Understanding detection results</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <ChevronRight className="text-brand-primary flex-shrink-0 mt-1" size={16} />
                                <span className="text-sm text-gray-700">Treatment recommendations</span>
                            </li>
                        </ul>
                    </div>

                    <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                        <Camera className="text-blue-500 mb-4" size={32} />
                        <h3 className="text-xl font-bold text-gray-800 mb-3">Best Practices</h3>
                        <p className="text-gray-600 mb-4">Tips for accurate detection</p>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-3">
                                <ChevronRight className="text-blue-500 flex-shrink-0 mt-1" size={16} />
                                <span className="text-sm text-gray-700">Use natural lighting when possible</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <ChevronRight className="text-blue-500 flex-shrink-0 mt-1" size={16} />
                                <span className="text-sm text-gray-700">Focus on affected areas</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <ChevronRight className="text-blue-500 flex-shrink-0 mt-1" size={16} />
                                <span className="text-sm text-gray-700">Capture clear, high-quality images</span>
                            </li>
                        </ul>
                    </div>

                    <div className="bg-gradient-to-br from-brand-primary to-brand-secondary rounded-3xl p-6 text-white shadow-lg">
                        <h3 className="text-xl font-bold mb-3">Need Help?</h3>
                        <p className="text-white/80 mb-4">Our support team is here to assist you</p>
                        <button className="bg-white text-brand-primary px-6 py-2 rounded-xl font-bold hover:bg-brand-light transition-all">
                            Contact Support
                        </button>
                    </div>

                    <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                        <h3 className="font-bold text-gray-800 mb-4">FAQs</h3>
                        <div className="space-y-3">
                            <details className="group">
                                <summary className="font-medium text-gray-700 cursor-pointer list-none flex items-center justify-between">
                                    How accurate is the detection?
                                    <ChevronRight className="group-open:rotate-90 transition-transform" size={16} />
                                </summary>
                                <p className="text-sm text-gray-600 mt-2 pl-4">Our AI model has a 94%+ accuracy rate on most common plant diseases.</p>
                            </details>
                            <details className="group">
                                <summary className="font-medium text-gray-700 cursor-pointer list-none flex items-center justify-between">
                                    What plants are supported?
                                    <ChevronRight className="group-open:rotate-90 transition-transform" size={16} />
                                </summary>
                                <p className="text-sm text-gray-600 mt-2 pl-4">We support most vegetable crops including tomatoes, potatoes, peppers, and more.</p>
                            </details>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );

    return (
        <div className="flex min-h-screen bg-gray-50 font-outfit">
            {/* Sidebar */}
            <aside className="fixed left-0 top-0 h-full w-64 bg-brand-dark text-white z-50 transition-all duration-300">
                <div className="p-6 flex items-center gap-3">
                    <div className="bg-brand-primary p-2 rounded-xl">
                        <Leaf size={24} className="text-white" />
                    </div>
                    <span className="text-xl font-bold tracking-tight">PlantCare</span>
                </div>

                <nav className="mt-8 px-4 space-y-1">
                    {[
                        { id: 'overview', icon: LayoutDashboard, label: 'Dashboard' },
                        { id: 'detection', icon: ScanLine, label: 'Disease & Quality' },
                        { id: 'history', icon: Activity, label: 'Analysis History' },
                        { id: 'Weather', icon: CloudRain, label: 'Weather Alerts' },
                        { id: 'multilingual', icon: Languages, label: 'MultiLanguage Support' },
                        { id: 'help', icon: BookOpen, label: 'Guide & Help' },
                    ].map((item) => (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id)}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 cursor-pointer ${activeTab === item.id
                                ? 'bg-brand-primary text-white shadow-lg shadow-brand-primary/20'
                                : 'text-gray-400 hover:bg-white/5 hover:text-white'
                                }`}
                        >
                            <item.icon size={24} className="flex-shrink-0" />
                            <span className="font-medium text-bold whitespace-nowrap">{item.label}</span>
                        </button>
                    ))}
                </nav>

                <div className="absolute bottom-8 w-full px-4 space-y-4">
                    {/* Decorative Plant Image */}
                    <div className="flex justify-center mb-4">
                        <div className="w-40 h-40  overflow-hidden  transition-all duration-300 ">
                            <img
                                src={sidebarPlant}
                                alt="Decorative plant"
                                className="w-full h-full object-contain hover:scale-110 transition-transform duration-300"
                            />
                        </div>
                    </div>

                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl text-white bg-brand-primary  hover:bg-red-500/10 hover:text-red-400 transition-all duration-200 cursor-pointer"
                    >
                        <LogOut size={20} />
                        <span className="font-medium">Logout</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="ml-64 flex-1 p-8 pr-44 relative">
                {/* Decorative Hanging Plant - Foreground Layer */}
                <div className="absolute top-0 right-0 w-48 h-[500px] z-20 pointer-events-none drop-shadow-xl">
                    <img
                        src={RightSideImg}
                        alt="Hanging plant decoration"
                        className="w-full h-full object-contain"
                    />
                </div>

                {/* Header */}
                <header className="flex items-center justify-between pb-2 mb-8 border-b border-gray-200 relative z-10">
                    <div>
                        {activeTab === 'overview' ? (
                            <>
                                <h1 className="text-2xl font-bold text-gray-800">Welcome back, {user?.name || 'User'}!</h1>
                                <p className="text-gray-500">Here's what's happening with your garden today.</p>
                            </>
                        ) : (
                            <>
                                <h1 className="text-2xl font-bold text-gray-800 capitalize">
                                    {activeTab === 'Weather' ? 'Weather Alerts' : activeTab.replace(/([A-Z])/g, ' $1').trim()}
                                </h1>
                                <p className="text-gray-500 text-sm">Manage your {activeTab.toLowerCase()} settings and information.</p>
                            </>
                        )}
                    </div>

                    <div className="flex items-center gap-4">
                        <button className="p-2 bg-white rounded-xl shadow-sm border border-gray-100 text-gray-400 hover:text-brand-primary transition-colors cursor-pointer relative">
                            <Bell size={20} />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                        </button>
                        <div className="flex items-center gap-3 bg-white p-1.5 pr-9  rounded-xl shadow-sm border border-gray-100">
                            <div className="w-10 h-10 rounded-lg bg-brand-primary/10 flex items-center justify-center text-brand-primary font-bold">
                                {user?.name?.charAt(0) || 'U'}
                            </div>
                            <div>
                                <p className="text-sm font-bold text-gray-800 leading-none">{user?.name || 'Alishba'}</p>
                                <p className="text-xs text-gray-500 mt-1">Profile</p>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Dynamic Content Based on Active Tab */}
                <div className={`relative z-10 ${activeTab !== 'overview' ? 'bg-white/40 backdrop-blur-sm rounded-[2.5rem] p-8 border-2 border-white/60 shadow-xl shadow-gray-200/50' : ''}`}>
                    {renderContent()}
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
