import '../index.css';
import NavBar from './NavBar';
import { Outlet } from "react-router"

export default function Layout() {
  return (
    <div className="App">
      <NavBar />
      <div className="page">
        <Outlet />
      </div>
    </div>
  );
}
