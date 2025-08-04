import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

import en from './en/translation.json'
import ru from './ru/translation.json'
import uk from './uk/translation.json'

// Force Ukrainian on first visit
if (!localStorage.getItem('i18nextLng')) {
    localStorage.setItem('i18nextLng', 'uk')
}

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources: {
            en: { translation: en },
            ru: { translation: ru },
            uk: { translation: uk },
        },
        fallbackLng: 'uk',
        detection: {
            order: ['localStorage', 'navigator'],
            caches: ['localStorage'],
        },
        interpolation: {
            escapeValue: false,
        },
    })

export default i18n