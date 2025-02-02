import { Link, useNavigate } from "react-router-dom"; // Import useNavigate for redirection
import { toast } from "react-toastify";
import { useContext, useState } from "react";
import { UserContext } from '../App'; // Import your UserContext

function UserSideBar() {
  const { setUser } = useContext(UserContext); // Get setUser from context
  const navigate = useNavigate(); // Hook for navigation
  const [menuOpen, setMenuOpen] = useState(false); // State to control menu visibility

  const handleLogout = () => {
    // Clear the user context and localStorage
    setUser(null);
    localStorage.removeItem('user');
    toast.success("Logged out successfully!", {
      position: "top-right",
      autoClose: 5000,
    });
    navigate('/login'); // Redirect to the login page
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen); // Toggle menu visibility
  };

  return (
    <div>
      <div className="md:hidden flex justify-between items-center p-4 bg-gray-800">
        <button onClick={toggleMenu} className="text-white">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 6.75A.75.75 0 0 1 3.75 6h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 6.75ZM3 12a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 12Zm0 5.25a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Z"/>
          </svg>
        </button>
      </div>

      {/* Sidebar for mobile view */}
      <div className={`md:hidden bg-gray-800 text-white transition-transform ${menuOpen ? "transform translate-x-0" : "transform -translate-x-full"} fixed top-0 left-0 w-64 h-full z-50`}>
        <div className="p-4 text-center bg-gray-700">
          <h2 className="text-4xl py-2">User Panel</h2>
        </div>
        <ul className="mt-4">
          <li className="block p-4 hover:bg-gray-600">
            <Link to="/userdashbord" className="text-xl text-center">Dashboard</Link>
          </li>
          <li className="block p-4 hover:bg-gray-600 text-xl">
            <Link to="/DisplayUser" className="text-xl">Profile</Link>
          </li>
          <li className="block p-4 hover:bg-gray-600 text-xl">
            <Link to="/history" className="text-xl">History</Link>
          </li>
          <li className="block p-4 hover:bg-gray-600 text-xl">
            <Link to="/deposit" className="text-xl">Deposit</Link>
          </li>
          <li className="block p-4 hover:bg-gray-600 text-xl">
            <Link to="/assist" className="text-xl">Assist</Link>
          </li>
          <li className="block p-4 hover:bg-gray-600 text-xl">
            <Link to="/ChangePassword" className="text-xl">ChangePass</Link>
          </li>
          <li className="block p-4 hover:bg-gray-600 text-xl">
            <Link to="/" className="text-xl" onClick={handleLogout}>Logout</Link>
          </li>
        </ul>
      </div>

      {/* Sidebar for larger screens */}
      <aside className="hidden md:block w-64 bg-gray-800 md:h-screen text-white flex flex-col">
        <div className="p-4 text-center bg-gray-700">
          <h2 className="text-4xl py-2">User Panel</h2>
        </div>
        <ul className="mt-4">
          <li className="block p-4 hover:bg-gray-600">
            <Link to="/userdashbord" className="text-xl text-center">Dashboard</Link>
          </li>
          <li className="block p-4 hover:bg-gray-600 text-xl">
            <Link to="/DisplayUser" className="text-xl">Profile</Link>
          </li>
          <li className="block p-4 hover:bg-gray-600 text-xl">
            <Link to="/history" className="text-xl">History</Link>
          </li>
          <li className="block p-4 hover:bg-gray-600 text-xl">
            <Link to="/deposit" className="text-xl">Deposit</Link>
          </li>
          <li className="block p-4 hover:bg-gray-600 text-xl">
            <Link to="/assist" className="text-xl">Assist</Link>
          </li>
          <li className="block p-4 hover:bg-gray-600 text-xl">
            <Link to="/ChangePassword" className="text-xl">ChangePass</Link>
          </li>
          <li className="block p-4 hover:bg-gray-600 text-xl">
            <Link to="/" className="text-xl" onClick={handleLogout}>Logout</Link>
          </li>
        </ul>
      </aside>
    </div>
  );
}

export default UserSideBar;
