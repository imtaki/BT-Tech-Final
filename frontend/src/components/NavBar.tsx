import "../index.css";
import logoKonferencie from "../assets/img/logo.png";
import { IoKey } from "react-icons/io5";
import { Link, useNavigate, useLocation } from "react-router";
import { getRole, isLoggedIn  } from "../utils/auth";
import { IoLogOutOutline } from "react-icons/io5";
import { GiHamburgerMenu } from "react-icons/gi";
import {useEffect, useState} from "react";
import api from "../utils/axios.ts";

export default function NavBar() {
    const [navItems, setNavItems] = useState([]);
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

    useEffect(() => {
        const fetchPages = async () => {
            try {
                const res = await api.get("/pages");
                setNavItems(res.data);
            } catch (e) {
                console.log(e);
            }
        }
        fetchPages();
    }, []);

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
                    {navItems.filter(prev => prev.is_link).map((item) => (
                        <li key={item.id}>
                            <Link
                                to={item.is_index ? "/" : item.slug}
                                className={
                                    currentPath === item.slug
                                        ? "text-orange-400 font-semibold text-lg border-b-2 border-orange-500 pb-1"
                                        : "hover:text-orange-400 hover:underline underline-offset-2"
                                }
                            >
                                {item.title}
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
            <ul className={`lg:hidden fixed left-0 bg-white w-full z-30 px-6 ${dropdownActive ? "top-[95px] ease-in-out duration-300" : "top-[-200px] ease-in-out duration-300"}`}>
                {navItems.filter(prev => prev.is_link).map((item) => (
                    <li key={item.id} className="p-2">
                        <Link
                            to={item.is_index ? "/" : item.slug}
                            className={
                                currentPath === item.slug
                                    ? "text-orange-400 font-semibold text-lg border-b-2 border-orange-500 pb-1"
                                    : "hover:text-orange-400 hover:underline underline-offset-2"
                            }
                        >
                            {item.title}
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