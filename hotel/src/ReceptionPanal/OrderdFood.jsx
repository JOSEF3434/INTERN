import  { useEffect, useState } from 'react';
import RiceptionSideBar from './RiceptionSideBar';

const Receipt = () => {
    const [userHistory, setUserHistory] = useState([]);

    useEffect(() => {
        const fetchUserHistory = async () => {
            const response = await fetch('http://localhost:5000/api/user-history');
            const data = await response.json();
            setUserHistory(data);
        };

        fetchUserHistory();
    }, []);

    const handlePrint = () => {
        window.print();
    };

    return (
      <div className='grid md:grid-cols-4'>
          <RiceptionSideBar/>
          <div className="container mx-auto p-5 col-span-3">
            <table border="1" style={{ width: '100%', textAlign: 'left' }}>
                <thead>
                    <tr>
                        <th>Guest Name</th>
                        <th>Total Price</th>
                    </tr>
                </thead>
                <tbody>
                    {userHistory.map((history) => (
                        <tr key={history._id} className="hover:bg-gray-100">
                            <td className="py-3 px-4">{history.name}</td>
                            <td className="py-3 px-4">{history.orders.reduce((total, order) => total + parseFloat(order.price), 0).toFixed(2)}</td>
                            <td className=" ml-0 bg-gray-200 px-6 py-1 m-1 rounded hover:bg-gray-600 "><button onClick={handlePrint}>Print Receipt</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            </div>
        </div>
    );
};

export default Receipt;