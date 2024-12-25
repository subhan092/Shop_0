import React, { useState } from 'react'
import DashboardHeader from '../components/Shop/Layout/DashboardHeader'
import ShopSidebar from '../components/Shop/Layout/ShopSidebar'
import CreateProduct from '../components/Shop/CreateProduct'

const ShopCreateProduct = () => {
    const [active,setActive] = useState(4);

  return (
    <div >
       <DashboardHeader/>
       <div className="flex justify-between items-center w-full">
       <div className="w-[300px] h-[90vh] bg-white shadow-md flex ">
            <ShopSidebar active={active} setActive={setActive}/>
        </div>
        <div className="flex justify-center w-full ">
            <CreateProduct/>
        </div> 
      </div>    
         
    </div>
   
  )
}

export default ShopCreateProduct