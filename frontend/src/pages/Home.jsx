import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";
import API from "../services/api";

const SectionTitle = ({ label, title, onClick }) => (
  <div className="mb-7 flex items-end justify-between">
    <div>
      <p className="text-xs uppercase tracking-[0.2em] text-gray-500">
        {label}
      </p>

      <h2 className="mt-2 text-2xl font-semibold">{title}</h2>
    </div>

    {onClick && (
      <button
        onClick={onClick}
        className="text-sm underline underline-offset-4"
      >
        View All
      </button>
    )}
  </div>
);

const ProductGrid = ({ products, loading }) => {
  if (loading) {
    return (
      <p className="py-10 text-center text-sm text-gray-500">
        Loading products...
      </p>
    );
  }

  if (!products.length) {
    return (
      <p className="py-10 text-center text-sm text-gray-500">
        No products available.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
};

export default function Home() {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  

  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "bot",
      text: "Hi! How can I help you with EliteMart?",
    },
  ]);
  const [message, setMessage] = useState("");
  const [chatLoading, setChatLoading] = useState(false);

  const chatEndRef = useRef(null);

  

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await API.get("/products");
        setProducts(data.products || []);
      } catch (error) {
        console.log("Products fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  

  useEffect(() => {
    if (chatOpen) {
      chatEndRef.current?.scrollIntoView({
        behavior: "smooth",
      });
    }
  }, [messages, chatLoading, chatOpen]);

  

  const sendMessage = async () => {
    const userMessage = message.trim();

    if (!userMessage || chatLoading) return;

    const history = messages
      .filter((item) => !item.isError)
      .slice(-10)
      .map((item) => ({
        role: item.role === "user" ? "user" : "assistant",
        content: item.text,
      }));

    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        text: userMessage,
      },
    ]);

    setMessage("");
    setChatLoading(true);

    try {
      const { data } = await API.post("/api/chatbot", {
        message: userMessage,
        history,
      });

      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          text: data.reply,
        },
      ]);
    } catch (error) {
      console.log("Chatbot error:", error);

      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          text:
            error.response?.data?.message ||
            "Sorry, something went wrong. Please try again.",
          isError: true,
        },
      ]);
    } finally {
      setChatLoading(false);
    }
  };

  

  const categories = [
    ...new Set(
      products
        .map((product) => product.category?.toLowerCase())
        .filter(Boolean),
    ),
  ];

  const genders = [
    ...new Set(
      products
        .map((product) => product.gender?.toLowerCase())
        .filter((gender) => gender && gender !== "unisex"),
    ),
  ];

  const newArrivals = [...products].reverse().slice(0, 8);

  const trending = products
    .filter((product) => product.isActive !== false)
    .slice(0, 8);

  const genderImages = {
    men: "/photo-1668603145974-c05f7a0e4552.avif",
    women: "/photo-1483985988355-763728e1935b.avif",
    kids: "/premium_photo-1697612943572-460a55c10ec1.avif",
  };
  return (
    <>
      <Navbar />

      <main className="bg-white text-gray-900">
        

        <section className="mx-auto max-w-7xl px-4 py-6">
          <div className="grid min-h-500px overflow-hidden bg-gray-100 md:grid-cols-2">
            <div className="flex items-center p-8 sm:p-12 md:p-14">
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-gray-500">
                  New Collection
                </p>

                <h1 className="mt-5 max-w-lg text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
                  Simple products.
                  <br />
                  Better everyday.
                </h1>

                <p className="mt-6 max-w-md text-gray-600">
                  Discover quality products for your everyday needs.
                </p>

                <div className="mt-8 flex gap-3">
                  <button
                    onClick={() => navigate("/products")}
                    className="bg-black px-7 py-3 text-sm text-white hover:bg-gray-800"
                  >
                    Shop Now
                  </button>

                  <button
                    onClick={() => navigate("/products")}
                    className="border border-black px-7 py-3 text-sm hover:bg-black hover:text-white"
                  >
                    Explore Collection
                  </button>
                </div>
              </div>
            </div>

            <img
              src="/photo-1790350758123-99abf6002274.avif"
              alt="EliteMart Collection"
              className="h-full min-h-350px w-full object-cover"
            />
          </div>
        </section>

        

        <section className="mx-auto max-w-7xl px-4 py-14">
          <SectionTitle label="Explore" title="Shop by category" />

          <div className="grid grid-cols-2 border-l border-t border-gray-200 sm:grid-cols-3 lg:grid-cols-6">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() =>
                  navigate(`/products?category=${encodeURIComponent(category)}`)
                }
                className="border-b border-r border-gray-200 p-6 text-left text-sm capitalize hover:bg-gray-50"
              >
                {category}
              </button>
            ))}
          </div>
        </section>

      

        <section className="mx-auto max-w-7xl px-4 py-14">
          <SectionTitle
            label="Discover your style"
            title="Shop by collection"
          />

          <div className="grid gap-4 sm:grid-cols-3">
  {genders.map((gender) => (
    <button
      key={gender}
      onClick={() => navigate(`/products?gender=${gender}`)}
      className="group relative h-80 overflow-hidden bg-gray-100 text-left"
    >
      <img
        src={genderImages[gender]}
        alt={gender}
        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
      />

      <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20" />

      <div className="absolute bottom-6 left-6 text-white">
        <h3 className="text-2xl font-semibold uppercase">
          {gender}
        </h3>

        <span className="mt-2 inline-block text-sm underline">
          Shop Now
        </span>
      </div>
    </button>
  ))}
