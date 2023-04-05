import React from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { detailsUpdate } from '../features/slices/navigationSlice';


const Card = ({coverImage,title,summary,id,uploadDate}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleClick = () =>{
    dispatch(detailsUpdate(id));
    navigate("/card-details");
  }

  const daysAgo = (givenDate) => {
    const date1 = givenDate;
    const date2 = new Date().toISOString().slice(0, 10);
    const millisecondsPerDay = 24 * 60 * 60 * 1000; // 1 day = 24 hours * 60 minutes * 60 seconds * 1000 milliseconds
    
    const days = Math.round((new Date(date2).getTime() - new Date(date1).getTime()) / millisecondsPerDay);
    
    return days;
    
  };
  
  return (
    <button onClick={handleClick}>
      <div className='h-64 bg-white rounded-md p-4 flex flex-col justify-between shadow-md shadow-gray-400'>
        <div className='flex items-center'>
           <img className='h-20 rounded-md ' src={coverImage} atl="" />
           <span className='font-medium text-lg ml-8 break-words'>{title}</span>

        </div>
        <div className='h-24 overflow-hidden'>
        <p className=' my-4 break-words text-left'>{summary}</p>
        </div>
        <p className='text-right text-gray-600 text-sm'>{daysAgo(uploadDate) === 0 ? "updated Today" : `updated ${daysAgo(uploadDate)} days ago`}</p>
    </div>
    </button>
  )
}

export default Card