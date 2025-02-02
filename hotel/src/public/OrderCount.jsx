import { useEffect, useState } from 'react';
import axios from 'axios';

const UserHistory = () => {
  const [userHistory, setUserHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserHistory = async () => {
      const userData = JSON.parse(localStorage.getItem('user'));
      if (userData && userData.email) {
        try {
          const response = await axios.get(`http://localhost:5000/api/userhistory/${userData.email}`);
          setUserHistory(response.data);
        } catch (err) {
          setError('Failed to fetch user history');
          console.error(err);
        } finally {
          setLoading(false);
        }
      } else {
        setError('No user information found in localStorage');
        setLoading(false);
      }
    };

    fetchUserHistory();
  }, []);

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="flex items-center justify-center h-screen text-red-500">{error}</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold text-main-color mb-6">User Order History</h1>
      {userHistory.length > 0 ? (
        <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-6">
          <table className="table-auto w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-3 border">Order ID</th>
                <th className="p-3 border">Product</th>
                <th className="p-3 border">Price</th>
                <th className="p-3 border">Order Date</th>
              </tr>
            </thead>
            <tbody>
              {userHistory.map((order) => (
                <tr key={order._id} className="hover:bg-gray-100">
                  <td className="p-3 border">{order._id}</td>
                  <td className="p-3 border">{order.dish || 'N/A'}</td>
                  <td className="p-3 border">{order.price} Br</td>
                  <td className="p-3 border">{new Date(order.date).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-lg text-gray-600">No orders found.</p>
      )}
    </div>
  );
};

export default UserHistory;
