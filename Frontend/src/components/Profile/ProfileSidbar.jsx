import axios from "axios";
import React from "react";
import { AiOutlineCreditCard, AiOutlineLogin, AiOutlineMessage, AiOutlineShopping } from "react-icons/ai";
import { BsInbox, BsInboxFill } from "react-icons/bs";
import { MdOutlineTrackChanges } from "react-icons/md";
import { RiRefund2Fill, RiRefund2Line } from "react-icons/ri";
import { RxPerson } from "react-icons/rx";
import { TbAddressBook } from "react-icons/tb";
import { backend_url } from "../../Url";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ProfileSidbar = ({ active, setActive }) => {
  axios.defaults.withCredentials = true

 const   navigate=useNavigate()

  const logoutHandler = async()=>{
          try {
             await axios.get(`${backend_url}user/logout`).then((response)=>{
              toast.success(response.data.message);
              navigate('/login')
              window.location.reload(true);
             }).catch((error)=>{
              toast.error(error.response.data.message);
             })
          } catch (error) {
            toast.error("no logout user error ");
            console.log("error in logout user",error)
          }
  }
  return (
    <div className="w-full bg-white flex mb-2 rounded-md shadow-md flex-col  gap-6 py-10 px-2">
      <div
        className="flex w-full items-center mb-2 px-2 gap-2 cursor-pointer"
        onClick={() => setActive(1)}
      >
        <RxPerson className="size-5" color={active === 1 ? "red" : ""} />
        <span className={` text-[1.2rem] ${active === 1 ? "text-red-500" : ""}`}>
          Profile
        </span>
      </div>

      <div
        className="flex w-full items-center mb-2 px-2 gap-2 cursor-pointer"
        onClick={() => setActive(2)}
      >
        <AiOutlineShopping className="size-5" color={active === 2 ? "red" : ""} />
        <span className={` text-[1.2rem] ${ active === 2 ? "text-red-500" : ""}`}>
          Orders
        </span>
      </div>

      <div
        className="flex w-full items-center mb-2 px-2 gap-2 cursor-pointer"
        onClick={() => setActive(3)}
      >
        <RiRefund2Line className="size-5" color={active === 3 ? "red" : ""} />
        <span className={` text-[1.2rem] ${ active === 3 ? "text-red-500" : ""}`}>
          Refunds
        </span>
      </div>

      
      <div
        className="flex w-full items-center mb-2 px-2 gap-2 cursor-pointer"
        onClick={() => setActive(4)}
      >
        <AiOutlineMessage className="size-5" color={active === 4 ? "red" : ""} />
        <span className={` text-[1.2rem] ${ active === 4 ? "text-red-500" : ""}`}>
          inbox
        </span>
      </div>

       
      <div
        className="flex w-full items-center mb-2 px-2 gap-2 cursor-pointer"
        onClick={() => setActive(5)}
      >
        <MdOutlineTrackChanges className="size-5" color={active === 5 ? "red" : ""} />
        <span className={` text-[1.2rem] ${ active === 5 ? "text-red-500" : ""}`}>
          Track order
        </span>
      </div>

       
      <div
        className="flex w-full items-center mb-2 px-2 gap-2 cursor-pointer"
        onClick={() => setActive(6)}
      >
        <AiOutlineCreditCard className="size-5" color={active === 6 ? "red" : ""} />
        <span className={` text-[1.2rem] ${ active === 6 ? "text-red-500" : ""}`}>
          Payment Method
        </span>
      </div>

       
      <div
        className="flex w-full items-center mb-2 px-2 gap-2 cursor-pointer"
        onClick={() => setActive(7)}
      >
        <TbAddressBook className="size-5" color={active === 7 ? "red" : ""} />
        <span className={` text-[1.2rem] ${ active === 7 ? "text-red-500" : ""}`}>
          Address
        </span>
      </div>

         
      <div
        className="flex w-full items-center mb-2 px-2 gap-2 cursor-pointer"
        onClick={() => setActive(8) || logoutHandler()}
      >
        <AiOutlineLogin className="size-5" color={active === 8 ? "red" : ""} />
        <span className={` text-[1.2rem] ${ active === 8 ? "text-red-500" : ""}`}>
          Logout
        </span>
      </div>
    </div>
  );
};

export default ProfileSidbar;
