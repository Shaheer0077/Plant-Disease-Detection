import React from 'react';
import { useTranslation } from 'react-i18next';
import { Languages, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const languages = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'ur', name: 'اردو', flag: '🇵🇰' }
];

export default function LanguageSwitcher() {
    const { i18n } = useTranslation();
    const [isOpen, setIsOpen] = React.useState(false);

    const currentLanguage = languages.find(lang => lang.code === i18n.language.split('-')[0]) || languages[0];

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
        setIsOpen(false);
    };

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/50 hover:bg-white border border-gray-200 transition-all cursor-pointer text-gray-700 font-medium whitespace-nowrap"
            >
                <span>{currentLanguage.flag}</span>
                <span className="hidden sm:inline">{currentLanguage.name}</span>
                <ChevronDown size={14} className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute right-0 mt-2 w-40 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden z-[100]"
                    >
                        <div className="p-2 space-y-1">
                            {languages.map((lang) => (
                                <button
                                    key={lang.code}
                                    onClick={() => changeLanguage(lang.code)}
                                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-sm transition-colors cursor-pointer ${i18n.language.startsWith(lang.code)
                                        ? 'bg-brand-primary/10 text-brand-primary font-bold'
                                        : 'text-gray-600 hover:bg-gray-50'
                                        }`}
                                >
                                    <div className="flex items-center gap-2">
                                        <span>{lang.flag}</span>
                                        <span>{lang.name}</span>
                                    </div>
                                    {i18n.language.startsWith(lang.code) && (
                                        <div className="w-1.5 h-1.5 rounded-full bg-brand-primary"></div>
                                    )}
                                </button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
