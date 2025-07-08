import { useTranslation } from "react-i18next";
import Favorite from "../components/Favorite";
import Weather from "../components/Weather";
import { GiStripedSun } from "react-icons/gi";

export default function MainPage() {
  const { t } = useTranslation();

  return (
    <div className="px-10 py-8 flex flex-col items-center text-slate-900 w-full min-h-screen">
      <div className="flex gap-5">
        <h1 className="text-white text-xl mb-2">{t("appTitle")}</h1>
        <GiStripedSun className="text-white w-5 h-5" />
      </div>
      <Weather />
      <Favorite />
    </div>
  );
}
