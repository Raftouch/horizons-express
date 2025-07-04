import Favorite from "../components/Favorite";
import Weather from "../components/Weather";

export default function MainPage() {
  return (
    <div className="px-10 py-5 flex flex-col items-center text-slate-900 w-full min-h-screen">
      <h1 className="text-white text-xl mb-2">Horizons Express</h1>
      <Weather />
      <Favorite />
    </div>
  );
}
