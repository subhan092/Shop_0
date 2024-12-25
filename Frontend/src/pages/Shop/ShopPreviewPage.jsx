import React from 'react'
import styles from '../../styles/styles'
import ShopInfo from '../../components/Shop/ShopInfo'
// import ShopProfileData from '../../components/Shop/ShopProfileData'
import ShopProductPreview from '../../components/Shop/ShopProductPreview'

const ShopPreviewPage = () => {
  return (
          <div className={`${styles.section}`}>
               <div className="w-full flex justify-between py-10 bg-[#f5f5f5]">
                <div className="w-[25%] h-[95vh] overflow-y-scroll sticky top-10 left-0 bg-white shadow-md rounded-md z-10 ">
                  <ShopInfo isOwner={false}/>
                </div>
                <div className="w-[72%] rounded ">
                   <ShopProductPreview isOwner={false}/>
                </div>
               </div>
          </div>
  )
}

export default ShopPreviewPage