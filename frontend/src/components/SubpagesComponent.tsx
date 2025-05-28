import { FaPlus, FaEdit, FaMinus } from 'react-icons/fa';
import { conferenceYear, subpageData } from '../types';
import { Link } from 'react-router';
import {useEffect, useState} from "react";
import {useFetch} from "../hooks/useFetch.tsx";
import api from "../utils/axios.ts";
import Notification from "./Notification.tsx";
import {AxiosError} from "axios";
export const Subpages = (props: {role : string}) => {
  const [conferenceYears, setConferenceYears] = useState<conferenceYear[]>([]);
  const [subpages, setSubpages] = useState<subpageData[]>([]);
  const [subpageTitle, setSubpageTitle] = useState("");
  const [subpageYear, setSubpageYear] = useState(new Date().getFullYear().toString());
  const [year, setYear] = useState();
  const [notification, setNotification] = useState({ success: false, message: "", show: false });

  useFetch<subpageData[]>(props.role === "admin" ? "/subpages" : "/subpages/editor", setSubpages);
  useFetch<conferenceYear[]>("/conference-years", setConferenceYears);

  useEffect(() => {
      const getYear = async () => {
        try {
          const res = await api.get("/editor-year");
          setYear(res.data.message.year);
          setSubpageYear(res.data.message.year);
        } catch (e: unknown) {
          if (e instanceof AxiosError) {
            console.log(e.response?.data.error);
          }
        }
      }
      if (props.role === "editor") {
        getYear();
      }
  }, []);

  const handleAddSubpage = async () => {
    try {
      const created_slug = convertToSlug(subpageTitle)
      const res = await api.post("/subpages", {title: subpageTitle, slug: created_slug, year: subpageYear})
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

  function convertToSlug(Text: string) {
    return Text.toLowerCase()
        .replace(/ /g, "-")
        .replace(/[^\w-]+/g, "");
  }

  return (
      <>
        {notification.show && (
            <Notification
                success={notification.success}
                message={notification.message}
                onClose={() => setNotification((prev) => ({...prev, show: false}))}
            />
        )}
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
              {props.role === "admin" ? (
                  <select
                      className="flex-grow border px-3 py-2 rounded-l"
                      onChange={(e) => setSubpageYear(e.target.value)}
                  >
                    {conferenceYears.map((yearObj: conferenceYear) => (
                        <option key={yearObj.id} value={yearObj.year}>
                          {yearObj.year}
                        </option>
                    ))}
                  </select>
              ) : (
                  <select className="flex-grow border px-3 py-2 rounded-l">
                    <option>{year}</option>
                  </select>
              )}
              <button
                  onClick={handleAddSubpage}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-r flex items-center"
              >
                <FaPlus className="mr-1"/> Pridať podstránku
              </button>
            </div>
          </div>

          <div className="w-full overflow-x-scroll lg:overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200 border">
              <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rok
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Podstránka
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Akcie
                </th>
              </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
              {subpages.map((subpage: subpageData) => (
                  <tr key={subpage.id}>
                    <td className="px-6 py-4 whitespace-nowrap">{subpage.year}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{subpage.title}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <Link to={`/subpage/edit/${subpage.slug}`}>
                          <button
                              className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded flex items-center">
                            <FaEdit className="mr-1"/> Editovať
                          </button>
                        </Link>
                        <button
                            onClick={() => handleDeleteSubpage(subpage.id)}
                            className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded flex items-center"
                        >
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
      </>
  );
};