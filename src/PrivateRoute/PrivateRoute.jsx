import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
    return (
      <div className='flex items-center justify-center h-full'>Loading…</div>
    );
  }
  if (!user) {
    return <Navigate to='/login' replace state={{ from: location }} />;
  }
  return children;
};

export default PrivateRoute;
