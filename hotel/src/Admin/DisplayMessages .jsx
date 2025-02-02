import { useEffect, useState } from 'react';
import axios from 'axios';
import SideBar from './SideBar';

const DisplayMessages = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/messages');
        setMessages(response.data);
      } catch (error) {
        console.error('Error fetching messages:', error.message);
      }
    };

    fetchMessages();
  }, []);

  // Handle deleting a message from the front-end
  const handleDeleteMessage = (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this message?');
    if (confirmDelete) {
      setMessages((prevMessages) => prevMessages.filter((message) => message._id !== id));
    }
  };


  return (
    <div className="grid md:grid-cols-4">
      <SideBar />
      <div className="container mx-auto p-5 col-span-3">
        <div className="max-w-3xl mx-auto mt-10">
          <h2 className="text-2xl font-bold mb-4">Messages</h2>
          <ul className="space-y-4">
            {messages.map((message) => (
              <li key={message._id} className="p-4 border rounded shadow">
                <h3 className="text-lg font-semibold">{message.name}</h3>
                <p>{message.email}</p>
                <p className="text-gray-600">{message.reason}</p>
                <p className="text-sm text-gray-400">
                  {new Date(message.createdAt).toLocaleString()}
                </p>
                <button
                  onClick={() => handleDeleteMessage(message._id)}
                  className="mt-2 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DisplayMessages;
