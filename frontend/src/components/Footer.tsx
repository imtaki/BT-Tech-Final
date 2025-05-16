import {
  FaFacebookSquare,
  FaInstagram,
  FaYoutube,
  FaLinkedin,
  FaTiktok,
} from "react-icons/fa";
import { BsFillTelephoneFill } from "react-icons/bs";
import { IoKey } from "react-icons/io5";
import { Link } from "react-router";

export default function Footer() {
  const links = ["Agricultural Sciences", "Biotechnology and Food Science",
    "Economics and Social Sciences", "Ecosystem Management, Climate and Biodiversity",
    "Landscape, Water and Infrastructure", "Natural Sciences and Sustainable Resources"];

  return (
      <footer className="relative bg-white text-gray-700 border-t border-gray-200 text-sm z-50">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-wrap justify-between items-start">
            <div className="w-full md:w-1/3 mb-4 md:mb-0">
              <h2 className="text-xl font-bold uppercase tracking-wider mb-3 text-orange-400 underline underline-offset-3">
                Departments
              </h2>
              <ul className="flex flex-col gap-x-4">
                {links.map((link, index) => (
                    <li key={index}>
                      <a href="#" className="hover:text-orange-500 transition-colors">
                        {link}
                      </a>
                    </li>
                ))}
              </ul>
            </div>

            <div className="w-full md:w-1/3 mb-4 md:mb-0 flex flex-col items-center">
              <span className="font-bold text-orange-400">BOKU University</span>
              <span className="text-xs text-gray-500">Gregor-Mendel-Straße 33, 1180 Vienna, Austria</span>
              <a
                  href="tel:+431476540"
                  className="flex items-center gap-1 text-orange-400 hover:text-orange-500 transition-colors mt-1"
              >
                <BsFillTelephoneFill className="text-xs" /> +43 1 47654 0
              </a>
            </div>

            <div className="w-full md:w-1/3 flex justify-end">
              <Link
                  className="flex items-center gap-1 bg-orange-400 text-white px-3 py-1 rounded hover:bg-orange-500 transition-colors text-lg"
                  to="/login"
              >
                <IoKey /> Login
              </Link>
            </div>
          </div>
        </div>

        <div className="bg-gray-700 py-2">
          <div className="container mx-auto px-4 flex justify-between items-center">
            <span className="text-xs text-white">© 2025 Universität für Bodenkultur Wien</span>

            <div className="flex items-center gap-3">
              <a href="https://www.facebook.com/bokuvienna/" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <FaFacebookSquare className="text-white hover:text-orange-400 transition-colors" />
              </a>
              <a href="https://www.instagram.com/boku.vienna/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <FaInstagram className="text-white hover:text-orange-400 transition-colors" />
              </a>
              <a href="https://www.youtube.com/user/bokuwien" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                <FaYoutube className="text-white hover:text-orange-400 transition-colors" />
              </a>
              <a href="https://www.linkedin.com/school/bokuvienna/?originalSubdomain=at" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <FaLinkedin className="text-white hover:text-orange-400 transition-colors" />
              </a>
              <a href="https://www.tiktok.com/@bokuvienna" target="_blank" rel="noopener noreferrer" aria-label="TikTok">
                <FaTiktok className="text-white hover:text-orange-400 transition-colors" />
              </a>
            </div>
          </div>
        </div>
      </footer>
  );
}