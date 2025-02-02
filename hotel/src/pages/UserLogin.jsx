//import React from 'react';

const UserLogin = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900">
      <div className="bg-black rounded-lg shadow-lg p-8 max-w-md w-full">
        <h2 className="text-white text-2xl mb-4">USER LOGIN</h2>
        <form action="log.php" method="post" className="flex flex-col">
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Enter Username Here"
            required
            className="bg-gray-800 text-white border-none rounded-lg p-3 mb-4"
          />
          <input
            type="password"
            name="Password"
            id="password"
            placeholder="Enter Password Here"
            required
            className="bg-gray-800 text-white border-none rounded-lg p-3 mb-4"
          />
          <button
            name="submit"
            id="submit"
            className="bg-yellow-500 text-black font-semibold py-2 rounded-lg hover:bg-yellow-600 transition"
          >
            Login
          </button>
          <p className="text-gray-400 mt-4">
            If no account, first <a id="signup" href="login.php" className="text-yellow-500 hover:underline">SIGNUP</a>
          </p>
        </form>
        <div className="flex justify-center mt-4 space-x-4">
          <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
            <ion-icon name="logo-facebook" className="text-white text-2xl"></ion-icon>
          </a>
          <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
            <ion-icon name="logo-instagram" className="text-white text-2xl"></ion-icon>
          </a>
          <a href="https://www.twitter.com/" target="_blank" rel="noopener noreferrer">
            <ion-icon name="logo-twitter" className="text-white text-2xl"></ion-icon>
          </a>
          <a href="https://www.google.com/" target="_blank" rel="noopener noreferrer">
            <ion-icon name="logo-google" className="text-white text-2xl"></ion-icon>
          </a>
          <a href="https://www.skype.com/" target="_blank" rel="noopener noreferrer">
            <ion-icon name="logo-skype" className="text-white text-2xl"></ion-icon>
          </a>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;
