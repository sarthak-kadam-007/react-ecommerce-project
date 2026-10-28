
import { useNavigate } from "react-router-dom";
import Navbar from "../Comman/Navbar";
import Footer from "../Comman/Footer";

function Profile() {
  const navigate = useNavigate();

  const mobile = localStorage.getItem("mobile") || "9370960249";

  const handleLogout = () => {
    localStorage.removeItem("isLogin");
    localStorage.removeItem("mobile");
    navigate("/Login");
    window.location.reload();
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 px-4 py-10">
        <div className="mx-auto max-w-6xl overflow-hidden rounded-2xl bg-white/70 shadow-2xl">

          {/* Gradient Header */}
          <div className="h-28 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>

          <div className="px-5 pb-10 sm:px-10">

            {/* Original Profile Photo */}
            <div className="-mt-16 flex justify-center">
              <img
                src="/profile.jpg"
                alt="Profile Photo"
                className="h-32 w-32 rounded-full border-8 border-white bg-indigo-100 object-cover shadow-xl"
              />
            </div>

            {/* User Details */}
            <div className="mt-4 text-center">
              <h1 className="text-2xl font-bold text-slate-900">
                Sarthak Balasaheb Kadam
              </h1>

              <p className="mt-2 text-gray-500">
                Full Stack Developer
              </p>

              <span className="mt-3 inline-block rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-600">
                ● Active
              </span>
            </div>

            {/* Personal Information */}
            <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2">

              <div className="flex items-center gap-4 rounded-2xl border border-indigo-100 bg-white/70 p-5 shadow-md">
                <div className="rounded-xl bg-indigo-100 p-4 text-2xl">
                  👤
                </div>
                <div>
                  <p className="text-sm text-gray-500">Full Name</p>
                  <p className="font-bold text-slate-900">
                    Sarthak Balasaheb Kadam
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 rounded-2xl border border-pink-100 bg-white/70 p-5 shadow-md">
                <div className="rounded-xl bg-pink-100 p-4 text-2xl">
                  📞
                </div>
                <div>
                  <p className="text-sm text-gray-500">Phone Number</p>
                  <p className="font-bold text-slate-900">{mobile}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 rounded-2xl border border-purple-100 bg-white/70 p-5 shadow-md">
                <div className="rounded-xl bg-purple-100 p-4 text-2xl">
                  ✉️
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email Address</p>
                  <p className="font-bold text-slate-900">
                    sarthak@gmail.com
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 rounded-2xl border border-blue-100 bg-white/70 p-5 shadow-md">
                <div className="rounded-xl bg-blue-100 p-4 text-2xl">
                  🔑
                </div>
                <div>
                  <p className="text-sm text-gray-500">Password</p>
                  <p className="font-bold text-slate-900">
                    ••••••••
                  </p>
                </div>
              </div>

            </div>

            {/* Order History and Wishlist */}
            <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">

              <div className="flex items-center gap-4 rounded-2xl border border-indigo-100 bg-white/60 p-5 shadow-md">
                <div className="rounded-xl bg-indigo-100 p-4 text-2xl">
                  🛍️
                </div>

                <div className="flex-1">
                  <h2 className="font-bold text-slate-900">
                    Order History
                  </h2>
                  <p className="mt-1 text-sm text-gray-500">
                    View your previous orders
                  </p>
                </div>

                <span className="text-xl text-indigo-600">➜</span>
              </div>

              <div className="flex items-center gap-4 rounded-2xl border border-pink-100 bg-pink-50/60 p-5 shadow-md">
                <div className="rounded-xl bg-pink-100 p-4 text-2xl">
                  ❤️
                </div>

                <div className="flex-1">
                  <h2 className="font-bold text-slate-900">
                    My Wishlist
                  </h2>
                  <p className="mt-1 text-sm text-gray-500">
                    View your liked products
                  </p>
                </div>

                <span className="text-xl text-pink-600">➜</span>
              </div>

            </div>

            {/* Edit Profile and Logout */}
            <div className="mt-8 flex flex-wrap justify-center gap-4">

              <button
                onClick={() => alert("Edit Profile feature coming soon!")}
                className="rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-3 font-bold text-white shadow-lg transition hover:scale-105"
              >
                ✏️ Edit Profile
              </button>

              <button
                onClick={handleLogout}
                className="rounded-xl bg-gradient-to-r from-red-500 to-rose-600 px-10 py-3 font-bold text-white shadow-lg transition hover:scale-105"
              >
                ⇥ Logout
              </button>

            </div>

          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Profile;
