import Weather from "../components/Weather";

export default function MainPage() {
  return (
    <div className="font-mono p-10 flex flex-col items-center bg-slate-900 text-slate-900 w-full min-h-screen">
      <h1 className="text-white text-2xl mb-2">Horizons Express</h1>
      <Weather />
    </div>
  );
}
