import {useEffect, useState} from 'react';
import {Link, useNavigate} from 'react-router';
import { getUser } from '../utils/auth';
import api from "../utils/axios.ts";
import {AxiosError} from "axios";
import DragDropFileUpload from '../components/DragAndDrop.tsx';
import { Subpages } from '../components/SubpagesComponent.tsx';
import {Pages} from "../components/PagesComponent.tsx";
import {Admins} from "../components/Admins.tsx";
import {Editors} from "../components/Editors.tsx";
import {ConferenceYears} from "../components/ConferenceYears.tsx";

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState('years');
  const [authorized, setAuthorized] = useState<boolean | null>(null);
  const navigate = useNavigate();

  const user = getUser();

  useEffect(() => {
    const checkAuthorization = async () => {
      try {
        const res = await api.get("/role-check");
        if (res.data.message == "editor") {
          navigate("/editor");
        }
        setAuthorized(true);
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

  if(!authorized) {
    return null
  }

  return (
    <div className="p-6 bg-gray-100 mt-24 lg:mt-36">
      <div className="mb-6">
        <div className="border-b border-gray-200">
          <h3 className='text-xl'>Welcome  {user.name}</h3>
          <nav className="-mb-px mt-4 grid grid-cols-2 lg:flex gap-x-10 space-x-8">
            <Link
              to=""
              onClick={() => setActiveTab('years')}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'years' 
                  ? 'border-blue-500 text-blue-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Ročníky konferencie
            </Link>
            <Link
              to=""
              onClick={() => setActiveTab('editors')}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'editors' 
                  ? 'border-blue-500 text-blue-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Editori
            </Link>
            <Link
              to=""
              onClick={() => setActiveTab('admins')}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'admins' 
                  ? 'border-blue-500 text-blue-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Administrátori
            </Link>
            <Link
                to=""
                onClick={() => setActiveTab('pages')}
                className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'pages'
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
            >
              Stránky
            </Link>
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
            <Link
                to=""
                onClick={() => setActiveTab('files')}
                className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'files'
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
            >
              Súbory
            </Link>
          </nav>
        </div>
      </div>

      {activeTab === 'years' && (
          <ConferenceYears/>
      )}

      {activeTab === 'editors' && (
          <Editors/>
      )}

      {activeTab === 'admins' && (
          <Admins/>
      )}

      {activeTab === 'pages' && (
          <Pages/>
      )}

      {activeTab === 'subpages' && (
          <Subpages role="admin"/>
      )}

      {activeTab === 'files' && (
          <div className="shadow rounded-lg mb-6">
              <DragDropFileUpload/>
          </div>
      )}
    </div>
  );
}