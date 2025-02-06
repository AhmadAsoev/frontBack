import { Link } from 'react-router-dom';
import Login from './Login';

export default function NavBar() {
  return (
    <div className=" mx-auto max-w-[400px] h-90 bg-slate-500  rounded-md mt-44  ">
      <nav className="flex justify-center gap-10 pt-2">
        <Link to="/login">
          <button>Войти</button>
        </Link>
        <Link to="/registration">
          <button>Регистрация</button>
        </Link>
      </nav>
      <Login />
    </div>
  );
}
