import React from "react";
import Box from "@mui/material/Box";
import { useDispatch, useSelector } from "react-redux";
import Modal from "@mui/material/Modal";
import { useNavigate } from "react-router-dom";
import { detailsUpdate } from "../features/slices/navigationSlice";
import { removeItem } from "../features/slices/allSlice";
import { removeFavItem } from "../features/slices/favouriteSlice";


const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",

  bgcolor: "background.paper",
  borderRadius: "8px",
  boxShadow: 24,
  p: 4,
};
const DeleteModal = ({ open, handleClose }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentId = useSelector((state) => state.navigateData.activeDetailId);
  const favItems = useSelector((state) => state.favourite.favItems);
  const isItemPresentInFavItems = (favItems, activeId) => {
    const index = favItems.findIndex((item) => item.id === activeId);
    if (index !== -1) {
      return true;
    }
    return false;
  };

  const handleDelete = () =>{
    if(currentId){
        dispatch(removeItem(currentId));
        console.log(currentId)
    }
    if(isItemPresentInFavItems(favItems,currentId)){
        dispatch(removeFavItem(currentId));
    }
        
    dispatch(detailsUpdate(null));
    navigate("/");
  }

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={style}
          className="w-full min-h-max max-w-5/6 md:w-1/2"
        >
          <h1 className=" text-xl md:text-2xl font-bold border-b border-gray-800 mb-2">
            Delete modal
          </h1>

          <p className="my-2 text-gray-700">This action is irreversible. Are you sure you want to delete this modal?</p>
          <div className="flex  items-center justify-end">
                <button
                  onClick={handleClose}
                  className="my-4  font-medium px-4 py-2 rounded-md text-black border border-gray-800"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="ml-4 bg-red-600 font-medium px-4 py-2 rounded-md text-white"
                >
                  Delete
                </button>
            </div>

        </Box>
      </Modal>
    </div>
  );
};

export default DeleteModal;
