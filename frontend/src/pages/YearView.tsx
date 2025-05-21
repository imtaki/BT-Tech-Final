import {Link, useNavigate, useParams} from "react-router";
import {useEffect, useState} from "react";
import {AxiosError} from "axios";
import api from "../utils/axios.ts";
import {conferenceYear, subpageData} from "../types.ts";
import Skeleton from "react-loading-skeleton";

const YearView = () => {
    const navigate = useNavigate();
    const {year} = useParams();
    const [availableYears, setAvailableYears] = useState<conferenceYear[]>();
    const [allSubPages, setAllSubPages] = useState<subpageData[] | null>(null);
    const [subpages, setSubpages] = useState<subpageData[]>([]);

    useEffect(() => {
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
        getYears();
        getSubpages();
    }, []);

    useEffect(() => {
        if (availableYears) {
            const selected_year = availableYears.filter(data => data.year === Number(year));
            if (selected_year.length === 0) {
                navigate("/not-found");
            }
        }
        if (allSubPages !== null) {
            setSubpages(allSubPages.filter(subpage => subpage.year === Number(year)));
        }
    }, [year, allSubPages, availableYears]);

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

    if (subpages.length === 0) {
        return (
            <div>
                <h2 className="text-3xl font-bold">Conference year {year}:</h2>
                <p className="text-xl mt-4 text-gray-800">No subpages for this year.</p>
            </div>
        );
    }

    return (
        <div>
            <h2 className="text-3xl font-bold">Conference year {year}:</h2>
            {subpages.map((subpage) =>
                <Link to={`/${year}/${subpage.id}`} key={subpage.id}>
                    <p className="text-xl mt-4 text-gray-800">{subpage.title}</p>
                </Link>
            )}
      </div>
    );
}

export default YearView