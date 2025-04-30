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
        <div className="flex-1 p-6 bg-gray-300">
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  );
}
