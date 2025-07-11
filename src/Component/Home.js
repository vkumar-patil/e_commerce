import  { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/Authcontext"; 

function Home({ cart, setCart, searchProduct  }) {
  const navigate=useNavigate();
  const { userLoggedIn } = useAuth();

  const addToCart = (id, price, title, description, image) => {
  const obj = { id, price, title, description, image, quantity: 1 };
  if (cart.find((ele) => ele.id === id)) {
    alert(`${title} already added to cart`);
  } else {
    setCart([...cart, obj]);
    window.confirm("Product added to cart");
  }
};
  const [data, setData] = useState([]);
  const [selectedPrice, setSelectedPrice] = useState("");

  const filteredProducts = data.filter((product) => {
    if (!product.title) return false;
     const titleMatch  =searchProduct?product.title.toLowerCase().includes(searchProduct.toLowerCase()):true;
    let priceMatch = true;
  if (selectedPrice) {
    const [min, max] = selectedPrice.split("-");
    const price = product.price;
    priceMatch =
      (!min || price >= parseInt(min)) &&
      (!max || price <= parseInt(max));
  }
    return titleMatch && priceMatch;
  });

  useEffect(() => {
    fetch(`https://api.escuelajs.co/api/v1/products`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <>
  <div className="container my-4 overflow-hidden">
 <div className="row mb-3 gx-2">
  <div className="col-12 col-md-3 filter-section px-2 overflow-hidden">
    <label className="form-label">Filter by Price:</label>
    <select
      className="form-select mobile-half-width overflow-hidden"
      value={selectedPrice}
      onChange={(e) => setSelectedPrice(e.target.value)}
    >
      <option value="">All Prices</option>
      <option value="0-50">₹0 – ₹50</option>
      <option value="50-100">₹50 – ₹100</option>
      <option value="100-500">₹100 – ₹500</option>
      <option value="500-">Above ₹500</option>
    </select>
  </div>
</div>


      <div className="row justify-content-center">
        {filteredProducts.map((item) => (
          <div className="col-12 col-sm-6 col-md-3 mb-4" key={item.id}>
            <div className="product-card shadow-sm">
              <Link to={`/Product/${item.id}`}>
               <img
  className="card-img-top"
  src={item.images?.[0] ||"https://placehold.co/600x400"}
  onError={(e) => {
    e.target.onerror = null; 
    e.target.src = "https://placehold.co/600x400";
  }}
  alt={item.title}
/>
              </Link>
              <div className="card-body text-start px-3 py-2">
                <h6 className="card-title fw-bold">{item.title}</h6>
                <p className="text-muted small">{item.category?.name}</p>
                <p className="product-price mb-2">
                  ₹{item.price}
                  <span className="ms-2 text-warning">
                    <i className="fa-solid fa-star"></i>
                  </span>
                </p>
                <div className="d-flex justify-content-between">
                  <button
                    className="btn btn-sm btn-outline-warning"
                    onClick={() =>
                      addToCart(
                        item.id,
                        item.price,
                        item.title,
                        item.description,
                        item.images?.[0] || ""
                      )
                    }
                  >
                    Add to Cart
                  </button>
                  <button className="btn btn-sm btn-success"
  onClick={() => {
    const itemData = {
      id: item.id,
      price: item.price,
      title: item.title,
      description: item.description,
      image: item.images?.[0] || "",
      quantity: 1,
    };
    setCart([itemData]);
    if (!userLoggedIn) {
      navigate("/login", { state: { from: "/checkout" } }); 
    } else {
      navigate("/checkout");
    }
  }}
>
  Buy Now
</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    </>
  );
}

export default Home;




