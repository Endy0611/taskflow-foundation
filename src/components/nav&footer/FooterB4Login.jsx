import { Mail, Phone, Instagram, Facebook, Twitter, Github } from "lucide-react";

export default function FooterB4Login() {
  return (
    <footer className="bg-primary text-white">
      {/* Top Section */}
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-5 gap-8">
        {/* Logo + About */}
        <div className="md:col-span-2 flex flex-col gap-4">
          <div className="flex items-center gap-2">
            {/* Logo */}
            <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-green-600 rounded-full"></div>
            <h1 className="text-2xl font-bold">TaskFlow</h1>
          </div>
          <p className="text-gray-200">
            Streamline tasks, track progress, and get things done.
          </p>
        </div>

        {/* Features */}
        <div>
          <h2 className="font-semibold text-lg mb-3">Features</h2>
          <ul className="space-y-2 text-gray-200">
            <li>Workspace</li>
            <li>Dashboard</li>
            <li>Task assignment</li>
            <li>Chatbot</li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h2 className="font-semibold text-lg mb-3">Contact Us</h2>
          <p className="text-gray-200">135 Kampuchea Krom, Teuk Thla, Toul Kork, Phnom Penh</p>
          <div className="flex items-center gap-2 mt-2">
            <Mail size={18} /> <span>Taskflow12@gmail.com</span>
          </div>
          <div className="flex items-center gap-2 mt-2">
            <Phone size={18} /> <span>+855 12345678</span>
          </div>
        </div>

        {/* Sponsor */}
        <div className="flex flex-col items-center justify-center">
          <p className="mb-2">Sponsor and Organize by</p>
          <img
            src="/src/assets/logo/istad-logo-white.png"
            alt="ISTAD Logo"
            className="h-20"
          />
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-400 mt-4">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-300 text-sm">
            © 2025 TaskFlow. All rights reserved.
          </p>

          <div className="flex gap-6 text-sm">
            <a href="#" className="hover:underline">Terms of Service</a>
            <a href="#" className="hover:underline">Privacy Policy</a>
            <a href="#" className="hover:underline">Cookies</a>
          </div>

          <div className="flex gap-4">
            <a href="#" className="border rounded-full px-2 py-2 "><Instagram /></a>
            <a href="#" className="border rounded-full px-2 py-2 "><Facebook /></a>
            <a href="#" className="border rounded-full px-2 py-2 "><Twitter /></a>
            <a href="#" className="border rounded-full px-2 py-2 "><Github /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}
