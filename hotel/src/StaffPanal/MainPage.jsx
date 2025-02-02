import { useEffect, useState } from 'react';

const MainPage = () => {
  const [counts, setCounts] = useState({ food: 0, drink: 0, room: 0 });
  
  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/products/counts');
        const data = await response.json();
        setCounts(data);
      } catch (error) {
        console.error('Error fetching product counts:', error);
      }
    };

    fetchCounts();
  }, []);

  return (
    <>
      <main className="flex-grow p-6 bg-gray-100">
        <header className="bg-cyan-500 text-white p-4 rounded mb-4">
          <h1 className="text-4xl text-center p-8">Welcome, Admin</h1>
        </header>
        <section className="grid grid-cols-1 md:grid-cols-2 gap-12 m-8">
          {[
            { title: "Total Food Items", count: counts.food },
            { title: "Total Drink Items", count: counts.drink },
            { title: "Total Rooms", count: counts.room }
          ].map((item, index) => (
            <div key={index} className="bg-white hover:bg-gray-300 p-4 rounded shadow text-center">
              <h3 className="text-xl">{item.title}</h3>
              <p className="text-2xl pt-4">{item.count}</p>
            </div>
          ))}
        </section>
      </main>
    </>
  );
}

export default MainPage;
