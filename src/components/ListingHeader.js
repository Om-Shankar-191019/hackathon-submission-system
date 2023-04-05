import React from "react";
import { Link } from "react-router-dom";
import handHoldingBulb from "../assets/Hand holding bulb 3D.png";

const ListingHeader = () => {
  return (
    <div className="bg-[#083444] w-full text-white flex items-center px-16 py-4 justify-center md:justify-between">
      <div className="my-16 ">
        <h3 className="text-2xl md:text-4xl lg:text-6xl font-medium">
          Hackathon Submissions
        </h3>
        <p className="my-4 ">
          Are you tired of the tedious process of submitting your hackathon
          projects? Look no further than our innovative web app! Our
          user-friendly platform streamlines the submission process, allowing
          you to easily showcase your project and get it noticed. Say goodbye to
          the stress of hackathon submissions and try our web app today.
        </p>
        <Link to="/submission-form">
        <button className="my-4 bg-green-700 font-medium px-4 py-2 rounded-md">
          Upload Submission
        </button>
        </Link>
      </div>

      <div className="md:my-2 lg:my-4 px-8 ml-24 hidden md:block ">
        <img src={handHoldingBulb} alt="" />
      </div>
    </div>
  );
};

export default ListingHeader;
