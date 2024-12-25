import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import Loader from '../components/Layout/Loader';
import { getShopStatus } from '../components/Jwt_decode';

const SellerProtectedRoute = ({children}) => {
  const navigate = useNavigate()
    const { seller ,isSeller , isLoading } = useSelector((state) => state.seller);
     if(isLoading === true){
       return <Loader/>
     } 
      console.log("seller profile",seller);
         if(!seller || !isSeller ){
          navigate('/shop-login')     
        }
        else if(seller.status !== 'Active'){
          navigate('/pending-approval')     
        }
      return children
 
}

export default SellerProtectedRoute