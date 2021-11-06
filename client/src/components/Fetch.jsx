// change import at top
import { useEffect, useState } from "react";
import Item from "./Item";
//import Pet from "./Pet";

const Fetch=()=>{

const [items, setItems] = useState([]);

useEffect(() => {
  requestItems();
}, []);

 const requestItems = async ()=> {

        const requestOptions = {
          method: "GET",
          headers: { "Content-Type": "application/json" }
        };


  const res = await fetch(
    `http://localhost:8000/item/all`,
    requestOptions
  );

  const json = await res.json();
  //window.alert(json);
   setItems(json);
   console.log(json[0].name);
   console.log(json[0].price);
  // setItems(await res.json());
//    console.log(items[0].name);
//    console.log(items[0].price);
//    {
//     items.map((item) => (
//       <Item name={item[0].name} description={item[0].description} price={item[0].price} veg={item[0].is_veg} quantity={item[0].qty} />
//     ));
//   }
}

return(
    <div>
        <button onClick={requestItems}>Start</button>
        {/* <Item name={items[0].name} description={items[0].description} price={items[0].price} veg={items[0].is_veg} quantity={items[0].qty} /> */}
    </div>
)
};

export default Fetch;