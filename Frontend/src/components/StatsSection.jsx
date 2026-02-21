import React from "react";
import { Sprout, Users, Leaf, Globe, TrendingUp, Award } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

export default function StatsSection() {
    const { t, i18n } = useTranslation();
    const isUrdu = i18n.language.startsWith('ur');

    const stats = [
        {
            icon: Sprout,
            value: t('stats.items.diseases.value'),
            label: t('stats.items.diseases.label'),
            sub: t('stats.items.diseases.sub')
        },
        {
            icon: Users,
            value: t('stats.items.farmers.value'),
            label: t('stats.items.farmers.label'),
            sub: t('stats.items.farmers.sub')
        },
        {
            icon: Globe,
            value: t('stats.items.countries.value'),
            label: t('stats.items.countries.label'),
            sub: t('stats.items.countries.sub')
        },
        {
            icon: TrendingUp,
            value: t('stats.items.yield.value'),
            label: t('stats.items.yield.label'),
            sub: t('stats.items.yield.sub')
        }
    ];

    return (
        <section className="py-24 relative overflow-hidden bg-brand-light">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-primary/5 blur-[150px] rounded-full -translate-y-1/2 translate-x-1/2"></div>


            <div className="max-w-7xl mx-auto px-6 md:px-12">
                <div className={`grid lg:grid-cols-4 md:grid-cols-2 gap-12 text-center text-brand-dark ${isUrdu ? 'lg:text-right' : 'lg:text-left'}`}>
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="relative group"
                        >
                            <div className={`flex flex-col items-center ${isUrdu ? 'lg:items-end' : 'lg:items-start'}`}>
                                <div className="w-14 h-14 rounded-2xl bg-white shadow-md flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-brand-primary transition-all duration-300">
                                    <stat.icon size={28} className="text-brand-primary group-hover:text-white" />
                                </div>
                                <h3 className="text-5xl font-black mb-2 tracking-tight">
                                    {stat.value}
                                </h3>
                                <p className="text-xl font-bold mb-2">{stat.label}</p>
                                <p className="text-gray-500 text-sm font-medium">{stat.sub}</p>
                            </div>

                            {/* Divider for desktop */}
                            {index < stats.length - 1 && (
                                <div className={`hidden lg:block absolute top-1/2 h-12 w-[1px] bg-brand-primary/10 -translate-y-1/2 ${isUrdu ? '-left-6' : '-right-6'}`}></div>
                            )}
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    className="mt-24 p-12 rounded-[40px] bg-white border border-brand-primary/10 shadow-xl flex flex-col md:flex-row items-center justify-between gap-8"
                >
                    <div className="max-w-xl">
                        <h4 className="text-3xl font-black mb-4 leading-tight text-brand-dark">{t('stats.cta.title')}</h4>
                        <p className="text-gray-600 text-lg font-medium">{t('stats.cta.description')}</p>
                    </div>
                    <button className="px-10 py-5 rounded-2xl bg-brand-primary hover:bg-brand-dark text-white font-bold text-lg transition-all shadow-2xl shadow-brand-primary/20">
                        {t('stats.cta.button')}
                    </button>
                </motion.div>
            </div>
        </section>
    );
}
