import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styles from "../../styles/styles";
import { useSelector } from "react-redux";
import axios from "axios";
import { backend_url } from "../../Url";
import { toast } from "react-toastify";

const ShopInfo = ({ isOwner }) => {
  const [data,setData]= useState({});
  const {id} = useParams()

  useEffect(() => {
    try {
      axios.get(`${backend_url}seller/get-shop-info/${id}`).then((res)=>{
        setData(res.data.shop)
     }).catch((error)=>{
       console.log("error in fetching shopinfo",error)
     })
    } catch (error) {
      console.log("error in shopinfo",error)
    }
    }
  , [])
  console.log("shopData",data)
  

  const logoutHandle = async () => {
    try {
      await axios
        .get(`${backend_url}seller/logout`)
        .then((response) => {
          toast.success(response.data.message);
          // toast.success('shop logout ');
          window.location.reload(true);
        })
        .catch((error) => {
          toast.error(error.response.data.message);
        });
    } catch (error) {
      console.log("error in shop logout", error);
    }
  };

  return (
    <div>
      <div className="w-full py-5">
        <div className="w-full flex item-center justify-center">
          <img
            src={`${backend_url}public/shop/${data && data.avatar}`}
            alt="shop-image"
            className="w-[140px] h-[128px] object-cover rounded-full"
          />
        </div>
        <h3 className="text-center py-2 text-[20px]">{data.name}</h3>
        <p className="text-[16px] text-[#000000a6] p-[10px] flex items-center">
          {data.description}
        </p>
      </div>
      <div className="p-3">
        <h5 className="font-[600]">Address</h5>
        <h4 className="text-[#000000a6]">{data.address}</h4>
      </div>
      <div className="p-3">
        <h5 className="font-[600]">Phone Number</h5>
        <h4 className="text-[#000000a6]">{data.phoneNumber}</h4>
      </div>
      <div className="p-3">
        <h5 className="font-[600]">Total Products</h5>
        <h4 className="text-[#000000a6]">{data.totalProducts}</h4>
      </div>
      <div className="p-3">
        <h5 className="font-[600]">Shop Ratings</h5>
        <h4 className="text-[#000000b0]">{data.averageRating}/5</h4>
      </div>
      <div className="p-3">
        <h5 className="font-[600]">Joined On</h5>
        <h4 className="text-[#000000b0]">{data.createdAt}</h4>
      </div>
      {isOwner && (
        <div className="py-3 px-4">
          <Link to="/settings">
            <div
              className={`${styles.button} !w-full !h-[42px] !rounded-[5px]`}
            >
              <span className="text-white">Edit Shop</span>
            </div>
          </Link>
          <div
            className={`${styles.button} !w-full !h-[42px] !rounded-[5px]`}
            onClick={() => logoutHandle()}
          >
            <span className="text-white">Log Out</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShopInfo;
