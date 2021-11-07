const Item = (props) => {
    return (
      <div>
        <h1>Name of dish:- {props.name}</h1>
        <h2>description of food:-{props.description}</h2>
        <h2>Price per meal:-{props.price}</h2>
        <h2>quantity left:-{props.quantity}</h2>
        <h2>Meal type:-{props.veg ? "it's veg" : "it's non-veg"}</h2>
        
      </div>
    );
  };
  
  export default Item;