import React, { useState } from 'react'
import AdminSidebar from './Layout/AdminSidebar';
import AdminHeader from './Layout/AdminHeader';

const AdminDashboard = () => {
    const [active,setActive] = useState(1);

  return (
    <div>
        <AdminHeader/>
        <div className="w-[300px] h-[90vh] bg-white shadow-md flex ">
            <AdminSidebar active={active} setActive={setActive}/>
        </div>
    </div>
  )
}

export default AdminDashboard
