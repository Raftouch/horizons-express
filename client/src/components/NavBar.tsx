import { Link, useLocation } from "react-router-dom";
import { GiStripedSun } from "react-icons/gi";
import { useTranslation } from "react-i18next";

export default function NavBar() {
  const { t } = useTranslation();
  const location = useLocation();

  return (
    <div className="fixed w-full flex justify-between text-white px-4 py-2 h-16 items-center bg-[linear-gradient(to_right,_#0f172a,_#4f46e5)]">
      <div className="flex gap-5">
        <h1 className="text-white mb-2">{t("appTitle")}</h1>
        <GiStripedSun className="text-white w-5 h-5" />
      </div>
      <ul className="flex gap-8">
        <li
          className={`hover:text-rose-500 ${
            location.pathname === "/" ? "border-b" : ""
          }`}
        >
          <Link to="/">Current Weather</Link>
        </li>
        <li
          className={`hover:text-rose-500 ${
            location.pathname === "/forecast" ? "border-b" : ""
          }`}
        >
          <Link to="/forecast">Forecast</Link>
        </li>
      </ul>
    </div>
  );
}
