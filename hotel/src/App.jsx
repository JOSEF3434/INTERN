import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { createContext, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Import components and pages
import About from './pages/About';
import HomePage from './pages/HomePage';
import Login from './pages/Login'; 
import Contact from './pages/Contact';
import Service from './pages/Service';
import Signup from './pages/Signup';
import Dashbord from './Admin/Dashbord';
import AddProduct from './Admin/AddProductA';
import Drink from './Admin/Drink';
import Food from './Admin/FoodA';
import Room from './Admin/Room';
import Deposit from './UserPanal/Deposit';
import UserDashbord from './UserPanal/UserDashbord';
import Nave from './public/Nave';
import Dish from './service/Dish';
import Assist from './UserPanal/Assist';
import SAssist from './ReceptionPanal/SAssist';
import OrderCount from './public/OrderCount';
import RiceptionDashbord from './ReceptionPanal/RiceptionDashbord';
import OrderdFood from './ReceptionPanal/OrderdFood';
import GustCheckOut from './ReceptionPanal/GustCheckOut';
import DisplayUser from './UserPanal/DisplayUser';
import History from './UserPanal/History';
import AddUser from './Admin/AddUser';
import UsersTable from './Admin/UsersTable ';
import RProfile from './ReceptionPanal/RProfile';
import ChangePassword from './UserPanal/ChengePass';
import A_ChangePassword from './Admin/A_ChangePassword';
import DisplayMessages from './Admin/DisplayMessages ';
import AddMessage from './UserPanal/contactAdmin';

export const UserContext = createContext(null);

const App = () => {   
  // Initialize the user state with data from localStorage (if available)
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  return (
    <>
      <ToastContainer />
      <UserContext.Provider value={{ user, setUser }}>
        <Router>
          <Nave />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/fooda" element={<Food />} />
            <Route path="/gustcheckout" element={<GustCheckOut />} />
            <Route path="/orderdfood" element={<OrderdFood />} /> 
            <Route path="/room" element={<Room />} />
            <Route path="/ContactAdmin" element={<AddMessage />} />
            <Route path="/A_ChangePassword" element={<A_ChangePassword />} />
            <Route path="/ChangePassword" element={<ChangePassword />} />
            <Route path="/RProfile" element={<RProfile />} />
            <Route path="/ordercount" element={<OrderCount />} />
            <Route path="/displayuser" element={<DisplayUser />} />
            <Route path="/history" element={<History />} />
            <Route path="/drink" element={<Drink />} />
            <Route path="/adduser" element={<AddUser />} /> 
            <Route path="/about" element={<About />} /> 
            <Route path="/signup" element={<Signup />} /> 
            <Route path="/contact" element={<Contact />} /> 
            <Route path="/service" element={<Service />} /> 
            <Route path="/deposit" element={<Deposit />} /> 
            <Route path="/dish" element={<Dish />} />
            <Route path="/assist" element={<Assist />} /> 
            <Route path="/sassist" element={<SAssist />} /> 
            <Route path="/userstable" element={<UsersTable />} />
            <Route path="/dashbord" element={<Dashbord />} /> 
            <Route path="/riceptiondashbord" element={<RiceptionDashbord />} /> 
            <Route path="/userdashbord" element={<UserDashbord />} /> 
            <Route path="/addproducta" element={<AddProduct />} /> 
            <Route path="/DisplayMessages" element={<DisplayMessages />} />
          </Routes> 
        </Router>
      </UserContext.Provider> 
    </>
  );
};


export default App;
