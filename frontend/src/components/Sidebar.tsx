import { Link } from "react-router";

export default function Sidebar() {
  return (
    <div className="w-64 bg-gray-100 h-screen border-r border-gray-300">
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
  );
}