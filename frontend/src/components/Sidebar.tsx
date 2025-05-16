import { Link } from "react-router";
import { BiSolidRightArrow, BiSolidLeftArrow } from "react-icons/bi";
import {useState} from "react";

export default function Sidebar() {
    const [sidebarActive, setSidebarActive] = useState(false);
    return (
        <>
            <div className={`${sidebarActive ? "left-56 ease-in-out duration-300" : "left-[-100%] ease-in-out duration-300"} lg:hidden fixed top-[50%] z-20 bg-orange-400 border-2 border-orange-400 rounded-tl-lg rounded-bl-lg`}>
                <BiSolidLeftArrow size={28} color="white" onClick={() => setSidebarActive(!sidebarActive)}/>
            </div>

            <div className={`${!sidebarActive ? "left-0 ease-in-out duration-300" : "left-[-100%] ease-in-out duration-300"} lg:hidden fixed top-[50%] z-20 bg-orange-400 border-2 border-orange-400 rounded-tr-lg rounded-br-lg`}>
                <BiSolidRightArrow size={28} color="white" onClick={() => setSidebarActive(!sidebarActive)}/>
            </div>

            <div className={`${sidebarActive ? "left-0 ease-in-out duration-300" : "left-[-100%] ease-in-out duration-300"} fixed lg:left-0 top-24 lg:top-36 w-64 h-screen bg-gray-100 border-r border-gray-300 z-10`}>
                <div className="p-4 border-b border-gray-300 bg-gray-700 text-white">
                    <h2 className="text-xl font-bold text-center">Conference Years</h2>
                </div>

                <div className="py-4">
                    <div className="pl-4 mt-4">
                        <div className="mb-2 flex items-center">
                            <div className="h-4 w-1 bg-orange-400 mr-2"></div>
                            <Link to="/2025" className="block py-1">2025</Link>
                        </div>
                        <div className="mb-2 flex items-center">
                            <div className="h-4 w-1 bg-orange-400 mr-2"></div>
                            <Link to="/2024" className="block py-1">2024</Link>
                        </div>
                        <div className="mb-2 flex items-center">
                            <div className="h-4 w-1 bg-orange-400 mr-2"></div>
                            <Link to="/2023" className="block py-1">2023</Link>
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
}