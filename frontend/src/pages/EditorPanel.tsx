import {useEffect, useState} from 'react';
import { FaPlus, FaMinus, FaEdit } from 'react-icons/fa';
import {Link, useNavigate} from 'react-router';
import { getUser } from '../utils/auth';
import api from "../utils/axios.ts";
import {AxiosError} from "axios";
import {subpageData} from "../types.ts";
import Notification from '../components/Notification.tsx';

export default function EditorPanel() {
  const [activeTab, setActiveTab] = useState('subpages');
  const [authorized, setAuthorized] = useState<boolean | null>(null);
  const [subpages, setSubpages] = useState<subpageData[]>([]);
  const [notification, setNotification] = useState({ success: false, message: "", show: false });
  const [subpageTitle, setSubpageTitle] = useState("");
  const [year, setYear] = useState();
  const navigate = useNavigate();

  const user = getUser();

  useEffect(() => {
    const checkAuthorization = async () => {
      try {
        const res = await api.get("/role-check");
        setAuthorized(true);
        if (res.data.message == "admin") {
          navigate("/admin");
        }
      } catch(e: unknown) {
        setAuthorized(false);
        if (e instanceof AxiosError){
          console.log(e?.response?.statusText);
        }
        navigate("/");
      }
    }
    checkAuthorization()
  }, []);

  useEffect(() => {
    const fetchSubpages = async () => {
      try {
        const res = await api.get("/subpages/editor");
        setSubpages(res.data);
      } catch (e: unknown) {
        if (e instanceof AxiosError){
          console.log(e.response?.statusText);
        }
      }
    }
    fetchSubpages();
  }, []);

  useEffect(() => {
    const getYear = async () => {
      try {
        const res = await api.get("/editor-year");
        setYear(res.data.year);
      } catch (e: unknown) {
        if (e instanceof AxiosError) {
          console.log(e.response?.data.error);
        }
      }
    }
    getYear();
  }, []);

  const handleAddSubpage = async () => {
    try {
      const res = await api.post("/subpages", {title: subpageTitle, year: year})
      setSubpages(prev => [res.data.data, ...prev].sort((a: subpageData, b: subpageData) => b.year - a.year))
      setNotification({
        success: true,
        message: "Subpage succesfully added!",
        show: true,
      });
    } catch (e: unknown) {
      setNotification({
        success: true,
        message: "Something went wrong while adding new Subpage!",
        show: true,
      });
    }
  }

  const handleDeleteSubpage = async (subpage: number) => {
    try {
      await api.delete(`/subpages/${subpage}`)
      setSubpages(prev => prev.filter((subpages: subpageData) => subpages.id != subpage))
      setNotification({
        success: true,
        message: "Subpage succesfully deleted!",
        show: true,
      });
    } catch (e: unknown) {
      setNotification({
        success: true,
        message: "Something went wrong while deleting new Subpage!",
        show: true,
      });
    }
  }

  if(!authorized) {
    return null
  }

  return (
    <div className="p-6 bg-gray-100 mt-24 lg:mt-36">
      {notification.show && (
              <Notification
                success={notification.success}
                message={notification.message}
                onClose={() => setNotification((prev) => ({ ...prev, show: false }))}
              />
      )}
      <div className="mb-6">
        <div className="border-b border-gray-200">
          <h3 className='text-xl'>Welcome  {user.name}</h3>
          <nav className="-mb-px mt-4 grid grid-cols-2 lg:flex gap-x-10 space-x-8">
            <Link 
              to="" 
              onClick={() => setActiveTab('subpages')}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'subpages' 
                  ? 'border-blue-500 text-blue-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Podstránky
            </Link>
          </nav>
        </div>
      </div>


      {activeTab === 'subpages' && (
        <div className="bg-white shadow rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Podstránky</h2>
          
          <div className="space-y-2 mb-4">
            <input
              type="text"
              placeholder="Názov podstránky"
              className="w-full border px-3 py-2 rounded"
              onChange={(e) => setSubpageTitle(e.target.value)}
            />
            <div className="flex flex-col lg:flex-row gap-2">
              <select className="flex-grow border px-3 py-2 rounded-l">
                  <option>{year}</option>
              </select>
              <button onClick={handleAddSubpage} className="bg-blue-500 text-white px-4 py-2 rounded-r flex items-center">
                <FaPlus className="mr-1" /> Pridať podstránku
              </button>
            </div>
          </div>
          <div className="w-full overflow-x-scroll lg:overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200 border">
              <thead className="bg-gray-50">
              <tr>
                <th scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rok
                </th>
                <th scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Podstránka
                </th>
                <th scope="col"
                    className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Akcie
                </th>
              </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
              {subpages.map((subpage: subpageData) => (
                  <tr key={subpage.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {subpage.year}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {subpage.title}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <Link to={{pathname: "/subpage/edit/" + subpage.id}}>
                          <button className="bg-blue-500 text-white px-2 py-1 rounded flex items-center">
                            <FaEdit className="mr-1"/> Editovať
                          </button>
                        </Link>
                        <button onClick={() => handleDeleteSubpage(subpage.id)}
                                className="bg-red-500 text-white px-2 py-1 rounded flex items-center">
                          <FaMinus className="mr-1"/> Odstrániť
                        </button>
                      </div>
                    </td>
                  </tr>
              ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}