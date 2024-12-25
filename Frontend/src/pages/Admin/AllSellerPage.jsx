import React, { useState } from 'react'
import AdminHeader from '../../components/Admin/Layout/AdminHeader'
import AdminSidebar from '../../components/Admin/Layout/AdminSidebar'
import AllSeller from '../../components/Admin/AllSeller'


const AllSellerPage = () => {
    const [active,setActive] = useState(2);
  return (
    <div >
        <AdminHeader/>
        <div className="flex justify-center w-full">
        <div className="w-[300px] h-[90vh] bg-white shadow-md flex ">
            <AdminSidebar active={active} setActive={setActive}/>
        </div>
        <div className="flex w-full">
            <AllSeller/>
        </div>
        </div> 
    </div>
  )
}

export default AllSellerPage