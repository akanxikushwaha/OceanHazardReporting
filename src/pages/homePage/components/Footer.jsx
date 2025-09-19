import React from 'react';
import { Waves, Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-ocean-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Waves className="h-8 w-8 text-ocean-100" />
              <span className="text-2xl font-bold">OceanGuard</span>
            </div>
            <p className="text-ocean-100 leading-relaxed">
              Protecting coastal communities through crowdsourced ocean hazard prediction and real-time safety alerts.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-ocean-100 hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-ocean-100 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-ocean-100 hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-ocean-100 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <a href="#features" className="text-ocean-100 hover:text-white transition-colors">
                  Features
                </a>
              </li>
              <li>
                <a href="#alerts" className="text-ocean-100 hover:text-white transition-colors">
                  Active Alerts
                </a>
              </li>
              <li>
                <a href="#news" className="text-ocean-100 hover:text-white transition-colors">
                  News
                </a>
              </li>
            </ul>
          </div>

          {/* Platform */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Platform</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/dashboard" className="text-ocean-100 hover:text-white transition-colors">
                  User Dashboard
                </Link>
              </li>
              <li>
                <Link to="/admin" className="text-ocean-100 hover:text-white transition-colors">
                  Admin Panel
                </Link>
              </li>
              <li>
                <a href="#" className="text-ocean-100 hover:text-white transition-colors">
                  API Documentation
                </a>
              </li>
              <li>
                <a href="#" className="text-ocean-100 hover:text-white transition-colors">
                  Mobile App
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-ocean-100" />
                <span className="text-ocean-100">contact@oceanguard.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-ocean-100" />
                <span className="text-ocean-100">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-ocean-100" />
                <span className="text-ocean-100">San Francisco, CA</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-ocean-600 mt-8 pt-8 text-center">
          <p className="text-ocean-100">
            © 2024 OceanGuard. All rights reserved. Built for safer oceans worldwide.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;