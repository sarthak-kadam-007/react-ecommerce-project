
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Comman/Navbar";
import Footer from "../Comman/Footer";

function Cart() {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);

  useEffect(() => {
    try {
      const savedCart = JSON.parse(
        localStorage.getItem("cart") || "[]"
      );

      setCart(Array.isArray(savedCart) ? savedCart : []);
    } catch {
      setCart([]);
    }
  }, []);

  const updateCart = (updatedCart) => {
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const increaseQty = (id) => {
    const updatedCart = cart.map((item) =>
      String(item.id) === String(id)
        ? {
            ...item,
            quantity: (Number(item.quantity) || 1) + 1,
          }
        : item
    );

    updateCart(updatedCart);
  };

  const decreaseQty = (id) => {
    const updatedCart = cart.map((item) =>
      String(item.id) === String(id)
        ? {
            ...item,
            quantity: Math.max(
              1,
              (Number(item.quantity) || 1) - 1
            ),
          }
        : item
    );

    updateCart(updatedCart);
  };

  const removeItem = (id) => {
    const updatedCart = cart.filter(
      (item) => String(item.id) !== String(id)
    );

    updateCart(updatedCart);
  };

  const totalItems = cart.reduce(
    (sum, item) => sum + (Number(item.quantity) || 1),
    0
  );

  const totalPrice = cart.reduce(
    (sum, item) =>
      sum +
      (Number(item.price) || 0) *
        (Number(item.quantity) || 1),
    0
  );

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-50 px-4 py-10">
        <div className="mx-auto max-w-6xl">
          <h1 className="mb-8 text-center text-3xl font-bold text-gray-800">
            My Shopping Cart 🛒
          </h1>

          {cart.length === 0 ? (
            <div className="rounded-2xl bg-white p-10 text-center shadow-md">
              <div className="mb-4 text-6xl">🛒</div>

              <h2 className="mb-3 text-2xl font-bold text-gray-800">
                Your Cart is Empty!
              </h2>

              <p className="mb-6 text-gray-500">
                Please add your favourite fruits to the cart.
              </p>

              <button
                onClick={() => navigate("/Product")}
                className="rounded-lg bg-green-600 px-6 py-3 font-semibold text-white hover:bg-green-700"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
              <div className="space-y-5 lg:col-span-2">
                {cart.map((item, index) => (
                  <div
                    key={item.id || index}
                    className="flex flex-col gap-5 rounded-xl bg-white p-5 shadow-md sm:flex-row sm:items-center"
                  >
                    <div className="flex h-32 items-center justify-center rounded-lg bg-gray-50 p-2 sm:w-32">
                      <img
                        src={item.image || item.product_img}
                        alt={item.name || item.product_name || "Product"}
                        className="h-full w-full object-contain"
                      />
                    </div>

                    <div className="flex-1">
                      <h2 className="text-xl font-bold text-gray-800">
                        {item.name || item.product_name}
                      </h2>

                      <p className="mt-2 text-lg font-semibold text-green-700">
                        ₹{Number(item.price || 0).toFixed(2)}
                      </p>

                      <div className="mt-4 flex items-center gap-3">
                        <button
                          onClick={() => decreaseQty(item.id)}
                          className="h-9 w-9 rounded-md border border-gray-300 font-bold hover:bg-gray-100"
                        >
                          −
                        </button>

                        <span className="min-w-6 text-center font-semibold">
                          {item.quantity || 1}
                        </span>

                        <button
                          onClick={() => increaseQty(item.id)}
                          className="h-9 w-9 rounded-md border border-gray-300 font-bold hover:bg-gray-100"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end">
                      <p className="font-bold text-gray-800">
                        ₹
                        {(
                          Number(item.price || 0) *
                          (Number(item.quantity) || 1)
                        ).toFixed(2)}
                      </p>

                      <button
                        onClick={() => removeItem(item.id)}
                        className="rounded-lg bg-red-50 px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-100"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}

                <button
                  onClick={() => navigate("/Product")}
                  className="rounded-lg border border-green-600 px-5 py-3 font-semibold text-green-700 hover:bg-green-50"
                >
                  ← Continue Shopping
                </button>
              </div>

              <div className="h-fit rounded-xl bg-white p-6 shadow-md">
                <h2 className="mb-6 text-xl font-bold text-gray-800">
                  Order Summary
                </h2>

                <div className="mb-4 flex justify-between text-gray-600">
                  <span>Total Items</span>
                  <span>{totalItems}</span>
                </div>

                <div className="mb-4 flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>₹{totalPrice.toFixed(2)}</span>
                </div>

                <div className="mb-6 flex justify-between border-t pt-4">
                  <span className="font-bold text-gray-800">
                    Total Price
                  </span>

                  <span className="text-xl font-bold text-green-700">
                    ₹{totalPrice.toFixed(2)}
                  </span>
                </div>

                <button
                  onClick={() => navigate("/Checkout")}
                  className="w-full rounded-lg bg-green-600 px-5 py-3 font-semibold text-white hover:bg-green-700"
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Cart;
