import { useCart } from "./useCart";

const Cart = () => {
  const { cart, removeFromCart } = useCart();

  return (
    <div className="cart">
      <h2>Your Cart</h2>
      {cart.length === 0 ? <p>Your cart is empty.</p> : (
        <ul>
          {cart.map((item) => (
            <li key={item.id}>
              <img src={item.image} alt={item.title} width="50" />
              <span>{item.title} - ${item.price}</span>
              <button onClick={() => removeFromCart(item.id)}>Remove</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Cart;
