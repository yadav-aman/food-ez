import { useEffect, useState, useContext } from "react";
import Item from "./Item";
import { useHistory } from "react-router";
import { UserContext } from "../context/UserContext";

const Fetch = () => {
  const [items, setItems] = useState([]);
  const [isLoaded, setLoaded] = useState(false);
  const [token, setToken] = useContext(UserContext);
  const history = useHistory();

  if (!token) {
    history.push("/");
  } else {
    history.push("/dashboard");
  }

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

  if (isLoaded) {
    return (
      <div>
        {!items.length ? (
          <h1> No product Found</h1>
        ) : (
          items.map((item) => (
            <Item
              name={item.name}
              description={item.description}
              price={item.price}
              veg={item.is_veg}
              quantity={item.qty}
            />
          ))
        )}
        <button onClick={e=>{setToken(null)}}>Log Out</button>
      </div>
    );
  }
  return (
    <div>
      <h1>Loading data</h1>
    </div>
  );
};

export default Fetch;
