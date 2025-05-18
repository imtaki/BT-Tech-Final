import {Link, useNavigate, useParams} from "react-router";
import {useEffect, useState} from "react";
import {AxiosError} from "axios";
import api from "../utils/axios.ts";
import {conferenceYear, subpageData} from "../types.ts";

const YearView = () => {
    const navigate = useNavigate();
    const {year} = useParams();
    const [subpages, setSubpages] = useState<subpageData[]>([]);

    useEffect(() => {
        const getSubpages = async () => {
            try {
                const res = await api.get("/conference-years");
                const selected_year = res.data.filter((years: conferenceYear) => years.year === Number(year));
                if (selected_year.length === 0) {
                    navigate("/not-found");
                    return
                }
                const sp_res = await api.get(`/subpages/by-year/${year}`, {year: year});
                setSubpages(sp_res.data);
            } catch (e: unknown) {
                if (e instanceof AxiosError) {
                    console.log(e);
                }
            }
        }
        getSubpages();
    }, [year]);

    if (subpages.length === 0) {
        return <p>No content for this conference year.</p>
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