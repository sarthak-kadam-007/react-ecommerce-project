import { Link } from "react-router-dom";
import Navbar from "../Comman/Navbar";
import Footer from "../Comman/Footer";

function About() {
  const features = [
    {
      icon: "🛍️",
      title: "Quality Products",
      description: "We offer high-quality products that you can trust.",
      color: "bg-purple-100 text-purple-600",
    },
    {
      icon: "🚚",
      title: "Fast Delivery",
      description: "Get your orders delivered quickly and safely.",
      color: "bg-blue-100 text-blue-600",
    },
    {
      icon: "🛡️",
      title: "Secure Payments",
      description: "Your payments are always safe and protected.",
      color: "bg-green-100 text-green-600",
    },
    {
      icon: "💗",
      title: "Customer Support",
      description: "We are always here to help you with any query.",
      color: "bg-pink-100 text-pink-600",
    },
  ];

  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section className="relative flex min-h-[280px] items-center overflow-hidden bg-slate-950 px-6 py-12 md:px-16">
        <img
          src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1600"
          alt="Modern office workspace"
          className="absolute inset-0 h-full w-full object-cover opacity-40"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/80 to-purple-950/30"></div>

        <div className="relative z-10 mx-auto w-full max-w-7xl text-white">
          <p className="mb-3 font-bold tracking-[4px] text-purple-300">
            ABOUT US
          </p>

          <h1 className="text-3xl font-extrabold sm:text-4xl md:text-5xl">
            Welcome to{" "}
            <span className="text-indigo-400">MyWebsite</span>
          </h1>

          <p className="mt-4 max-w-xl text-base leading-7 text-slate-200 md:text-lg">
            We are passionate about providing the best products and
            services to our customers. Our goal is to make your shopping
            experience simple, enjoyable and memorable.
          </p>
        </div>
      </section>

      {/* About Content */}
      <section className="bg-white px-6 py-10 md:px-16 md:py-14">
        <div className="mx-auto grid max-w-7xl items-center gap-10 md:grid-cols-2">
          <div>
            <img
              src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1000"
              alt="MyWebsite workspace"
              className="h-64 w-full rounded-xl object-cover shadow-lg sm:h-80"
            />
          </div>

          <div>
            <p className="mb-2 text-sm font-extrabold tracking-[3px] text-purple-600">
              WHO WE ARE
            </p>

            <h2 className="text-3xl font-extrabold text-slate-900 md:text-4xl">
              Your Shopping Destination
            </h2>

            <p className="mt-4 leading-7 text-slate-600">
              MyWebsite is an online shopping platform designed to help
              customers explore a wide range of products easily. We focus
              on quality, convenience and customer satisfaction.
            </p>

            <p className="mt-3 leading-7 text-slate-600">
              Our mission is to bring you the best products at great prices
              with a smooth and secure shopping experience.
            </p>

            <Link
              to="/Product"
              className="mt-5 inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 px-5 py-3 font-semibold text-white transition hover:scale-105 hover:shadow-lg"
            >
              Learn More <span>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gradient-to-b from-indigo-50 to-white px-6 py-12 md:px-16">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <p className="font-extrabold tracking-[3px] text-purple-600">
              WHY CHOOSE US
            </p>

            <h2 className="mt-2 text-3xl font-extrabold text-slate-900">
              Our Key Features
            </h2>

            <p className="mt-3 text-slate-600">
              We are committed to giving you the best shopping experience.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((item, index) => (
              <div
                key={index}
                className="rounded-2xl p-5 text-center transition duration-300 hover:-translate-y-2 hover:bg-white hover:shadow-xl"
              >
                <div
                  className={`mx-auto flex h-16 w-16 items-center justify-center rounded-full text-3xl ${item.color}`}
                >
                  {item.icon}
                </div>

                <h3 className="mt-4 text-lg font-bold text-slate-900">
                  {item.title}
                </h3>

                <p className="mx-auto mt-2 max-w-xs text-sm leading-6 text-slate-600">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom Banner */}
      <section className="relative overflow-hidden bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-700 px-6 py-10 text-center text-white">
        <div className="relative z-10">
          <h2 className="text-2xl font-extrabold sm:text-3xl">
            Explore MyWebsite Today!
          </h2>

          <p className="mt-3 text-sm text-indigo-100 sm:text-base">
            Discover amazing products, great offers and a better shopping
            experience.
          </p>

          <Link
            to="/Product"
            className="mt-5 inline-flex items-center gap-2 rounded-lg bg-white px-5 py-3 font-bold text-indigo-700 transition hover:scale-105 hover:shadow-lg"
          >
            Start Shopping <span>→</span>
          </Link>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default About;