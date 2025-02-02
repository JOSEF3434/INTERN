import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import SideBar from './SideBar';

const UsersTable = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
      fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
        const response = await fetch('http://localhost:5000/api/users');
        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }
        const data = await response.json();
        if (Array.isArray(data)) {
            setUsers(data);
        } else {
            console.error('Invalid response format:', data);
            toast.error('Invalid response format');
            setUsers([]);
        }
    } catch (error) {
        console.error('Error fetching users:', error.message);
        toast.error('Error fetching users');
    } finally {
        setLoading(false);
    }
};


  const handleToggleState = async (id, currentState) => {
      try {
          const response = await fetch(`http://localhost:5000/api/users/${id}`, {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ userState: currentState === 1 ? 0 : 1 }),
          });
          if (!response.ok) throw new Error('Failed to update user state');
          await fetchUsers();
          toast.success('User state updated successfully');
      } catch (error) {
          console.error('Error toggling user state:', error.message);
          toast.error(error.message);
      }
  };

  const handleDeleteUser = async (id) => {
      if (!window.confirm('Are you sure you want to delete this user?')) return;
      try {
          const response = await fetch(`http://localhost:5000/api/users/${id}`, {
              method: 'DELETE',
          });
          if (!response.ok) throw new Error('Failed to delete user');
          await fetchUsers();
          toast.success('User deleted successfully');
      } catch (error) {
          console.error('Error deleting user:', error.message);
          toast.error(error.message);
      }
  };

  return (
    <div className='grid md:grid-cols-4'>
        <SideBar/>
        <div className='container mx-auto p-5 col-span-3'>
        <div className="container mx-auto p-4 ">
          <h1 className="text-2xl font-bold mb-4">User Management</h1>
          {loading ? (
              <p>Loading...</p>
          ) : (
              <table className="table-auto w-full border-collapse border border-gray-200">
                  <thead>
                      <tr className="bg-gray-100">
                          <th className="border border-gray-200 px-4 py-2">Name</th>
                          <th className="border border-gray-200 px-4 py-2">Email</th>
                          <th className="border border-gray-200 px-4 py-2">User Type</th>
                          <th className="border border-gray-200 px-4 py-2">State</th>
                          <th className="border border-gray-200 px-4 py-2">Actions</th>
                      </tr>
                  </thead>
                  <tbody>
                      {users.length > 0 ? (
                          users.map((user) => (
                              <tr key={user._id}>
                                  <td className="border border-gray-200 px-4 py-2">{user.name}</td>
                                  <td className="border border-gray-200 px-4 py-2">{user.email}</td>
                                  <td className="border border-gray-200 px-4 py-2">{user.userType}</td>
                                  <td className="border border-gray-200 px-4 py-2">
                                      {user.userState === 1 ? 'Active' : 'Deactive'}
                                  </td>
                                  <td className="border border-gray-200 px-4 py-2">
                                      <button
                                          onClick={() => handleToggleState(user._id, user.userState)}
                                          className={`px-2 py-1 rounded ${
                                              user.userState === 1
                                                  ? 'bg-red-500 text-white'
                                                  : 'bg-green-500 text-white'
                                          }`}
                                      >
                                          {user.userState === 1 ? 'Deactivate' : 'Activate'}
                                      </button>
                                      <button
                                          onClick={() => handleDeleteUser(user._id)}
                                          className="ml-2 px-2 py-1 bg-gray-500 text-white rounded"
                                      >
                                          Delete
                                      </button>
                                  </td>
                              </tr>
                          ))
                      ) : (
                          <tr>
                              <td colSpan="5" className="text-center p-4">
                                  No users found.
                              </td>
                          </tr>
                      )}
                  </tbody>
              </table>
          )}
        </div>
        </div>
    </div>
  );
};


export default UsersTable;
