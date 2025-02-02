// src/Slider.jsx
import { useState, useEffect } from 'react';

const slides = [
   './assets/hibir1.jpg',
    './assets/hibir2.jpg',
    './assets/hibir3.jpg',
    './assets/hibir14.jpg',
    './assets/hibir5.jpg',
    './assets/hotel6.jpg'
];

const Slider = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const showSlide = (index) => {
        if (index >= slides.length) {
            setCurrentSlide(0);
        } else if (index < 0) {
            setCurrentSlide(slides.length - 1);
        } else {
            setCurrentSlide(index);
        }
    };

    // Optional: Auto-slide every 3 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            showSlide(currentSlide + 1);
        }, 3000);
        return () => clearInterval(interval);
    }, [currentSlide]);

    return (<>
        <section className="relative w-full overflow-hidden">
            <div className="flex transition-transform duration-500" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
                {slides.map((slide, index) => (
                    <img key={index} src={slide} alt={`Image ${index + 1}`} style={{ height:'96vh'}} className="min-w-full h-96 object-cover" />
                ))}
            </div>
            <button className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded" onClick={() => showSlide(currentSlide - 1)}>❮</button>
            <button className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded" onClick={() => showSlide(currentSlide + 1)}>❯</button>
            <div className="h-full md:ml-11 absolute top-1 transform -translate-y-1 max-sm:h-44 bg-black bg-opacity-50 text-white p-2 rounded">
               <h1 className="md:text-5xl text-sm font-bold leading-relaxed pt-5 md:pt-20 text-center">
                    <span className="block">ከሚወዱት ሰዉ ጋር</span>
                    <span className="block">ወደ እኛ ይምጡ</span>
                    <span className="block text-orange-600">ይብሉ ፣</span>
                    <span className="block text-orange-600">ይጠጡ ፣ ያጣጥሙ</span>
                    <span className="block">ይደሰቱ</span>
                </h1>

            </div>
        </section>

        <section className="text-center py-12">
      <h1 className="text-3xl font-bold mb-4">WELCOME TO ህብር-ፀጋ HOTEL</h1>
      <div className="flex justify-around flex-wrap px-10 ml-20">
        <div className="card bg-white shadow-lg rounded-lg p-6 m-4 max-w-xs">
          <h2 className="text-xl font-semibold mb-2 p-2">Branche 1</h2>
          <p className="text-gray-600">
          ባህር ዳር ቀበሌ 03 ከሙሉአለም  አዳራሽ ፊተ ለ ፊት
           </p>
        </div>
        <div className="card bg-white shadow-lg rounded-lg p-6 m-4 max-w-xs">
          <h2 className="text-xl font-semibold mb-2">Branche 2</h2>
          <p className="px-20 py-3 text-xl text-gray-600">
              ???????   </p>
        </div>
        <div className="card bg-white shadow-lg rounded-lg p-6 m-4 max-w-xs">
          <h2 className="text-xl font-semibold  mb-2">Branche 3</h2>
          <p className="px-20 text-gray-600 py-3 text-xl">
             ?????-?????-
          </p>
        </div>
      </div>
    </section>
        </>
    );
};

export default Slider;
