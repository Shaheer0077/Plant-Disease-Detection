import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Play, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation, Trans } from "react-i18next";
import heroImg from "../assets/heroImg.png";

export default function HeroSection() {
    const { t, i18n } = useTranslation();
    const isUrdu = i18n.language.startsWith('ur');

    return (
        <section className="relative pt-32 pb-20 md:pt-38 md:pb-32 hero-gradient overflow-hidden">
            {/* Decorative Blur Overlays */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-primary/10 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-brand-secondary/10 blur-[100px] rounded-full translate-y-1/2 -translate-x-1/4"></div>

            <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >


                        <h1 className="text-5xl md:text-7xl font-black text-brand-dark leading-[1.1] mb-6 tracking-tight">
                            {t('hero.title')}
                        </h1>

                        <p className="text-xl text-gray-600 mb-10 leading-relaxed max-w-xl">
                            {t('hero.description')}
                        </p>

                        <div className="flex flex-wrap gap-5">
                            <Link to="/auth" state={{ isSignup: true }}>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-8 py-4 rounded-2xl bg-brand-primary text-white font-bold text-lg shadow-xl shadow-brand-primary/30 hover:bg-brand-dark transition-all flex items-center gap-2"
                                >
                                    {t('hero.getStarted')} {isUrdu ? <ArrowRight size={20} className="rotate-180" /> : <ArrowRight size={20} />}
                                </motion.button>
                            </Link>

                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-8 py-4 rounded-2xl bg-white text-brand-dark border border-gray-200 font-bold text-lg hover:border-brand-primary hover:text-brand-primary transition-all flex items-center gap-2"
                            >
                                <div className="w-8 h-8 rounded-full bg-brand-light flex items-center justify-center text-brand-primary">
                                    <Play size={18} fill="currentColor" />
                                </div>
                                {t('hero.howItWorks')}
                            </motion.button>
                        </div>

                        <div className="mt-12 flex items-center gap-6">
                            <div className={`flex ${isUrdu ? 'space-x-reverse -space-x-4' : '-space-x-4'}`}>
                                {[1, 2, 3, 4].map((i) => (
                                    <div key={i} className="w-12 h-12 rounded-full border-4 border-white overflow-hidden bg-gray-200 group">
                                        <img src={`https://i.pravatar.cc/150?u=${i}`} alt="user" className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                                    </div>
                                ))}
                            </div>
                            <div className="text-sm text-gray-500 font-medium">
                                <Trans i18nKey="hero.joinedBy" values={{ count: 2 }}>
                                    Joined by <span className="text-brand-dark font-bold">2k+ farmers</span> <br />
                                    saving millions in crop losses.
                                </Trans>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="relative"
                    >
                        <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl border-8 border-white/50 group">
                            <img
                                src={heroImg}
                                alt="Plant Disease Detection AI"
                                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                        </div>


                        {/* Background elements */}
                        <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-brand-primary/5 rounded-[40%] rotate-45 blur-3xl scale-90"></div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
