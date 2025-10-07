import { Mail, Phone, Instagram, Facebook, Twitter, Github } from "lucide-react";

export default function FooterB4Login() {
  return (
    <footer className="bg-primary text-white relative z-10">
      {/* Top Section */}
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-5 gap-8 items-stretch">
        {/* Logo + About */}
        <div className="md:col-span-2 flex flex-col gap-4 items-center md:items-start text-center md:text-left h-full">
          <div className="flex items-center gap-2 justify-center md:justify-start">
            <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-green-600 rounded-full"></div>
            <h1 className="text-2xl font-bold">TaskFlow</h1>
          </div>
          <p className="text-gray-200 text-sm sm:text-base">
            Streamline tasks, track progress, and get things done.
          </p>
        </div>

        {/* Features */}
        <div className="text-center md:text-left h-full flex flex-col justify-center">
          <h2 className="font-semibold text-lg mb-3">Features</h2>
          <ul className="space-y-2 text-gray-200 text-sm sm:text-base">
            <li>Workspace</li>
            <li>Dashboard</li>
            <li>Task Assignment</li>
            <li>Chatbot</li>
          </ul>
        </div>

        {/* Contact */}
        <div className="text-center md:text-left h-full flex flex-col justify-center">
          <h2 className="font-semibold text-lg mb-3">Contact Us</h2>
          <p className="text-gray-200 text-sm sm:text-base">
            135 Kampuchea Krom, Teuk Thla, Toul Kork, Phnom Penh
          </p>
          <div className="flex items-center justify-center md:justify-start gap-2 mt-2 text-sm sm:text-base">
            <Mail size={18} /> <span>Taskflow12@gmail.com</span>
          </div>
          <div className="flex items-center justify-center md:justify-start gap-2 mt-2 text-sm sm:text-base">
            <Phone size={18} /> <span>+855 12345678</span>
          </div>
        </div>

        {/* Sponsor */}
        <div className="flex flex-col items-center justify-center text-center h-full">
          <p className="ml-6 mb-6 text-lg font-semibold sm:text-base">Sponsored & Organized by</p>
          <img
            src="/src/assets/logo/istad-logo-white.png"
            alt="ISTAD Logo"
            className=" ml-12 h-16 sm:h-20 mt-5"
          />
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-400 mt-6">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-300 text-sm text-center md:text-left">
            © 2025 TaskFlow. All rights reserved.
          </p>

          <div className="flex flex-col md:flex-row gap-4 md:gap-6 text-sm text-center md:text-left">
            <a href="#" className="hover:underline">Terms of Service</a>
            <a href="#" className="hover:underline">Privacy Policy</a>
            <a href="#" className="hover:underline">Cookies</a>
          </div>

          <div className="flex justify-center md:justify-end gap-3 md:gap-4">
            <a href="#" className="border border-white rounded-full p-2 hover:bg-white/10 transition">
              <Instagram size={18} />
            </a>
            <a href="#" className="border border-white rounded-full p-2 hover:bg-white/10 transition">
              <Facebook size={18} />
            </a>
            <a href="#" className="border border-white rounded-full p-2 hover:bg-white/10 transition">
              <Twitter size={18} />
            </a>
            <a href="#" className="border border-white rounded-full p-2 hover:bg-white/10 transition">
              <Github size={18} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
