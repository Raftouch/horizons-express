import Weather from "../components/Weather";

export default function MainPage() {
  return (
    <div className="p-5 bg-slate-100 w-full h-screen">
      <h1>Horizons Express</h1>
      <Weather />
    </div>
  );
}
