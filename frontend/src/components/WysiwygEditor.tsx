import {useRef, useState} from 'react';
import { Editor } from '@tinymce/tinymce-react';
import DOMPurify from 'dompurify'
import api from "../utils/axios.ts";
import {AxiosError} from "axios";

export default function WysiwygEditor(props : {id: number, title: string, content: string}) {
    const [htmlString, setHtmlString] = useState("");
    const [title, setTitle] = useState(props.title);
    const editorRef = useRef<any>(null);

    const handleSave = async () => {
        try {
            await api.patch(`/subpages/${props.id}`, {title, content: DOMPurify.sanitize(editorRef.current.getContent())});
        } catch (e: unknown) {
            if (e instanceof AxiosError) {
                console.log(e.response?.statusText);
            }
        }
    }

    return (
        <>
            <div className="flex justify-center">
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
                    <button onClick={handleSave}
                            className="bg-orange-400 p-2 mt-4 ml-2 rounded-xl text-white">
                        Save content
                    </button>
                </div>
            </div>
        </>
    );
}