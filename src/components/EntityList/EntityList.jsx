import Link from "next/link";
import React from "react";
import data from "/public/data/data.json";

const EntityList = () => {
  const getDayWithSuffix = (dateStr) => {
    const day = dateStr.split("-")[2];
    const dayInt = parseInt(day, 10);
    if (dayInt % 10 === 1 && dayInt !== 11) return `${dayInt}st`;
    if (dayInt % 10 === 2 && dayInt !== 12) return `${dayInt}nd`;
    if (dayInt % 10 === 3 && dayInt !== 13) return `${dayInt}rd`;
    return `${dayInt}th`;
  };

  const formatDate = (dateStr) => {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const [year, month, day] = dateStr.split("-");
    const shortYear = year.slice(2); // Get last two digits of the year
    const monthName = months[parseInt(month, 10) - 1]; // Convert month to name

    return `${parseInt(day, 10)} ${monthName} ${shortYear}`;
  };

  return (
    <div className="container ipo-list">
      <div className="table-wrap">
        <table className="ipo-table">
          <thead>
            <tr>
              <th className="primary">Company / issue date</th>
              <th className="primary">Issue Size</th>
              <th className="primary">Price Range</th>
              <th className="primary">Min Investment</th>
            </tr>
          </thead>
          <tbody>
            {data.ipos.map((ipo) => (
              <Link href={`/${ipo.id}`} key={ipo.id} legacyBehavior className="linksection">
                <tr className="table_row" style={{ cursor: "pointer" }}>
                  <td>
                    <div className="company-wrap">
                      <div className="ipo-logo">
                        <img src={ipo.logo_image} alt={ipo.company} />
                      </div>
                      <div className="ipo-company-text">
                        <p className="secondary">{ipo.company}</p>
                        <p className="issue-date primary">
                          {ipo.issue_dates &&
                            `${getDayWithSuffix(
                              ipo.issue_dates.start
                            )} - ${formatDate(ipo.issue_dates.end)}`}
                        </p>
                        <p className="issue-date primary">{ipo.tobe_announced && ipo.tobe_announced}</p>
                      </div>
                    </div>
                  </td>
                  <td className="secondary">₹{ipo.listing_issue_size.value} Crores</td>
                  <td className="secondary">₹{ipo.price_range.min} - {ipo.price_range.max}</td>
                  <td>
                    <div className="invest-qty-wrap">
                      <p className="secondary minInvestment">
                        {ipo.min_investment.toLocaleString("en-IN")}
                      </p>
                      <p className="primary">{`${ipo.lot_size.shares_per_lot} shares/${ipo.lot_size.lots} lots`}</p>
                    </div>
                  </td>
                </tr>
              </Link>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EntityList;
