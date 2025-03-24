import React from "react";
import { Link } from "react-router-dom";
import Logo from "../Logo";

function Footer() {
  return (
    <footer className="w-full bg-gray-800 fixed left-0 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between">
          {/* Logo and Copyright */}
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <div className="flex items-center space-x-3">
              <Logo width="100px" />
              <h2 className="text-xl font-semibold">DevUI</h2>
            </div>
            <p className="mt-2 text-sm text-gray-400">
              &copy; {new Date().getFullYear()} All Rights Reserved.
            </p>
          </div>

          {/* Company Links */}
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h3 className="text-lg font-semibold text-gray-300 mb-3">Company</h3>
            <ul className="space-y-2">
              <li><Link className="text-gray-400 hover:text-white transition" to="/">Features</Link></li>
              <li><Link className="text-gray-400 hover:text-white transition" to="/">Pricing</Link></li>
              <li><Link className="text-gray-400 hover:text-white transition" to="/">Affiliate Program</Link></li>
              <li><Link className="text-gray-400 hover:text-white transition" to="/">Press Kit</Link></li>
            </ul>
          </div>

          {/* Support Links */}
          <div className="w-full md:w-1/3">
            <h3 className="text-lg font-semibold text-gray-300 mb-3">Support</h3>
            <ul className="space-y-2">
              <li><Link className="text-gray-400 hover:text-white transition" to="/">Account</Link></li>
              <li><Link className="text-gray-400 hover:text-white transition" to="/">Help</Link></li>
              <li><Link className="text-gray-400 hover:text-white transition" to="/">Contact Us</Link></li>
              <li><Link className="text-gray-400 hover:text-white transition" to="/">Customer Support</Link></li>
            </ul>
          </div>
        </div>

        {/* Social Media Links */}
        <div className="mt-6 border-t border-gray-600 pt-4 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-400">Follow us:</p>
          <div className="flex space-x-4 mt-2 md:mt-0">
            <Link to="/" className="text-gray-400 hover:text-white transition">
              <i className="fab fa-facebook-f"></i>
            </Link>
            <Link to="/" className="text-gray-400 hover:text-white transition">
              <i className="fab fa-twitter"></i>
            </Link>
            <Link to="/" className="text-gray-400 hover:text-white transition">
              <i className="fab fa-instagram"></i>
            </Link>
            <Link to="/" className="text-gray-400 hover:text-white transition">
              <i className="fab fa-linkedin-in"></i>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
