
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Comman/Navbar";
import Footer from "../Comman/Footer";

function Login() {
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // Login Details
  const myMobile = "8767466641";
  const myPassword = "12345";

  const handleLogin = (e) => {
    e.preventDefault();

    if (mobile === myMobile && password === myPassword) {
      localStorage.setItem("isLogin", "true");
      localStorage.setItem("mobile", mobile);
      navigate("/");
      window.location.reload();
    } else {
      setError("Invalid Mobile Number or Password!");
    }
  };

  return (
    <>
      <Navbar />

      <div className="flex min-h-[80vh] items-center justify-center bg-gradient-to-br from-purple-900 to-indigo-950 px-4 py-10">
        <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl">

          <h1 className="mb-2 text-center text-3xl font-bold text-purple-700">
            Welcome Back!
          </h1>

          <p className="mb-6 text-center text-gray-500">
            Login to MyWebsite
          </p>

          <form onSubmit={handleLogin} className="space-y-5">

            <div>
              <label className="mb-2 block font-semibold">
                Mobile Number
              </label>

              <input
                type="tel"
                value={mobile}
                onChange={(e) => {
                  setMobile(e.target.value);
                  setError("");
                }}
                placeholder="Enter your mobile number"
                pattern="[0-9]{10}"
                maxLength={10}
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-purple-600"
              />
            </div>

            <div>
              <label className="mb-2 block font-semibold">
                Password
              </label>

              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError("");
                }}
                placeholder="Enter your password"
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-purple-600"
              />
            </div>

            {error && (
              <p className="rounded-lg bg-red-50 p-3 text-center text-sm text-red-600">
                {error}
              </p>
            )}

            <button
              type="submit"
              className="w-full rounded-lg bg-purple-700 py-3 font-bold text-white transition hover:bg-purple-800"
            >
              Login
            </button>

          </form>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Login;
