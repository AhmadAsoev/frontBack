import { Link } from "react-router"
import Login from "./Login"


export default function Registration() {
  return (
    <div className=" mx-auto max-w-[400px] min-h-90 bg-slate-500  rounded-md mt-44  ">
      <nav className="flex justify-center py-2 w-full bg-sky-500 hover:bg-sky-700 rounded-md text-white">
        <Link to="/login">
          <button>Войти</button>
        </Link>
          </nav>
          <Login/>
    </div>
  )
}
