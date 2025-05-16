import {useRef, useState} from 'react';
import { Editor } from '@tinymce/tinymce-react';
import DOMPurify from 'dompurify'

export default function WysiwygEditor() {
    const [htmlString, setHtmlString] = useState("");
    const editorRef = useRef(null);

    return (
        <>
            <div dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(htmlString)}} className="headings-reset mb-4"/>
                <div className="w-12/12 lg:w-6/12">
                    <Editor
                        apiKey={import.meta.env.VITE_TINYMCE_API_KEY}
                        onInit={ (_evt, editor) => editorRef.current = editor }
                        initialValue="<p>Start editing content.</p>"
                        init={{
                            height: 500,
                            menubar: false,
                            plugins: [
                                'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                                'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                                'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                            ],
                            toolbar: 'undo redo | blocks | ' +
                                'bold italic forecolor | alignleft aligncenter ' +
                                'alignright alignjustify | bullist numlist outdent indent | ' +
                                'removeformat | help',
                            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                        }}
                    />
                    <button onClick={() => editorRef.current ? setHtmlString(editorRef.current.getContent()) : ""} className="bg-orange-400 p-2 mt-4 rounded-xl text-white">Log editor content</button>
                </div>
        </>
    );
}