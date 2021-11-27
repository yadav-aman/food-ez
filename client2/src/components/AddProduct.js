import { UserContext } from '../context/UserContext';
import { useEffect, useState, useContext } from 'react';

const AddProduct = () => {
  const [token] = useContext(UserContext);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [isVeg, setVeg] = useState('');
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState('');

  const addPro = async () => {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: name,
        description: description,
        price: price,
        is_veg: isVeg,
        qty: quantity,
      }),
    };

    const response = await fetch('http://localhost:8000/item', requestOptions);

    if (!response.ok) {
      alert('Some problem occured');
    } else {
      alert('Product Added');
    }
  };

  const handleSubmit = (e) => {
    addPro();
  };

  return (
    <div class="w-full h-screen capitalize">
      <div class=" h-96 -mt-20"></div>
      <div class="max-w-5xl mx-auto px-6 sm:px-6 lg:px-8 mb-12">
        <div class="bg-gray-900 w-full shadow rounded p-8 sm:p-12 -mt-72">
          <p class="text-3xl font-bold leading-7 text-center text-white">
            Add New Product
          </p>
          <form onSubmit={handleSubmit}>
            <div class="md:flex items-center mt-12">
              <div class="w-full md:w-1/2 flex flex-col">
                <label class="font-semibold leading-none text-gray-300">
                  Name
                </label>
                <input
                  type="text"
                  class="leading-none text-gray-50 p-3 focus:outline-none focus:border-blue-700 mt-4 border-0 bg-gray-800 rounded"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div class="w-full md:w-1/2 flex flex-col md:ml-6 md:mt-0 mt-4">
                <label class="font-semibold leading-none text-gray-300">
                  Price
                </label>
                <input
                  type="text"
                  class="leading-none text-gray-50 p-3 focus:outline-none focus:border-blue-700 mt-4 border-0 bg-gray-800 rounded"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                />
              </div>
            </div>
            <div class="md:flex items-center mt-12">
              <div class="w-full md:w-1/2 flex flex-col">
                <label class="font-semibold leading-none text-gray-300">
                  Is Veg?
                </label>
                <input
                  type="text"
                  class="leading-none text-gray-50 p-3 focus:outline-none focus:border-blue-700 mt-4 border-0 bg-gray-800 rounded"
                  value={isVeg}
                  onChange={(e) => setVeg(e.target.value)}
                  required
                />
              </div>
              <div class="w-full md:w-1/2 flex flex-col md:ml-6 md:mt-0 mt-4">
                <label class="font-semibold leading-none text-gray-300">
                  Quantity
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

            <div>
              <div class="w-full flex flex-col mt-8">
                <label class="font-semibold leading-none text-gray-300">
                  Description
                </label>
                <textarea
                  type="text"
                  class="h-40 text-base leading-none text-gray-50 p-3 focus:outline-none focus:border-blue-700 mt-4 bg-gray-800 border-0 rounded"
                  onChange={(e) => setDescription(e.target.value)}
                  required
                ></textarea>
              </div>
            </div>
            <div class="flex items-center justify-center w-full">
              <button
                type="submit"
                class="mt-9 font-semibold leading-none text-white py-4 px-10 bg-blue-700 rounded hover:bg-blue-600 focus:ring-2 focus:ring-offset-2 focus:ring-blue-700 focus:outline-none"
              >
                Add Product
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
