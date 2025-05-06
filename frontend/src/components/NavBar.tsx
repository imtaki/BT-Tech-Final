import "../index.css";
import logoKonferencie from "../assets/img/logo.png";
import { IoKey } from "react-icons/io5";
import { Link, useLocation } from "react-router";

export default function NavBar() {
    const navItems = [
        { id: 0, label: "Studies", href: "/studies" },
        { id: 1, label: "Research", href: "/research" },
        { id: 2, label: "About", href: "/about" },
    ];

    const location = useLocation();
    const currentPath = location.pathname;

    return (
        <nav className="py-1 p-2">
            <div className="mx-auto max-h-screen px-4 flex justify-between items-center">
                <Link className="flex flex-row justify-between" to="/">
                    <img className="h-36" src={logoKonferencie} alt="Boku University Logo"/>
                    <span className="flex justify-center items-center text-4xl font-extrabold text-gray-700">Animal Science Days</span>
                </Link>
                <ul className="flex space-x-6 text-gray-700 font-medium">
                    {navItems.map((item) => (
                        <li key={item.id}>
                            <Link
                                to={item.href}
                                className={
                                    currentPath === item.href
                                      ? "text-orange-400 font-semibold text-lg border-b-2 border-orange-500 pb-1"
                                      : "hover:text-orange-400 hover:underline underline-offset-2"
                                  }
                            >
                                {item.label}
                            </Link>
                        </li>
                    ))}
                    <li className=" hover:text-orange-400 hover:underline underline-offset-4">
                      <Link className="flex flex-row gap-1 text-xl font-bold" to="/login"><IoKey className="text-2xl" /> Login</Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}
