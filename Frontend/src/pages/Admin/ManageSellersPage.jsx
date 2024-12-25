import React, { useState } from 'react'
// import ManageProducts from '../../components/Admin/ManageSellers';
import AdminHeader from '../../components/Admin/Layout/AdminHeader';
import AdminSidebar from '../../components/Admin/Layout/AdminSidebar';
import ManageSellers from '../../components/Admin/ManageSellers';

const ManageSellersPage = () => {
    const [active,setActive] = useState(4);
    return (
      <div >
          <AdminHeader
          />
          <div className="flex justify-center w-full">
          <div className="w-[300px] h-[90vh] bg-white shadow-md flex ">
              <AdminSidebar active={active} setActive={setActive}/>
          </div>
          <div className="flex w-full">
              <ManageSellers/>
          </div>
          </div> 
      </div>
    )
}

export default ManageSellersPage