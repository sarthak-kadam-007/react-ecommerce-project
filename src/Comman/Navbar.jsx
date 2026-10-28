
import { Link } from "react-router-dom";

function Navbar() {
  const isLogin = localStorage.getItem("isLogin") === "true";

  return (
    <nav className="bg-slate-900 text-white px-8 py-4 flex items-center justify-between shadow-lg">

      {/* Left Side */}
      <div className="flex items-center gap-8">
        <h1 className="text-2xl font-bold text-blue-400">
          MyWebsite
        </h1>

        <div className="flex gap-6">
          <Link to="/" className="hover:text-blue-400">
            Home
          </Link>

          <Link to="/About" className="hover:text-blue-400">
            About
          </Link>

          <Link to="/Contact" className="hover:text-blue-400">
            Contact
          </Link>

          <Link to="/Product" className="hover:text-blue-400">
            Product
          </Link>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-4">
        {isLogin ? (
          <>
            <Link
              to="/Profile"
              title="User Profile"
              className="rounded-full bg-slate-700 p-3 hover:bg-slate-600"
            >
              👤
            </Link>

            <Link
              to="/Cart"
              title="Shopping Cart"
              className="rounded-full bg-slate-700 p-3 hover:bg-slate-600"
            >
              🛒
            </Link>
          </>
        ) : (
          <>
            <Link
              to="/Login"
              className="rounded-lg bg-purple-600 px-4 py-2 hover:bg-purple-700"
            >
              Login
            </Link>

            <Link
              to="/Register"
              className="rounded-lg bg-indigo-600 px-4 py-2 hover:bg-indigo-700"
            >
              Register
            </Link>
          </>
        )}
      </div>

    </nav>
  );
}

export default Navbar;