
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../Comman/Navbar";
import Footer from "../Comman/Footer";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [added, setAdded] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  const API_URL = "https://a2zithub.org/dairy/abi";

  useEffect(() => {
    const getProduct = async () => {
      try {
        const response = await axios.get(`${API_URL}/product_det`);

        const products = Array.isArray(response.data)
          ? response.data
          : Array.isArray(response.data?.data)
          ? response.data.data
          : [];

        const selectedProduct = products.find(
          (item) => String(item.product_tbl_id) === String(id)
        );

        setProduct(selectedProduct || null);

        if (selectedProduct) {
          try {
            const savedCart = JSON.parse(
              localStorage.getItem("cart") || "[]"
            );

            const cart = Array.isArray(savedCart) ? savedCart : [];

            setIsAdded(
              cart.some(
                (item) =>
                  String(item.id) ===
                  String(selectedProduct.product_tbl_id)
              )
            );
          } catch {
            setIsAdded(false);
          }
        }
      } catch (error) {
        console.error("Product fetch error:", error);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    getProduct();
  }, [id]);

  const productColor = (() => {
    if (!product?.details) return "Not Available";

    const match = product.details.match(/Color:\s*([^\r\n]+)/i);

    return match ? match[1].trim() : "Not Available";
  })();

  const saveToCart = () => {
    if (!product) return;

    let cart = [];

    try {
      const savedCart = JSON.parse(localStorage.getItem("cart") || "[]");
      cart = Array.isArray(savedCart) ? savedCart : [];
    } catch {
      cart = [];
    }

    const productId = product.product_tbl_id;

    const existingProduct = cart.find(
      (item) => String(item.id) === String(productId)
    );

    if (existingProduct) {
      cart = cart.map((item) =>
        String(item.id) === String(productId)
          ? {
              ...item,
              quantity: Number(item.quantity) || 1,
              color: productColor,
            }
          : item
      );
    } else {
      cart.push({
        id: product.product_tbl_id,
        name: product.product_name,
        price: Number(product.price) || 0,
        image: product.product_img,
        color: productColor,
        quantity: 1,
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    setIsAdded(true);
  };

  const handleAddToCart = () => {
    if (!product) return;

    saveToCart();
    setAdded(true);

    setTimeout(() => {
      setAdded(false);
    }, 2500);
  };

  const handleGoToCart = () => {
    if (localStorage.getItem("isLogin") === "true") {
      navigate("/Cart");
    } else {
      navigate("/Login", {
        state: { from: "/Cart" },
      });
    }
  };

  const handleBuyNow = () => {
    if (!product) return;

    saveToCart();

    if (localStorage.getItem("isLogin") === "true") {
      navigate("/Cart");
    } else {
      navigate("/Login", {
        state: { from: "/Cart" },
      });
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="flex min-h-[60vh] items-center justify-center">
          <p className="text-lg font-semibold text-blue-600">
            Loading Product...
          </p>
        </div>
        <Footer />
      </>
    );
  }

  if (!product) {
    return (
      <>
        <Navbar />
        <div className="flex min-h-[60vh] items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-red-600">
              Product Not Found!
            </h2>

            <button
              onClick={() => navigate("/Product")}
              className="mt-5 rounded-lg bg-green-600 px-6 py-3 font-semibold text-white transition hover:bg-green-700"
            >
              ← Back to Products
            </button>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      {/* Add To Cart Toast */}
      {added && (
        <div className="fixed right-5 top-5 z-[9999] w-[260px] overflow-hidden rounded-md bg-white shadow-lg ring-1 ring-gray-200">
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
              onClick={() => setAdded(false)}
              className="text-lg text-gray-400 hover:text-gray-700"
            >
              ×
            </button>
          </div>

          {/* Green Progress Line */}
          <div className="h-1 w-full bg-gray-200">
            <div
              key={added ? "active" : "inactive"}
              className="h-full bg-green-500"
              style={{
                animation: "toastProgress 2.5s linear forwards",
              }}
            />
          </div>

          <style>
            {`
              @keyframes toastProgress {
                from { width: 100%; }
                to { width: 0%; }
              }
            `}
          </style>
        </div>
      )}

      {/* Product Details */}
      <div className="mx-auto max-w-6xl px-4 py-12">
        {/* Back To Products Button */}
        <button
          onClick={() => navigate("/Product")}
          className="mb-6 inline-flex items-center gap-2 rounded-lg border border-green-600 bg-white px-5 py-3 font-semibold text-green-700 transition hover:bg-green-600 hover:text-white"
        >
          <span className="text-xl">←</span>
          Back to Products
        </button>

        <div className="grid grid-cols-1 items-center gap-10 rounded-2xl bg-white p-5 shadow-lg md:grid-cols-2 md:p-10">
          {/* Product Image */}
          <div className="flex h-[350px] items-center justify-center overflow-hidden rounded-xl bg-gray-50 p-5 md:h-[450px]">
            <img
              src={product.product_img}
              alt={product.product_name}
              className="h-full w-full object-contain"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
          </div>

          {/* Product Information */}
          <div>
            <span className="inline-block rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
              Fresh Product
            </span>

            <h1 className="mt-5 text-3xl font-bold text-gray-800 md:text-4xl">
              {product.product_name}
            </h1>

            <div className="mt-4">
              <span className="text-3xl font-bold text-blue-600">
                ₹{product.price}
              </span>
            </div>

            <div className="mt-6 space-y-4 text-gray-600">
              <p>
                <span className="font-semibold text-gray-800">
                  Product Name:
                </span>{" "}
                {product.product_name}
              </p>

              <p>
                <span className="font-semibold text-gray-800">
                  Color:
                </span>{" "}
                <span className="font-medium text-gray-700">
                  {productColor}
                </span>
              </p>

              <p>
                <span className="font-semibold text-gray-800">
                  Availability:
                </span>{" "}
                <span className="font-semibold text-green-600">
                  In Stock
                </span>
              </p>

              <p className="leading-7">
                Enjoy fresh and quality products at the best price.
                Add this product to your cart and shop with ease.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <button
                onClick={isAdded ? handleGoToCart : handleAddToCart}
                className="flex-1 rounded-lg border-2 border-blue-600 bg-blue-600 px-6 py-3 font-bold text-white transition hover:bg-blue-700"
              >
                {isAdded ? "Go To Cart" : "Add To Cart"}
              </button>

              <button
                onClick={handleBuyNow}
                className="flex-1 rounded-lg bg-blue-600 px-6 py-3 font-bold text-white transition hover:bg-blue-700"
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default ProductDetails;
