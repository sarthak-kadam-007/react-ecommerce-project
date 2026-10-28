
function Footer() {
  return (
    <footer className="bg-slate-900 text-white px-8 py-10 mt-10">

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* Website Name */}
        <div>
          <h1 className="text-2xl font-bold text-blue-400 mb-3">
            MyWebsite
          </h1>
          <p className="text-gray-400">
            Welcome to our website. We provide the best services for you.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-xl font-semibold mb-3">
            Quick Links
          </h2>
          <ul className="space-y-2 text-gray-400">
            <li className="hover:text-blue-400 cursor-pointer">Home</li>
            <li className="hover:text-blue-400 cursor-pointer">About</li>
            <li className="hover:text-blue-400 cursor-pointer">Contact</li>
            <li className="hover:text-blue-400 cursor-pointer">Product</li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h2 className="text-xl font-semibold mb-3">
            Contact Us
          </h2>
          <p className="text-gray-400 mb-2">Email: info@mywebsite.com</p>
          <p className="text-gray-400 mb-2">Phone: +91 9876543210</p>
          <p className="text-gray-400">India</p>
        </div>

      </div>

      {/* Copyright */}
      <div className="border-t border-gray-700 mt-8 pt-5 text-center">
        <p className="text-gray-400 text-sm">
          © 2026 MyWebsite. All Rights Reserved.
        </p>
      </div>

    </footer>
  );
}

export default Footer;
