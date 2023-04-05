import React from 'react'
import { Routes, Route } from "react-router-dom";
import Logo from './components/Logo'
import Listing from './components/Listing'
import SubmissionForm from './components/SubmissionForm';
import CardDetail from './components/CardDetail';
import Edit from './components/Edit';

const App = () => {
  return (
    <div>
      <Logo />
      
      <Routes>
        <Route path="/" element={<Listing />} />
        <Route path="/submission-form" element={<SubmissionForm />} />
        <Route path="/card-details" element={<CardDetail />} />
        <Route path="/edit" element={<Edit />} />
      </Routes>
    
    </div>
  )
}

export default App