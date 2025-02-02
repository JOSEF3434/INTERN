import { useEffect, useState } from 'react';
import axios from 'axios';
import RiceptionSideBar from './RiceptionSideBar';

const GuestCheckOut = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [userOrders, setUserOrders] = useState([]);

  useEffect(() => {
    const fetchUserHistories = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/userHistory');
        setUsers(response.data);
        setFilteredUsers(response.data); // Initialize filtered users
      } catch (error) {
        console.error('Error fetching user histories:', error);
      }
    };

    fetchUserHistories();
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
    const filtered = users.filter((user) =>
      user.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredUsers(filtered);
  };

  const handleGuestCheckout = async (email) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/userHistory/${email}`);
      if (response.data && response.data.orders) {
        setSelectedUser({
          email,
          name: response.data.name || 'Guest',
        });
        setUserOrders(response.data.orders);
      } else {
        console.error('No orders found for the user.');
      }
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };

  const handlePrint = () => {
    const printContent = `Name: ${selectedUser.name}\nEmail: ${selectedUser.email}\n\n` +
      userOrders
        .map((order) => `Dish: ${order.dish}, Price: ${order.price} ETB`)
        .join('\n');
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`<pre>${printContent}</pre>`);
    printWindow.document.close();
    printWindow.print();
  };

  const handleDeleteUser = async (email) => {
    try {
      await axios.delete(`http://localhost:5000/api/userHistory/${email}`);
      setUsers(users.filter((user) => user.email !== email));
      setFilteredUsers(filteredUsers.filter((user) => user.email !== email));
      setSelectedUser(null);
      setUserOrders([]);
    } catch (error) {
      console.error('Error deleting user data:', error);
    }
  };

  return (
    <div className="grid md:grid-cols-4">
      <RiceptionSideBar />

      <div className="container mx-auto p-5 col-span-3">
        <h1 className="text-3xl font-bold mb-4">Guest List</h1>
        <div className="mb-6">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search by name..."
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">Name</th>
              <th className="py-3 px-6 text-left">Email</th>
              <th className="py-3 px-6 text-left">Total Price (ETB)</th>
              <th className="py-3 px-6 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {filteredUsers.map((user, index) => (
              <tr key={index} className="border-b border-gray-200 hover:bg-gray-100">
                <td className="py-3 px-6">{user.name}</td>
                <td className="py-3 px-6">{user.email}</td>
                <td className="py-3 px-6">
                  {user.orders
                    ? user.orders.reduce((sum, order) => sum + order.price, 0).toFixed(2)
                    : '0.00'}{' '}
                  ETB
                </td>
                <td className="py-3 px-6">
                  <button
                    onClick={() => handleGuestCheckout(user.email)}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  >
                    Guest Checkout
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {selectedUser && (
          <div className="mt-8 bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">Guest Details</h2>
            <p className="text-gray-600">
              <strong>Name:</strong> {selectedUser.name}
            </p>
            <p className="text-gray-600">
              <strong>Email:</strong> {selectedUser.email}
            </p>
            <h3 className="text-lg font-bold mt-4 mb-2">Ordered Items</h3>
            <table className="min-w-full bg-gray-100 border border-gray-200">
              <thead>
                <tr className="bg-gray-300 text-gray-600 uppercase text-sm leading-normal">
                  <th className="py-3 px-6 text-left">Dish</th>
                  <th className="py-3 px-6 text-left">Price (ETB)</th>
                </tr>
              </thead>
              <tbody>
                {userOrders.map((order, index) => (
                  <tr key={index} className="border-b border-gray-200 hover:bg-gray-100">
                    <td className="py-3 px-6">{order.dish || 'N/A'}</td>
                    <td className="py-3 px-6">{order.price.toFixed(2)} ETB</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="mt-6 flex space-x-4">
              <button
                onClick={handlePrint}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                Print
              </button>
              <button
                onClick={() => handleDeleteUser(selectedUser.email)}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GuestCheckOut;
