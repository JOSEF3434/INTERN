import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { UserContext } from "../App";

function SideBar() {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false); // State for toggle menu

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
    toast.success("Logged out successfully!", {
      position: "top-right",
      autoClose: 5000,
    });
    navigate("/login");
  };

  return (
    <div>
      {/* Toggle Button for Small Screens */}
      <div className="md:hidden p-4 bg-gray-800 text-white">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-white text-2xl focus:outline-none"
        >
          ☰
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`${
          isOpen ? "block" : "hidden"
        } md:block w-64 bg-gray-800 h-screen text-white flex flex-col`}
      >
        <div className="p-4 text-center bg-gray-700">
          <h2 className="text-4xl">Admin Panel</h2>
        </div>
        <ul className="mt-1">
          <li className="block p-4 hover:bg-gray-600">
            <Link to="/dashbord" className="text-xl hover:text-2xl">
              Dashboard
            </Link>
          </li>
          <li className="block p-4 hover:bg-gray-600">
            <Link to="/FoodA" className="text-xl hover:text-3xl">
              Food
            </Link>
          </li>
          <li className="block p-4 hover:bg-gray-600">
            <Link to="/drink" className="text-xl hover:text-3xl">
              Drink
            </Link>
          </li>
          <li className="block p-4 hover:bg-gray-600">
            <Link to="/room" className="text-xl hover:text-3xl">
              Room
            </Link>
          </li>
          <li className="block p-4 hover:bg-gray-600">
            <Link to="/DisplayMessages" className="text-xl hover:text-3xl">
              UserMess
            </Link>
          </li>
          <li className="block p-4 hover:bg-gray-600">
            <Link to="/addproducta" className="text-xl hover:text-2xl">
              Add Product
            </Link>
          </li>
          <li className="block p-4 hover:bg-gray-600">
            <Link to="/adduser" className="text-xl hover:text-2xl">
              Add User
            </Link>
          </li>
          <li className="block p-4 hover:bg-gray-600">
            <Link to="/userstable" className="text-xl hover:text-2xl">
              Display User
            </Link>
          </li>
          <li className="block bg-gray-800 p-4 hover:bg-gray-600">
            <Link to="/A_ChangePassword" className="text-xl hover:text-2xl">
              ChangePass
            </Link>
          </li>
          <li className="block bg-gray-800 p-4 hover:bg-gray-600">
            <Link to="/" className="text-xl hover:text-3xl" onClick={handleLogout}>
              Logout
            </Link>
          </li>
        </ul>
      </aside>
    </div>
  );
}

export default SideBar;