</div>
        </section>

        

        <section className="mx-auto max-w-7xl px-4 py-14">
          <SectionTitle
            label="Just In"
            title="New Arrivals"
            onClick={() => navigate("/products")}
          />

          <ProductGrid products={newArrivals} loading={loading} />
        </section>

      

        <section className="mx-auto max-w-7xl px-4 py-8">
          <div className="flex min-h-260px items-center justify-center bg-black px-6 py-12 text-center text-white">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-gray-300">
                EliteMart Deals
              </p>

              <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">
                Great products.
                <br />
                Better prices.
              </h2>

              <p className="mx-auto mt-4 max-w-md text-sm text-gray-300">
                Explore our latest products and discover great deals.
              </p>

              <button
                onClick={() => navigate("/products")}
                className="mt-7 bg-white px-7 py-3 text-sm text-black hover:bg-gray-200"
              >
                Shop Deals
              </button>
            </div>
          </div>
        </section>

    

        <section className="mx-auto max-w-7xl px-4 py-14">
          <SectionTitle
            label="Popular Picks"
            title="Trending Products"
            onClick={() => navigate("/products")}
          />

          <ProductGrid products={trending} loading={loading} />
        </section>

    
        <section className="border-y border-gray-200 bg-gray-50">
          <div className="mx-auto max-w-7xl px-4 py-14">
            <div className="mb-10 text-center">
              <p className="text-xs uppercase tracking-[0.2em] text-gray-500">
                Shopping with confidence
              </p>

              <h2 className="mt-2 text-2xl font-semibold">
                Why Choose EliteMart?
              </h2>
            </div>

            <div className="grid gap-8 text-center sm:grid-cols-2 lg:grid-cols-4">
              <div>
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-gray-300 text-xl">
                  🚚
                </div>

                <h3 className="mt-4 font-semibold">Fast Delivery</h3>

                <p className="mt-2 text-sm leading-6 text-gray-600">
                  Get your products delivered quickly and safely.
                </p>
              </div>

              <div>
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-gray-300 text-xl">
                  🔒
                </div>

                <h3 className="mt-4 font-semibold">Secure Payment</h3>

                <p className="mt-2 text-sm leading-6 text-gray-600">
                  Safe checkout with secure payment options.
                </p>
              </div>

              <div>
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-gray-300 text-xl">
                  ↩️
                </div>

                <h3 className="mt-4 font-semibold">Easy Returns</h3>

                <p className="mt-2 text-sm leading-6 text-gray-600">
                  Simple return experience for your purchases.
                </p>
              </div>

              <div>
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-gray-300 text-xl">
                  ✓
                </div>

                <h3 className="mt-4 font-semibold">Quality Products</h3>

                <p className="mt-2 text-sm leading-6 text-gray-600">
                  Explore products across multiple categories.
                </p>
              </div>
            </div>
          </div>
        </section>

        

        <section className="mx-auto max-w-7xl px-4 py-14">
          <SectionTitle
            label="Recommended"
            title="Featured Products"
            onClick={() => navigate("/products")}
          />

          <ProductGrid products={products.slice(0, 8)} loading={loading} />
        </section>
      </main>

      

      <div className="fixed bottom-6 right-6 z-50">
        {chatOpen && (
          <div className="mb-4 flex h-500px w-350px max-w-[calc(100vw-3rem)] flex-col overflow-hidden border border-gray-200 bg-white shadow-2xl">
          

            <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4">
              <div>
                <p className="text-[10px] uppercase tracking-[0.25em] text-gray-500">
                  EliteMart
                </p>

                <h3 className="mt-1 text-sm font-medium">Shopping Assistant</h3>
              </div>

              <button
                onClick={() => setChatOpen(false)}
                className="text-xl font-light text-gray-500 hover:text-black"
              >
                ×
              </button>
            </div>

            

            <div className="flex-1 space-y-3 overflow-y-auto bg-gray-50 p-4">
              {messages.map((item, index) => (
                <div
                  key={index}
                  className={`flex ${
                    item.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[80%] whitespace-pre-wrap wrap-break-words px-4 py-3 text-sm leading-5 ${
                      item.role === "user"
                        ? "bg-black text-white"
                        : "border border-gray-200 bg-white text-gray-800"
                    }`}
                  >
                    {item.text}
                  </div>
                </div>
              ))}

              {chatLoading && (
                <div className="flex justify-start">
                  <div className="border border-gray-200 bg-white px-4 py-3 text-sm text-gray-500">
                    Thinking...
                  </div>
                </div>
              )}

              <div ref={chatEndRef} />
            </div>

            

            <div className="border-t border-gray-200 bg-white p-3">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={message}
                  maxLength={500}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      sendMessage();
                    }
                  }}
                  placeholder="Ask something..."
                  className="min-w-0 flex-1 border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-black"
                />

                <button
                  onClick={sendMessage}
                  disabled={chatLoading || !message.trim()}
                  className="bg-black px-4 py-2.5 text-sm text-white hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        )}

      

        <button
          onClick={() => setChatOpen((prev) => !prev)}
          className="ml-auto flex h-14 w-14 items-center justify-center rounded-full bg-black text-xl text-white shadow-lg transition hover:scale-105"
        >
          {chatOpen ? "×" : "✦"}
        </button>
      </div>

      <Footer />
    </>
  );
}
