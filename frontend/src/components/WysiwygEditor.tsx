import { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';

export default function WysiwygEditor() {
    const editorRef = useRef(null);
    const log = () => {
        if (editorRef.current) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            console.log(editorRef.current.getContent());
        }
    };

    return (
        <>
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
            <button onClick={log}>Log editor content</button>
        </>
    );
}