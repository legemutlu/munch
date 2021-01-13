import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import './App.css';

const Container = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default Container;
