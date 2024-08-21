import React from 'react';
import { isAuthenticated } from '../helper/helper';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ element: Element }) => {
  return isAuthenticated() ? <Element /> : <Navigate to='/' /> ;
};

export default PrivateRoute; 
