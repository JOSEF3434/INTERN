//import React from 'react'
import UserMainPage from './UserMainPage'
import UserSideBar from './UserSideBar'


const UserDashbord = () => {
  return (
    <>
    <div className="flex">
    <UserSideBar/>
    <UserMainPage/>
    </div>
    </>
  )
}

export default UserDashbord