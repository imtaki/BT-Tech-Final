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
  return (
    <footer className="flex flex-col gap-5">
      <div className="flex p-5 justify-between items-start">
        <ul>
          <h1 className="text-2xl font-bold">DEPARTMENTS</h1>
          <li>
            <p>LINK1</p>
          </li>
          <li>
            <p>LINK2</p>
          </li>
          <li>
            <p>LINK3</p>
          </li>
          <li>
            <p>LINK4</p>
          </li>
          <li>
            <p>LINK5</p>
          </li>
        </ul>
        <div>
          <h1 className="text-2xl font-bold">LOGIN</h1>
          <Link className="flex flex-row gap-1 font-bold hover:text-orange-400" to="/login"><IoKey className="text-2xl" /> Login</Link>
        </div>
      </div>
      <div className="flex flex-row text-3xl justify-center items-center gap-2 ">
        <FaFacebookSquare className="hover:text-orange-400"/>
        <FaInstagram className="hover:text-orange-400"/>
        <FaYoutube className="hover:text-orange-400"/>
        <FaLinkedin className="hover:text-orange-400"/>
        <FaTiktok className="hover:text-orange-400"/>
      </div>
      <div className="flex flex-col justify-center items-center">
        <span>BOKU University</span>
        <span>Universität für Bodenkultur Wien </span>
        <span>Gregor-Mendel-Straße 33, 1180 Vienna</span>
        <span>Austria</span>
        <a href='tel:43 1 47654 0' className="flex flex-row gap-1 justify-center items-center hover:text-orange-400">
          <BsFillTelephoneFill /> +43 1 47654 0
        </a>
      </div>
      <span className="flex justify-center items-center">© 2025 Universität für Bodenkultur Wien</span>
    </footer>
  );
}
