import React, { useEffect } from 'react'
import Signup from '../components/Signup/Signup'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
const Signuppage = () => {

   const { isAuthenticated, user } = useSelector((state) => state.user);
   const navigate = useNavigate();
 
   useEffect(() => {
    user &&
     isAuthenticated === true ?
       navigate('/')
     : null
   }, [isAuthenticated, navigate]); 
 
  return (
     <div>
        <Signup/>
     </div>
  )
}

export default Signuppage