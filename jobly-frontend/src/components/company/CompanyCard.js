import React from "react";
import { Link } from "react-router-dom";
import "../../styles/CompanyCard.css";

/** Show limited information about a company
 *
 * Is rendered by CompanyList to show a "card" for each company.
 *
 * CompanyList -> CompanyCard
 */

function CompanyCard({ name, description, logoUrl, handle }) {
  console.debug("CompanyCard", logoUrl);

  return (
    <Link className="CompanyCard card" to={`/companies/${handle}`}>
      <div className="card-body">
        <h6 className="card-title d-flex justify-content-between align-items-center">
          <span>{name}</span>
          {logoUrl && (
            <img
              src={logoUrl}
              alt={`${name} logo`}
              className="CompanyCard-logo"
            />
          )}
        </h6>
        <p className="card-text">
          <small>{description}</small>
        </p>
      </div>
    </Link>
  );
}

export default CompanyCard;
