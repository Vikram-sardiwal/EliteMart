
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaGithub,
} from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-gray-200 bg-white text-black">

      
      <div className="mx-auto max-w-7xl px-6 py-12">

        <div className="grid grid-cols-2 gap-10 md:grid-cols-4">

          
          <div>
            <h3 className="mb-6 text-xs font-semibold tracking-widest">
              SHOP
            </h3>

            <div className="space-y-4 text-sm text-gray-600">

              <Link
                to="/products"
                className="block transition hover:text-black"
              >
                All Products
              </Link>

              <Link
                to="/products?category=women"
                className="block transition hover:text-black"
              >
                Women
              </Link>

              <Link
                to="/products?category=men"
                className="block transition hover:text-black"
              >
                Men
              </Link>

              <Link
                to="/products?category=kids"
                className="block transition hover:text-black"
              >
                Kids
              </Link>

              <Link
                to="/products?category=unisex"
                className="block transition hover:text-black"
              >
                Unisex
              </Link>

              <Link
                to="/deals"
                className="block transition hover:text-black"
              >
                Deals
              </Link>

            </div>
          </div>


          
          <div>
            <h3 className="mb-6 text-xs font-semibold tracking-widest">
              ACCOUNT
            </h3>

            <div className="space-y-4 text-sm text-gray-600">

              <Link
                to="/profile"
                className="block transition hover:text-black"
              >
                My Account
              </Link>

              <Link
                to="/orders"
                className="block transition hover:text-black"
              >
                Orders
              </Link>

              <Link
                to="/wishlist"
                className="block transition hover:text-black"
              >
                Wishlist
              </Link>

              <Link
                to="/cart"
                className="block transition hover:text-black"
              >
                Shopping Bag
              </Link>

            </div>
          </div>


          
          <div>
            <h3 className="mb-6 text-xs font-semibold tracking-widest">
              INFORMATION
            </h3>

            <div className="space-y-4 text-sm text-gray-600">

              <Link
                to="/"
                className="block transition hover:text-black"
              >
                About EliteMart
              </Link>

              <Link
                to="/"
                className="block transition hover:text-black"
              >
                Shipping
              </Link>

              <Link
                to="/"
                className="block transition hover:text-black"
              >
                Returns
              </Link>

              <Link
                to="/"
                className="block transition hover:text-black"
              >
                Contact Us
              </Link>

            </div>
          </div>


          
          <div>
            <Link
              to="/"
              className="text-2xl font-bold tracking-tight"
            >
              EliteMart
            </Link>

            <p className="mt-4 max-w-xs text-sm leading-6 text-gray-500">
              Simple shopping. Quality products.
              Everyday essentials.
            </p>

      
            <div className="mt-7 flex gap-5">

              <a
                href="#"
                aria-label="Facebook"
                className="text-gray-500 transition hover:text-black"
              >
                <FaFacebookF size={16} />
              </a>

              <a
                href="#"
                aria-label="Instagram"
                className="text-gray-500 transition hover:text-black"
              >
                <FaInstagram size={17} />
              </a>

              <a
                href="#"
                aria-label="Twitter"
                className="text-gray-500 transition hover:text-black"
              >
                <FaTwitter size={17} />
              </a>

              <a
                href="#"
                aria-label="GitHub"
                className="text-gray-500 transition hover:text-black"
              >
                <FaGithub size={17} />
              </a>

            </div>
          </div>

        </div>
      </div>


      
      <div className="border-t border-gray-200">

        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 py-6 text-xs text-gray-500 sm:flex-row sm:items-center sm:justify-between">

          <p>
            © 2026 EliteMart. All rights reserved.
          </p>

          <div className="flex gap-6">

            <Link
              to="/"
              className="hover:text-black"
            >
              Privacy
            </Link>

            <Link
              to="/"
              className="hover:text-black"
            >
              Terms
            </Link>

          </div>

        </div>

      </div>

    </footer>
  );
}
