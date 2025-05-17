import '../index.css';
import NavBar from './NavBar';
import { Outlet } from "react-router"

export default function EditLayout() {
    return (
        <div className="App">
            <NavBar />
            <div className="min-h-screen p-6 bg-gray-100">
                <Outlet />
            </div>
            {/* <Footer /> */}
        </div>
    );
}