import { useEffect, useState } from "react";
import axios from "axios";
import UserSideBar from "./UserSideBar";

const DisplayUser = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Added loading state
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      const storedUser = localStorage.getItem("user");
  
      if (storedUser) {
        try {
          const { email } = JSON.parse(storedUser);
  
          if (!email) {
            setError("Email not found in localStorage.");
            setLoading(false);
            return;
          }
  
          const response = await axios.get(`http://localhost:5000/api/users/${email}`);
          setUser(response.data);
        } catch (err) {
          console.error("Error fetching user data:", err.response || err.message);
          setError(err.response?.data?.error || "Failed to fetch user data.");
        }
      } else {
        setError("No user email found in localStorage.");
      }
  
      setLoading(false);
    };
  
    fetchUserData();
  }, []);
  

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (!user) {
    return <div>No user data available.</div>;
  }

  return (
    <div className="grid md:grid-cols-4">
      <UserSideBar />
      <div className="container mx-auto p-10 col-span-3 text-xl">
        <h2 className="text-lg font-bold">User Information</h2>
        <p>
          <strong>Name:</strong> {user.name}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <p>
          <strong>User Type:</strong> {user.userType}
        </p>
      </div>
    </div>
  );
};

export default DisplayUser;
