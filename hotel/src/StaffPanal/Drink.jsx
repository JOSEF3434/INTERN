import { useEffect, useState } from 'react';
import axios from 'axios';
import SideBar from './SideBar';
import { toast } from 'react-toastify';

const Drink = () => {
    const [products, setProducts] = useState([]);
    const [newPrice, setNewPrice] = useState('');
    const [productId, setProductId] = useState('');

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        const response = await axios.get('http://localhost:5000/api/products?type=drink');
        setProducts(response.data);
    };

    const handleEdit = async (id) => {
        await axios.put(`http://localhost:5000/api/products/${id}`, { price: newPrice });
        fetchProducts();
        setNewPrice('');
        setProductId('');

        toast.success("Product edited successfully!", {
            position: "top-right",
            autoClose: 5000
        });
    };

    const handleDelete = async (id) => {
        await axios.delete(`http://localhost:5000/api/products/${id}`);
        fetchProducts();

        toast.success("Product deleted successfully!", {
            position: "top-right",
            autoClose: 5000
        });
    };

    return (
        <div className='grid md:grid-cols-4'>
            <SideBar />
            <div className="container mx-auto p-5 col-span-3">
                <h2 className="text-3xl font-bold mb-4 text-center">Drink Products</h2>
                <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                    <thead>
                        <tr className="bg-gray-800 text-white">
                            <th className="py-3 px-4">Name</th>
                            <th className="py-3 px-4">Edit Price</th>
                            <th className="py-3 px-4">Delete Item</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr key={product._id} className="hover:bg-gray-200">
                                <td className="py-3 px-4">{product.name}</td>
                                <td className="py-3 px-4">
                                    <input
                                        type='text'
                                        value={productId === product._id ? newPrice : product.price}
                                        onChange={(e) => {
                                            setNewPrice(e.target.value);
                                            setProductId(product._id);
                                        }}
                                        required
                                        className="border rounded px-2 py-1"
                                    />
                                    <button
                                        onClick={() => handleEdit(product._id)}
                                        className="ml-2 bg-blue-500 text-white px-6 py-2 rounded  hover:bg-blue-600"
                                    >
                                        Edit
                                    </button>
                                </td>
                                <td className="py-3 pl-9">
                                    <button
                                        onClick={() => handleDelete(product._id)}
                                        className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Drink;
