import React from "react";
import { CgProfile } from "react-icons/cg";
import styles from "../../../styles/styles";
import { Link } from "react-router-dom";
import { FiPackage } from "react-icons/fi";
import { BiMessageSquareDetail } from "react-icons/bi";
import { useSelector } from "react-redux";
import { backend_url } from "../../../Url";

const AdminHeader = () => {
  const {user} = useSelector((state)=>state.user);
  return (
    <div className="w-full flex z-[10rem] justify-between items-center shadow-md bg-white h-[70px] px-4 ">
      <div>
        <Link to="/admin-dashboard">
          <img
            src="https://shopo.quomodothemes.website/assets/images/logo.svg"
            alt="logo"
            srcset=""
          />
        </Link>
      </div>
      <div className={`${styles.noramlFlex}`}>
        <div className="flex flex-col">
          <h4 className="text-[1.2rem] font-semibold">Admin</h4>
          <p className="text-base text-purple-600">Subhan Ali</p>
        </div>
        <div className="relative cursor-pointer mx-[15px]">
          <Link to="/login">
            <img
              src={`${backend_url}public/images/${user && user.avatar}`}
              className="w-[35px] h-[35px] rounded-full"
              alt="User Avatar"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminHeader;
