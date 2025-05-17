import WysiwygEditor from "../components/WysiwygEditor.tsx";
import {useNavigate, useParams} from "react-router";
import {useEffect, useState} from "react";
import api from "../utils/axios.ts";
import {subpageData} from "../types.ts";
import {AxiosError} from "axios";

export default function EditSubpage() {
    const navigate = useNavigate();
    const {id} = useParams();
    const [errorMessage, setErrorMessage] = useState<string | undefined>("");
    const [subpageFound, setSubpageFound] = useState<boolean | null>(null);
    const [subpage, setSubpage] = useState<subpageData>();

    useEffect(() => {
        const getSubpageData = async () => {
            try {
                const res = await api.get(`/subpages/${id}`);
                setSubpageFound(true);
                setSubpage(res.data);
            } catch (e: unknown) {
                if (e instanceof AxiosError) {
                    setErrorMessage(e.response?.statusText);
                    setSubpageFound(false);
                    navigate("/*");
                }
            }
        }
        getSubpageData();
    }, []);

    if (!subpage || !subpageFound) {
        return <p className="mt-24 lg:mt-36">{errorMessage}</p>;
    }

    return (
        <div className="mt-24 lg:mt-36 w-full">
            <WysiwygEditor
                id={subpage.id}
                title={subpage.title}
                content={subpage.content}
            />
        </div>
    )
}