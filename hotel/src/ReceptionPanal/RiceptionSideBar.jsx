import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { UserContext } from "../App";

function RiceptionSideBar() {
  const { setUser } = useContext(UserContext);
  const [isOpen, setIsOpen] = useState(false); // State for toggle menu

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
    toast.success("Logged out successfully!", {
      position: "top-right",
      autoClose: 5000,
    });
    window.location.href = "/login";
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
          <h2 className="text-3xl py-2">Riception Panel</h2>
        </div>
        <ul className="mt-7">
          <li className="block p-4 hover:bg-gray-600">
            <Link to="/riceptiondashbord" className="text-xl hover:text-2xl">
              Dashboard
            </Link>
          </li>
          <li className="block p-4 hover:bg-gray-600">
            <Link to="/RProfile" className="text-xl hover:text-2xl">
              Profile
            </Link>
          </li>
          <li className="block p-4 hover:bg-gray-600">
            <Link to="/GustCheckOut" className="text-xl hover:text-2xl">
              Guest Checkout
            </Link>
          </li>
          <li className="block p-4 hover:bg-gray-600">
            <Link to="/ChangePassword" className="text-xl hover:text-2xl">
              ChangePass
            </Link>
          </li>
          <li className="block p-4 hover:bg-gray-600">
            <Link to="/" className="text-xl" onClick={handleLogout}>
              Logout
            </Link>
          </li>
        </ul>
      </aside>
    </div>
  );
}

export default RiceptionSideBar;
