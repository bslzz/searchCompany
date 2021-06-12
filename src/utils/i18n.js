import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import fi from '../languages/fi.json'
import en from '../languages/en.json'

i18n.use(initReactI18next).init({
  fallbackLng: 'fi',
  debug: true,
  resources: {
    fi,
    en
  },
  ns: ['common'],
  interpolation: {
    escapeValue: false
  },
  lng: 'fi',
  react: {
    useSuspense: false
  }
})

export default i18n
