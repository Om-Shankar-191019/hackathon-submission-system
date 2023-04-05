import React from 'react'
import { useSelector } from 'react-redux'
import Card from './Card'
const AllSubmission = () => {
  const selectSubmission = useSelector((state) => state.navigateData.activeSubmission);
  const allData = useSelector((state) => state.all.items)
  const favData = useSelector((state) => state.favourite.favItems)
  let data = [];
  if(selectSubmission==="All Submissions"){
      data = allData;
  }else{
      data = favData;
  }
    
    
  return (
    <div className='grid grid-cols-3 gap-8 py-8 px-16 bg-[#f8f9fd]'>
    {data.length>0 && data.map((item,index) => {
      const {coverImage , title, summary, id ,uploadDate} = item
      return <Card key={index} coverImage={coverImage} title={title} summary={summary} id={id} uploadDate={uploadDate} />
    })}
   
    </div>
  )
}

export default AllSubmission