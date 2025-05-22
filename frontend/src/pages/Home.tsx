import {useEffect, useState} from "react";
import {pageData} from "../types.ts";
import api from "../utils/axios.ts";
import DOMPurify from "dompurify";
import Skeleton from "react-loading-skeleton";

export default function Home() {
    const [content, setContent] = useState<pageData>();
    useEffect(() => {
        const fetchMainPage = async () => {
            try {
                const res = await api.get("/pages");
                setContent(res.data.find((page: pageData) => page.is_index === 1))
            } catch (e) {
                console.error(e);
            }
        }
        fetchMainPage();
    }, []);

    if (!content) {
        return (
            <div className="w-full">
                <Skeleton baseColor="#e8e8e8" highlightColor="#cdcdcd" height={400}/>
            </div>
        );
    }

    return (
        <div className="prose-lg">
            <h2 className="font-bold">{content.title}</h2>
            <div dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(content.content)}}
                 className="mt-4"></div>
        </div>
    )
}