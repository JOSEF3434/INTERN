import { useContext, useState } from 'react';
import axios from 'axios';
import { UserContext } from '../App';
import { toast } from 'react-toastify';
import UserSideBar from './UserSideBar';

const Assist = () => {
  const { user } = useContext(UserContext);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const handleSendMessage = async () => {
    if (!message) return;

    try {
      const email = localStorage.getItem('email');
      const response = await axios.post('http://localhost:5000/api/assist', {
        email,
        message,
      });
      setMessages([...messages, { sender: 'You', text: message }, { sender: 'Assistant', text: response.data.reply }]);
      setMessage('');
      console.log(user)
      toast.success('Message sent successfully!');
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Failed to send message.');
    }
  };

  return (
    <div className="grid md:grid-cols-4">
      <UserSideBar />
      <div className="col-span-3 p-4">
        <h2 className="text-2xl mb-4">Assistant Chat</h2>
        <div className="border p-4 h-96 overflow-y-scroll">
          {messages.map((msg, index) => (
            <div key={index} className={`mb-2 ${msg.sender === 'You' ? 'text-right' : 'text-left'}`}>
              <strong>{msg.sender}:</strong> {msg.text}
            </div>
          ))}
        </div>
        <div className="flex mt-4">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
            className="border p-2 flex-grow"
          />
          <button onClick={handleSendMessage} className="bg-blue-500 text-white p-2 ml-2">Send</button>
        </div>
      </div>
    </div>
  );
};

export default Assist;
