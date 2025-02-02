// About.jsx
import Sfooter from "../public/Sfooter";

const About = () => {
  return (
    <div>
      <div className="bg-gray-100 py-6">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            About Our Hotel
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <img
                src="https://via.placeholder.com/500x300"
                alt="Hotel Exterior"
                className="rounded-lg shadow-md"
              />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Welcome to Our Hotel
              </h2>
              <p className="text-gray-700">
                Our hotel is a premier destination for travelers seeking a
                comfortable and luxurious stay. Located in the heart of the
                city, we offer a wide range of amenities and services to
                ensure your visit is truly memorable.
              </p>
              <p className="text-gray-700 mb-4">
                With our modern facilities, attentive staff, and commitment to
                exceptional hospitality, we strive to provide an unparalleled
                experience for our guests. Whether you're visiting for
                business or leisure, we're dedicated to making your stay with
                us truly exceptional.
              </p>
              <a
                href="#"
                className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-6 rounded-lg inline-block"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
      </div>
      <Sfooter />
    </div>
  );
};

export default About;

