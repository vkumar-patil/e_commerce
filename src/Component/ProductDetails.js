import  { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaArrowCircleLeft, FaArrowCircleRight, FaTag } from "react-icons/fa";
import { useAuth } from "../Context/Authcontext"; 

function ProductDetail({ cart, setCart }) {
  const { userLoggedIn } = useAuth();

  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [imageIndex, setImageIndex] = useState(0);
  const navigate = useNavigate();
  useEffect(() => {
    fetch(`https://api.escuelajs.co/api/v1/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data))
      .catch((err) => console.error("Error loading product:", err));
  }, [id]);
  const handleAddToCart = () => {
    if (cart.find((item) => item.id === product.id)) {
      alert("Product already in cart");
    } else {
      const obj = {
        id: product.id,
        title: product.title,
        price: product.price,
        description: product.description,
        image: product.images?.[0] || "",
        quantity: 1,
      };
      setCart([...cart, obj]);
      alert("✅ Product added to cart");
    }
  };

  const handleBuyNow = () => {
    const obj = {
      id: product.id,
      title: product.title,
      price: product.price,
      description: product.description,
      image: product.images?.[0] || "",
      quantity: 1,
    };
    setCart([obj]); 
   if (!userLoggedIn) {
      navigate("/login", { state: { from: "/checkout" } }); 
    } else {
      navigate("/checkout");
    }
  };
  if (!product) return <div className="text-center mt-5">Loading product...</div>;
  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-5 d-flex align-items-center justify-content-center position-relative">
          <img
            src={product.images?.[imageIndex] || "https://placehold.co/600x400"}
            onError={(e) => {
    e.target.onerror = null; 
    e.target.src = "https://placehold.co/600x400";
  }}
            alt={product.title}
            className="img-fluid rounded"
            style={{ maxHeight: "400px" }}
          />
          {imageIndex > 0 && (
            <span
              className="position-absolute"
              style={{ left: 10, top: "50%", fontSize: "2rem", color: "gray", cursor: "pointer" }}
              onClick={() => setImageIndex(imageIndex - 1)}
            >
              <FaArrowCircleLeft />
            </span>
          )}
          {imageIndex < product.images.length - 1 && (
            <span
              className="position-absolute"
              style={{ right: 10, top: "50%", fontSize: "2rem", color: "gray", cursor: "pointer" }}
              onClick={() => setImageIndex(imageIndex + 1)}
            >
              <FaArrowCircleRight />
            </span>
          )}
        </div>
        <div className="col-md-7">
          <h3>{product.title}</h3>
          <p>{product.description}</p>
          <h4 className="text-success mb-3">₹{product.price}</h4>
          <div className="mb-3">
            <p>
              <FaTag className="text-success me-2" />
              <strong>Offer:</strong> 10% instant discount on SBI Credit Card EMI
            </p>
            <p>
              <FaTag className="text-success me-2" />
              <strong>Bank Offer:</strong> 5% Cashback on Flipkart Axis Credit Card
            </p>
          </div>
          <div className="d-flex gap-3">
            <button className="btn btn-warning" onClick={handleAddToCart}>
              🛒 Add to Cart
            </button>
            <button className="btn btn-success" onClick={handleBuyNow}>
              ⚡ Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ProductDetail;
