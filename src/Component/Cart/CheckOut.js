import { Link, useNavigate } from "react-router-dom";
function Checkout({ cart, setCart }) {
  const navigate = useNavigate();
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const handlePlaceOrder = () => {
    alert("🎉 Order placed successfully!");
    setCart([]);
    navigate("/");
  };
  return (
    <div className="container mt-5">
      <h2 className="mb-4 fw-bold">🧾 Checkout Summary</h2>
      {cart.length === 0 ? (
        <div className="alert alert-warning text-center">
          Your cart is empty.
          <div className="mt-3">
            <Link to="/" className="btn btn-primary">Go Back</Link>
          </div>
        </div>
      ) : (
        <>
          <div className="card shadow p-4 mb-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="d-flex justify-content-between align-items-center border-bottom py-3"
              >
                <div className="d-flex align-items-center">
                  <img
                    src={item.image || "https://placehold.co/80"}
                    onError={(e) => {
    e.target.onerror = null; 
    e.target.src = "https://placehold.co/600x400";
  }}
                    alt={item.title}
                    width="80"
                    height="80"
                    className="me-3 rounded"
                  />
                  <div>
                    <h6 className="mb-1">{item.title}</h6>
                    <small className="text-muted">Qty: {item.quantity}</small>
                  </div>
                </div>
                <span className="fw-semibold text-success">
                  ₹{item.price * item.quantity}
                </span>
              </div>
            ))}
          </div>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5>Total:</h5>
            <h4 className="text-success fw-bold">₹{total}</h4>
          </div>
          <div className="text-end">
            <button
              className="btn btn-lg btn-success"
              onClick={handlePlaceOrder}
            >
              ✅ Place Order
            </button>
          </div>
        </>
      )}
    </div>
  );
}
export default Checkout;
