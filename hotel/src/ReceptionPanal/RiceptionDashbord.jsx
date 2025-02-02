//import React from 'react'
import RiceptionMainPage from './RiceptionMainPage'
import RiceptionSideBar from './RiceptionSideBar'


const RiceptionDashbord = () => {
  return (
    <>
    <div className="flex">
    <RiceptionSideBar/>
    <RiceptionMainPage/>
    </div>
    </>
  )
}

export default RiceptionDashbord