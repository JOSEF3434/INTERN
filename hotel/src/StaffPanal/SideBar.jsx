//import React from 'react'
import { Link } from "react-router-dom";

function SideBar() { 
  return (
    <div> 
      <aside className="w-64 bg-gray-800 h-screen text-white flex flex-col">
        <div className="p-4 text-center bg-gray-700 ">
          <h2 className="text-4xl text-center py-5">Admin Panel</h2>
        </div>
        <ul className=" mt-7">
              <li className="block p-4 hover:bg-gray-600">
                <Link to="/dashbord" className="text-xl text-center hover:text-2xl"> Dashboard </Link>
              </li>
              <li className="block p-4 hover:bg-gray-600 text-xl hover:text-3xl">
                <Link to="/FoodA">Food</Link>
              </li>
              <li className="block p-4 hover:bg-gray-600 text-xl hover:text-3xl">
                <Link to="/drink">Drink</Link>
              </li>
              <li className="block p-4 hover:bg-gray-600 text-xl hover:text-3xl">
                <Link to="/room">Room</Link>
              </li>
              <li className="block p-4 hover:bg-gray-600 text-xl hover:text-2xl">
                <Link to="/addproducta">Add Product</Link>
              </li>
              <li className="block p-4 hover:bg-gray-600 text-xl hover:text-3xl">
                <Link to="/">Logout</Link>
              </li>
        </ul>
      </aside>
    </div>
  )
}

export default SideBar