import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "../../styles/styles";
import axios from "axios";
import { backend_url } from "../../Url";
import { toast } from "react-toastify";

const ShopStatus = () => {

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
    console.log("shop data in status page",data);

    }
  , [])
  const [status, setStatus] = useState(data.status);

  const statusChange = async() => {
    try {
      axios.defaults.withCredentials = true;
      await axios.put(`${backend_url}seller/update-status/${id}`,{status}).then((response)=>{
        toast.success(response.data.message)
        navigate("/seller-request");
        alert("updated status")
      }).catch((error)=>{
        toast.error(error.resp.data.message)
      })
    } catch (error) {
      console.log("erro in upadate status",error)
      // toast.error('internal server error')
    }
};

  return (
    <div className="w-full mx-8  pt-2 mt-10 bg-white p-6">
      <h2 className="text-2xl font-semibold mb-4">Shop Info</h2>
      {/* <p><strong>Seller Name:</strong> {data.sellerName}</p> */}
      <p><strong>Shop Name:</strong> {data.name}</p>
      <p><strong>Email:</strong> {data.email}</p>
      <p><strong>Address:</strong> {data.address}</p>
      <p><strong>Description:</strong> {data.description}</p>

      <div className="mt-4 ">
        <label className="font-semibold">Update Status: </label>
        <select
          value={status}
          onChange={(e)=>setStatus(e.target.value)}
          className="ml-2 p-2 border border-gray-300"
        >
          <option value="Pending">Pending</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>

      <div className="mt-8">
        <button onClick={statusChange} className={`${styles.button} text-white text-[1.2rem]`}>
        Update Status
        </button>
      </div>

    </div>
  );
};

export default ShopStatus;
