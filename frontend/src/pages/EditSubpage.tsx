import WysiwygEditor from "../components/WysiwygEditor.tsx";
import {useNavigate, useParams} from "react-router";
import {useEffect, useState} from "react";
import api from "../utils/axios.ts";
import {subpageData} from "../types.ts";
import {AxiosError} from "axios";
import Skeleton from "react-loading-skeleton";

export default function EditSubpage() {
    const navigate = useNavigate();
    const {id} = useParams();
    const [authorized, setAuthorized] = useState<boolean | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | undefined>("");
    const [subpageFound, setSubpageFound] = useState<boolean | null>(null);
    const [subpage, setSubpage] = useState<subpageData>();

    useEffect(() => {
        const checkAuthorization = async () => {
            try {
                const res = await api.get("/role-check");
                setAuthorized(true);
                if (res.data.message === "editor") {
                    await api.get(`/subpages/by-id/${id}/edit`);
                }
            } catch (e) {
                console.error(e);
                navigate("/");
            }
        }
        checkAuthorization();
    }, []);

    useEffect(() => {
        const getSubpageData = async () => {
            try {
                const res = await api.get(`/subpages/by-id/${id}`);
                setSubpageFound(true);
                setSubpage(res.data);
            } catch (e: unknown) {
                if (e instanceof AxiosError) {
                    setErrorMessage(e.response?.statusText);
                    setSubpageFound(false);
                    navigate("/not-found");
                }
            }
        }
        getSubpageData();
    }, []);


    if (!subpage) {
        return (
            <div className="mt-24 lg:mt-36 w-full flex justify-center">
                <div className="w-full lg:w-6/12">
                    <Skeleton height={800} />
                </div>
            </div>
        );
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