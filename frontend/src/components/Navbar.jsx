
import { NavLink, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faUser,
  faCartShopping,
  faBox,
  faBars,
  faXmark,
  faMagnifyingGlass,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";

import API from "../services/api";

export default function Navbar() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [categoryMenu, setCategoryMenu] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await API.get("/products");

        setProducts(response.data.products || []);
      } catch (error) {
        console.log("Navbar products error:", error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");

    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.log("User data error:", error);
        localStorage.removeItem("user");
        setUser(null);
      }
    }
  }, []);

  const genders = [
    ...new Set(
      products
        .map((product) => product.gender?.toLowerCase())
        .filter((gender) => gender && gender !== "unisex"),
    ),
  ];

  const categories = [
    ...new Set(
      products
        .map((product) => product.category?.toLowerCase())
        .filter(Boolean),
    ),
  ];

  // Logout
  const handleLogout = async () => {
    try {
      await API.post("/auth/logout");

      localStorage.removeItem("user");

      setUser(null);

      setMobileMenu(false);
      setCategoryMenu(false);

      navigate("/login");
    } catch (error) {
      console.log("Logout error:", error);
    }
  };

  const handleSearch = (e) => {
    if (e.key === "Enter" && search.trim()) {
      navigate(`/products?search=${encodeURIComponent(search.trim())}`);

      setSearch("");
      setMobileMenu(false);
    }
  };

  const closeMobileMenu = () => {
    setMobileMenu(false);
    setCategoryMenu(false);
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <NavLink
          to="/"
          className="shrink-0 text-xl font-semibold tracking-[0.15em]"
        >
          ELITEMART
        </NavLink>

        <div className="hidden items-center gap-7 text-sm md:flex">
          {genders.map((gender) => (
            <NavLink
              key={gender}
              to={`/products?gender=${gender}`}
              className={({ isActive }) =>
                `uppercase transition ${
                  isActive
                    ? "font-medium text-black"
                    : "text-gray-700 hover:text-black"
                }`
              }
            >
              {gender}
            </NavLink>
          ))}

          <div className="relative">
            <button
              onClick={() => setCategoryMenu(!categoryMenu)}
              className="uppercase text-gray-700 transition hover:text-black"
            >
              CATEGORIES
            </button>

            {categoryMenu && (
              <div className="absolute left-0 top-8 w-52 border border-gray-200 bg-white py-2 shadow-sm">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => {
                      navigate(
                        `/products?category=${encodeURIComponent(category)}`,
                      );

                      setCategoryMenu(false);
                    }}
                    className="block w-full px-4 py-2 text-left text-sm capitalize hover:bg-gray-50"
                  >
                    {category}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="hidden lg:block">
          <div className="flex items-center border-b border-gray-400">
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              className="text-sm text-gray-500"
            />

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={handleSearch}
              placeholder="Search products"
              className="w-52 bg-transparent px-2 py-2 text-sm outline-none"
            />
          </div>
        </div>

        <div className="hidden items-center gap-5 md:flex">
          <NavLink
            to="/wishlist"
            className="text-gray-700 transition hover:text-black"
            title="Wishlist"
          >
            <FontAwesomeIcon icon={faHeart} />
          </NavLink>

          {user ? (
            <button
              onClick={handleLogout}
              className="text-gray-700 transition hover:text-black"
              title="Logout"
            >
              <FontAwesomeIcon icon={faRightFromBracket} />
            </button>
          ) : (
            <NavLink
              to="/login"
              className="text-gray-700 transition hover:text-black"
              title="Login"
            >
              <FontAwesomeIcon icon={faUser} />
            </NavLink>
          )}

          <NavLink
            to="/cart"
            className="text-gray-700 transition hover:text-black"
            title="Cart"
          >
            <FontAwesomeIcon icon={faCartShopping} />
          </NavLink>

          <NavLink
            to="/orders"
            className="text-gray-700 transition hover:text-black"
            title="My Orders"
          >
            <FontAwesomeIcon icon={faBox} />
          </NavLink>
        </div>

        <button
          onClick={() => setMobileMenu(!mobileMenu)}
          className="text-xl md:hidden"
          aria-label="Menu"
        >
          <FontAwesomeIcon icon={mobileMenu ? faXmark : faBars} />
        </button>
      </div>

      {mobileMenu && (
        <div className="border-t border-gray-200 bg-white md:hidden">
          <div className="mx-auto max-w-7xl px-4 py-5">
            <div className="mb-6 flex items-center border-b border-gray-400">
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                className="text-sm text-gray-500"
              />

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={handleSearch}
                placeholder="Search products"
                className="w-full bg-transparent px-2 py-3 text-sm outline-none"
              />
            </div>

            <div className="space-y-1">
              {genders.map((gender) => (
                <button
                  key={gender}
                  onClick={() => {
                    navigate(`/products?gender=${gender}`);
                    closeMobileMenu();
                  }}
                  className="block w-full py-3 text-left text-sm font-medium uppercase"
                >
                  {gender}
                </button>
              ))}
            </div>

            <div className="mt-4 border-t border-gray-200 pt-4">
              <p className="mb-2 text-xs font-medium uppercase tracking-wider text-gray-500">
                Categories
              </p>

              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => {
                    navigate(
                      `/products?category=${encodeURIComponent(category)}`,
                    );

                    closeMobileMenu();
                  }}
                  className="block w-full py-2 text-left text-sm capitalize"
                >
                  {category}
                </button>
              ))}
            </div>

            <div className="mt-5 grid grid-cols-4 border-t border-gray-200 pt-5">
              <NavLink
                to="/wishlist"
                onClick={closeMobileMenu}
                className="flex flex-col items-center gap-2 text-xs"
              >
                <FontAwesomeIcon icon={faHeart} />
                Wishlist
              </NavLink>

              {user ? (
                <button
                  onClick={handleLogout}
                  className="flex flex-col items-center gap-2 text-xs"
                  title="Logout"
                >
                  <FontAwesomeIcon icon={faRightFromBracket} />
                  Logout
                </button>
              ) : (
                <NavLink
                  to="/login"
                  onClick={closeMobileMenu}
                  className="flex flex-col items-center gap-2 text-xs"
                >
                  <FontAwesomeIcon icon={faUser} />
                  Profile
                </NavLink>
              )}

              <NavLink
                to="/cart"
                onClick={closeMobileMenu}
                className="flex flex-col items-center gap-2 text-xs"
              >
                <FontAwesomeIcon icon={faCartShopping} />
                Cart
              </NavLink>

              <NavLink
                to="/orders"
                onClick={closeMobileMenu}
                className="flex flex-col items-center gap-2 text-xs"
              >
                <FontAwesomeIcon icon={faBox} />
                Orders
              </NavLink>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
