import { useState } from 'react';

const Sev = () => {

  const handleForgotPassword = async () => {
    try {
        const response = await fetch('http://localhost:5000/api/auth/forgot-password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to send reset email');
        }

        setSuccess('Password reset email sent. Please check your inbox.');
        setError('');
    } catch (error) {
        setError('Error: ' + error.message);
    }
};

  const [image, setImage] = useState(null);
  const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
  
    
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const getInitials = () => {
    return `${firstName.charAt(0).toUpperCase()}${lastName.charAt(0).toUpperCase()}`;
  };

  return (
    <div> 
    <div className="flex flex-col items-center p-5">
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="mb-4"
      />
      <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-gray-300 flex items-center justify-center">
        {image ? (
          <img src={image} alt="Profile" className="w-full h-full object-cover" />
        ) : (
          <span className="text-3xl font-bold">{getInitials()}</span>
        )}
      </div>
      <div className="mt-4">
        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className="border rounded p-2 mr-2"
        />
        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          className="border rounded p-2"
        />
      </div>
    </div></div>
  )
}

export default Sev