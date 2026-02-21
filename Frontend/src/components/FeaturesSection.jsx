import React from "react";
import { LayoutDashboard, ScanLine, Activity, FlaskConical, Languages, CloudSun } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

export default function FeaturesSection() {
    const { t, i18n } = useTranslation();
    const isUrdu = i18n.language.startsWith('ur');

    const features = [
        {
            icon: LayoutDashboard,
            title: t('features.items.interface.title'),
            description: t('features.items.interface.description'),
            color: "bg-teal-500",
            lightColor: "bg-teal-50",
            iconColor: "text-teal-600"
        },
        {
            icon: ScanLine,
            title: t('features.items.detection.title'),
            description: t('features.items.detection.description'),
            color: "bg-blue-500",
            lightColor: "bg-blue-50",
            iconColor: "text-blue-600"
        },
        {
            icon: Activity,
            title: t('features.items.results.title'),
            description: t('features.items.results.description'),
            color: "bg-indigo-500",
            lightColor: "bg-indigo-50",
            iconColor: "text-indigo-600"
        },
        {
            icon: FlaskConical,
            title: t('features.items.medicine.title'),
            description: t('features.items.medicine.description'),
            color: "bg-green-500",
            lightColor: "bg-green-50",
            iconColor: "text-green-600"
        },
        {
            icon: Languages,
            title: t('features.items.multilingual.title'),
            description: t('features.items.multilingual.description'),
            color: "bg-pink-500",
            lightColor: "bg-pink-50",
            iconColor: "text-pink-600"
        },
        {
            icon: CloudSun,
            title: t('features.items.weather.title'),
            description: t('features.items.weather.description'),
            color: "bg-cyan-500",
            lightColor: "bg-cyan-50",
            iconColor: "text-cyan-600"
        }
    ];

    return (
        <section id="features" className="py-24 max-w-7xl mx-auto px-6 md:px-12 bg-white">
            <div className="text-center mb-20">
                <motion.span
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="text-brand-primary font-bold tracking-[0.2em] uppercase text-xs"
                >
                    {t('features.badge')}
                </motion.span>
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="text-4xl md:text-5xl font-black text-brand-dark mt-4 mb-6"
                >
                    {t('features.title')}
                </motion.h2>
                <p className="max-w-2xl mx-auto text-gray-500 text-lg">
                    {t('features.description')}
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {features.map((feature, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        viewport={{ once: true }}
                        whileHover={{ y: -10 }}
                        className="group relative p-8 rounded-[32px] border border-gray-100 bg-white hover:border-brand-primary/20 hover:shadow-2xl hover:shadow-brand-primary/10 transition-all duration-300"
                    >
                        <div className={`w-16 h-16 rounded-[24px] ${feature.lightColor} flex items-center justify-center mb-8 group-hover:scale-110 transition-transform`}>
                            <feature.icon className={`w-8 h-8 ${feature.iconColor}`} />
                        </div>

                        <h3 className="text-2xl font-bold text-brand-dark mb-4 transition-colors group-hover:text-brand-primary">
                            {feature.title}
                        </h3>
                        <p className="text-gray-600 leading-relaxed">
                            {feature.description}
                        </p>

                        <button className={`mt-8 flex items-center gap-2 text-brand-primary font-bold transition-all ${isUrdu ? 'opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0' : 'opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0'}`}>
                            {t('features.learnMore')} <ArrowRightSmall isUrdu={isUrdu} />
                        </button>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}

function ArrowRightSmall({ isUrdu }) {
    return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`lucide lucide-arrow-right ${isUrdu ? 'rotate-180' : ''}`}><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
    );
}
