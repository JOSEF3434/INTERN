//import React from 'react'

const MainPage = () => {
  return (
    <>
    <main className="flex-grow p-6 bg-gray-100">
      <header className="bg-cyan-500 text-white p-4 rounded mb-4">
        <h1 className="text-4xl text-center p-8">Welcome, Admin</h1>
      </header>
      <section className="grid grid-cols-1 md:grid-cols-2 gap-12 m-8">
        {["Total Food Items", "Total Drink Items", "Total Rooms"].map((title, index) => (
          <div key={index} className="bg-white hover:bg-gray-300 p-4 rounded shadow text-center">
            <h3 className="text-xl ">{title}</h3>
            <p className="text-2xl pt-4">0</p> {/* Replace with dynamic data */}
          </div>
        ))}
      </section>
    </main>
    </>
  )
}

export default MainPage