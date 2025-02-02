//import React from 'react'

import AddProductForm from "./AddProductForm"
import SideBar from "./SideBar"

const AddProductA = () => {
  return (
    <div className='grid md:grid-cols-4'>
      <SideBar />
      <AddProductForm className= ""/>
    </div>
  )
}

export default AddProductA