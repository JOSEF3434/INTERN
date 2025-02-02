import { useState, useEffect } from 'react';

const CommentSlider = () => {
    const [messages, setMessages] = useState([]);
    const [currentMessage, setCurrentMessage] = useState(0);

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/contact/messages');
                const data = await response.json();
                setMessages(data);
            } catch (error) {
                console.error('Error fetching messages:', error);
            }
        };

        fetchMessages();
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentMessage((prevMessage) =>
                prevMessage < messages.length - 1 ? prevMessage + 1 : 0
            );
        }, 5000); // Change slide every 5 seconds

        return () => clearInterval(interval); // Cleanup interval on component unmount
    }, [messages.length]);

    const updateMessage = (direction) => {
        if (direction === 'left') {
            setCurrentMessage((prevMessage) =>
                prevMessage > 0 ? prevMessage - 1 : messages.length - 1
            );
        } else {
            setCurrentMessage((prevMessage) =>
                prevMessage < messages.length - 1 ? prevMessage + 1 : 0
            );
        }
    };

    return (
        <section className="text-center py-12">
            <h2 className="text-3xl mb-8 font-montserrat">Messages from Users</h2>
            <div className="relative max-w-2xl mx-auto overflow-hidden bg-white p-5 rounded-lg shadow-lg h-36 flex items-center">
                <button 
                    onClick={() => updateMessage('left')} 
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-60 text-white p-3 rounded-full hover:bg-opacity-80 transition duration-300"
                    aria-label="Previous Message"
                >
                    &#10094;
                </button>
                <div
                    className="flex max-sm:pr-5 transition-transform duration-500"
                    style={{ transform: `translateX(-${currentMessage * 100}%)` }}
                >
                    {messages.map((message, index) => (
                        <div
                            key={index}
                            className="min-w-full flex flex-col justify-center items-center  text-center"
                        >
                            <p className="text-lg mb-2 text-gray-800">{message.message}</p>
                            <h4 className="text-md text-gray-600 font-bold">{`- ${message.name}`}</h4>
                        </div>
                    ))}
                </div>
                <button 
                    onClick={() => updateMessage('right')} 
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-60 text-white p-3 rounded-full hover:bg-opacity-80 transition duration-300"
                    aria-label="Next Message"
                >
                    &#10095;
                </button>
            </div>
        </section>
    );
};

export default CommentSlider;
