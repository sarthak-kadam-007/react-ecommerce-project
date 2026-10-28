
import { useState } from "react";
import Navbar from "../Comman/Navbar";
import Footer from "../Comman/Footer";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thank you! Your message has been submitted.");

    setFormData({
      name: "",
      email: "",
      phone: "",
      message: "",
    });
  };

  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-slate-950 via-purple-950 to-indigo-900 px-6 py-20 text-center text-white">
        <div className="absolute -left-20 top-0 h-60 w-60 rounded-full bg-purple-500/20 blur-3xl"></div>
        <div className="absolute -right-20 bottom-0 h-60 w-60 rounded-full bg-blue-500/20 blur-3xl"></div>

        <div className="relative">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[5px] text-purple-300">
            Get In Touch
          </p>

          <h1 className="text-4xl font-extrabold md:text-6xl">
            Contact <span className="text-purple-400">Us</span>
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-gray-300">
            Have a question or need help? Send us a message.
            We would love to hear from you.
          </p>
        </div>
      </section>

      {/* Contact Information */}
      <section className="bg-slate-950 px-6 py-12 text-white">
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2">

          <div className="group rounded-2xl border border-white/10 bg-white/5 p-7 transition duration-300 hover:-translate-y-2 hover:border-purple-400/50 hover:bg-purple-500/10">
            <div className="flex items-center gap-5">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-600 text-3xl shadow-lg shadow-purple-900/40">
                📍
              </div>

              <div>
                <h2 className="text-xl font-bold">Our Location</h2>
                <p className="mt-2 text-gray-400">
                  Ahilyanagar, Maharashtra, India
                </p>
              </div>
            </div>
          </div>

          <div className="group rounded-2xl border border-white/10 bg-white/5 p-7 transition duration-300 hover:-translate-y-2 hover:border-purple-400/50 hover:bg-purple-500/10">
            <div className="flex items-center gap-5">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-600 text-3xl shadow-lg shadow-purple-900/40">
                📞
              </div>

              <div>
                <h2 className="text-xl font-bold">Call Us</h2>
                <p className="mt-2 text-gray-400">
                  Contact us for more information
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="bg-slate-950 px-6 pb-16">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 lg:grid-cols-2">

          {/* Contact Form */}
          <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900 to-slate-800 p-6 shadow-2xl md:p-9">
            <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-purple-400">
              Contact Form
            </p>

            <h2 className="mb-3 text-3xl font-extrabold text-white">
              Send a Message
            </h2>

            <p className="mb-8 text-gray-400">
              Fill in your details and tell us how we can help.
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-200">
                  Full Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  required
                  className="w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none transition placeholder:text-gray-500 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-200">
                  Email Address
                </label>

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required
                  className="w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none transition placeholder:text-gray-500 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-200">
                  Phone Number
                </label>

                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
                  className="w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none transition placeholder:text-gray-500 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-200">
                  Your Message
                </label>

                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Write your message here..."
                  rows="4"
                  required
                  className="w-full resize-y rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none transition placeholder:text-gray-500 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-4 font-bold text-white shadow-lg shadow-purple-900/30 transition duration-300 hover:scale-[1.02] hover:from-purple-500 hover:to-indigo-500"
              >
                Send Message →
              </button>

            </form>
          </div>

          {/* Ahilyanagar Google Map */}
          <div className="flex flex-col">
            <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-purple-400">
              Find Us
            </p>

            <h2 className="mb-3 text-3xl font-extrabold text-white">
              Explore Ahilyanagar
            </h2>

            <p className="mb-6 text-gray-400">
              Find Ahilyanagar, Maharashtra on the map.
            </p>

            <div className="min-h-[400px] flex-1 overflow-hidden rounded-3xl border border-purple-500/20 shadow-2xl shadow-purple-950/40">
              <iframe
                title="Ahilyanagar Maharashtra Map"
                src="https://maps.google.com/maps?q=Ahilyanagar%2C%20Maharashtra%2C%20India&t=&z=13&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: "400px" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            <a
              href="https://www.google.com/maps/search/?api=1&query=Ahilyanagar%2C+Maharashtra%2C+India"
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex items-center justify-center gap-2 rounded-xl border border-purple-500/30 bg-purple-500/10 px-5 py-3 font-semibold text-purple-300 transition hover:bg-purple-500/20"
            >
              📍 Open in Google Maps ↗
            </a>
          </div>

        </div>
      </section>

      <Footer />
    </>
  );
}

export default Contact;
