import WysiwygEditor from "../components/WysiwygEditor.tsx";
import {useNavigate, useParams} from "react-router";
import {useEffect, useState} from "react";
import api from "../utils/axios.ts";
import {pageData} from "../types.ts";
import Skeleton from "react-loading-skeleton";

export default function EditPage() {
    const navigate = useNavigate();
    const {slug} = useParams();
    const [page, setPage] = useState<pageData>();

    useEffect(() => {
        const checkAuthorization = async () => {
            try {
                const res = await api.get("/role-check");
                if (res.data.message === "editor") {
                    navigate("/");
                }
            } catch (e) {
                console.error(e);
                navigate("/");
            }
        }
        checkAuthorization();
    }, []);

    useEffect(() => {
        const getPageData = async () => {
            try {
                const res = await api.get(`/pages/by-slug/${slug}`);
                setPage(res.data);
            } catch (e) {
                console.error(e);
                navigate("/")
            }
        }
        getPageData();
    }, []);


    if (!page) {
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
                id={page.id}
                title={page.title}
                slug={page.slug}
                content={page.content}
                isPage={true}
                isIndex={page.is_index}
                isLink={page.is_link}
            />
        </div>
    )
}