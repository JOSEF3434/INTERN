import { useState } from 'react';
import { useParams } from 'react-router-dom';
import Nave from '../public/Nave';
import Sfooter from '../public/Sfooter';

const ResetPassword = () => {
    const { token } = useParams();
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleResetPassword = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`http://localhost:5000/api/auth/reset-password/${token}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ password }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to reset password');
            }

            setSuccess('Password has been reset successfully!');
            setError('');
        } catch (error) {
            setError('Error: ' + error.message);
        }
    };

    return (
        <>
            <Nave />
            <div className="pt-5 bg-gray-300">
                <div className="bg-black md:mx-96 max-sm:my-32 max-sm:p-10 rounded-3xl shadow-lg max-w-md w-full p-4 md:p-10">
                    <h1 className="text-white text-2xl mb-2">Reset Password</h1>
                    {error && <div className="text-red-500 mb-4">{error}</div>}
                    {success && <div className="text-green-500 mb-4">{success}</div>}
                    <form onSubmit={handleResetPassword}>
                        <input
                            type="password"
                            placeholder="New Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="bg-gray-800 text-white border-none rounded-lg p-3 mb-4 w-full"
                        />
                        <button
                            type="submit"
                            className="bg-yellow-500 text-black font-semibold py-2 px-6 rounded-lg uppercase tracking-wider"
                        >
                            Reset Password
                        </button>
                    </form>
                </div>
                <Sfooter />
            </div>
        </>
    );
};

export default ResetPassword;
