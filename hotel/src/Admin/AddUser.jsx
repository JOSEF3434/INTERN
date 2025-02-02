import { useState } from 'react';
//import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import SideBar from './SideBar';

const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [userType, setUserType] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');

    //const navigate = useNavigate();

    const clearFormFields = () => {
        setName('');
        setEmail('');
        setUserType('');
        setPassword('');
        setShowPassword(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            setError('Invalid email format');
            return;
        }

        const userData = { name, email, userType, password };

        try {
            if (password.length < 5) {
                setError('Password must be at least 5 characters long.');
                return;
            }
            const response = await fetch('http://localhost:5000/api/users/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData),
            });
           
            if (!response.ok) {
                const errorData = await response.json();
                setError(errorData.error);
                return;
            }

            toast.success("Account created successfully!", { position: "top-right", autoClose: 5000 });
            clearFormFields();
        } catch (error) {
            setError('Error: ' + error.message);
        }
    };

    return (
        <>
          <div className='grid md:grid-cols-4'>
            <SideBar />
            <div className="container mx-auto p-5 col-span-3">
                <div className="wrapper max-w-md p-4 mx-auto bg-white shadow-lg rounded-lg">
                    <div className="title text-xl p-5 rounded-lg font-bold mb-4 bg-blue-500 text-white">
                        <span>Add User</span>
                    </div>

                    {error && <div className="text-red-500 mb-4">{error}</div>}

                    <form onSubmit={handleSubmit}>
                        <div className="mb-4 flex">
                            <input
                                type="text"
                                placeholder="First Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                className="border border-gray-300 rounded-r-lg p-2 w-full"
                            />
                        </div>
                        <div className="mb-4 flex">
                            <input
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="border border-gray-300 rounded-r-lg p-2 w-full"
                            />
                        </div>
                        <div className="mb-4 flex">
                            <select
                                value={userType}
                                onChange={(e) => setUserType(e.target.value)}
                                required
                                className="border border-gray-300 rounded-r-lg p-2 w-full"
                            >
                                <option value="">User Type</option>
                                <option value="user">User </option>
                                <option value="admin">Admin</option>
                                <option value="staff">staff</option>
                            </select>
                        </div>
                        <div className="mb-4 relative flex">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="border border-gray-300 rounded-r-lg p-2 w-full"
                            />
                            <button
                                 type="button"
                                 onClick={() => setShowPassword(!showPassword)}
                                 className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
                             >
                                 {showPassword ? (
                                     <i className="fas fa-eye-slash"></i>
                                 ) : (
                                     <i className="fas fa-eye"></i>
                                 )}
                             </button>
 
                        </div>
                        <div className="mb-4">
                            <input
                                type="submit"
                                value="SAVE"
                                className="bg-blue-500 text-white font-semibold py-2 rounded-lg w-full hover:bg-blue-600 transition"
                            />
                        </div>
                    </form>
                </div>
            </div>
          </div>
        </>
    );
};

export default Signup;
