
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../Comman/Navbar";
import Footer from "../Comman/Footer";

const API_URL = "https://a2zithub.org/dairy/abi";

function Checkout() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    mobile: "",
    address: "",
    city: "",
    pincode: "",
  });

  const [loading, setLoading] = useState(false);

  const [cart] = useState(() => {
    try {
      const savedCart = JSON.parse(
        localStorage.getItem("cart") || "[]"
      );

      return Array.isArray(savedCart) ? savedCart : [];
    } catch {
      return [];
    }
  });

  const total = cart.reduce(
    (sum, item) =>
      sum +
      Number(item.price || 0) *
        (Number(item.quantity) || 1),
    0
  );

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((previousForm) => ({
      ...previousForm,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (cart.length === 0) {
      alert("Your cart is empty!");
      navigate("/Product");
      return;
    }

    if (!/^[0-9]{10}$/.test(form.mobile)) {
      alert("Please enter a valid 10-digit mobile number.");
      return;
    }

    if (!/^[0-9]{6}$/.test(form.pincode)) {
      alert("Please enter a valid 6-digit PIN code.");
      return;
    }

    const order = {
      ...form,
      products: cart,
      total_amount: total,
      payment_method: "Cash on Delivery",
    };

    setLoading(true);

    try {
      
      const response = await axios.post(
        `${API_URL}/order_det`,
        order,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Order API Response:", response.data);

      localStorage.setItem(
        "checkoutOrder",
        JSON.stringify(order)
      );

      localStorage.removeItem("cart");

      alert("Order submitted successfully!");

      navigate("/Product");
    } catch (error) {
      console.error(
        "Order submission failed:",
        error.response?.data || error.message
      );

      alert(
        "Order submit nahi zala. API request fields ani backend response check kara."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-100 px-4 py-10">
        <div className="mx-auto max-w-6xl">
          <h1 className="mb-8 text-center text-3xl font-bold text-gray-800">
            Checkout
          </h1>

          <div className="grid gap-8 md:grid-cols-2">
            <form
              onSubmit={handleSubmit}
              className="rounded-xl bg-white p-6 shadow-md"
            >
              <h2 className="mb-5 text-xl font-bold text-gray-800">
                Delivery Information
              </h2>

              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Full Name"
                autoComplete="name"
                required
                className="mb-4 w-full rounded-lg border p-3 outline-none focus:border-green-600"
              />

              <input
                type="tel"
                name="mobile"
                value={form.mobile}
                onChange={handleChange}
                placeholder="Mobile Number"
                autoComplete="tel"
                inputMode="numeric"
                pattern="[0-9]{10}"
                maxLength={10}
                required
                className="mb-4 w-full rounded-lg border p-3 outline-none focus:border-green-600"
              />

              <textarea
                name="address"
                value={form.address}
                onChange={handleChange}
                placeholder="Full Address"
                autoComplete="street-address"
                required
                rows={3}
                className="mb-4 w-full rounded-lg border p-3 outline-none focus:border-green-600"
              />

              <input
                type="text"
                name="city"
                value={form.city}
                onChange={handleChange}
                placeholder="City"
                autoComplete="address-level2"
                required
                className="mb-4 w-full rounded-lg border p-3 outline-none focus:border-green-600"
              />

              <input
                type="text"
                name="pincode"
                value={form.pincode}
                onChange={handleChange}
                placeholder="PIN Code"
                autoComplete="postal-code"
                inputMode="numeric"
                pattern="[0-9]{6}"
                maxLength={6}
                required
                className="mb-5 w-full rounded-lg border p-3 outline-none focus:border-green-600"
              />

              <div className="mb-5 rounded-lg border bg-gray-50 p-4">
                <p className="font-semibold text-gray-800">
                  Payment Method
                </p>

                <p className="mt-2 text-gray-600">
                  Cash on Delivery
                </p>
              </div>

              <button
                type="submit"
                disabled={loading || cart.length === 0}
                className="w-full rounded-lg bg-green-600 py-3 font-bold text-white hover:bg-green-700 disabled:cursor-not-allowed disabled:bg-gray-400"
              >
                {loading ? "Placing Order..." : "Place Order"}
              </button>
            </form>

            <div className="h-fit rounded-xl bg-white p-6 shadow-md">
              <h2 className="mb-5 text-xl font-bold text-gray-800">
                Order Summary
              </h2>

              {cart.length === 0 ? (
                <div className="py-5 text-center">
                  <p className="mb-4 text-gray-500">
                    Your cart is empty.
                  </p>

                  <button
                    type="button"
                    onClick={() => navigate("/Product")}
                    className="rounded-lg bg-green-600 px-5 py-3 font-semibold text-white hover:bg-green-700"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                cart.map((item, index) => (
                  <div
                    key={
                      item.product_tbl_id ||
                      item.id ||
                      index
                    }
                    className="flex justify-between gap-3 border-b py-4"
                  >
                    <div>
                      <p className="font-semibold text-gray-800">
                        {item.product_name ||
                          item.name ||
                          "Product"}
                      </p>

                      <p className="mt-1 text-sm text-gray-500">
                        Quantity: {Number(item.quantity) || 1}
                      </p>

                      <p className="mt-1 text-sm text-gray-500">
                        ₹{Number(item.price || 0).toFixed(2)} each
                      </p>
                    </div>

                    <p className="font-semibold text-gray-800">
                      ₹
                      {(
                        Number(item.price || 0) *
                        (Number(item.quantity) || 1)
                      ).toFixed(2)}
                    </p>
                  </div>
                ))
              )}

              <div className="mt-6 flex justify-between text-xl font-bold">
                <span>Total</span>

                <span className="text-green-700">
                  ₹{total.toFixed(2)}
                </span>
              </div>

              <button
                type="button"
                onClick={() => navigate("/Cart")}
                className="mt-5 w-full rounded-lg border border-green-600 py-3 font-semibold text-green-700 hover:bg-green-50"
              >
                ← Back to Cart
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Checkout;
