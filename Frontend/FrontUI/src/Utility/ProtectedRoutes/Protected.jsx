// src/ProtectedRoute.jsx
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { Usecontext } from '../../Pages/ContextApi/UserContext';

const Protected = ({ children, allowed }) => {
  const { status } = useContext(Usecontext);

  if (!status) return <Navigate to="/Login" />;

  if (!allowed.includes(status)) return <Navigate to="/" />;

  return children;
};

export default Protected;
