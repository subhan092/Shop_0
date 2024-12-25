import React, { useState } from 'react'
import ShopSidebar from '../../components/Shop/Layout/ShopSidebar';
import DashboardHeader from '../../components/Shop/Layout/DashboardHeader';
import AllOrders from '../AllOrders';

const ShopAlloOders = () => {
    const [active,setActive] = useState(3);
  return (
    <div>
       <DashboardHeader/>
       <div className="flex justify-between  w-full">
        <div className="w-[300px] h-[90vh] bg-white shadow-md flex ">
            <ShopSidebar active={active} setActive={setActive}/>
        </div>
        <div className="flex   w-full">
            <AllOrders/>
        </div>
        </div>
    </div>
  )
}

export default ShopAlloOders
