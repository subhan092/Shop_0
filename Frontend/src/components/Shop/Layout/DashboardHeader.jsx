import React from 'react'
import { CgProfile } from 'react-icons/cg'
import styles from '../../../styles/styles'
import { Link } from 'react-router-dom'
import { FiPackage } from 'react-icons/fi'
import { BiMessageSquareDetail } from 'react-icons/bi'
import { useSelector } from 'react-redux'
import { backend_url } from '../../../Url'

const DashboardHeader = () => {
  const { seller ,isSeller  } = useSelector((state) => state.seller);

  return (
       <div className="w-full flex z-[10rem] justify-between items-center shadow-md bg-white h-[70px] px-4 ">
        <div>
            <Link to='/dashboard'>
                <img src="https://shopo.quomodothemes.website/assets/images/logo.svg"
                 alt="logo" srcset="" />
            </Link>
        </div>
        <div className={`${styles.noramlFlex}`}>
                  <div className="">
                    <Link to='/dashboard-orders'>
                        <FiPackage  size={30}
                        color='555'
                        className='mx-5 cursor-pointer'
                        />
                    </Link>
                  </div>
                  <div className="">
                    <Link to='/dashboard-orders'>
                        <BiMessageSquareDetail  size={30}
                        color='555'
                        className='mx-5 cursor-pointer'
                        />
                    </Link>
                  </div>
              <div className="relative cursor-pointer mx-[15px]">
              {isSeller || seller ? (<Link to={`/shop/${seller._id}`}>
                    <img src={`${backend_url}public/shop/${seller && seller.avatar}`} alt="shop-image" 
                      className='w-[40px] h-[38px] rounded-full'
                    />
                  </Link> ): 
                  <Link to={'/shop-login'}>
                    <CgProfile size={34} color="rgb(0 0 0 / 70%)" />
                  </Link>
                  }
                  
              </div>
            </div>
       </div>
)
}

export default DashboardHeader