import {useState} from "react";
import {conferenceYear} from "../types.ts";
import {useFetch} from "../hooks/useFetch.tsx";
import api from "../utils/axios.ts";
import Notification from "./Notification.tsx";
import {FaMinus, FaPlus} from "react-icons/fa";

export const ConferenceYears = () => {
    const [conferenceYears, setConferenceYears] = useState<conferenceYear[]>([]);
    const [newYear, setNewYear] = useState("");
    const [notification, setNotification] = useState({ success: false, message: "", show: false });

    useFetch<conferenceYear[]>("/conference-years", setConferenceYears);

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
                <h2 className="text-xl font-semibold mb-4">Ročníky konferencie</h2>

                <div className="flex flex-col gap-4 lg:flex-row mb-4">
                    <input
                        type="text"
                        value={newYear}
                        onChange={(e) => setNewYear(e.target.value)}
                        placeholder="Rok konferencie (napr. 2026)"
                        className="flex-grow border px-3 py-2 rounded-l"
                    />
                    <button onClick={handleAddYear}
                            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-r flex items-center">
                        <FaPlus className="mr-1"/> Pridať
                    </button>
                </div>

                <ul className="divide-y divide-gray-200">
                    {conferenceYears.map((yearObj: conferenceYear) => (
                        <li key={yearObj.id} className="py-3 flex items-center justify-between">
                            <span className="font-medium">{yearObj.year}</span>
                            <button onClick={() => handleDeleteYear(yearObj.id)}
                                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded flex items-center">
                                <FaMinus className="mr-1"/> Odstrániť
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    )
}