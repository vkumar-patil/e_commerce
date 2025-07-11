import { Link } from "react-router-dom";
import { CgMathPlus, CgMathMinus } from "react-icons/cg";
import { useAuth } from "../../Context/Authcontext";
import { useNavigate } from "react-router-dom";
function Cart({ cart, setCart }) {
  const { userLoggedIn } = useAuth();
  const navigate=useNavigate()
  const changeQty = (id, delta) => {
    setCart(
      cart.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };
  const deleteItem = (id) => setCart(cart.filter((i) => i.id !== id));
  const clearCart = () => setCart([]);

  const total = cart.reduce((t, i) => t + i.price * i.quantity, 0);

  if (cart.length === 0)
    return (
      <div className="container text-center mt-5">
        <h2>Your cart is empty</h2>
        <Link to="/" className="btn btn-warning mt-3">
          Continue Shopping
        </Link>
      </div>
    );

  return (
    <div className="container mt-4">
      <h3>Cart ({cart.length} items)</h3>
      <h4>Total: ₹{total}</h4>
      <div className="d-flex mb-3">
  <button
  className="btn btn-success me-3"
  onClick={() => {
    if (!userLoggedIn) {
      navigate("/login", { state: { from: "/checkout" } });
    } else {
      navigate("/checkout");
    }
  }}
>
  Proceed to Checkout
</button>

  <button className="btn btn-info" onClick={clearCart}>
    Clear Cart
  </button>
</div>
      {cart.map((item) => (
        <div key={item.id} className="card mb-3 p-3">
          <div className="d-flex align-items-center">
            <img
  src={item.image || "https://placehold.co/120x120"}
  onError={(e) => {
    e.target.onerror = null; // prevent infinite loop
    e.target.src = "https://placehold.co/600x400";
  }}
  width="120"
  height="120"

  alt={item.title}
/>
            <div className="ms-3 flex-grow-1">
              <h5>{item.title}</h5>
              <p>₹{item.price}</p>

              <button
                className="btn btn-sm btn-warning me-2"
                onClick={() => changeQty(item.id, -1)}
              >
                <CgMathMinus />
              </button>
              <span>{item.quantity}</span>
              <button
                className="btn btn-sm btn-warning ms-2"
                onClick={() => changeQty(item.id, 1)}
              >
                <CgMathPlus />
              </button>
            </div>

            <button
              className="btn btn-sm btn-danger"
              onClick={() => deleteItem(item.id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
export default Cart; 