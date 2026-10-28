
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../Comman/Navbar";
import Footer from "../Comman/Footer";

function Product() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [toast, setToast] = useState(false);

  const navigate = useNavigate();
  const toastTimer = useRef(null);
  const hideTimer = useRef(null);

  useEffect(() => {
    axios
      .get("https://a2zithub.org/dairy/abi/product_det")
      .then((res) => {
        const data = Array.isArray(res.data)
          ? res.data
          : Array.isArray(res.data?.data)
          ? res.data.data
          : [];

        const filteredProducts = data.filter(
          (item) =>
            item.product_name &&
            !["Sponsored", "ABC"].includes(item.product_name)
        );

        setProducts(filteredProducts);
      })
      // .catch((err) => {
      //   console.error("Product API Error:", err);
      //   setError("Products load झाले नाहीत.");
      // })
      .finally(() => {
        setLoading(false);
      });

    return () => {
      clearTimeout(toastTimer.current);
      clearTimeout(hideTimer.current);
    };
  }, []);

  const openProduct = (product) => {
    const id = product.product_tbl_id;

    // if (!id) {
    //   alert("Product ID उपलब्ध नाही.");
    //   return;
    // }

    navigate(`/product_det/${id}`);
  };

  const addToCart = (e, product) => {
    e.stopPropagation();

    const id = product.product_tbl_id;

    // if (!id) {
    //   alert("Product ID उपलब्ध नाही.");
    //   return;
    // }

    try {
      let cart = [];

      try {
        const savedCart = JSON.parse(
          localStorage.getItem("cart") || "[]"
        );

        cart = Array.isArray(savedCart) ? savedCart : [];
      } catch {
        cart = [];
      }

      // Find product using ID only
      const existingProduct = cart.find(
        (item) => String(item.id) === String(id)
      );

      if (existingProduct) {
        cart = cart.map((item) =>
          String(item.id) === String(id)
            ? {
                ...item,
                quantity: (Number(item.quantity) || 1) + 1,
              }
            : item
        );
      } else {
        cart.push({
          id,
          name: product.product_name,
          image: product.product_img,
          price: Number(product.price) || 0,
          quantity: 1,
        });
      }

      localStorage.setItem("cart", JSON.stringify(cart));

      clearTimeout(toastTimer.current);
      clearTimeout(hideTimer.current);

      setToast(false);

      toastTimer.current = setTimeout(() => {
        setToast(true);

        hideTimer.current = setTimeout(() => {
          setToast(false);
        }, 2500);
      }, 30);
    } catch (err) {
    //   console.error("Add To Cart Error:", err);
    //   alert("Product cart मध्ये add झाला नाही.");
     }
  };

  return (
    <>
      <Navbar />

      {/* Success Toast */}
      {toast && (
        <div className="fixed right-5 top-5 z-[9999] w-60 overflow-hidden rounded-md bg-white shadow-lg ring-1 ring-gray-200">
          <div className="flex items-center gap-3 px-4 py-3">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-green-100">
              <svg
                className="h-5 w-5 text-green-600"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 12l4 4L19 6"
                />
              </svg>
            </div>

            <div className="flex-1">
              <p className="text-sm font-semibold text-gray-800">
                Added to Cart
              </p>

              <p className="text-xs text-gray-500">
                Product added successfully!
              </p>
            </div>

            <button
              type="button"
              onClick={() => {
                clearTimeout(hideTimer.current);
                setToast(false);
              }}
              className="text-lg text-gray-400 hover:text-gray-700"
              aria-label="Close message"
            >
              ×
            </button>
          </div>

          {/* Green Progress Line */}
          <div className="h-1 w-full bg-gray-200">
            <div
              key={String(toast)}
              className="h-full bg-green-500"
              style={{
                animation: "cartToastProgress 2.5s linear forwards",
              }}
            />
          </div>

          <style>
            {`
              @keyframes cartToastProgress {
                from { width: 100%; }
                to { width: 0%; }
              }
            `}
          </style>
        </div>
      )}

      {/* Product Page */}
      <div className="min-h-screen bg-white px-5 py-8">
        <h1 className="mb-8 text-center text-3xl font-bold text-black">
          Product
        </h1>

        {loading && (
          <p className="text-center text-gray-600">
            Loading products...
          </p>
        )}

        {error && (
          <p className="text-center text-red-600">
            {error}
          </p>
        )}

        {!loading && !error && products.length === 0 && (
          <p className="text-center text-gray-600">
            No products available.
          </p>
        )}

        {/* Product Cards */}
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <div
              key={product.product_tbl_id}
              className="overflow-hidden rounded-xl border border-black bg-white p-2.5 shadow-md"
            >
              {/* Product Image */}
              <div
                onClick={() => openProduct(product)}
                className="h-[232px] w-full cursor-pointer overflow-hidden rounded-lg bg-white"
              >
                <img
                  src={product.product_img}
                  alt={product.product_name}
                  className="h-full w-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
              </div>

              {/* Product Information */}
              <div className="px-0.5 pb-0.5 pt-3">
                <h2
                  className="truncate text-sm font-medium text-black"
                  title={product.product_name}
                >
                  {product.product_name}
                </h2>

                <p className="mt-2 text-sm font-bold text-green-700">
                  ₹{Number(product.price || 0).toFixed(0)}
                </p>

                {/* Add To Cart */}
                <button
                  type="button"
                  onClick={(e) => addToCart(e, product)}
                  className="mt-4 w-full rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
                >
                  Add To Cart
                </button>

                {/* View Details */}
                <button
                  type="button"
                  onClick={() => openProduct(product)}
                  className="mt-3 w-full rounded-lg border border-blue-600 bg-white px-4 py-2.5 text-sm font-semibold text-blue-600 transition hover:bg-blue-50"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Go To Cart */}
        <div className="mt-8 text-center">
          <button
            type="button"
            onClick={() => navigate("/Cart")}
            className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
          >
            Go To Cart
          </button>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Product;
