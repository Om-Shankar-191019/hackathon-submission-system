import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateItem } from "../features/slices/allSlice";
import { updateFavItem } from "../features/slices/favouriteSlice";

const fileInputTypes = ".png, .jpeg, .jpg";
const acceptedFileTypes = ["image/png", "image/jpeg", "image/pjpeg"];
const isValidFile = (file) => acceptedFileTypes.includes(file.type);

const Edit = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const activeDetailId = useSelector(
    (state) => state.navigateData.activeDetailId
  );
  const allCards = useSelector((state) => state.all.items);
  const activeDetailsInArray = allCards.filter(
    (item) => item.id === activeDetailId
  );

  if (activeDetailsInArray.length !== 0) {
    const activeDetails = activeDetailsInArray[0];
    var {
      id,
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


  const [imgInput, setImgInput] = useState(null);
  const onFileInputChange = (ev) => {
    const currFiles = ev.target.files;

    if (currFiles.length === 1) {
      const file = currFiles[0];

      if (isValidFile(file)) {
        const reader = new FileReader();

        reader.onload = (event) => {
          setImgInput(event.target.result);
        };

        reader.readAsDataURL(file);
      } else {
        alert(`Wrong file type ${file.type}`);
      }
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      title,
      summary,
      description,
      coverImage,
      hackathonName,
      hackathonStartDate,
      hackathonEndDate,
      gitHubRepository,
      otherLinks,
    },
  });

  const inputFields = [
    {
      id: 1,
      htmlFor: "Title",
      label: "Title",
      type: "text",
      placeholder: "Title of your submission",
      registerData: "title",
    },
    {
      id: 2,
      htmlFor: "Summary",
      label: "Summary",
      type: "text",
      placeholder:
        "A short summary of your submission (this will be visible with your submission)",
      registerData: "summary",
    },
    {
      id: 3,
      htmlFor: "Description",
      label: "Description",
      textarea: "textarea",
      placeholder:
        "write a long description of your project. You can describe your idea and apporach here.",
      registerData: "description",
    },
    {
      id: 4,
      htmlFor: "Cover image",
      label: "Cover image",
      type: "file",
      placeholder: "Minimum resolution: 360 x 360px",
      registerData: "coverImage",
      imageFile: true,
    },
    {
      id: 5,
      htmlFor: "Hackathon Name",
      label: "Hackathon Name",
      type: "text",
      placeholder: "Enter the name of the hackathon",
      registerData: "hackathonName",
    },
    {
      id: 6,
      htmlFor: "Hackathon Start Date",
      label: "Hackathon Start Date",
      type: "date",
      placeholder: "Select start date",
      registerData: "hackathonStartDate",
      date: true,
    },
    {
      id: 7,
      htmlFor: "Hackathon End Date",
      label: "Hackathon End Date",
      type: "date",
      placeholder: "Select end date",
      registerData: "hackathonEndDate",
      date: true,
    },
    {
      id: 8,
      htmlFor: "GitHub Repository",
      label: "GitHub Repository",
      type: "url",
      placeholder: "Enter your submission's public GitHub repository link",
      registerData: "gitHubRepository",
    },
    {
      id: 9,
      htmlFor: "Other Links",
      label: "Other Links",
      type: "url",
      placeholder: "You can upload a video demo or URL of your demo app here",
      registerData: "otherLinks",
    },
  ];

  return (
    <div className="bg-[#f8f9fd] py-8 md:py-20 md:px-16 ">
      <div className="w-full bg-white px-12 flex flex-col rounded-lg">
        <div className="w-full bg-white  py-4">
          <p className="font-bold text-gray-800 text-2xl">
            New Hackathon Submission
          </p>
        </div>

        <div className="bg-white mt-4   ">
          <div>
            <form
              className="sm:grid "
              onSubmit={handleSubmit((data, e) => {
                data.id = id;
                const todayDate = new Date().toISOString().slice(0, 10);
                data.uploadDate = todayDate;
                if (imgInput) {
                  data.coverImage = imgInput;
                }

                dispatch(updateItem(data));
                if(isItemPresentInFavItems(favItems,id)){
                  dispatch(updateFavItem(data));
                }
                navigate("/");
              })}
            >
              {inputFields.map(
                ({
                  id,
                  htmlFor,
                  label,
                  type,
                  placeholder,
                  registerData,
                  textarea,
                  imageFile,
                }) => (
                  <div key={id} className={`flex flex-col mb-8 `}>
                    <label htmlFor={htmlFor} className="font-medium mb-2">
                      {label}
                    </label>
                    {type && !imageFile && (
                      <input
                        className="border py-2 px-3 outline-0 rounded-md "
                        id={htmlFor}
                        type={type}
                        placeholder={placeholder}
                        {...register(registerData)}
                      />
                    )}
                    {textarea && (
                      <textarea
                        className="border py-2 px-3 outline-0 rounded-md resize-none h-52 w-full  "
                        placeholder={placeholder}
                        {...register(registerData)}
                      ></textarea>
                    )}
                    {imageFile && (
                      <input
                        className="border py-2 px-3 outline-0 rounded-md "
                        id={htmlFor}
                        type={type}
                        placeholder={placeholder}
                        accept={fileInputTypes}
                        onChange={onFileInputChange}
                        // {...register(imgInput)}
                      />
                    )}
                  </div>
                )
              )}

              <div className="flex mb-4">
                <button
                  type="submit"
                  className="my-4 bg-green-700 font-medium px-4 py-2 rounded-md text-white"
                >
                  Upload Submission
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Edit;
