import React from 'react'
import { AiOutlineFolderAdd } from 'react-icons/ai'
import { FiPackage, FiShoppingBag } from 'react-icons/fi'
import { RxDashboard } from 'react-icons/rx'
import { Link } from 'react-router-dom'

const ShopSidebar = ({active, setActive}) => {
  return (
      <div className='w-full flex flex-col gap-[4rem] ml-5 '>
        <div className="flex  cursor-pointer pt-12 gap-2" onClick={()=>setActive(1)}>
          <Link className='flex gap-2' to='/dashboard' >
          <div>
            <RxDashboard
                size={30}
                className={`${active === 1 ? "text-red-500" : 'text-black'}`}
            />
            </div>
            <div className="">
                <h5 className={`${active === 1 ? "text-red-500" : 'text-black'} text-[1.3rem]`}>Dashboard</h5>
            </div>
          </Link>
        </div>
        <div className="flex cursor-pointer items-center  gap-2" onClick={()=>setActive(2)}>
           <Link className='flex gap-2' to='/dashboard-products'>
           <div>
            <FiPackage
                size={30}
                className={`${active === 2 ? "text-red-500" : 'text-black'}`}
            />
            </div>
            <div className="">
                <h5 className={`${active === 2 ? "text-red-500" : 'text-black'} text-[1.3rem]`}>All Products</h5>
            </div>
           </Link>
        </div>
        <div className="flex cursor-pointer   gap-2" onClick={()=>setActive(3)}>
           <Link className='flex gap-2' to='/dashboard-orders'>
           <div>
            <FiShoppingBag
                size={30}
                className={`${active === 3 ? "text-red-500" : 'text-black'}`}
            />
            </div>
            <div className="">
                <h5 className={`${active === 3 ? "text-red-500" : 'text-black'} text-[1.3rem]`}>All Oders</h5>
            </div>
           </Link>
        </div>
        <div className="flex cursor-pointer   gap-2" onClick={()=>setActive(4)}>
           <Link className='flex gap-2' to='/dashboard-create-product'>
           <div>
            <AiOutlineFolderAdd
                size={30}
                className={`${active === 4 ? "text-red-500" : 'text-black'}`}
            />
            </div>
            <div className="">
                <h5 className={`${active === 4 ? "text-red-500" : 'text-black'} text-[1.3rem]`}>Create Products</h5>
            </div>
           </Link>
        </div>
        <div className="flex cursor-pointer   gap-2" onClick={()=>setActive(6)}>
          <Link className='flex gap-2' to='/dashboard-messages' >
          <div>
            <FiShoppingBag
                size={30}
                className={`${active === 6 ? "text-red-500" : 'text-black'}`}
            />
            </div>
            <div className="">
                <h5 className={`${active === 6 ? "text-red-500" : 'text-black'} text-[1.3rem]`}>Inbox</h5>
            </div>
          </Link>
        </div>
      </div>
  )
}

export default ShopSidebar