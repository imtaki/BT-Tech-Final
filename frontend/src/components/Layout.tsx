import '../index.css';
import NavBar from './NavBar';
import { Outlet } from "react-router"
import Sidebar from './Sidebar';
import Footer from './Footer';

export default function Layout() {
  return (
    <div className="App">
      <NavBar />
      <div className="flex">
        <Sidebar />
        <div className="mt-24 lg:mt-36 lg:ml-64 min-h-screen w-full p-6 bg-gray-300">
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  );
}
