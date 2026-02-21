import React from "react";
import { Leaf, Twitter, Facebook, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function Footer() {
    const { t } = useTranslation();

    return (
        <footer className="bg-emerald-50/50 border-t border-emerald-100 relative overflow-hidden">
            {/* Decorative background element */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-primary/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2"></div>

            <div className="max-w-7xl mx-auto px-6 md:px-12 pt-24 pb-12 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16">
                    {/* Brand & Mission */}
                    <div className="lg:col-span-1">
                        <div className="flex items-center gap-2 text-2xl font-black text-brand-dark mb-6">
                            <div className="bg-brand-primary p-1.5 rounded-lg text-white shadow-lg shadow-brand-primary/20">
                                <Leaf className="w-5 h-5" />
                            </div>
                            <span>PlantCare AI</span>
                        </div>
                        <p className="text-gray-500 leading-relaxed mb-8 font-medium">
                            {t('footer.mission')}
                        </p>
                        <div className="flex gap-4">
                            {[Twitter, Instagram, Facebook, Linkedin].map((Icon, i) => (
                                <button key={i} className="w-10 h-10 rounded-xl bg-white shadow-sm border border-emerald-100 flex items-center justify-center text-emerald-600 hover:bg-brand-primary hover:text-white hover:scale-110 transition-all">
                                    <Icon size={20} />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Solution Links */}
                    <div>
                        <h4 className="text-brand-dark font-black text-lg mb-8 uppercase tracking-widest">{t('footer.sections.solutions.title')}</h4>
                        <ul className="space-y-4">
                            {t('footer.sections.solutions.items', { returnObjects: true }).map((item) => (
                                <li key={item} className="text-gray-500 hover:text-brand-primary cursor-pointer transition-colors font-semibold">
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company Links */}
                    <div>
                        <h4 className="text-brand-dark font-black text-lg mb-8 uppercase tracking-widest">{t('footer.sections.company.title')}</h4>
                        <ul className="space-y-4">
                            {t('footer.sections.company.items', { returnObjects: true }).map((item) => (
                                <li key={item} className="text-gray-500 hover:text-brand-primary cursor-pointer transition-colors font-semibold">
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-brand-dark font-black text-lg mb-8 uppercase tracking-widest">{t('footer.sections.contact.title')}</h4>
                        <ul className="space-y-6">
                            <li className="flex gap-4">
                                <div className="w-12 h-12 rounded-xl bg-white border border-emerald-100 shadow-sm flex items-center justify-center text-brand-primary flex-shrink-0">
                                    <Mail size={20} />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[10px] font-black text-emerald-600 uppercase tracking-tighter">{t('footer.sections.contact.email')}</span>
                                    <span className="font-bold text-brand-dark">hello@plantcare.ai</span>
                                </div>
                            </li>
                            <li className="flex gap-4">
                                <div className="w-12 h-12 rounded-xl bg-white border border-emerald-100 shadow-sm flex items-center justify-center text-brand-primary flex-shrink-0">
                                    <Phone size={20} />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[10px] font-black text-emerald-600 uppercase tracking-tighter">{t('footer.sections.contact.call')}</span>
                                    <span className="font-bold text-brand-dark">+92 300 1234567</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="mt-15 pt-8 border-t border-emerald-100 flex flex-col md:flex-row items-center justify-between gap-6">
                    <p className="text-gray-400 text-sm font-semibold">
                        {t('footer.bottom.rights', { year: new Date().getFullYear() })}
                    </p>
                    <div className="flex gap-8 text-sm text-gray-400 font-semibold">
                        <span className="hover:text-brand-dark cursor-pointer transition-colors underline decoration-emerald-100 underline-offset-4">{t('footer.bottom.privacy')}</span>
                        <span className="hover:text-brand-dark cursor-pointer transition-colors underline decoration-emerald-100 underline-offset-4">{t('footer.bottom.terms')}</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
