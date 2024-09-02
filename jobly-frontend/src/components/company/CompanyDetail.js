import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import JoblyApi from "../../api/api";
import JobCardList from "../job/JobCardList";
import LoadingSpinner from "../common/LoadingSpinner";
import "../../styles/CompanyDetail.css"

/** Company Detail page.
 *
 * Renders information about the company, along with the jobs at that company.
 *
 * Routed at /companies/:handle
 *
 * Routes -> CompanyDetail -> JobCardList
 */

function CompanyDetail() {
  const { handle } = useParams();
  console.debug("CompanyDetail", "handle=", handle);

  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getCompany() {
      try {
        const company = await JoblyApi.getCompany(handle);
        setCompany(company);
      } catch (err) {
        console.error("Error fetching company details:", err);
      } finally {
        setLoading(false);
      }
    }

    getCompany();
  }, [handle]);

  if (loading) return <LoadingSpinner />;
  if (!company) return <p>Company not found.</p>;

  return (
    <div className="CompanyDetail col-md-8 offset-md-2">
      <h4>{company.name}</h4>
      <p>{company.description}</p>
      <JobCardList jobs={company.jobs} />
    </div>
  );
}

export default CompanyDetail;
