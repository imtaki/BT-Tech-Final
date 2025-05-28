import {useEffect, useRef, useState} from 'react';
import { Editor } from '@tinymce/tinymce-react';
import DOMPurify from 'dompurify'
import api from "../utils/axios.ts";
import {AxiosError} from "axios";
import Notification from './Notification.tsx';
import {customFile} from "../types.ts";
import {FaCopy} from "react-icons/fa";

export default function WysiwygEditor(props : {id: number, title: string, slug: string, content: string, isPage: boolean, isIndex: boolean | number, isLink: boolean | number}) {
    const [htmlString, setHtmlString] = useState("");
    const [title, setTitle] = useState(props.title);
    const [slug, setSlug] = useState(props.slug);
    const [notification, setNotification] = useState({ success: false, message: "", show: false });
    const [files, setFiles] = useState<customFile[]>([]);
    const [isIndex, setIsIndex] = useState(props.isIndex);
    const [isLink, setIsLink] = useState(props.isLink)
    const editorRef = useRef<any>(null);

    useEffect(() => {
        const fetchFiles = async () =>{
            try {
                const res = await api.get("/uploads");
                setFiles(res.data);
            } catch (e) {
                console.error(e);
                setNotification({
                   show: true,
                   success: false,
                   message: "Error while fetching the files."
                });
            }
        }
        fetchFiles();
    }, []);

    const handleSavePage = async () => {
        try {
            await api.patch(`/pages/${props.id}`, {title, slug: slug, content: DOMPurify.sanitize(editorRef.current.getContent()), is_index: isIndex, is_link: isLink});
            setNotification({
                success: true,
                message: "Content saved successfully!",
                show: true,
            });
        } catch (e: unknown) {
            if (e instanceof AxiosError) {
                setNotification({
                    show: true,
                    success: false,
                    message: e.response?.data.message || "An error occurred while saving content."
                });
            }
        }
    }
    const handleSaveSubPage = async () => {
        try {
            const title_slug = convertToSlug(title);
            await api.patch(`/subpages/${props.id}`, {title, slug: title_slug, content: DOMPurify.sanitize(editorRef.current.getContent())});
            setNotification({
              success: true,
              message: "Content saved successfully!",
              show: true,
            });
        } catch (e: unknown) {
            if (e instanceof AxiosError) {
                setNotification({
                        show: true,
                        success: false,
                        message: e.response?.statusText || "An error occurred while saving content."
                      });
            }
        }
    }

    function convertToSlug(Text: string) {
        return Text.toLowerCase()
            .replace(/ /g, "-")
            .replace(/[^\w-]+/g, "");
    }

    const copyLink = (link: string) => {
        navigator.clipboard.writeText(link)
        setNotification({
            show: true,
            success: true,
            message: "Link copied."
        });
    }

    return (
        <>
            {notification.show && (
              <Notification
                success={notification.success}
                message={notification.message}
                onClose={() => setNotification((prev) => ({ ...prev, show: false }))}
              />
            )}
            <div className="flex flex-col items-center">
                <p className="mb-2 text-xl font-bold">Title</p>
                <input
                    type="text"
                    placeholder={props.title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-12/12 lg:w-6/12 border px-3 py-2 rounded bg-white"
                />
            </div>
            <div dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(htmlString)}}
                 className="prose-lg mt-4 mb-4 lg:px-64"/>
            <div className="flex justify-center">
                <div className="w-12/12 lg:w-6/12">
                    <Editor
                        apiKey={import.meta.env.VITE_TINYMCE_API_KEY}
                        onInit={(_evt, editor) => editorRef.current = editor}
                        initialValue={props.content ?? "<p>Start editing</p>"}
                        init={{
                            height: 500,
                            menubar: false,
                            plugins: [
                                'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                                'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                                'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                            ],
                            toolbar: 'undo redo | blocks | ' +
                                'bold italic forecolor fontsize | alignleft aligncenter ' +
                                'alignright alignjustify | bullist numlist outdent indent | ' +
                                'removeformat | help | table tabledelete | tableprops tablerowprops tablecellprops | ' +
                                'tableinsertrowbefore tableinsertrowafter tabledeleterow | ' +
                                'tableinsertcolbefore tableinsertcolafter tabledeletecol | image | link',
                            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                        }}
                    />
                    <button onClick={() => editorRef.current ? setHtmlString(editorRef.current.getContent()) : ""}
                            className="bg-orange-400 p-2 mt-4 rounded-xl text-white">Preview Content
                    </button>
                    <button onClick={props.isPage ? handleSavePage : handleSaveSubPage}
                            className="bg-orange-400 p-2 mt-4 ml-2 rounded-xl text-white">
                        Save content
                    </button>
                    {props.isPage && (
                        <div className="mt-4">
                            <p className="mt-2 font-bold">Slug stránky</p>
                            <input
                                type="text"
                                placeholder={props.slug}
                                onChange={(e) => setSlug(e.target.value)}
                                className="w-12/12 lg:w-6/12 border px-3 py-2 rounded bg-white mt-2"
                            />
                            <div className="flex mt-2">
                                <input
                                    checked={isLink}
                                    type="checkbox"
                                    className="border px-3 py-2 rounded"
                                    onChange={() => setIsLink(!isLink)}
                                /><p className="ml-2">Stránka je v menu</p>
                            </div>
                            <div className="flex mt-2">
                                <input
                                    type="checkbox"
                                    checked={isIndex}
                                    aria-label="Stránka je index"
                                    className="border px-3 py-2 rounded"
                                    onChange={() => setIsIndex(!isIndex)}
                                /><p className="ml-2">Stránka je hlavná</p>
                            </div>
                        </div>
                    )}
                    <div className="bg-white rounde-xl mt-4 w-full max-h-80 overflow-x-auto p-4">
                        <p className="text-gray-800 mb-4 text-xl">Files</p>
                        {files.length === 0 ? <p>No files uploaded</p> : files.map((file =>
                            <div className="flex gap-3" key={file.id}>
                                <a className="text-blue-400" href={`${import.meta.env.VITE_URL}storage/${file.path}`}>{file.name}</a>
                                <span
                                    onClick={() => copyLink(import.meta.env.VITE_URL + "storage/" + file.path)}
                                    className="mt-1 hover:cursor-pointer">
                                    <FaCopy color="#cdcdcd" />
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}