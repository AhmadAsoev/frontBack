import { Link } from 'react-router-dom';
import Login from './Login';

export default function NavBar() {
  return (
    <div className=" mx-auto max-w-[400px] min-h-90 bg-slate-500  rounded-md mt-44  ">
      <nav className="flex justify-center   w-full bg-sky-500 hover:bg-sky-800 rounded-md text-white py-2">
        <Link to="/registration">
          <button>Регистрация</button>
        </Link>
      </nav>
      <Login />
    </div>
  );
}
