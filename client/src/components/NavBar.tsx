import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <div className="flex justify-between text-white px-4 py-2">
      <span>LOGO</span>
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
