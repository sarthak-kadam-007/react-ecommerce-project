import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../Comman/Navbar";
import Footer from "../Comman/Footer";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage("Passwords do not match!");
      return;
    }

    setMessage("Registration successful!");
    setTimeout(() => navigate("/Login"), 1000);
  };

  return (
    <>
      <Navbar />

      <div className="flex min-h-[85vh] items-center justify-center bg-gradient-to-br from-slate-950 via-purple-950 to-indigo-950 px-4 py-10">
        <div className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl sm:p-10">
          <div className="mb-7 text-center">
            <h1 className="text-3xl font-extrabold text-purple-700">
              Create Account
            </h1>
            <p className="mt-2 text-gray-500">
              Register to MyWebsite
            </p>
          </div>

          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="mb-1 block font-semibold text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
                required
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-purple-600"
              />
            </div>

            <div>
              <label className="mb-1 block font-semibold text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-purple-600"
              />
            </div>

            <div>
              <label className="mb-1 block font-semibold text-gray-700">
                Mobile Number
              </label>
              <input
                type="tel"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                placeholder="Enter your mobile number"
                pattern="[0-9]{10}"
                title="Enter a valid 10-digit mobile number"
                required
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-purple-600"
              />
            </div>

            <div>
              <label className="mb-1 block font-semibold text-gray-700">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a password"
                minLength={6}
                required
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-purple-600"
              />
            </div>

            <div>
              <label className="mb-1 block font-semibold text-gray-700">
                Confirm Password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your password"
                minLength={6}
                required
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-purple-600"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-gradient-to-r from-purple-700 to-indigo-700 py-3 font-bold text-white shadow-lg transition hover:from-purple-600 hover:to-indigo-600"
            >
              Create Account
            </button>

            {message && (
              <p className={`text-center font-semibold ${
                message.includes("successful")
                  ? "text-green-600"
                  : "text-red-600"
              }`}>
                {message}
              </p>
            )}
          </form>

          <p className="mt-6 text-center text-gray-600">
            Already have an account?{" "}
            <Link
              to="/Login"
              className="font-bold text-purple-700 hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Register;