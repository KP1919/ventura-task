"use client";

import Image from "next/image";
import { MdKeyboardArrowRight } from "react-icons/md";
import arrow from "../../../public/images/arrow.svg";
import downloadIcon from "../../../public/images/download-icon.svg";
import data from "/public/data/data.json";

import Link from "next/link";
import StepFlow from "../StepFlow/StepFlow";
import { useState } from "react";

export default function EntityInfo({ id }) {
  const ipoData = data.ipos.filter((ipoDatas) => ipoDatas.id == id);
  const [isExpanded, setIsExpanded] = useState(false);

  const ipo = ipoData[0];

  if (ipoData.length < 1 || !ipo) {
    return <p>IPO not found</p>;
  }

  const steps = ipo.steps;

  const currentDate = new Date();

  const formatDate = (dateString) => {
    const [year, month, day] = dateString.split("-");
    return new Date(`${month} ${day}, ${year}`);
  };

  // Calculate the number of completed steps
  const completedSteps = steps.filter(
    (step) => currentDate >= formatDate(step.date)
  ).length;

  const formatDates = (dateStr) => {
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
    const dayWithSuffix = getDayWithSuffix(day);
    const monthName = months[parseInt(month, 10) - 1]; // Convert month to name

    return `${dayWithSuffix} ${monthName}`;
  };

  // Function to add suffix to the day
  const getDayWithSuffix = (day) => {
    const dayInt = parseInt(day, 10);
    if (dayInt % 10 === 1 && dayInt !== 11) return `${dayInt}st`;
    if (dayInt % 10 === 2 && dayInt !== 12) return `${dayInt}nd`;
    if (dayInt % 10 === 3 && dayInt !== 13) return `${dayInt}rd`;
    return `${dayInt}th`;
  };

  const formatDateYear = (dateStr) => {
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

  const handleReadMore = () => {
    setIsExpanded(true);
  };

  const handleShowLess = () => {
    setIsExpanded(false);
  };

  return (
    <div className="container">
      <div className="breadcrumbs">
        <Link href="/" className="primary home-link">
          Home
        </Link>
        <MdKeyboardArrowRight fontSize={15} color="gray" />
        <Link href="#" className="primary detail-market">
          Market Watch
        </Link>
      </div>

      <div className="company-detail-wrap">
        <div className="logo_wrap">
          <Link href="/" className="back-btn">
            <Image src={arrow} alt="arrow_icon" />
          </Link>
          <div className="company-logo">
            <Image
              src={ipo.logo_image}
              alt={ipo.company}
              width={150}
              height={150}
            />
            <div className="logo-txt-wrap">
              <p className="secondary company-name">{ipo.company}</p>
              <p className="primary">{ipo.company} Private Limited</p>
            </div>
          </div>
        </div>

        <div className="btn-wrap">
          <div className="download-btn">
            <Image src={downloadIcon} alt="download_icon" />
          </div>

          <button className="apply-btn">Apply</button>
        </div>
      </div>

      <div className="ipo-detail-wrap">
        <h6 className="secondary detail-title"> Ipo details</h6>
        <div className="ipo-detail-inner-wrap">
          <div className="details-wrap">
            <div className="details res-details">
              <span className="primary">Issue size</span>
              <span className="secondary">
                ₹{ipo.issue_size.min} - ₹{ipo.issue_size.max}CR.
              </span>
            </div>
            <div className="details">
              <span className="primary">Price range</span>
              <span className="secondary">
                ₹{ipo.price_range.min} - {ipo.price_range.max}
              </span>
            </div>
            <div className="details">
              <span className="primary">Minimun Amount</span>
              <span className="secondary">
                {ipo.min_investment.toLocaleString("en-IN")}
              </span>
            </div>
            <div className="details">
              <span className="primary">lost size</span>
              <span className="secondary">
                {ipo.lot_size.shares_per_lot} shares/lots
              </span>
            </div>
          </div>
          <div className="details-wrap res-issueDates">
            <div className="details">
              <span className="primary">Issue Dates</span>
              {ipo.ipo_issue_dates && (
                <span className="secondary">{`${formatDates(
                  ipo.ipo_issue_dates.start
                )} - ${formatDateYear(ipo.ipo_issue_dates.end)}`}</span>
              )}
              {ipo.tobe_announced && (
                <span className="secondary">{ipo.tobe_announced}</span>
              )}
            </div>
            <div className="details res-hidden">
              <span className="primary">Listed on</span>
              <span className="secondary">{formatDateYear(ipo.listed_on)}</span>
            </div>
            <div className="details res-hidden">
              <span className="primary">Listed Price</span>
              <span className="secondary">₹{ipo.listed_price.value}</span>
            </div>
            <div className="details res-hidden">
              <span className="primary">Listing gains</span>
              <span className="secondary">
                {ipo.listed_gains.absolute} (
                <span>{ipo.listed_gains.percentage.toFixed(1)}%</span>)
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="ipo-timeline-wrapper">
        <h3>IPO timeline</h3>
        <div className="ipo-timeline">
          <StepFlow
            currentStep={completedSteps}
            numberOfSteps={steps.length}
            stepsData={steps}
          />
        </div>
      </div>
      <div className="abt-company-wrap">
        <h3 className="secondary"> About the company</h3>

        {/*
          ipo.about_us.map((val,i) => (
            <p key={i} className={`primary ${i===1 && "abt-txt"}`}>{val}</p>
          ))
          */}

        {/*ipo.about_us.map((val, i) => (
          <p
            key={i}
            className={`primary ${i === 1 && !isExpanded ? "hidden" : ""} ${
              i === 1 ? "abt-txt" : ""
            }`}
          >
            {val}
          </p>
          ))*/}
        {ipo.about_us.map((val, i) => {
          if (i === 0) {
            return (
              <p key={i} className="primary abt-txt">
                {val}
              </p>
            );
          }
          if (i === 1 && isExpanded){
            return (
              <p key={i} className="primary abt-txt">
                {val}
              </p>
            );
          }
        })}
        {!isExpanded ? (
          <span className="read-more" onClick={handleReadMore}>
            Read More
          </span>
        ) : (
          <span className="show-less" onClick={handleShowLess}>
            Show Less
          </span>
        )}
        {/* <p className="primary abt-txt">{ipo.abtUsTxt}</p>
        <p className="primary">{ipo.abtUsTxt2}</p> */}
      </div>
    </div>
  );
}
