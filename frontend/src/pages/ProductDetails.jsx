
import Reviews from "../components/Reviews";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function ProductDetails() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

 

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await API.get(`/products/${id}`);

        setProduct(response.data.product);
      } catch (error) {
        console.log(
          "Product fetch error:",
          error.response?.data || error.message
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);


  if (loading) {
    return (
      <>
        <Navbar />

        <div className="min-h-screen flex items-center justify-center bg-white">
          <p className="text-sm text-gray-500">
            Loading product...
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

        <div className="min-h-screen flex items-center justify-center bg-white">
          <div className="text-center">
            <h2 className="text-xl font-medium text-black">
              Product not found
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              This product may have been removed.
            </p>
          </div>
        </div>

        <Footer />
      </>
    );
  }

 

  const handleAddToCart = async () => {
    try {
      const response = await API.post("/cart", {
        productId: product._id,
        quantity: 1,
      });

      console.log(response.data);

      alert("Product added to cart!");
    } catch (error) {
      console.log(
        "Add to cart error:",
        error.response?.data || error.message
      );

      alert(
        error.response?.data?.message ||
          "Failed to add product to cart. Please try again."
      );
    }
  };

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-white">

       

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">

          <div className="grid md:grid-cols-2 gap-10 lg:gap-20">

            <div className="relative">

              <div className="aspect-4/5 bg-gray-100 flex items-center justify-center overflow-hidden">

                <img
                  src={`http://localhost:3635/uploads/${product.image}`}
                  alt={product.name}
                  className="w-full h-full object-contain p-8 md:p-12"
                />

              </div>

            </div>


            <div className="flex flex-col justify-center">

          

              <p className="text-[11px] uppercase tracking-[0.2em] text-gray-400">
                {product.category}
              </p>


              <p className="mt-4 text-xs uppercase tracking-[0.2em] text-gray-500">
                {product.brand}
              </p>


              <h1 className="mt-2 text-3xl md:text-5xl font-medium tracking-tight text-black">
                {product.name}
              </h1>

             

              <div className="flex items-center gap-3 mt-5">

                <div className="flex text-sm">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      className={
                        star <= Number(product.rating || 0)
                          ? "text-black"
                          : "text-gray-300"
                      }
                    >
                      ★
                    </span>
                  ))}
                </div>

                <span className="text-xs text-gray-500">
                  {product.rating || 0} ·{" "}
                  {product.numberOfReviews || 0} reviews
                </span>

              </div>


              <div className="border-t border-gray-200 mt-7 pt-6">


                <p className="text-2xl font-medium text-black">
                  ₹{product.price}
                </p>

                <p className="mt-2 text-xs text-gray-400">
                  Inclusive of applicable taxes
                </p>

              </div>


              <div className="border-t border-gray-200 mt-6 pt-6">

                <p className="text-sm text-gray-600 leading-7">
                  {product.description}
                </p>

              </div>

       

              <div className="mt-6">

                {product.stock > 0 ? (
                  <p className="text-xs uppercase tracking-wider text-gray-500">
                    In Stock · {product.stock} available
                  </p>
                ) : (
                  <p className="text-xs uppercase tracking-wider text-red-500">
                    Out of Stock
                  </p>
                )}

              </div>


              <button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className="mt-7 w-full bg-black text-white py-4 text-xs font-medium uppercase tracking-[0.15em] hover:bg-gray-800 transition disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                {product.stock > 0
                  ? "Add to Cart"
                  : "Out of Stock"}
              </button>

            </div>

          </div>

        </section>


        <section className="border-t border-gray-200">

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

            <div className="mb-8">

              <p className="text-[11px] uppercase tracking-[0.2em] text-gray-400">
                Customer Feedback
              </p>

              <h2 className="mt-2 text-2xl font-medium text-black">
                Reviews
              </h2>

            </div>

            <Reviews productId={product._id} />

          </div>

        </section>

      </main>

      <Footer />
    </>
  );
}
