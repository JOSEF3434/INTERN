import { useEffect, useState } from "react";

const UserMainPage = () => {
  const [orderSummary, setOrderSummary] = useState({
    totalItems: 0,
    totalValue: 0,
  });

  useEffect(() => {
    const fetchOrderSummary = async () => {
      try {
        // Get the user's email from localStorage
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          const { email } = JSON.parse(storedUser);

          // Fetch order summary by email
          const response = await fetch(
            `http://localhost:5000/api/userHistory/summary/${email}`
          );
          const data = await response.json();

          // Update state with fetched data
          if (data && data.totalItems !== undefined && data.totalValue !== undefined) {
            setOrderSummary({
              totalItems: data.totalItems,
              totalValue: data.totalValue,
            });
          }
        }
      } catch (error) {
        console.error("Error fetching order summary:", error);
      }
    };

    fetchOrderSummary();
  }, []);

  return (
    <>
      <main className="flex-grow p-6 bg-gray-100">
        <header className="bg-cyan-500 text-white p-4 rounded mb-4">
          <h1 className="text-4xl text-center p-8">Welcome, User</h1>
        </header>
        <section className="grid grid-cols-1 md:grid-cols-2 gap-12 m-8">
          {[
            { title: "Total Ordered Items", count: orderSummary.totalItems },
            {
              title: "Total Order Value",
              count: `$${(orderSummary.totalValue || 0).toFixed(2)}`, // Ensure totalValue is a valid number
            },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-white hover:bg-gray-300 p-4 rounded shadow text-center"
            >
              <h3 className="text-xl">{item.title}</h3>
              <p className="text-2xl pt-4">{item.count}</p>
            </div>
          ))}
        </section>
      </main>
    </>
  );
};

export default UserMainPage;
