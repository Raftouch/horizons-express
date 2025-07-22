import Favorite from "../components/Favorite";
import Weather from "../components/Weather";

export default function MainPage() {
  return (
    <div className="px-10 py-8 flex flex-col items-center text-slate-900 w-full min-h-screen">
      <Weather />
      <Favorite />
    </div>
  );
}
