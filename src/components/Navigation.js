import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch, useSelector } from "react-redux";
import {
  dropdownUpdate,
  searchUpdate,
  submissionUpdate,
} from "../features/slices/navigationSlice";

const Navigation = () => {
  const currentSubmissionsTab = useSelector(
    (state) => state.navigateData.activeSubmission
  );
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState("");
  const [dropdownValue, setDropdownValue] = useState("Newest");

  const handleInputChange = (event) => {
    event.preventDefault();
    setInputValue(event.target.value);

  };

  const handleDropdownChange =  (e) =>{
    setDropdownValue(e.target.value)
    dispatch(dropdownUpdate(e.target.value));
  }
  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      dispatch(searchUpdate(inputValue));
    }
  };

  const handleAllSubmission = () =>{
    dispatch(submissionUpdate("All Submissions"))
    dispatch(searchUpdate(null))
    setInputValue("")
  }

  const handleFavSubmission = () =>{
    dispatch(submissionUpdate("Favourite Submissions"))
    dispatch(searchUpdate(null))
    setInputValue("")
  }

  const dropdownOption = ["Newest", "Oldest"];

  return (
    <div className="flex justify-between items-center px-16 py-8">
      <div className="flex items-center">
        <div onClick={handleAllSubmission}>
          <span
            className={
              currentSubmissionsTab === "All Submissions"
                ? `text-2xl font-medium cursor-pointer border-b-4 rounded-sm border-green-700 duration-300`
                : `text-2xl font-medium cursor-pointer  rounded-sm border-green-700 duration-300`
            }
          >
            All Submissions
          </span>
        </div>
        <div
          onClick={handleFavSubmission}
        >
          <span
            className={
              currentSubmissionsTab === "Favourite Submissions"
                ? "text-2xl font-medium ml-4 cursor-pointer border-b-4 rounded-sm border-green-700 duration-300"
                : "text-2xl font-medium ml-4 cursor-pointer  rounded-sm border-green-700 duration-300"
            }
          >
            Favourite Submissions
          </span>
        </div>
      </div>
      <div className="flex items-center">
        <div className="border rounded-2xl border-gray-600 px-2 py-1 ">
          <SearchIcon />
          <input
            type="text"
            placeholder="Search"
            value={inputValue}
            className="outline-0 ml-2"
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
          />
        </div>
        <div className="ml-4">
          <select
            className="border rounded-2xl border-gray-600 px-8 py-1 outline-0"
            value={dropdownValue}
            onChange={handleDropdownChange}
          >
            {dropdownOption.map((item, index) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
