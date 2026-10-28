
function Productcard({ title, products }) {
  return (
    <section className="bg-white px-6 md:px-16 py-10">
      <h2 className="mb-6 text-center text-3xl font-bold">
        {title}
      </h2>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((item, index) => (
          <div
            key={item.id || index}
            className="min-w-0 overflow-hidden rounded-xl border bg-white p-3 shadow-md transition hover:-translate-y-1 hover:shadow-xl"
          >
            <img
              src={
                item.product_img ||
                item.product_image ||
                item.image ||
                item.image_url
              }
              alt={item.product_name || item.name || "Product"}
              className="h-52 w-full rounded-lg bg-gray-100 object-cover md:h-64"
            />

            <h3 className="mt-3 truncate text-base font-semibold text-gray-800">
              {item.product_name || item.name || item.product_title}
            </h3>

            <div className="mt-2 flex flex-wrap items-center gap-2 text-sm">
              {(item.oldPrice || item.old_price) && (
                <span className="text-gray-400 line-through">
                  {item.oldPrice || item.old_price}
                </span>
              )}

              <span className="font-bold text-green-700">
                {item.price != null
                  ? `₹${item.price}`
                  : item.product_price != null
                  ? `₹${item.product_price}`
                  : item.product_rate != null
                  ? `₹${item.product_rate}`
                  : "Price unavailable"}
              </span>
            </div>

            <button
              onClick={() =>
                alert(
                  `${item.product_name || item.name || "Product"} selected!`
                )
              }
              className="mt-4 w-full rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700"
            >
              Buy Now
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Productcard;
