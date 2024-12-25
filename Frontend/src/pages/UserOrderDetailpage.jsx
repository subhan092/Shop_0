    import React from 'react'
import Header from '../components/Layout/Header'
import Footer from '../components/Layout/Footer'
import OrderDetails from '../components/OrderDetails'
    
    const UserOrderDetailpage = () => {
      return (
        <div>
           <Header/>
           <OrderDetails/>
           <Footer/>
        </div>
      )
    }
    
    export default UserOrderDetailpage