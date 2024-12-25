import React, { useState } from 'react'
import DashboardHeader from '../../components/Shop/Layout/DashboardHeader'
import ShopSidebar from '../../components/Shop/Layout/ShopSidebar'
import AllProducts from '../../components/Shop/AllProducts'

const ShopProductsPage = () => {
  const [active,setActive] = useState(2);
  return (
   <div>
       <DashboardHeader/>
       <div className="flex justify-between  w-full">
       <div className="w-[300px] h-[90vh] bg-white shadow-md flex ">
            <ShopSidebar active={active} setActive={setActive}/>
        </div>
        <div className="flex  w-full ">
            <AllProducts/>
        </div>
      </div>    
         
    </div>
   
  )
}

export default ShopProductsPage