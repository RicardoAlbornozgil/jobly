import React, { useState, useEffect } from "react";
import SearchForm from "../common/SearchForm";
import JoblyApi from "../../api/api";
import JobCardList from "./JobCardList";
import LoadingSpinner from "../common/LoadingSpinner";
import "../../styles/JobList.css"

/** Show page with list of jobs.
 *
 * On mount, loads jobs from API.
 * Re-loads filtered jobs on submit from search form.
 *
 * JobList -> JobCardList -> JobCard
 *
 * This is routed to at /jobs
 */

function JobList() {
  console.debug("JobList");

  const [jobs, setJobs] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(function getAllJobsOnMount() {
    console.debug("JobList useEffect getAllJobsOnMount");
    search();
  }, []);

  /** Triggered by search form submit; reloads jobs. */
  async function search(title) {
    setLoading(true);
    try {
      let jobs = await JoblyApi.getJobs(title);
      setJobs(jobs);
    } catch (err) {
      console.error("Error fetching jobs:", err);
      setJobs([]);
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <LoadingSpinner />;

  return (
    <div className="JobList col-md-8 offset-md-2">
      <SearchForm searchFor={search} />
      {jobs.length ? (
        <JobCardList jobs={jobs} />
      ) : (
        <p className="lead">Sorry, no results were found!</p>
      )}
    </div>
  );
}

export default JobList;
