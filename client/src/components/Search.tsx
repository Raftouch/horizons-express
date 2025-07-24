import { useTranslation } from "react-i18next";
import { FaSearch } from "react-icons/fa";

interface SearchProps {
  city: string;
  handleCityChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleCitySearch: () => void;
}

export default function Search({
  city,
  handleCityChange,
  handleCitySearch,
}: SearchProps) {
  const { t } = useTranslation();

  return (
    <div className="flex gap-5 my-4 text-white pb-5 w-[320px]">
      <input
        type="text"
        value={city}
        placeholder={t("actions.search")}
        onChange={handleCityChange}
        className="outline-none focus:border-white flex-1 border border-white/50 px-4 py-1 rounded-full"
      />
      <button
        className="border border-white/50 cursor-pointer px-2 py-1 rounded-full hover:border-white"
        onClick={handleCitySearch}
      >
        <FaSearch />
      </button>
    </div>
  );
}
