import React, { useState } from 'react'
import Header from '../components/Layout/Header'
import Footer from '../components/Layout/Footer'
import styles from '../styles/styles'
import ProfileSidbar from '../components/Profile/ProfileSidbar'
import ProfileContent from '../components/Profile/ProfileContent'



const ProfilePage = () => {
    const [active , setActive] = useState(1);
  return (
    <>
    <Header/>
    <div className={`${styles.section} flex bg-[#f5f5f5] py-12`}>
        <div className="w-[368px]">
            <ProfileSidbar active={active}setActive={setActive} />
        </div>
        <ProfileContent active={active}/>
    </div>

    <Footer/>
    </>
  )
}

export default ProfilePage