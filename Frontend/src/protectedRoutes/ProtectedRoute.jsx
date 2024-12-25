import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import Loader from '../components/Layout/Loader';
import {getUserRole} from '../components/Jwt_decode';

const ProtectedRoute = ({ children }) => {
    const { user , isAuthenticated , loading} = useSelector((state) => state.user);
    const role = getUserRole()
    console.log("user role",role)

    // Check if the user is not authenticated or the user object does not exist
     if(loading === true){
      return  <Loader/>
     }
        if(user && isAuthenticated){
            if(role === 'admin'){
              return  <Navigate to="/admin-dashboard" replace/>;
            }else if(role === 'user'){
                return children;
            }
        }
        else{
            return  <Navigate to="/login" replace/>;
        }
       
     

    // If authenticated and user exists, render the children
  
};

export default ProtectedRoute;
