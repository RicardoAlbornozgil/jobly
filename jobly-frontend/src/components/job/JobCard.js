import React, { useContext, useState, useEffect } from "react";
import "../../styles/JobCard.css";
import UserContext from "../auth/UserContext";

/** Show limited information about a job.
 *
 * Is rendered by JobCardList to show a "card" for each job.
 *
 * Receives apply func prop from parent, which is called on apply.
 *
 * JobCardList -> JobCard
 */

function JobCard({ id, title, salary, equity, companyName }) {
  console.debug("JobCard", "id=", id);

  const { hasAppliedToJob, applyToJob } = useContext(UserContext);
  const [applied, setApplied] = useState(false);

  useEffect(() => {
    console.debug("JobCard useEffect updateAppliedStatus", "id=", id);

    setApplied(hasAppliedToJob(id));
  }, [id, hasAppliedToJob]);

  /** Apply for a job */
  async function handleApply(evt) {
    if (applied) return;
    applyToJob(id);
    setApplied(true);
  }

  return (
    <div className="JobCard card">
      <div className="card-body">
        <h6 className="card-title">{title}</h6>
        <p>{companyName}</p>
        {salary && <div><small>Salary: {formatSalary(salary)}</small></div>}
        {equity !== undefined && <div><small>Equity: {equity}</small></div>}
        <div className="card-footer">
          <button
              className="btn btn-danger font-weight-bold text-uppercase float-right"
              onClick={handleApply}
              disabled={applied}
            >
            {applied ? "Applied" : "Apply"}
          </button>
        </div>
      </div>
      
    </div>
  );
}

/** Render integer salary like '$1,250,343' */
function formatSalary(salary) {
  return salary.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export default JobCard;
