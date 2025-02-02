import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { UserContext } from '../App';
import axios from "axios";

const Navbar = () => {
  const { user } = useContext(UserContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const [orderCount, setOrderCount] = useState(0);
  const [error, setError] = useState('');

  const toggleMenu = () => {
    if (window.matchMedia("(max-width: 768px)").matches) {
      setMenuOpen(!menuOpen);
    }
  };

  useEffect(() => {
    const fetchOrderCount = async () => {
      const loggedUser = JSON.parse(localStorage.getItem('user'));

      if (loggedUser && loggedUser.email) {
        try {
          const response = await axios.get(`http://localhost:5000/api/userHistory/count/${loggedUser.email}`);
          // Check if orders exist in the response
          if (response.data && response.data.count !== undefined) {
            setOrderCount(response.data.count); // Set the count directly
          } else {
            setOrderCount(0); // No orders found
          }
        } catch (error) {
          setError('Failed to fetch order count');
          console.error(error);
        }
      }
    };

    // Call the function only if the user is logged in
    if (user) {
      fetchOrderCount();
      console.log('Logged in user information on nav:', user);
    }
  }, [user]); // Removed email from dependencies

  return (
    <div className={`bg-gray-900 w-full grid cl ${menuOpen ? "h-52" : "h-20"} transition-height duration-300 ease-in-out`}>
       <div className="grid grid-cols-6 h-28 text-md text-white">
        <div className="text-yellow-600 md:pt-1 pt-8 md:ml-11 font-bold md:text-2xl">
          ህብር-ፀጋ
          <br />
          <span className="md:ml-5">HMS</span>
        </div>
        <div className="col-span-5 ">
          <button onClick={toggleMenu} className="md:hidden absolute top-5 right-5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-6 ml-72 cursor-pointer"
            >
              <path
                fillRule="evenodd"
                d="M3 6.75A.75.75 0 0 1 3.75 6h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 6.75ZM3 12a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 12Zm0 5.25a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          <ul
            className={`justify-between md:flex md:mx-9 md:items-center md:pt-5 md:text-xl  ${menuOpen ? "block" : "hidden"} md:block`}
          >
            <li className="hover:text-red-800 ml-44 md:ml-60">
              <Link to="/" className="flex">
                <svg xmlns="http://www.w3.org/2000/svg"
                  fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 mx-2 mt-1">
                  <path
                    strokeLinecap="round" strokeLinejoin="round"
                    d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                  />
                </svg> Home </Link>
            </li>
            <li className="text-md hover:text-red-800 mx-48 md:mx-0">
              <Link to="/about">ABOUT</Link>
            </li>
            <li className="text-md hover:text-red-800 mx-48 md:mx-0">
              <Link to="/contact">ContactUS</Link>
            </li>
            <li className="text-md hover:text-red-800 mx-48 md:mx-0">
              <Link to="/service">Service</Link>
            </li>
            {user ? (
              <>
                <li className="hover:text-red-800 hover:scale-150 mx-44 md:mx-0 w-10 text-sm">
                  <Link to="/history">
                    <div className="relative">
                      <img src="./src/public/imag/shoppingCart.png" alt="Cart" />
                      <span className={`absolute top-0 right-0 ${orderCount > 0 ? "bg-red-500" : "bg-gray-500"} text-white text-xs rounded-full px-1`}>
                        {orderCount > 0 ? orderCount : 0}
                      </span>
                    </div>
                  </Link>
                </li>

                <li className="text-md hover:text-red-800 mx-48 md:mx-0">
                  <Link to="/userdashbord">{user.name}</Link>
                </li>
              </>
            ) : (
              <>
                <li className="text-md hover:text-red-800 mx-48 md:mx-0">
                  <Link to="/login">Login</Link>
                </li>
                <li className="text-md hover:text-red-800 mx-48 md:mx-0">
                  <Link to="/signup">SignUp</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
