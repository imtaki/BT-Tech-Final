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
  const links = ["LINK1", "LINK2", "LINK3", "LINK4", "LINK5"];

  return (
    <footer className="flex flex-col gap-4 bg-gray-50 text-gray-800">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <div className="w-full md:w-1/2">
            <h1 className="text-xl font-bold mb-2 border-b-2 border-orange-400 pb-1 inline-block">
              DEPARTMENTS
            </h1>
            <ul className="space-y-2 mt-2 text-sm">
              {links.map((link, index) => (
                <li key={index}>
                  <p className="hover:text-orange-500 transition-colors cursor-pointer">
                    {link}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          <div className="w-full md:w-1/3">
            <h1 className="text-xl font-bold mb-2 border-b-2 border-orange-400 pb-1 inline-block">
              LOGIN
            </h1>
            <Link
              className="flex items-center justify-center gap-2 font-semibold mt-2 bg-orange-400 text-white px-2 py-2 rounded-md hover:bg-orange-500 transition-colors w-24 text-lg"
              to="/login"
            >
              <IoKey className="text-2xl" /> Login
            </Link>
          </div>
        </div>
      </div>

      <div className="bg-orange-400 py-3">
        <div className="flex text-2xl justify-center items-center gap-4">
          <a
            href="https://www.facebook.com/bokuvienna/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
          >
            <FaFacebookSquare className="text-white hover:text-gray-800 transition-colors cursor-pointer" />
          </a>
          <a
            href="https://www.instagram.com/boku.vienna/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
          >
            <FaInstagram className="text-white hover:text-gray-800 transition-colors cursor-pointer" />
          </a>
          <a
            href="https://www.youtube.com/user/bokuwien"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="YouTube"
          >
            <FaYoutube className="text-white hover:text-gray-800 transition-colors cursor-pointer" />
          </a>
          <a
            href="https://www.linkedin.com/school/bokuvienna/?originalSubdomain=at"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <FaLinkedin className="text-white hover:text-gray-800 transition-colors cursor-pointer" />
          </a>
          <a
            href="https://www.tiktok.com/@bokuvienna"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="TikTok"
          >
            <FaTiktok className="text-white hover:text-gray-800 transition-colors cursor-pointer" />
          </a>
        </div>
      </div>

      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col justify-center items-center text-center text-sm">
          <span className="font-bold text-orange-500 text-base">
            BOKU University
          </span>
          <span className="font-medium">
            Universität für Bodenkultur Wien
          </span>
          <span>Gregor-Mendel-Straße 33, 1180 Vienna</span>
          <span>Austria</span>
          <a
            href="tel:+431476540"
            className="flex gap-1 justify-center items-center mt-1 text-orange-500 hover:text-orange-600 transition-colors"
          >
            <BsFillTelephoneFill /> +43 1 47654 0
          </a>
        </div>
      </div>

      <div className="bg-gray-100 py-2">
        <span className="flex justify-center items-center text-xs">
          © 2025 Universität für Bodenkultur Wien
        </span>
      </div>
    </footer>
  );
}
