import React, { useState } from "react";
import "../../styles/SearchForm.css";

/** Search widget.
 *
 * Appears on CompanyList and JobList so that these can be filtered
 * down.
 *
 * This component doesn't *do* the searching, but it renders the search
 * form and calls the `searchFor` function prop that runs in a parent to do the
 * searching.
 *
 * { CompanyList, JobList } -> SearchForm
 */

function SearchForm({ searchFor }) {
  console.debug("SearchForm", "searchFor=", typeof searchFor);

  const [searchTerm, setSearchTerm] = useState("");

  /** Tell parent to filter */
  function handleSubmit(evt) {
    evt.preventDefault();
    const trimmedTerm = searchTerm.trim();
    searchFor(trimmedTerm || undefined);
    setSearchTerm(trimmedTerm);
  }

  /** Update form fields */
  function handleChange(evt) {
    setSearchTerm(evt.target.value);
  }

  return (
    <div className="SearchForm">
      <form className="form-inline" onSubmit={handleSubmit}>
        <input
          className="form-control form-control-lg"
          name="searchTerm"
          placeholder="Enter search term..."
          value={searchTerm}
          onChange={handleChange}
          aria-label="Search"
        />
        <button type="submit" className="btn btn-lg btn-primary">
          Search
        </button>
      </form>
    </div>
  );
}

export default SearchForm;
