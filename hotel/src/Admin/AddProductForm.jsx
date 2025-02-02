import { useState } from 'react';
import { toast } from 'react-toastify';

const AddProductForm = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState('');
    const [type, setType] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const productData = { name, price, image, type };

        try {
            const response = await fetch('http://localhost:5000/api/products/products', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(productData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                setError(errorData.error);
                return;
            }

            toast.success("Product added successfully!", 
                { position: "top-right", autoClose: 5000 });
            setName('');
            setPrice('');
            setImage('');
            setType('');
        } catch (error) {
            setError('Error: ' + error.message);
        }
    };

    return (
        <div className="col-span-3">
            <div className="flex justify-center items-center md:h-screen bg-gray-100">
                <div className="bg-white p-6 rounded-lg shadow-md max-w-md w-full">
                    <header className="mb-4 text-center">
                        <h2 className="text-2xl text-gray-800">Add Product</h2>
                    </header>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="name" className="block mb-1 text-gray-700">Name:</label>
                            <input type="text" id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} required className="w-full p-2 border border-gray-300 rounded" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="price" className="block mb-1 text-gray-700">Price:</label>
                            <input type="text" id="price" name="price" value={price} onChange={(e) => setPrice(e.target.value)} required className="w-full p-2 border border-gray-300 rounded" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="image" className="block mb-1 text-gray-700">Image URL:</label>
                            <input type="text" id="image" name="image" value={image} onChange={(e) => setImage(e.target.value)} required className="w-full p-2 border border-gray-300 rounded" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="type" className="block mb-1 text-gray-700">Type:</label>
                            <select id="type" name="type" value={type} onChange={(e) => setType(e.target.value)} required className="w-full p-2 border border-gray-300 rounded">
                                <option value="">Select Type Of Product</option>
                                <option value="food">Food</option>
                                <option value="drink">Drink</option>
                                <option value="room">Room</option>
                            </select>
                        </div>
                        <div>
                            <input type="submit" value="Submit" className="bg-blue-500 text-white p-2 rounded cursor-pointer w-full hover:bg-blue-600" />
                        </div>
                        {error && <div className="text-red-500 mt-4">{error}</div>}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddProductForm;
