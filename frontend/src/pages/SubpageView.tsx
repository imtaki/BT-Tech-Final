import {useParams} from "react-router";
import {useEffect, useState} from "react";
import {subpageData} from "../types.ts";
import api from "../utils/axios.ts";
import {AxiosError} from "axios";
import DOMPurify from "dompurify";
import Skeleton from "react-loading-skeleton";

const SubpageView = () => {
    const {slug, id} = useParams();
    const [loading, setLoading] = useState(true);
    const [subpage, setSubpage] = useState<subpageData>();

    useEffect(() => {
        const fetchSubpageData = async () => {
            try {
                const res = await api.get(`/subpages/by-slug/${id}`);
                if (res.data.year !== Number(slug)) {
                    return
                }
                setSubpage(res.data);
            } catch (e: unknown) {
                if (e instanceof AxiosError) {
                    console.log(e.response?.statusText);
                }
            } finally {
                setLoading(false);
            }
        }
        fetchSubpageData()
    }, [slug]);

    if (loading) {
        return (
          <>
              <div className="text-center">
                  <Skeleton baseColor="#e8e8e8" highlightColor="#cdcdcd" height={30} width={200}/>
              </div>
              <div className="lg:px-48 mt-4 w-full">
                  <Skeleton baseColor="#e8e8e8" highlightColor="#cdcdcd" height={500}/>
              </div>
          </>
        );
    }

    if (!subpage) {
        return <p className="prose-lg text-center">Page not found.</p>
    }

    return (
        <div className="prose-lg">
            <h2 className="font-bold">{subpage.title}</h2>
            <div dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(subpage.content)}}
                 className="mt-4"></div>
        </div>
    );
}

export default SubpageView