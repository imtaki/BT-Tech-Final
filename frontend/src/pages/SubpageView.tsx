import {useParams} from "react-router";
import {useEffect, useState} from "react";
import {subpageData} from "../types.ts";
import api from "../utils/axios.ts";
import {AxiosError} from "axios";
import DOMPurify from "dompurify";

const SubpageView = () => {
    const {year, id} = useParams();
    const [subpageFound, setSubpageFound] = useState<boolean | null>(null)
    const [subpage, setSubpage] = useState<subpageData>();
    const [error, setError] = useState<string | undefined>();

    useEffect(() => {
        const fetchSubpageData = async () => {
            try {
                const res = await api.get(`/subpages/by-id/${id}`);
                if (res.data.year !== Number(year)) {
                    setSubpageFound(false);
                    setError("Page not found.");
                    return
                }
                setSubpage(res.data);
                setSubpageFound(true);
            } catch (e: unknown) {
                setSubpageFound(false)
                if (e instanceof AxiosError) {
                    setError("Page not found.");
                }
            }
        }
        fetchSubpageData()
    }, [id]);

    if (!subpageFound || !subpage) {
        return <p>{error}</p>
    }

    return (
        <>
            <p className="text-4xl">{subpage.title}</p>
            <div dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(subpage.content)}}
                 className="headings-reset"></div>
        </>
    );
}

export default SubpageView