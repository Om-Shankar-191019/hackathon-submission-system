import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import StarIcon from "@mui/icons-material/Star";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import GitHubIcon from "@mui/icons-material/GitHub";
import LaunchIcon from "@mui/icons-material/Launch";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import DeleteModal from "./DeleteModal";
import { addFavItem, removeFavItem } from "../features/slices/favouriteSlice";

const CardDetail = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const activeDetailId = useSelector(
    (state) => state.navigateData.activeDetailId
  );
  const allCards = useSelector((state) => state.all.items);
  const activeDetailsInArray = allCards.filter(
    (item) => item.id === activeDetailId
  );

  if (activeDetailsInArray.length !== 0) {
    var activeDetails = activeDetailsInArray[0];
    var {
      title,
      summary,
      description,
      coverImage,
      hackathonName,
      hackathonStartDate,
      hackathonEndDate,
      gitHubRepository,
      otherLinks,
    } = activeDetails;
  }

  const favItems = useSelector((state) => state.favourite.favItems);
  const isItemPresentInFavItems = (favItems, activeId) => {
    const index = favItems.findIndex((item) => item.id === activeId);
    if (index !== -1) {
      return true;
    }
    return false;
  };

  const [favourite, setFavourite] = useState(
    isItemPresentInFavItems(favItems, activeDetailId)
  );
  const handleFavourite = () => {
    setFavourite(!favourite);
    if (favourite) {
      dispatch(removeFavItem(activeDetailId));
    } else {
      dispatch(addFavItem(activeDetails));
    }
  };

  function formatDate(dateString) {
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

    const [year, month, day] = dateString.split("-");

    const monthName = months[Number(month) - 1];
    const formattedDate = `${day} ${monthName} ${year}`;

    return formattedDate;
  }

  return (
    <div>
      <div className="bg-[#083444] w-full text-white flex items-center px-16 py-10 justify-center md:justify-between">
        <div className="my-16 ">
          <div className="flex items-center">
            <img className="h-20 rounded-md " src={coverImage} alt="" />
            <span className="font-bold text-2xl ml-8 break-words">{title}</span>
          </div>
          <p className="my-4 break-words">{summary}</p>
          <div className="flex items-center">
            <div onClick={handleFavourite}>
              {favourite ? (
                <StarIcon className="cursor-pointer" />
              ) : (
                <StarOutlineIcon className="cursor-pointer" />
              )}
            </div>
            <div className="ml-4 border-l border-white h-8"></div>
            <div className="ml-4 bg-gray-600 px-4 py-2 rounded-2xl flex items-center">
              <CalendarTodayIcon className="mr-2" fontSize="small" />
              {hackathonStartDate && formatDate(hackathonStartDate)}
            </div>
          </div>
        </div>

        <div className="flex flex-col ml-32 ">
          <button
            onClick={() => navigate("/edit")}
            className=" mb-2 border border-white font-medium px-2 py-2 rounded-lg flex items-center"
          >
            <EditIcon className="ml-4" />
            <span className="ml-2 text-white">Edit</span>
          </button>
          <button
            onClick={handleOpen}
            className=" border border-white font-medium px-2 py-2 rounded-lg flex items-center"
          >
            <DeleteIcon className="ml-4" />
            <span className="ml-2 text-white">Delete</span>
          </button>
          <DeleteModal open={open} handleClose={handleClose} />
        </div>
      </div>

      <div className="flex items-start px-16 py-12 space-x-24 ">
        <div className=" w-3/4">
          <span className="font-medium  text-2xl ">Description</span>
          <p className="mt-8">{description}</p>
        </div>

        <div className=" w-1/4">
          <span className="text-gray-500 font-medium">Hackathon</span>
          <p className="font-semibold my-2"> {hackathonName}</p>
          <div className="flex items-center">
            <CalendarTodayIcon
              className="mr-2 text-gray-500"
              fontSize="small"
            />
            <span className="text-gray-500 text-sm">
              {hackathonStartDate && formatDate(hackathonStartDate)} -{" "}
              {hackathonEndDate && formatDate(hackathonEndDate)}
            </span>
          </div>
          <div className="flex flex-col mt-8 ">
            
              <button className=" mb-2 border border-gray-500 font-medium px-2 py-2 rounded-lg">
                <a href={gitHubRepository} >
                <GitHubIcon className="text-gray-500" />
                <span className="ml-2 text-gray-500">GitHub Repository</span>
                </a>
              </button>
            
        
              <button className=" border border-gray-500 font-medium px-2 py-2 rounded-lg">
                <a href={otherLinks}>
                <LaunchIcon className="text-gray-500" />
                <span className="ml-2 text-gray-500">Other Link</span>
                </a>
              </button>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardDetail;
