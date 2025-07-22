import { Link } from "react-router-dom";
import { GiStripedSun } from "react-icons/gi";
import { useTranslation } from "react-i18next";

export default function NavBar() {
  const { t } = useTranslation();

  return (
    <div className="fixed flex justify-between text-white px-4 py-2">
      <div className="flex gap-5">
        <h1 className="text-white mb-2">{t("appTitle")}</h1>
        <GiStripedSun className="text-white w-5 h-5" />
      </div>
      <ul className="flex gap-8">
        <li>
          <Link to="/">Current Weather</Link>
        </li>
        <li>
          <Link to="/forecast">Forecast</Link>
        </li>
      </ul>
    </div>
  );
}
