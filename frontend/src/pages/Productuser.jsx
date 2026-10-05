import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

import ProductCard from "../components/ProductCard";
import API from "../services/api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Productuser() {
  const [products, setProducts] = useState([]);

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();


  const urlSearch = searchParams.get("search") || "";
  const urlCategory = searchParams.get("category") || "";

  const urlGender = searchParams.get("gender") || "";


  const [search, setSearch] = useState(urlSearch);
  const [category, setCategory] = useState(urlCategory);
  const [gender,setGender] = useState(urlGender);
  const [brand, setBrand] = useState("");
  const [sort, setSort] = useState("");



  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await API.get("/products/");

        setProducts(response.data.products || []);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchdata();
  }, []);


  useEffect(() => {
    setSearch(urlSearch);
    setCategory(urlCategory);
    setGender(urlGender);
  }, [urlSearch, urlCategory,urlGender]);

 

  let filteredProducts = products.filter((product) => {
    const searchMatch = product.name
      ?.toLowerCase()
      .includes(search.toLowerCase());

    const categoryMatch =
      category === "" ||
      product.category?.toLowerCase() === category.toLowerCase();

    const brandMatch =
      brand === "" || product.brand?.toLowerCase() === brand.toLowerCase();

      const genderMatch = gender === "" || product.gender?.toLowerCase() === gender.trim().toLowerCase();

    return searchMatch && categoryMatch && genderMatch&& brandMatch;
  });

  

  if (sort === "low") {
    filteredProducts.sort((a, b) => Number(a.price) - Number(b.price));
  }

  if (sort === "high") {
    filteredProducts.sort((a, b) => Number(b.price) - Number(a.price));
  }

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-white">
      

        <section className="border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
            <p className="text-xs font-semibold tracking-[0.25em] uppercase text-gray-500 mb-4">
              ELITEMART COLLECTION
            </p>

            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
              <div>
                <h1 className="text-4xl md:text-6xl font-semibold tracking-tight text-black">
                  Products
                </h1>

                <p className="mt-4 max-w-xl text-sm md:text-base text-gray-500 leading-7">
                  Discover everyday essentials, modern styles and quality
                  products at great prices.
                </p>
              </div>

              <div className="text-sm text-gray-500">
                {filteredProducts.length} Products
              </div>
            </div>
          </div>
        </section>

       

        <section className="border-b border-gray-200 bg-white sticky top-0 z-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex flex-col lg:flex-row gap-3">
              {/* SEARCH */}

              <div className="relative flex-1">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                  🔍
                </span>

                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search products"
                  className="w-full h-12 pl-11 pr-4 bg-gray-50 border border-gray-200 text-sm text-black outline-none focus:border-black transition"
                />
              </div>

         

              <select
                value={category}
                onChange={(e) => {
                  const value = e.target.value;

                  setCategory(value);

                  if (value) {
                    navigate(`/products?category=${value}`);
                  } else {
                    navigate("/products");
                  }
                }}
                className="h-12 lg:w-48 px-4 bg-white border border-gray-200 text-sm text-gray-700 outline-none cursor-pointer focus:border-black"
              >
                <option value="">All Categories</option>

                <option value="electronics">Electronics</option>

                <option value="clothing">Clothing</option>

                <option value="shoes">Shoes</option>

                <option value="beauty">Beauty</option>

                <option value="toys">Toys</option>

                <option value="groceries">Groceries</option>

                <option value="home">Home & Kitchen</option>

                <option value="sports">Sports</option>

                <option value="jewelry">Jewelry</option>

                <option value="books">Books</option>
              </select>

            

              <select
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                className="h-12 lg:w-44 px-4 bg-white border border-gray-200 text-sm text-gray-700 outline-none cursor-pointer focus:border-black"
              >
                <option value="">All Brands</option>

                <option value="nike">Nike</option>

                <option value="adidas">Adidas</option>

                <option value="puma">Puma</option>

                <option value="apple">Apple</option>

                <option value="samsung">Samsung</option>

                <option value="sony">Sony</option>

                <option value="jbl">JBL</option>

                <option value="oneplus">OnePlus</option>
              </select>

         
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="h-12 lg:w-48 px-4 bg-white border border-gray-200 text-sm text-gray-700 outline-none cursor-pointer focus:border-black"
              >
                <option value="">Sort By</option>

                <option value="low">Price: Low to High</option>

                <option value="high">Price: High to Low</option>
              </select>
            </div>
          </div>
        </section>

       

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          {/* TOP INFO */}

          <div className="flex items-center justify-between mb-8">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-gray-400">
                Collection
              </p>

              <h2 className="mt-1 text-xl font-medium text-black">
                All Products
              </h2>
            </div>

            <p className="text-sm text-gray-500">
              {filteredProducts.length} items
            </p>
          </div>

     

          {filteredProducts.length === 0 ? (
            <div className="min-h-75px flex flex-col items-center justify-center text-center border border-gray-200">
              <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center text-xl">
                🔍
              </div>

              <h2 className="mt-5 text-xl font-medium text-black">
                No products found
              </h2>

              <p className="mt-2 text-sm text-gray-500">
                Try another search, category or brand.
              </p>

              <button
                onClick={() => {
                  setSearch("");
                  setCategory("");
                  setGender("");
                  setBrand("");
                  setSort("");
                  navigate("/products");
                }}
                className="mt-6 px-6 py-3 bg-black text-white text-sm font-medium hover:bg-gray-800 transition"
              >
              
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10">
              {filteredProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}
        </section>
      </main>

      <Footer />
    </>
  );
}
