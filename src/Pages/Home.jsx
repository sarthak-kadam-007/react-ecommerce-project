
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../Comman/Navbar";
import Footer from "../Comman/Footer";

function Home() {
  const navigate = useNavigate();

  const [images, setImages] = useState([]);
  const [sellingProducts, setSellingProducts] = useState([]);
  const [newProducts, setNewProducts] = useState([]);
  const [featureProducts, setFeatureProducts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const [toast, setToast] = useState({
    visible: false,
    productName: "",
  });

  const toastTimer = useRef(null);
  const [toastKey, setToastKey] = useState(0);

  // Slider and Product APIs
  useEffect(() => {
    axios
      .get("https://a2zithub.org/dairy/abi/slider_det")
      .then((res) => {
        const data = Array.isArray(res.data)
          ? res.data
          : Array.isArray(res.data?.data)
          ? res.data.data
          : [];

        setImages(
          data
            .map(
              (item) =>
                item.slider_img ||
                item.slider_image ||
                item.slider_image_url ||
                item.image ||
                item.image_url
            )
            .filter(Boolean)
        );
      })
      .catch((error) =>
        console.log("Slider API Error:", error)
      );

    axios
      .get("https://a2zithub.org/dairy/abi/best_selling_product")
      .then((res) => {
        const data = Array.isArray(res.data)
          ? res.data
          : Array.isArray(res.data?.data)
          ? res.data.data
          : [];

        setSellingProducts(data);
      })
      .catch((error) =>
        console.log("Selling API Error:", error)
      );

    axios
      .get("https://a2zithub.org/dairy/abi/new_product")
      .then((res) => {
        const data = Array.isArray(res.data)
          ? res.data
          : Array.isArray(res.data?.data)
          ? res.data.data
          : [];

        setNewProducts(data);
      })
      .catch((error) =>
        console.log("New Product API Error:", error)
      );

    axios
      .get("https://a2zithub.org/dairy/abi/feature_product")
      .then((res) => {
        const data = Array.isArray(res.data)
          ? res.data
          : Array.isArray(res.data?.data)
          ? res.data.data
          : [];

        setFeatureProducts(data);
      })
      .catch((error) =>
        console.log("Feature API Error:", error)
      );

    return () => {
      if (toastTimer.current) {
        clearTimeout(toastTimer.current);
      }
    };
  }, []);

  // Automatic Slider
  useEffect(() => {
    if (images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [images]);

  // Toast Notification
  const showToast = (productName) => {
    if (toastTimer.current) {
      clearTimeout(toastTimer.current);
    }

    setToast({
      visible: true,
      productName,
    });

    setToastKey((prev) => prev + 1);

    toastTimer.current = setTimeout(() => {
      setToast({
        visible: false,
        productName: "",
      });
    }, 3000);
  };

  // Close Toast
  const closeToast = () => {
    if (toastTimer.current) {
      clearTimeout(toastTimer.current);
    }

    setToast({
      visible: false,
      productName: "",
    });
  };

  // Add To Cart
  const addToCart = (product) => {
    try {
      const savedCart = JSON.parse(
        localStorage.getItem("cart") || "[]"
      );

      const cart = Array.isArray(savedCart) ? savedCart : [];

      const productId =
        product.product_tbl_id || product.id;

      if (!productId) {
        alert("Product ID not available!");
        return;
      }

      const existingProduct = cart.find(
        (item) => String(item.id) === String(productId)
      );

      let updatedCart;

      if (existingProduct) {
        updatedCart = cart.map((item) =>
          String(item.id) === String(productId)
            ? {
                ...item,
                quantity: (Number(item.quantity) || 1) + 1,
              }
            : item
        );
      } else {
        updatedCart = [
          ...cart,
          {
            id: productId,
            product_tbl_id: productId,
            name:
              product.product_name ||
              product.name ||
              "Product",
            product_name:
              product.product_name ||
              product.name ||
              "Product",
            image:
              product.product_img ||
              product.image ||
              "",
            product_img:
              product.product_img ||
              product.image ||
              "",
            price: Number(product.price) || 0,
            quantity: 1,
          },
        ];
      }

      localStorage.setItem(
        "cart",
        JSON.stringify(updatedCart)
      );

      showToast(
        product.product_name || product.name || "Product"
      );
    } catch (error) {
      console.error("Add To Cart Error:", error);
      alert("Unable to add product to cart!");
    }
  };

  // Product Cards
  const renderProducts = (products) => {
    if (!products.length) {
      return (
        <p className="px-6 py-5 text-gray-500">
          No products available.
        </p>
      );
    }

    return (
      <div className="grid grid-cols-1 gap-5 px-4 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product, index) => {
          const id =
            product.product_tbl_id || product.id;

          const name =
            product.product_name ||
            product.name ||
            "Product";

          const image =
            product.product_img ||
            product.image ||
            "";

          const price = Number(product.price) || 0;

          return (
            <div
              key={id || index}
              className="flex flex-col rounded-xl border border-gray-300 bg-white p-3 shadow-md transition hover:shadow-lg"
            >
              <button
                type="button"
                onClick={() =>
                  navigate(`/product_det/${id}`)
                }
                className="flex h-56 w-full items-center justify-center overflow-hidden rounded-lg bg-white"
                aria-label={`View ${name} details`}
              >
                {image ? (
                  <img
                    src={image}
                    alt={name}
                    className="h-full w-full rounded-lg object-contain"
                  />
                ) : (
                  <span className="text-gray-400">
                    Image not available
                  </span>
                )}
              </button>

              <h3 className="mt-3 text-center font-semibold text-gray-800">
                {name}
              </h3>

              <p className="mt-2 text-center font-bold text-green-700">
                ₹{price}
              </p>

              <button
                type="button"
                onClick={() => addToCart(product)}
                className="mt-4 w-full rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-700"
              >
                Add To Cart
              </button>

              <button
                type="button"
                onClick={() =>
                  navigate(`/product_det/${id}`)
                }
                className="mt-3 w-full rounded-lg border border-blue-600 px-4 py-3 text-blue-600 transition hover:bg-blue-50"
              >
                View Details
              </button>
            </div>
          );
        })}
      </div>
    );
  };

  // Product Section
  const renderSection = (title, products) => (
    <section className="py-6">
      <div className="mb-4 flex items-center justify-between px-6">
        <h2 className="text-2xl font-bold text-gray-800">
          {title}
        </h2>

        <Link
          to="/Product"
          className="text-sm font-semibold text-indigo-700 hover:underline"
        >
          View All →
        </Link>
      </div>

      {renderProducts(products)}
    </section>
  );

  return (
    <>
      <Navbar />

      {/* Toast Notification */}
      {toast.visible && (
        <div
          key={toastKey}
          role="status"
          aria-live="polite"
          className="fixed right-5 top-5 z-[9999] w-[290px] overflow-hidden rounded-lg bg-white shadow-xl"
        >
          <div className="flex items-center gap-3 px-4 py-3">
            {/* Green Check Icon */}
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-100">
              <svg
                className="h-5 w-5 text-green-600"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path
                  d="M5 12.5l4.5 4.5L19 7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            {/* Message */}
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-gray-800">
                Added to Cart
              </p>

              <p className="text-xs leading-5 text-gray-500">
                {toast.productName} added successfully!
              </p>
            </div>

            {/* Close Button */}
            <button
              type="button"
              onClick={closeToast}
              aria-label="Close notification"
              className="self-start text-gray-400 hover:text-gray-700"
            >
              ×
            </button>
          </div>

          {/* Green Progress Line */}
          <div className="h-1 w-full bg-gray-200">
            <div
              key={toastKey}
              className="h-full origin-left bg-green-500"
              style={{
                animation: "toast-progress 3s linear forwards",
              }}
            />
          </div>

          <style>
            {`
              @keyframes toast-progress {
                from {
                  transform: scaleX(1);
                }
                to {
                  transform: scaleX(0);
                }
              }
            `}
          </style>
        </div>
      )}

      {/* Large Slider Section */}
      <div className="relative mt-5 w-full overflow-hidden">
        {images.length > 0 ? (
          <img
            src={images[currentIndex]}
            alt="Slider"
            className="h-[350px] w-full object-cover sm:h-[450px] md:h-[600px]"
          />
        ) : (
          <div className="flex h-[350px] w-full items-center justify-center bg-gray-100 sm:h-[450px] md:h-[600px]">
            <p className="text-gray-500">
              Loading Slider...
            </p>
          </div>
        )}

        {images.length > 1 && (
          <>
            <button
              onClick={() =>
                setCurrentIndex(
                  (currentIndex - 1 + images.length) %
                    images.length
                )
              }
              className="absolute left-4 top-1/2 rounded-full bg-black/60 px-4 py-3 text-xl text-white"
            >
              ❮
            </button>

            <button
              onClick={() =>
                setCurrentIndex(
                  (currentIndex + 1) % images.length
                )
              }
              className="absolute right-4 top-1/2 rounded-full bg-black/60 px-4 py-3 text-xl text-white"
            >
              ❯
            </button>

            <div className="absolute bottom-4 flex w-full justify-center gap-2">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-3 w-3 rounded-full ${
                    currentIndex === index
                      ? "bg-white"
                      : "bg-gray-400"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Product Sections */}
      {renderSection(
        "Best Selling Products",
        sellingProducts
      )}

      {renderSection("New Products", newProducts)}

      {renderSection(
        "Feature Products",
        featureProducts
      )}

      <Footer />
    </>
  );
}

export default Home;
