import "../index.css";
import logoKonferencie from "../assets/img/logo.png";
import { IoKey } from "react-icons/io5";

export default function NavBar() {
    const navItems = [
        { id: 0, label: "Studies", href: "/studies" },
        { id: 1, label: "Research", href: "/research" },
        { id: 2, label: "About Boku", href: "/about" },
    ];

    const currentPath = window.location.pathname;

    return (
        <nav className="py-4 p-3">
            <div className="mx-auto max-h-screen px-4 flex justify-between items-center">
                <a className="flex flex-row justify-between" href="/">
                    <img className="h-36" src={logoKonferencie} alt="Boku University Logo"/>
                    <span className="flex justify-center items-center text-4xl font-extrabold text-gray-700">Boku University</span>
                </a>
                <ul className="flex space-x-6 text-gray-700 font-medium">
                    {navItems.map((item) => (
                        <li key={item.id}>
                            <a
                                href={item.href}
                                className={
                                    currentPath === item.href
                                      ? "text-orange-400 font-semibold text-lg border-b-2 border-orange-500 pb-1"
                                      : "hover:text-orange-400 hover:underline underline-offset-2"
                                  }
                            >
                                {item.label}
                            </a>
                        </li>
                    ))}
                    <li className=" hover:text-orange-400 hover:underline underline-offset-4">
                      <a className="flex flex-row gap-1 text-xl font-bold" href="/login"><IoKey className="text-2xl" /> Login</a>
                    </li>
                </ul>
            </div>
        </nav>
    );
}
