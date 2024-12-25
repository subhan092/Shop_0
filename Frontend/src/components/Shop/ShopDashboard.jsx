import React, { useState } from 'react'
import DashboardHeader from './Layout/DashboardHeader.jsx'
import ShopSidebar from './Layout/ShopSidebar.jsx'

const ShopDashboard = () => {
    const [active,setActive] = useState("");
  return (
    <>
        <DashboardHeader/>
        <div className="w-[300px] h-[90vh] bg-white shadow-md flex ">
            <ShopSidebar active={active} setActive={setActive}/>
        </div>
    </>
)
}

export default ShopDashboard