import {useFetch} from "../hooks/useFetch.tsx";
import {conferenceYear, editorUser} from "../types.ts";
import {useState} from "react";
import api from "../utils/axios.ts";
import Notification from "./Notification.tsx";
import EditorAddModal from "./EditorAddModal.tsx";
import {FaMinus} from "react-icons/fa";

export const Editors = () => {
    const [editors, setEditors] = useState<editorUser[]>([]);
    const [notification, setNotification] = useState({ success: false, message: "", show: false });
    const [conferenceYears, setConferenceYears] = useState<conferenceYear[]>([]);

    useFetch<editorUser[]>("/editors", setEditors);
    useFetch<conferenceYear[]>("/conference-years", setConferenceYears);

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
                                        <FaMinus className="mr-1"/> Odstrániť
                                    </button>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </>
    );
}