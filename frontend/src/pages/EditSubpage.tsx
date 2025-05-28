import WysiwygEditor from "../components/WysiwygEditor.tsx";
import {useNavigate, useParams} from "react-router";
import {useEffect, useState} from "react";
import api from "../utils/axios.ts";
import {subpageData} from "../types.ts";
import Skeleton from "react-loading-skeleton";

export default function EditSubpage() {
    const navigate = useNavigate();
    const {id} = useParams();
    const [subpage, setSubpage] = useState<subpageData>();
    const [authorized, setAuthorized] = useState<boolean | null>(null);

    useEffect(() => {
        const checkAuthorization = async () => {
            try {
                const res = await api.get("/role-check");
                if (res.data.message === "editor") {
                    const res = await api.get(`/subpages/by-slug/${id}`);
                    const subpageId = res.data.id;
                    await api.get(`/subpages/edit/${subpageId}`);
                }
                setAuthorized(true);
            } catch (e) {
                console.error(e);
                navigate("/");
                setAuthorized(false);
            }
        }
        checkAuthorization();
    }, []);

    useEffect(() => {
        const getSubpageData = async () => {
            try {
                const res = await api.get(`/subpages/by-slug/${id}`);
                setSubpage(res.data);
            } catch (e) {
                console.error(e)
                navigate("/not-found");
            }
        }
        getSubpageData();
    }, []);

    if (!authorized) {
        return null
    }

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
                slug={subpage.slug}
                content={subpage.content}
                isPage={false}
                isIndex={false}
                isLink={false}
            />
        </div>
    )
}