import "../index.css";
import logoKonferencie from "../assets/img/logo.png";
import { IoKey } from "react-icons/io5";
import { Link, useNavigate, useLocation } from "react-router";
import { getRole, isLoggedIn  } from "../utils/auth";
import { IoLogOutOutline } from "react-icons/io5";
import { GiHamburgerMenu } from "react-icons/gi";
import {useState} from "react";

export default function NavBar() {
    const navItems = [
        { id: 0, label: "Studies", href: "/studies" },
        { id: 1, label: "Research", href: "/research" },
        { id: 2, label: "About", href: "/about" },
    ];

    const loggedIn = isLoggedIn();
    const role = getRole();

    function handleLogout() {
        localStorage.removeItem('token')
        localStorage.removeItem('role')
        localStorage.removeItem('user')
        navigate("/login");
    }

    const location = useLocation();
    const navigate = useNavigate();
    const currentPath = location.pathname;

    const [dropdownActive, setDropdownActive] = useState(false);

    return (
        <>
            <nav
                className="fixed z-50 mx-auto max-h-screen lg:px-4 flex justify-between items-center bg-white w-full">
                <Link className="flex flex-row justify-between" to="/">
                    <img className="h-24 lg:h-36" src={logoKonferencie} alt="Boku University Logo"/>
                    <span
                        className="flex justify-center items-center text-base lg:text-4xl font-extrabold text-gray-700"
                    >
                    Animal Science Days
                </span>
                </Link>
                <div className="lg:hidden px-8">
                    <GiHamburgerMenu
                        size={20}
                        onClick={() => dropdownActive ? setDropdownActive(false) : setDropdownActive(true)}
                    />
                </div>
                <ul className="hidden lg:block lg:flex space-x-6 text-gray-700 font-medium">
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
                    {!loggedIn && (
                        <li className="hover:text-orange-400 hover:underline underline-offset-4">
                            <Link className="flex flex-row gap-1 text-xl font-bold" to="/login"><IoKey
                                className="text-2xl"/> Login</Link>
                        </li>
                    )}

                    {role == "admin" && (
                        <li className="hover:text-orange-400 hover:underline underline-offset-2">
                            <Link className={currentPath === '/admin'
                                ? "text-orange-400 font-semibold text-lg border-b-2 border-orange-500 pb-1"
                                : "hover:text-orange-400 hover:underline underline-offset-2"
                            }

                                  to="/admin"> Admin
                            </Link>
                        </li>
                    )}

                    {role == "editor" && (
                        <li className="hover:text-orange-400 hover:underline underline-offset-2">
                            <Link className={currentPath === '/editor'
                                ? "text-orange-400 font-semibold text-lg border-b-2 border-orange-500 pb-1"
                                : "hover:text-orange-400 hover:underline underline-offset-2"
                            }

                                  to="/editor"> Editor
                            </Link>
                        </li>
                    )}

                    {loggedIn && (
                        <li className=" hover:text-orange-400 hover:underline underline-offset-4">
                            <button className="flex flex-row gap-1 text-xl font-bold" onClick={handleLogout}>
                                <IoLogOutOutline className="text-2xl"/> Logout
                            </button>
                        </li>
                    )}
                </ul>
            </nav>
            <ul className={`lg:hidden absolute left-0 bg-white w-full z-30 px-6 ${dropdownActive ? "top-[95px] ease-in-out duration-300" : "top-[-200px] ease-in-out duration-300"}`}>
                {navItems.map((item) => (
                    <li key={item.id} className="p-2">
                        <Link
                            to={item.href}
                            className={
                                currentPath === item.href
                                    ? "text-orange-400 font-semibold text-lg border-b-2 border-orange-500 pb-1"
                                    : "hover:text-orange-400 hover:underline underline-offset-2"
                            }
                            onClick={() => setDropdownActive(!dropdownActive)}
                        >
                            {item.label}
                        </Link>
                    </li>
                ))}
                {!loggedIn && (
                    <li className="hover:text-orange-400 hover:underline underline-offset-4 p-2">
                        <Link className="flex flex-row gap-1 text-xl font-bold" to="/login"><IoKey
                            className="text-2xl"/> Login</Link>
                    </li>
                )}

                {role == "admin" && (
                    <li className="hover:text-orange-400 hover:underline underline-offset-2 p-2">
                        <Link className={currentPath === '/admin'
                            ? "text-orange-400 font-semibold text-lg border-b-2 border-orange-500 pb-1"
                            : "hover:text-orange-400 hover:underline underline-offset-2"
                        }

                              to="/admin"> Admin
                        </Link>
                    </li>
                )}

                {role == "editor" && (
                    <li className="hover:text-orange-400 hover:underline underline-offset-2 p-2">
                        <Link className={currentPath === '/editor'
                            ? "text-orange-400 font-semibold text-lg border-b-2 border-orange-500 pb-1"
                            : "hover:text-orange-400 hover:underline underline-offset-2"
                        }

                              to="/editor"> Editor
                        </Link>
                    </li>
                )}

                {loggedIn && (
                    <li className=" hover:text-orange-400 hover:underline underline-offset-4 p-2">
                        <button className="flex flex-row gap-1 text-xl font-bold" onClick={handleLogout}>
                            <IoLogOutOutline className="text-2xl"/> Logout
                        </button>
                    </li>
                )}
            </ul>
        </>
    );
}