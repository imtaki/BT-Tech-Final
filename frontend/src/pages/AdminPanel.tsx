import {useEffect, useState} from 'react';
import { FaPlus, FaMinus, FaEdit } from 'react-icons/fa';
import {Link, useNavigate} from 'react-router';
import { getUser } from '../utils/auth';
import api from "../utils/axios.ts";
import {AxiosError} from "axios";
import {conferenceYear, subpageData, adminUser, editorUser} from "../types.ts";
import AdminAddModal from '../components/AdminAddModal.tsx';
import EditorAddModal from '../components/EditorAddModal.tsx';

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState('years');
  const [authorized, setAuthorized] = useState<boolean | null>(null);
  const [conferenceYears, setConferenceYears] = useState<conferenceYear[]>([]);
  const [newYear, setNewYear] = useState("");
  const [subpages, setSubpages] = useState<subpageData[]>([]);
  const [subpageTitle, setSubpageTitle] = useState("");
  const [subpageYear, setSubpageYear] = useState(new Date().getFullYear().toString()); // OP Pro fix - lebo sa mi to nechcelo inak logovat, funguje aj na buduce roky!
  const [admins, setAdmins] = useState<adminUser[]>([]);
  const [editors, setEditors] = useState<editorUser[]>([]);
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

  useEffect (() => {
    const fetchConferenceYears = async () => {
    try {
      const res = await api.get("/conference-years");
      setConferenceYears(res.data)
    } catch (e: unknown) {
      if (e instanceof AxiosError){
        console.log(e?.response?.statusText);
      }
    }
   }
   fetchConferenceYears();
  }, []);

  useEffect(() => {
    const fetchSubpages = async () => {
      try {
        const res = await api.get("/subpages");
        setSubpages(res.data)
      } catch (e: unknown) {
        if (e instanceof AxiosError){
          console.log(e.response?.statusText);
        }
      }
    }
    fetchSubpages();
  }, []);

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const res = await api.get("/admins");
        setAdmins(res.data);
      } catch (e: unknown) {
        if (e instanceof AxiosError){
          console.log(e.response?.statusText);
        }
      }
    }
    fetchAdmins();
  }, []);

  useEffect(() => {
    const fetchEditors = async () => {
      try {
        const res = await api.get("/editors");
        setEditors(res.data);
      } catch (e: unknown) {
        if (e instanceof AxiosError){
          console.log(e.response?.statusText);
        }
      }
    }
    fetchEditors();
  }, []);

  const handleAddYear = async () => {
    try {
      const res = await api.post("/conference-years", { year: newYear })
      setConferenceYears(prev => [res.data, ...prev].sort((a: conferenceYear,b: conferenceYear) => b.year - a.year));
      setNewYear("")
    } catch (e: unknown) {
      console.log(e)
    }
  }

  const handleDeleteYear = async (id: number) => {
    try {
      await api.delete(`/conference-years/${id}`)
      setConferenceYears(prev => prev.filter((year: conferenceYear) => year.id !== id));
    } catch (e: unknown) {
      console.log(e)
    }
  }

  const handleAddSubpage = async () => {
    try {
      const res = await api.post("/subpages", {title: subpageTitle, year: Number(subpageYear)})
      setSubpages(prev => [res.data.data, ...prev].sort((a: subpageData, b: subpageData) => b.year - a.year))
    } catch (e: unknown) {
      console.log(e);
    }
  }

  const handleDeleteSubpage = async (subpage: number) => {
    try {
      await api.delete(`/subpages/${subpage}`)
      setSubpages(prev => prev.filter((subpages: subpageData) => subpages.id != subpage))
    } catch (e: unknown) {
      console.log(e)
    }
  }
  
  const handleDeleteAdmin = async (adminId: number) => {
    try {
      await api.delete(`/admins/${adminId}`);
      setAdmins(prev => prev.filter(admin => admin.id !== adminId));
    } catch (e: unknown) {
      console.log(e);
    }
  }

  const handleDeleteEditor = async (editorId: number) => {
    try {
      await api.delete(`/editors/${editorId}`);
      setEditors(prev => prev.filter(editor => editor.id !== editorId));
    } catch (e: unknown) {
      console.log(e);
    }
  }

  const handleAssignEditorYear = async (editorId: number, yearId: string) => {
    try {
      await api.put(`/editors/${editorId}/assign-year`, { conferenceYearId: yearId });
      const res = await api.get("/editors");
      setEditors(res.data);
    } catch (e: unknown) {
      console.error("Failed to assign year to editor", e);
    }
  }

  const handleAdminAdded = (newAdmin: adminUser) => {
    setAdmins(prev => [...prev, newAdmin]);
  };

  const handleEditorAdded = (newEditor: editorUser) => {
    setEditors(prev => [...prev, newEditor]);
  };

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

      {activeTab === 'years' && (
        <div className="bg-white shadow rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Ročníky konferencie</h2>
          
          <div className="flex flex-col gap-4 lg:flex-row mb-4">
            <input
              type="text"
              value={newYear}
              onChange={(e) => setNewYear(e.target.value)}
              placeholder="Rok konferencie (napr. 2026)"
              className="flex-grow border px-3 py-2 rounded-l"
            />
            <button onClick={handleAddYear} className="bg-blue-500 text-white px-4 py-2 rounded-r flex items-center">
              <FaPlus className="mr-1" /> Pridať
            </button>
          </div>
          
          <ul className="divide-y divide-gray-200">
            {conferenceYears.map((yearObj: conferenceYear) => (
              <li key={yearObj.id} className="py-3 flex items-center justify-between">
                <span className="font-medium">{yearObj.year}</span>
                <button onClick={() => handleDeleteYear(yearObj.id)} className="bg-red-500 text-white px-3 py-1 rounded flex items-center">
                  <FaMinus className="mr-1" /> Odstrániť
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {activeTab === 'editors' && (
        <div className="bg-white shadow rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Editori</h2>
          
          <div className="mb-4">
            <EditorAddModal 
              onEditorAdded={handleEditorAdded} 
              conferenceYears={conferenceYears} 
            />
          </div>
          <ul className="divide-y divide-gray-200">
            {(editors).map((editor: any) => {
              const assignedYearId = editor.conference_years.length > 0 ? editor.conference_years[0].id.toString() : "";

              return (
                <li key={editor.id} className="py-3 flex flex-col lg:flex-row items-start gap-2 lg:gap-16">
                  <span className="font-medium">{editor.email}</span>
                  <span className="font-medium">{editor.name}</span>
                  <span className="font-medium">
                    {editor.conference_years.length > 0
                      ? editor.conference_years[0].year
                      : "Nie je priradený ročník"}
                  </span>
                  <div className="flex flex-col lg:flex-row gap-2 space-x-2">
                    <select
                      className="border px-3 py-1 rounded"
                      onChange={(e) => handleAssignEditorYear(editor.id, e.target.value)}
                      value={assignedYearId}
                    >
                      <option value="">Prideliť k ročníku</option>
                      {(conferenceYears).map((yearObj: any) => (
                        <option key={yearObj.id} value={yearObj.id}>
                          {yearObj.year}
                        </option>
                      ))}
                    </select>
                    <button
                      onClick={() => handleDeleteEditor(editor.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded flex items-center"
                    >
                      <FaMinus className="mr-1" /> Odstrániť
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {activeTab === 'admins' && (
        <div className="bg-white shadow rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Administrátori</h2>
          
          <div className="flex flex-col gap-2 lg:flex-row mb-4">
            <AdminAddModal onAdminAdded={handleAdminAdded} />
          </div>
          
          <ul className="divide-y divide-gray-200">
            {admins.map((adminObj) => (
              <li key={adminObj.id} className="py-3 flex flex-col gap-2 lg:flex-row items-start justify-between">
                <span className="font-medium">{adminObj.email}</span>
                <button onClick={() => handleDeleteAdmin(adminObj.id)} className="bg-red-500 text-white px-3 py-1 rounded flex items-center">
                  <FaMinus className="mr-1" /> Odstrániť
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

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
              <select className="flex-grow border px-3 py-2 rounded-l" onChange={(e) => setSubpageYear(e.target.value)}>
                {conferenceYears.map((yearObj: conferenceYear) => (
                  <option key={yearObj.id} value={yearObj.year}>{yearObj.year}</option>
                ))}
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