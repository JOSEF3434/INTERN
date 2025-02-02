import { useEffect, useState } from 'react';

const RiceptionMainPage = () => {
  const [summary, setSummary] = useState({ totalOrders: 0, totalPrice: 0 });

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        // Use the correct URL for the backend API
        const response = await fetch('http://localhost:5000/api/userhistory/summary');
        
        // Check if response is successful
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Parse the response JSON
        const data = await response.json();
        console.log('Fetched Summary:', data);

        // Update the state with the fetched summary
        setSummary({
          totalOrders: data.totalOrders || 0,
          totalPrice: data.totalPrice || 0,
        });
      } catch (error) {
        console.error('Error fetching summary:', error);
      }
    };

    // Fetch the summary when the component mounts
    fetchSummary();
  }, []);

  return (
    <main className="flex-grow p-6 bg-gray-100">
      <header className="bg-cyan-500 text-white p-4 rounded mb-4">
        <h1 className="text-4xl text-center p-8">Welcome, Riception</h1>
      </header>
      <section className="grid grid-cols-1 md:grid-cols-2 gap-12 m-8">
        <div className="bg-white hover:bg-gray-300 p-4 rounded shadow text-center">
          <h3 className="text-xl">Total Ordered Items</h3>
          <p className="text-2xl pt-4">{summary.totalOrders}</p>
        </div>
        <div className="bg-white hover:bg-gray-300 p-4 rounded shadow text-center">
          <h3 className="text-xl">Total Price of Ordered Items</h3>
          <p className="text-2xl pt-4">
            {summary.totalPrice ? summary.totalPrice.toFixed(2) : '0.00'} ETB
          </p>
        </div>
      </section>
    </main>
  );
};

export default RiceptionMainPage;
