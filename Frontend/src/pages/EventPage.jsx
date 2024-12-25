import React from 'react'
import Header from '../components/Layout/Header'
import Events from '../components/Events/Events'
import Footer from '../components/Layout/Footer'

const EventPage = () => {
  return (
    <>
        <Header activeHeading={4}/>
        <Events/>
        <Events/>

     <Footer/>
    </>
  )
}

export default EventPage