import React, { useEffect } from 'react';
import Login from '../components/Login/Login';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const { isAuthenticated ,user } = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    user &&
     isAuthenticated === true ?
       navigate('/')
     : null
   }, [isAuthenticated, navigate]); 

  return (
    <Login />
  );
}

export default LoginPage;
