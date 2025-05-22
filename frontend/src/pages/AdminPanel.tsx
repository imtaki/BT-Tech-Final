import {useEffect, useState} from 'react';
import { FaPlus, FaMinus, FaEdit } from 'react-icons/fa';
import {Link, useNavigate} from 'react-router';
import { getUser } from '../utils/auth';
import api from "../utils/axios.ts";
import { useFetch } from '../hooks/useFetch.tsx';
import {AxiosError} from "axios";
import {conferenceYear, subpageData, adminUser, editorUser, customFile, pageData} from "../types.ts";
import AdminAddModal from '../components/AdminAddModal.tsx';
import EditorAddModal from '../components/EditorAddModal.tsx';
import Notification from '../components/Notification.tsx';
import DragDropFileUpload from '../components/DragAndDrop.tsx';
import { Subpages } from '../components/SubpagesComponent.tsx';

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState('years');
  const [authorized, setAuthorized] = useState<boolean | null>(null);
  const [conferenceYears, setConferenceYears] = useState<conferenceYear[]>([]);
  const [newYear, setNewYear] = useState("");
  const [pages, setPages] = useState<pageData[]>([]);
  const [pageTitle, setPageTitle] = useState("");
  const [pageSlug, setPageSlug] = useState("");
  const [pageIsLink, setPageIsLink] = useState(false);
  const [pageIsIndex, setPageIsIndex] = useState(false);
  const [subpages, setSubpages] = useState<subpageData[]>([]);
  const [subpageTitle, setSubpageTitle] = useState("");
  const [subpageYear, setSubpageYear] = useState(new Date().getFullYear().toString());
  const [admins, setAdmins] = useState<adminUser[]>([]);
  const [editors, setEditors] = useState<editorUser[]>([]);
  const [notification, setNotification] = useState({ success: false, message: "", show: false });
  const [file, setFile] = useState<File | null>();
  const [files, setFiles] = useState<customFile[]>([]);
  const [uploadLoading, setUploadLoading] = useState(false);
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

  useEffect(() => {
    const fetchPages = async () => {
      try {
        const res = await api.get("/pages");
        setPages(res.data)
      } catch (e) {
        console.error(e);
      }
    }
    fetchPages();
  }, []);
  useFetch<conferenceYear[]>("/conference-years", setConferenceYears);
  useFetch<subpageData[]>("/subpages", setSubpages);
  useFetch<adminUser[]>("/admins", setAdmins);
  useFetch<editorUser[]>("/editors", setEditors);
  useFetch<customFile[]>("/uploads", setFiles);

  const handleAddYear = async () => {
    try {
      const res = await api.post("/conference-years", { year: newYear })
      setConferenceYears(prev => [res.data, ...prev].sort((a: conferenceYear,b: conferenceYear) => b.year - a.year));
      setNotification({
        success: true,
        message: "Year succesfully added!",
        show: true,
      });
      setNewYear("")
    } catch (e) {
      console.error(e);
      setNotification({
        success: false,
        message: "Something went wrong while adding new Year!",
        show: true,
      });
    }
  }

  const handleDeleteYear = async (id: number) => {
    try {
      await api.delete(`/conference-years/${id}`)
      setConferenceYears(prev => prev.filter((year: conferenceYear) => year.id !== id));
      setNotification({
        success: true,
        message: "Year succesfully deleted!",
        show: true,
      });
    } catch (e) {
      console.error(e);
      setNotification({
        success: false,
        message: "Something went wrong while deleting Year!",
        show: true,
      });
    }
  }

  const handleAddSubpage = async () => {
    try {
      const created_slug = convertToSlug(subpageTitle)
      const res = await api.post("/subpages", {title: subpageTitle, slug: created_slug, year: Number(subpageYear)})
      setSubpages(prev => [res.data.data, ...prev].sort((a: subpageData, b: subpageData) => b.year - a.year))
      setNotification({
        success: true,
        message: "Subpage succesfully added!",
        show: true,
      });
    } catch (e) {
      console.error(e);
      setNotification({
        success: false,
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
    } catch (e) {
      console.error(e);
      setNotification({
        success: false,
        message: "Something went wrong while deleting new Subpage!",
        show: true,
      });
    }
  }

  const handleDeleteAdmin = async (adminId: number) => {
    try {
      await api.delete(`/admins/${adminId}`);
      setAdmins(prev => prev.filter(admin => admin.id !== adminId));
      setNotification({
        success: true,
        message: "Admin succesfully deleted!",
        show: true,
      });
    } catch (e) {
      console.error(e);
      setNotification({
        success: false,
        message: "Something went wrong while deleting Admin!",
        show: true,
      });
    }
  }

  const handleDeleteEditor = async (editorId: number) => {
    try {
      await api.delete(`/editors/${editorId}`);
      setEditors(prev => prev.filter(editor => editor.id !== editorId));
      setNotification({
        success: true,
        message: "Editor succesfully deleted!",
        show: true,
      });
    } catch (e) {
      console.error(e);
      setNotification({
        success: false,
        message: "Something went wrong while deleting Editor!",
        show: true,
      });
    }
  }

  const handleAssignEditorYear = async (editorId: number, yearId: string) => {
    try {
      await api.put(`/editors/${editorId}`, { conferenceYearId: yearId });
      const res = await api.get("/editors");
      setEditors(res.data);
      setNotification({
        success: true,
        message: "Succesfully assigned year to Editor!",
        show: true,
      });
    } catch (e) {
      console.error(e);
      setNotification({
        success: false,
        message: "Failed to assign year to editor!",
        show: true,
      });
    }
  };

  const handleAdminAdded = () => {
    const fetchAdmins = async () => {
      try {
        const res = await api.get("/admins");
        setAdmins(res.data);
        setNotification({
          success: true,
          message: "Admin successfully added!",
          show: true,
        });
      } catch (e) {
        console.error("Failed to fetch admins", e);
        setNotification({
          success: false,
          message: "Failed to refresh admin list.",
          show: true,
        });
      }
    };
    fetchAdmins();
  };

  const handleEditorAdded = () => {
    const fetchEditors = async () => {
      try {
        const res = await api.get("/editors");
        setEditors(res.data);
        setNotification({
          success: true,
          message: "Editor successfully added!",
          show: true,
        });
      } catch (e) {
        console.error("Failed to fetch editors", e);
        setNotification({
          success: false,
          message: "Failed to refresh editors list.",
          show: true,
        });
      }
    };
    fetchEditors();
  };

  const addFile = async () => {
    if (!file) return

    const formData = new FormData();
    formData.append('file', file);

    try {
      setUploadLoading(true);
      await api.post("/uploads/", formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }});
      const files = await api.get("/uploads");
      setFiles(files.data);
      setNotification({
        success: true,
        message: "The file has been added!",
        show: true,
      });
    } catch (e) {
      console.error("Failed to add file", e);
      setNotification({
        success: false,
        message: "Failed to add file.",
        show: true,
      });
    } finally {
      setUploadLoading(false);
    }
  }

  const removeFile = async (id: number) => {
      try {
        await api.delete(`/uploads/${id}`);
        setFiles(prev => prev.filter((file: customFile) => file.id != id))
        setNotification({
          success: true,
          message: "The file has been removed!",
          show: true,
        });
      } catch (e) {
        console.error("Failed to remove file", e);
        setNotification({
          success: false,
          message: "Failed to remove file.",
          show: true,
        });
      }
  }

  const handleAddPage = async () => {
    try {
      const converted_slug = convertToSlug(String(pageSlug))
      await api.post("/pages", {title: pageTitle, slug: converted_slug, is_index: pageIsIndex, is_link: pageIsLink});
      const res = await api.get("/pages");
      setPages(res.data);
      setNotification({
        success: true,
        message: "Page has been added.",
        show: true,
      });
    } catch (e: unknown) {
      if (e instanceof AxiosError) {
        setNotification({
          success: false,
          message: e.response?.data.message ?? "Error whilst adding the page",
          show: true,
        });
      }
    }
  }

  const handleDeletePage = async (id: number) => {
    try {
      await api.delete(`/pages/${id}`);
      setPages(prev => prev.filter(page => page.id !== id));
      setNotification({
        success: true,
        message: "Page has been removed!",
        show: true,
      });
    } catch (e) {
      console.error(e);
      setNotification({
        success: false,
        message: "Failed to remove page.",
        show: true,
      });
    }
  }

  function convertToSlug(Text: string) {
    return Text.toLowerCase()
        .replace(/ /g, "-")
        .replace(/[^\w-]+/g, "");
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
            <button onClick={handleAddYear} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-r flex items-center">
              <FaPlus className="mr-1" /> Pridať
            </button>
          </div>

          <ul className="divide-y divide-gray-200">
            {conferenceYears.map((yearObj: conferenceYear) => (
              <li key={yearObj.id} className="py-3 flex items-center justify-between">
                <span className="font-medium">{yearObj.year}</span>
                <button onClick={() => handleDeleteYear(yearObj.id)} className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded flex items-center">
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
            {(editors).map((editor: editorUser) => {
              const years = editor.conference_years ?? [];
              const assignedYearId = years.length > 0 ? years[0].id.toString() : "";

              return (
                <li key={editor.id} className="py-3 flex flex-col lg:flex-row items-start gap-2 lg:gap-16">
                  <span className="font-medium">{editor.email}</span>
                  <span className="font-medium">{editor.name}</span>
                  <span className="font-medium">
                    {years.length > 0
                      ? years[0].year
                      : "Nie je priradený ročník"}
                  </span>
                  <div className="flex flex-col lg:flex-row gap-2 space-x-2">
                    <select
                      className="border px-3 py-1 rounded"
                      onChange={(e) => handleAssignEditorYear(editor.id, e.target.value)}
                      value={assignedYearId}
                    >
                      <option value="">Prideliť k ročníku</option>
                      {(conferenceYears).map((yearObj: conferenceYear) => (
                        <option key={yearObj.id} value={yearObj.id}>
                          {yearObj.year}
                        </option>
                      ))}
                    </select>
                    <button
                      onClick={() => handleDeleteEditor(editor.id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded flex items-center"
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
            {admins.map((adminObj) => {
               const isCurrentAdmin = user && adminObj.id === user.id;
                return (
                  <li key={adminObj.id} className="py-3 flex flex-col gap-2 lg:flex-row items-start justify-between">
                    <span className="font-medium">{adminObj.email}</span>
                    <button
                      onClick={() => handleDeleteAdmin(adminObj.id)}
                      disabled={isCurrentAdmin}
                      className={`${isCurrentAdmin ? 'bg-gray-400 cursor-not-allowed' : 'bg-red-500 hover:bg-red-600'
                                } text-white px-3 py-1 rounded flex items-center`} >
                      <FaMinus className="mr-1" />
                        {isCurrentAdmin ? 'Nemôžete sa odstrániť' : 'Odstrániť'}
                     </button>
                  </li>
                  );
              })}
          </ul>
        </div>
      )}

      {activeTab === 'pages' && (
          <div className="bg-white shadow rounded-lg p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Stránky</h2>
            <div className="space-y-2 mb-4">
              <input
                  type="text"
                  placeholder="Názov stránky"
                  className="w-full border px-3 py-2 rounded"
                  onChange={(e) => setPageTitle(e.target.value)}
              />
              <input
                  type="text"
                  placeholder="Slug stránky"
                  className="w-full border px-3 py-2 rounded"
                  onChange={(e) => setPageSlug(e.target.value)}
              />
              <div className="flex">
                <input
                    type="checkbox"
                    className="border px-3 py-2 rounded"
                    onChange={() => setPageIsLink(!pageIsLink)}
                /><p className="ml-2">Stránka je v menu</p>
              </div>
              <div className="flex">
                <input
                    type="checkbox"
                    aria-label="Stránka je index"
                    className="border px-3 py-2 rounded"
                    onChange={() => setPageIsIndex(!pageIsIndex)}
                /><p className="ml-2">Stránka je hlavná</p>
              </div>
              <button onClick={handleAddPage}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-r flex items-center">
                <FaPlus className="mr-1"/> Pridať stránku
              </button>
            </div>
            <div className="w-full overflow-x-scroll lg:overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200 border">
                <thead className="bg-gray-50">
                <tr>
                  <th scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Stránka
                  </th>
                  <th scope="col"
                      className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Akcie
                  </th>
                </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                {pages.map((page: pageData) => (
                    <tr key={page.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {page.title}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end space-x-2">
                          <Link to={{pathname: "/pages/edit/" + page.slug}}>
                            <button className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded flex items-center">
                              <FaEdit className="mr-1"/> Editovať
                            </button>
                          </Link>
                          <button onClick={() => handleDeletePage(page.id)}
                                  className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded flex items-center">
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

      {activeTab === 'subpages' && (
            <Subpages subpages={subpages}
              conferenceYears={conferenceYears}
              setSubpageTitle={setSubpageTitle}
              setSubpageYear={setSubpageYear}
              handleAddSubpage={handleAddSubpage}
              handleDeleteSubpage={handleDeleteSubpage}/>
      )}

      {activeTab === 'files' && (
          <div className="shadow rounded-lg mb-6">
              <DragDropFileUpload 
                file={file}
                setFile={setFile}
                files={files}
                uploadLoading={uploadLoading}
                onUpload={addFile}
                onRemove={removeFile}
              />
          </div>
      )}
    </div>
  );
}