import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LoginPage from '../pages/LoginPage'; 
import SignupPage from '../pages/SignupPage';
import HomePage from '../pages/HomePage';
import ToDoPage from '../pages/ToDoPage';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/todo" element={<ToDoPage />} />
      <Route path="/home" element={<HomePage />} />
    </Routes>
  );
};

export default AppRoutes;
