import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
//import { useHistory } from 'react-router';

const Products = () => {

  const [items, setItems] = useState([]);
  const [isLoaded, setLoaded] = useState(false);
  //const [token, setToken] = useContext(UserContext);
  //const history = useHistory();

  useEffect(() => {
    requestItems();
  }, []);

  const requestItems = async () => {
    const res = await fetch(`http://localhost:8000/item/all`);

    const json = await res.json();
    setItems(json);
    console.table(items);
    setLoaded(true);
  };


  if(!isLoaded)
  {return (
    <div>
      <h1>Loading data</h1>
    </div>
  );}
  else
  {return (
    <div>
      {!items.length?(<h1>No data</h1>):
    (
      items.map((item)=>(
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-wrap -m-4">
          <div className="lg:w-1/4 md:w-1/2 p-4 w-full">
            <Link to='/' className="block relative h-48 rounded overflow-hidden">
              <img
                alt="ecommerce"
                className="object-cover object-center w-full h-full block"
                src="https://dummyimage.com/420x260"
              />
            </Link>
            <div className="mt-4">
              <h1 className="text-gray-900 text-lg tracking-widest title-font mb-1 font-bold">
              {item.name}
              </h1>
              <h3 className=" text-gray-500 title-font text-xs font-medium">
              Description: {item.description}
              </h3>
              <p className="mt-1">Price: ₹{item.price}/unit</p>
            </div>
          </div>
        </div>
      </div>
    </section>)))}
    </div>
  );}
};

export default Products;
