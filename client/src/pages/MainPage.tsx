import Weather from "../components/Weather";

export default function MainPage() {
  return (
    <div className="p-10 flex flex-col items-center bg-slate-900 w-full h-full">
      <h1 className="text-white text-2xl mb-2">Horizons Express</h1>
      <Weather />
    </div>
  );
}
