import {useEffect, useState} from 'react';
import {Link, useNavigate} from 'react-router';
import { getUser } from '../utils/auth';
import api from "../utils/axios.ts";
import {AxiosError} from "axios";
import {Subpages} from "../components/SubpagesComponent.tsx";
import DragDropFileUpload from "../components/DragAndDrop.tsx";

export default function EditorPanel() {
  const [activeTab, setActiveTab] = useState('subpages');
  const [authorized, setAuthorized] = useState<boolean | null>(null);
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


      {activeTab === 'subpages' && (
          <Subpages role="editor"/>
      )}
      {activeTab === 'files' && (
          <DragDropFileUpload/>
      )}
    </div>
  );
}