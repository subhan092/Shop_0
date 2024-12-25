import React, { useState } from 'react'
import AdminHeader from '../../components/Admin/Layout/AdminHeader';
import AdminSidebar from '../../components/Admin/Layout/AdminSidebar';
import SellerRequest from '../../components/Admin/SellerRequest';

const SellerRequestPage = () => {
    const [active,setActive] = useState(3);
    return (
      <div >
          <AdminHeader/>
          <div className="flex justify-center w-full">
          <div className="w-[300px] h-[90vh] bg-white shadow-md flex ">
              <AdminSidebar active={active} setActive={setActive}/>
          </div>
          <div className="flex w-full">
              <SellerRequest/>
          </div>
          </div> 
      </div>
    )
  }
  

export default SellerRequestPage