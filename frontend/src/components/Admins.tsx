import {useFetch} from "../hooks/useFetch.tsx";
import {adminUser} from "../types.ts";
import api from "../utils/axios.ts";
import AdminAddModal from "./AdminAddModal.tsx";
import {FaMinus} from "react-icons/fa";
import {useState} from "react";
import {getUser} from "../utils/auth.ts";
import Notification from "./Notification.tsx";

export const Admins = () => {
    const [admins, setAdmins] = useState<adminUser[]>([]);
    const [notification, setNotification] = useState({ success: false, message: "", show: false });
    const user = getUser();
    useFetch<adminUser[]>("/admins", setAdmins);
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
                <h2 className="text-xl font-semibold mb-4">Administrátori</h2>

                <div className="flex flex-col gap-2 lg:flex-row mb-4">
                    <AdminAddModal onAdminAdded={handleAdminAdded}/>
                </div>

                <ul className="divide-y divide-gray-200">
                    {admins.map((adminObj) => {
                        const isCurrentAdmin = user && adminObj.id === user.id;
                        return (
                            <li key={adminObj.id}
                                className="py-3 flex flex-col gap-2 lg:flex-row items-start justify-between">
                                <span className="font-medium">{adminObj.email}</span>
                                <button
                                    onClick={() => handleDeleteAdmin(adminObj.id)}
                                    disabled={isCurrentAdmin}
                                    className={`${isCurrentAdmin ? 'bg-gray-400 cursor-not-allowed' : 'bg-red-500 hover:bg-red-600'
                                    } text-white px-3 py-1 rounded flex items-center`}>
                                    <FaMinus className="mr-1"/>
                                    {isCurrentAdmin ? 'Nemôžete sa odstrániť' : 'Odstrániť'}
                                </button>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </>
    );
}