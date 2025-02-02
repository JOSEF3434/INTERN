import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { UserContext } from '../App';
import { toast } from 'react-toastify';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const Dish = () => {
  const { user } = useContext(UserContext);
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [takenDishes, setTakenDishes] = useState(new Set()); // Track taken dishes by ID

  useEffect(() => {
    const fetchDishes = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products?type=room');
        setDishes(response.data);

        // Fetch taken dishes
        const takenResponse = await axios.get('http://localhost:5000/api/userHistory/takenDishes');
        setTakenDishes(new Set(takenResponse.data));
      } catch (err) {
        setError('Failed to fetch dishes');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDishes();
  }, []);

  const orderDish = async (dish, startDate, endDate) => {
    if (takenDishes.has(dish._id)) {
      toast.error('This item is taken, please try another item.');
      return;
    }

    try {
      const userData = JSON.parse(localStorage.getItem('user'));
      if (!userData || !userData.email) {
        toast.error('No logged-in user found.');
        return;
      }

      const { email, name } = userData;

      // Calculate number of days and total price
      const numOfDays = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
      const totalPrice = numOfDays * dish.price;

      // Fetch user balance
      const customerResponse = await axios.get(`http://localhost:5000/api/customers/${email}`);
      const customer = customerResponse.data;

      if (customer.balance >= totalPrice) {
        const orderData = {
          email,
          name,
          dish: dish.name,
          price: totalPrice,
          id: dish._id,
          startDate: startDate.toISOString(),
          endDate: endDate.toISOString(),
          date: new Date().toISOString(),
        };

        // Save order to userHistory
        await axios.post('http://localhost:5000/api/userHistory', orderData);

        // Update user's balance
        const newBalance = customer.balance - totalPrice;
        await axios.put(`http://localhost:5000/api/customers/${encodeURIComponent(email)}`, { balance: newBalance });

        // Mark the dish as taken
        setTakenDishes((prev) => new Set(prev).add(dish._id));

        toast.success(`Order placed successfully! Your new balance is ${newBalance} Br.`);
      } else {
        toast.error('Insufficient balance!');
      }
    } catch (err) {
      console.error('Error placing order:', err.response ? err.response.data : err);
      toast.error('Failed to place order. Please try again.');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <section className="menu" id="menu">
      <div className="text-center mb-8">
        <h2 className="text-2xl">Let`s Check Our Quality And VIP Room</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mr-16 ml-16 mt-16">
        {dishes.map((dish, index) => {
          const [startDate, setStartDate] = useState(null);
          const [endDate, setEndDate] = useState(null);

          return (
            <div
              key={index}
              className={`bg-other-color rounded-2xl overflow-hidden h-auto justify-between transition-all duration-500 ${
                takenDishes.has(dish._id) ? 'opacity-50 pointer-events-none' : ''
              }`}
            >
              <div className="overflow-hidden h-1/2 flex justify-center items-center">
                <img
                  src={dish.image}
                  alt={dish.name}
                  className="object-cover w-full h-full transition-transform duration-500 hover:scale-110"
                />
              </div>
              <div className="w-full p-4 bg-gray-200">
                <h3 className="text-lg font-bold mb-1">{dish.name}</h3>
                <p className="text-second-color leading-5 mb-4">
                  {dish.description || 'Our Specials Food From Hibrtsega Hotel.'}
                </p>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <label className="text-sm font-medium">Start Date:</label>
                    <DatePicker
                      selected={startDate}
                      onChange={(date) => setStartDate(date)}
                      selectsStart
                      startDate={startDate}
                      endDate={endDate}
                      className="border rounded p-1 text-sm"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <label className="text-sm font-medium">End Date:</label>
                    <DatePicker
                      selected={endDate}
                      onChange={(date) => setEndDate(date)}
                      selectsEnd
                      startDate={startDate}
                      endDate={endDate}
                      minDate={startDate}
                      className="border rounded p-1 text-sm"
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between pt-4">
                  <div className="price">
                    <h6 className="text-sm text-main-color font-semibold">
                      {dish.price} Br / Day
                    </h6>
                  </div>
                  {user && startDate && endDate && (
                    <div className="s-btn">
                      <button
                        onClick={() => orderDish(dish, startDate, endDate)}
                        className="inline-block px-4 py-2 bg-bg-color text-main-color text-sm font-medium rounded-full transition-all duration-500 hover:bg-main-color hover:text-bg-color shadow-md"
                      >
                        Order now
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Dish;
