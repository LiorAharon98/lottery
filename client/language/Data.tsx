import { initReactI18next } from "react-i18next";
import translation_he from "./he";
import translation_en from "./en";
import i18next from "i18next";
import { i18n } from "i18next";
i18next.use(initReactI18next).init({
   lng : 'hebrew',
  compatibilityJSON: 'v3',
  fallbackLng: "en",
  fallbackNS: "common",
  
  
  resources: {
    english: {
      translation: translation_en,
    },
    hebrew: {
      translation: translation_he,
    },
    
  },
  react : {useSuspense : false}
});
export default i18next;
