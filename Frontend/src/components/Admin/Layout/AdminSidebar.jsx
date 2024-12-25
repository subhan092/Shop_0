import React from 'react'
import { AiOutlineFolderAdd } from 'react-icons/ai'
import { FiPackage, FiShoppingBag } from 'react-icons/fi'
import { RxDashboard } from 'react-icons/rx'
import { AiOutlineMessage } from "react-icons/ai";
import { PiUsers } from "react-icons/pi";
import { PiGitPullRequest } from "react-icons/pi";



import { Link } from 'react-router-dom'

const AdminSidebar = ({active, setActive}) => {
  return (
      <div className='w-full flex flex-col gap-[4rem] ml-5 '>
        <div className="flex  cursor-pointer pt-12 gap-2" onClick={()=>setActive(1)}>
          <Link className='flex gap-2' to='/admin-dashboard' >
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
           <Link className='flex gap-2' to='/all-sellers'>
           <div>
            <PiUsers
                size={30}
                className={`${active === 2 ? "text-red-500" : 'text-black'}`}
            />
            </div>
            <div className="">
                <h5 className={`${active === 2 ? "text-red-500" : 'text-black'} text-[1.3rem]`}>Sellers</h5>
            </div>
           </Link>
        </div>
        <div className="flex cursor-pointer   gap-2" onClick={()=>setActive(3)}>
           <Link className='flex gap-2' to='/seller-request'>
           <div>
            <PiGitPullRequest
                size={30}
                className={`${active === 3 ? "text-red-500" : 'text-black'}`}
            />
            </div>
            <div className="">
                <h5 className={`${active === 3 ? "text-red-500" : 'text-black'} text-[1.3rem]`}>Seller request</h5>
            </div>
           </Link>
        </div>
        <div className="flex cursor-pointer   gap-2" onClick={()=>setActive(4)}>
           <Link className='flex gap-2' to='/admin/all-products'>
           <div>
            <FiPackage
                size={30}
                className={`${active === 4 ? "text-red-500" : 'text-black'}`}
            />
            </div>
            <div className="">
                <h5 className={`${active === 4 ? "text-red-500" : 'text-black'} text-[1.3rem]`}>All Products</h5>
            </div>
           </Link>
        </div>
        <div className="flex cursor-pointer   gap-2" onClick={()=>setActive(6)}>
          <Link className='flex gap-2' to='/seller-messages' >
          <div>
            <AiOutlineMessage
                size={30}
                className={`${active === 6 ? "text-red-500" : 'text-black'}`}
            />
            </div>
            <div className="">
                <h5 className={`${active === 6 ? "text-red-500" : 'text-black'} text-[1.3rem]`}>Seller Inbox</h5>
            </div>
          </Link>
        </div>
      </div>
  )
}

export default AdminSidebar