import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
function PrivateRoute() {
  const { user, message } = useSelector((state) => state.user);
  if (message.trim().length > 0) {
    alert(message);
  }
  return user ? <Outlet /> : <Navigate to='/auth' />;
}

export default PrivateRoute;
