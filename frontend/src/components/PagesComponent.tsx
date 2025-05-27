import {FaEdit, FaMinus, FaPlus} from "react-icons/fa";
import {pageData} from "../types.ts";
import {Link} from "react-router";
import {useState} from "react";
import api from "../utils/axios.ts";
import {AxiosError} from "axios";
import {useFetch} from "../hooks/useFetch.tsx";
import Notification from "./Notification.tsx";

export const Pages = () => {
    const [pages, setPages] = useState<pageData[]>([]);
    const [pageTitle, setPageTitle] = useState("");
    const [pageSlug, setPageSlug] = useState("");
    const [pageIsLink, setPageIsLink] = useState(false);
    const [pageIsIndex, setPageIsIndex] = useState(false);
    const [notification, setNotification] = useState({ success: false, message: "", show: false });

    useFetch<pageData[]>("/pages", setPages);
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
                                            <button
                                                className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded flex items-center">
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
        </>
    );
}