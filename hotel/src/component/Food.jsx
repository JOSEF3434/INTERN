// component/food.jsx
//import React from 'react';

import Shiro from "./dish/Shiro.jpg"; // Image in the same directory
import EthiopianTibs from "./dish/EthiopianTibs.jpg"; // Adjusted path
import PastaBeatklt from "./dish/PastaBeatklt.jpg"; // Adjusted path
import Genfo from "./dish/Genfo.jpg"; // Adjusted path
import Kikil from "./dish/Kikil.webp"; // Adjusted path
import Beyeaynetu from "./dish/Beyeaynetu.jpg"; // Adjusted path
import helthyVigtable from "./dish/helthyVigtable.avif"; // Adjusted path

const Food = () => {
  const dishes = [
    {
      name: "Shiro",
      price: "50.00 Br",
      imgSrc: Shiro,
      description: "Lorem ipsum dolor sit amet consectetur.",
    },
    {
      name: "Tibs",
      price: "150.00 Br",
      imgSrc: EthiopianTibs,
      description: "Lorem ipsum dolor sit amet consectetur.",
    },
    {
      name: "Pasta Beatklt",
      price: "50.00 Br",
      imgSrc: PastaBeatklt,
      description: "Lorem ipsum dolor sit amet consectetur.",
    },
    {
      name: "Genfo",
      price: "150.00 Br",
      imgSrc: Genfo,
      description: "Lorem ipsum dolor sit amet consectetur.",
    },
    {
      name: "Kikil",
      price: "100.00 Br",
      imgSrc: Kikil,
      description: "Lorem ipsum dolor sit amet consectetur.",
    },
    {
      name: "Beyeaynetu",
      price: "50.00 Br",
      imgSrc: Beyeaynetu,
      description: "Lorem ipsum dolor sit amet consectetur.",
    },
    {
      name: "Sanduch",
      price: "100.00 Br",
      imgSrc: helthyVigtable,
      description: "Lorem ipsum dolor sit amet consectetur.",
    },
  ];

  return (
    <section className="menu" id="menu">
      <div className="text-center mb-8">
        <h4 className="text-2xl font-bold mb-2 text-main-color">Our Menu</h4>
        <h2 className="text-2xl"> Let Check Some of Our Delicious Dishes</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mr-16 ml-16 mt-16">
        {dishes.map((dish, index) => (
          <div
            key={index}
            className="relative bg-other-color rounded-2xl overflow-hidden h-96 justify-between transition-all duration-500"
          >
            <div className="overflow-hidden h-1/2 flex justify-center items-center">
              <img
                src={dish.imgSrc}
                alt={dish.name}
                className="object-cover w-full h-full transition-transform duration-500 hover:scale-110"
              />
            </div>
            <div className="w-full p-4 bg-gray-200">
              <h3 className="text-lg font-bold mb-1">{dish.name}</h3>
              <p className="text-second-color leading-5 mb-4">
                {dish.description}
              </p>
              <div className="flex items-center justify-between pt-2">
                <div className="price">
                  <h6 className="text-sm text-main-color font-semibold">
                    {dish.price}
                  </h6>
                </div>
                <div className="s-btn">
                  <a
                    href="Service"
                    className="inline-block px-4 py-2 bg-bg-color text-main-color text-sm font-medium rounded-full transition-all duration-500 hover:bg-main-color hover:text-bg-color shadow-md"
                  >
                    Order now
                  </a>
                </div>
                <div className="top-icon absolute top-6 left-6">
                  <a href="#">
                    <i className="bx bxs-cart-add text-xl text-main-color shadow-lg bg-black rounded-full p-1"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Food;
