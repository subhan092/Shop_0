import React from 'react'
import AdminHeader from '../../components/Admin/Layout/AdminHeader'
import ProductList from '../../components/Admin/ProductList'

const AdminProductList = () => {
  return (
    <div>
        <AdminHeader/>
        <div className="flex justify-center w-full">
        <div className="flex w-full">
            <ProductList/>
        </div>
        </div> 
    </div>
  )
}

export default AdminProductList