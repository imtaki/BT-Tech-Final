import {Link, useParams} from "react-router";
import {useEffect, useState} from "react";
import {AxiosError} from "axios";
import api from "../utils/axios.ts";
import {conferenceYear, pageData, subpageData} from "../types.ts";
import Skeleton from "react-loading-skeleton";
import DOMPurify from "dompurify";

const DynamicPageView = () => {
    const {slug}= useParams();
    const [allPages, setAllPages] = useState([]);
    const [availableYears, setAvailableYears] = useState<conferenceYear[]>();
    const [allSubPages, setAllSubPages] = useState<subpageData[] | null>(null);
    const [subpages, setSubpages] = useState<subpageData[]>([]);
    const [pageContent, setPageContent] = useState<pageData>();

    useEffect(() => {
        const getPages = async () => {
            try {
                const res = await api.get("/pages");
                setAllPages(res.data);
            } catch (e: unknown) {
                if (e instanceof AxiosError) {
                    console.log(e);
                }
            }
        }
        const getYears = async () => {
            try {
                const res = await api.get("/conference-years");
                setAvailableYears(res.data);
            } catch (e: unknown) {
                if (e instanceof AxiosError) {
                    console.log(e);
                }
            }
        }
        const getSubpages = async () => {
            try {
                const res = await api.get("/subpages");
                setAllSubPages(res.data);
            } catch (e: unknown) {
                if (e instanceof AxiosError) {
                    console.log(e);
                }
            }
        }
        getPages();
        getYears();
        getSubpages();
    }, []);

    useEffect(() => {
        if (!slug) return;

        setPageContent(undefined);
        const selectedYear = availableYears?.find(year => year.year === Number(slug));

        if (selectedYear) {
            if (allSubPages !== null) {
                setSubpages(allSubPages.filter(subpage => subpage.year === Number(slug)));
            }
        } else {
            setPageContent(allPages.find((page: pageData) => page.slug === slug));
        }

    }, [slug, allSubPages, availableYears, allPages]);

    if (allSubPages === null) {
        return (
            <>
                <div className="w-64">
                    <Skeleton baseColor="#e8e8e8" highlightColor="#cdcdcd" height={50}/>
                </div>
                <div className="w-48">
                    <Skeleton baseColor="#e8e8e8" highlightColor="#cdcdcd" height={200}/>
                </div>
            </>
        );
    }

    if (pageContent) {
        return (
            <div className="prose-lg">
                <h2 className="font-bold">{pageContent.title}</h2>
                <div dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(pageContent.content)}}
                     className="mt-4"></div>
            </div>
        );
    }

    if (subpages.length > 0) {
        return (
            <div>
                <h2 className="text-3xl font-bold">Conference year {slug}:</h2>
                {subpages.map((subpage) =>
                    <Link to={`/${slug}/${subpage.slug}`} key={subpage.id}>
                        <p className="text-xl mt-4 text-gray-800">{subpage.title}</p>
                    </Link>
                )}
            </div>
        );
    } else {
        return (
            <div>
                <h2 className="text-2xl font-bold text-center">This page does not contain any content.</h2>
            </div>
        );
    }
}

export default DynamicPageView