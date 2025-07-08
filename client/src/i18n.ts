import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: true,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
    resources: {
      en: {
        translation: {
          weather: {
            humidity: "Humidity",
            sunrise: "Sunrise",
            sunset: "Sunset",
            wind: "Wind",
            feelsLike: "Feels like",
            kmH: "km/h",
            min: "Min",
            max: "Max",
          },
          actions: {
            addToList: "Add to my list",
            removeFromList: "Remove from list",
            search: "Search for a city",
          },
        },
      },
      fr: {
        translation: {
          weather: {
            humidity: "Humidité",
            sunrise: "Lever du soleil",
            sunset: "Coucher du soleil",
            wind: "Vent",
            feelsLike: "Ressenti",
            kmH: "km/h",
            min: "Min",
            max: "Max",
          },
          actions: {
            addToList: "Ajouter à ma liste",
            removeFromList: "Retirer de ma liste",
            search: "Rechercher une ville",
          },
        },
      },
      ru: {
        translation: {
          weather: {
            humidity: "Влажность",
            sunrise: "Восход солнца",
            sunset: "Закат солнца",
            wind: "Ветер",
            feelsLike: "Ощущается как",
            kmH: "км/ч",
            min: "Мин.",
            max: "Макс.",
          },
          actions: {
            addToList: "Добавить в список",
            removeFromList: "Убрать из списка",
            search: "Поиск города",
          },
        },
      },
    },
  });
