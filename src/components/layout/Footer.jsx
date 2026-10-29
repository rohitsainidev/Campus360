import { Link } from 'react-router-dom';
import { GraduationCap } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-[#E2E8F0] mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="space-y-3 md:col-span-2 max-w-md">
            <Link to="/" className="flex items-center gap-2">
              <GraduationCap className="h-6 w-6 text-[#2563EB]" strokeWidth={2} />
              <span className="font-bold text-base tracking-tight text-[#0F172A]">
                Campus<span className="text-[#2563EB]">360</span>
              </span>
            </Link>
            <p className="text-xs text-[#475569] leading-relaxed">
              Campus360 is a unified campus management platform designed to streamline academic activities, student services, facility operations, and institutional administration.
            </p>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#0F172A] mb-3">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs text-[#475569]">
              <li>
                <Link to="/" className="hover:text-[#2563EB] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-[#2563EB] transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-[#2563EB] transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[#2563EB] transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Access Portals */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#0F172A] mb-3">
              Portals
            </h4>
            <ul className="space-y-2 text-xs text-[#475569]">
              <li>
                <Link to="/login" className="hover:text-[#2563EB] transition-colors">
                  Student Portal
                </Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-[#2563EB] transition-colors">
                  Teacher Portal
                </Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-[#2563EB] transition-colors">
                  Maintenance Staff Portal
                </Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-[#2563EB] transition-colors">
                  Administrator Console
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright notice */}
        <div className="pt-6 border-t border-[#E2E8F0] flex flex-col sm:flex-row items-center justify-between text-xs text-[#64748B] gap-3">
          <p>© {new Date().getFullYear()} Campus360. All rights reserved.</p>
          <p>Smart Campus Management Platform</p>
        </div>
      </div>
    </footer>
  );
}
