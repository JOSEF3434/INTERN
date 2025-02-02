import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const GuestDetailsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { email, name, orders } = location.state || {}; // Get data passed via state

  const handlePrint = () => {
    window.print();
  };

  const handleDeleteUser = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/userHistory/${email}`);
      alert('User data deleted successfully!');
      navigate('/'); // Redirect back to the main page
    } catch (error) {
      console.error('Error deleting user data:', error);
    }
  };

  return (
    <div className="container mx-auto p-5">
      <h1 className="text-3xl font-bold mb-4">Guest Details</h1>
      <p><strong>Name:</strong> {name}</p>
      <p><strong>Email:</strong> {email}</p>
      <h2 className="text-xl font-bold mt-4 mb-2">Ordered Items</h2>
      <table className="min-w-full bg-gray-100 border border-gray-200">
        <thead>
          <tr className="bg-gray-300 text-gray-600 uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-left">Item</th>
            <th className="py-3 px-6 text-left">Price</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr key={index} className="border-b border-gray-200 hover:bg-gray-100">
              <td className="py-3 px-6">{order.dish || 'N/A'}</td>
              <td className="py-3 px-6">${order.price.toFixed(2)}</td>
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
          onClick={handleDeleteUser}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Delete User Data
        </button>
      </div>
    </div>
  );
};

export default GuestDetailsPage;
