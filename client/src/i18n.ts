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
          appTitle: "Horizons Express",
          favCities: "Favorites",
          emptyList: "No cities in your list yet",
          weather: {
            current: "Current Weather",
            humidity: "Humidity",
            sunrise: "Sunrise",
            sunset: "Sunset",
            wind: "Wind",
            feelsLike: "Feels like",
            kmH: "km/h",
            min: "Min",
            max: "Max",
          },
          forecast: {
            fc: "Forecast",
            fiveDayForecast: "5-day detailed forecast",
            for: "for",
          },
          actions: {
            addToList: "Add to my list",
            removeFromList: "Remove from list",
            search: "Search for a city",
            loading: "Loading",
          },
        },
      },
      fr: {
        translation: {
          appTitle: "Horizons Express",
          favCities: "Favoris",
          emptyList: "Aucune ville dans votre liste pour le moment",
          weather: {
            current: "Météo actuelle",
            humidity: "Humidité",
            sunrise: "Lever du soleil",
            sunset: "Coucher du soleil",
            wind: "Vent",
            feelsLike: "Ressenti",
            kmH: "km/h",
            min: "Min",
            max: "Max",
          },
          forecast: {
            fc: "Prévisions",
            fiveDayForecast: "Prévision détaillée sur 5 jours",
            for: "pour",
          },
          actions: {
            addToList: "Ajouter à ma liste",
            removeFromList: "Retirer de ma liste",
            search: "Rechercher une ville",
            loading: "Recherche en cours",
          },
        },
      },
      ru: {
        translation: {
          appTitle: "Экспресс Горизонты",
          favCities: "Избранное",
          emptyList: "В Вашем списке пока нет городов",
          weather: {
            current: "Текущая погода",
            humidity: "Влажность",
            sunrise: "Восход солнца",
            sunset: "Закат солнца",
            wind: "Ветер",
            feelsLike: "Ощущается как",
            kmH: "км/ч",
            min: "Мин.",
            max: "Макс.",
          },
          forecast: {
            fc: "Прогноз",
            fiveDayForecast: "Подробный прогноз на 5 дней",
            for: "для",
          },
          actions: {
            addToList: "Добавить в список",
            removeFromList: "Убрать из списка",
            search: "Поиск города",
            loading: "Выполняется поиск",
          },
        },
      },
    },
  });
