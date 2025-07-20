import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../Logo';

function Footer() {
  return (
    <footer className="bg-gradient-to-t from-gray-900 to-gray-700 text-gray-200 border-t border-gray-800 py-12 mt-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-wrap gap-8 justify-between">
          <div className="w-full md:w-1/2 lg:w-5/12 mb-8 md:mb-0 flex flex-col justify-between">
            <div className="mb-4 flex items-center">
              <Logo width="50px" />
            </div>
            <p className="text-sm text-gray-400">&copy; {new Date().getFullYear()} Write Wave. All Rights Reserved.</p>
          </div>
          <div className="w-full sm:w-1/2 md:w-1/4 lg:w-2/12 mb-8 md:mb-0">
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-gray-400">Company</h3>
            <ul className="space-y-2">
              <li><Link className="hover:text-blue-400 transition" to="/">Features</Link></li>
              <li><Link className="hover:text-blue-400 transition" to="/">Pricing</Link></li>
              <li><Link className="hover:text-blue-400 transition" to="/">Affiliate Program</Link></li>
              <li><Link className="hover:text-blue-400 transition" to="/">Press Kit</Link></li>
            </ul>
          </div>
          <div className="w-full sm:w-1/2 md:w-1/4 lg:w-2/12 mb-8 md:mb-0">
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-gray-400">Support</h3>
            <ul className="space-y-2">
              <li><Link className="hover:text-blue-400 transition" to="/">Account</Link></li>
              <li><Link className="hover:text-blue-400 transition" to="/">Help</Link></li>
              <li><Link className="hover:text-blue-400 transition" to="/">Contact Us</Link></li>
              <li><Link className="hover:text-blue-400 transition" to="/">Customer Support</Link></li>
            </ul>
          </div>
          <div className="w-full sm:w-1/2 md:w-1/4 lg:w-3/12">
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-gray-400">Legals</h3>
            <ul className="space-y-2">
              <li><Link className="hover:text-blue-400 transition" to="/">Terms &amp; Conditions</Link></li>
              <li><Link className="hover:text-blue-400 transition" to="/">Privacy Policy</Link></li>
              <li><Link className="hover:text-blue-400 transition" to="/">Licensing</Link></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;