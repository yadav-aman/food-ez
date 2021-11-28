import { UserContext } from '../context/UserContext';
import { useEffect, useState, useContext } from 'react';

const UpdateStock = () => {
  const [token] = useContext(UserContext);
  const [productID, setID] = useState('');
  const [quantity, setQuantity] = useState('');

  const updatePro = async () => {
    const requestOptions = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    await fetch(
      `http://localhost:8000/item/${productID}?qty=${quantity}`,
      requestOptions,
    );
  };

  const handleSubmit = (e) => {
    updatePro();
  };

  return (
    <div class="w-full h-screen capitalize">
      <div class=" h-96 -mt-20"></div>
      <div class="max-w-5xl mx-auto px-6 sm:px-6 lg:px-8 mb-12">
        <div class="bg-gray-900 w-full shadow rounded p-8 sm:p-12 -mt-72">
          <p class="text-3xl font-bold leading-7 text-center text-white">
            Update Existing Product
          </p>
          <form onSubmit={handleSubmit}>
            <div class="md:flex items-center mt-12">
              <div class="w-full md:w-1/2 flex flex-col">
                <label class="font-semibold leading-none text-gray-300">
                  Product ID
                </label>
                <input
                  type="text"
                  class="leading-none text-gray-50 p-3 focus:outline-none focus:border-blue-700 mt-4 border-0 bg-gray-800 rounded"
                  value={productID}
                  onChange={(e) => setID(e.target.value)}
                  required
                />
              </div>
              <div class="w-full md:w-1/2 flex flex-col md:ml-6 md:mt-0 mt-4">
                <label class="font-semibold leading-none text-gray-300">
                  Product Quantity
                </label>
                <input
                  type="text"
                  class="leading-none text-gray-50 p-3 focus:outline-none focus:border-blue-700 mt-4 border-0 bg-gray-800 rounded"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  required
                />
              </div>
            </div>

            <div class="flex items-center justify-center w-full">
              <button
                type="submit"
                class="mt-9 font-semibold leading-none text-white py-4 px-10 bg-blue-700 rounded hover:bg-blue-600 focus:ring-2 focus:ring-offset-2 focus:ring-blue-700 focus:outline-none"
              >
                Update Product
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateStock;
