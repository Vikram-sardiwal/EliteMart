
import { FaShoppingCart } from "react-icons/fa";
import { FiPackage } from "react-icons/fi";
import { FiShoppingBag } from "react-icons/fi";
import { FiUsers } from "react-icons/fi";
import { FiGrid } from "react-icons/fi";
import { FiArchive } from "react-icons/fi";
import { FiStar } from "react-icons/fi";
import { FiSettings } from "react-icons/fi";
import { FiLogOut } from "react-icons/fi";
import { FiBell } from "react-icons/fi";
import { FiShield } from "react-icons/fi";
import { FiTrendingUp } from "react-icons/fi";
import { FiSearch } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white text-black">

      {/* ================= SIDEBAR ================= */}
      <aside className="fixed left-0 top-0 z-30 h-screen w-64 border-r border-gray-200 bg-white">

        {/* LOGO */}
        <div
          onClick={() => navigate("/admin")}
          className="flex h-20 cursor-pointer items-center border-b border-gray-200 px-6"
        >
          <FaShoppingCart className="mr-3 text-2xl" />

          <div>
            <h1 className="text-lg font-black tracking-wide">
              ELITEMART
            </h1>

            <p className="text-[10px] uppercase tracking-[0.2em] text-gray-500">
              Admin Panel
            </p>
          </div>
        </div>

        {/* NAVIGATION */}
        <div className="px-4 py-7">

          <p className="mb-4 px-3 text-[11px] font-semibold tracking-[0.15em] text-gray-400">
            MANAGEMENT
          </p>

          <nav className="space-y-1">

            {/* PRODUCTS */}
            <div
              onClick={() => navigate("/admin/products")}
              className="group flex cursor-pointer items-center gap-4 border-l-2 border-transparent px-3 py-3 text-sm transition hover:border-black hover:bg-gray-100"
            >
              <FiPackage className="text-lg" />
              <span>Products</span>
            </div>

            {/* ORDERS */}
            <div
              className="group flex cursor-pointer items-center gap-4 border-l-2 border-transparent px-3 py-3 text-sm transition hover:border-black hover:bg-gray-100"
            >
              <FiShoppingBag className="text-lg" />
              <span>Orders</span>
            </div>

            {/* USERS */}
            <div
              className="group flex cursor-pointer items-center gap-4 border-l-2 border-transparent px-3 py-3 text-sm transition hover:border-black hover:bg-gray-100"
            >
              <FiUsers className="text-lg" />
              <span>Users</span>
            </div>

            {/* CATEGORIES */}
            <div
              className="group flex cursor-pointer items-center gap-4 border-l-2 border-transparent px-3 py-3 text-sm transition hover:border-black hover:bg-gray-100"
            >
              <FiGrid className="text-lg" />
              <span>Categories</span>
            </div>

            {/* MANAGE */}
            <div
              onClick={() => navigate("/admin/manageproduct")}
              className="group flex cursor-pointer items-center gap-4 border-l-2 border-transparent px-3 py-3 text-sm transition hover:border-black hover:bg-gray-100"
            >
              <FiArchive className="text-lg" />
              <span>Manage Products</span>
            </div>

            {/* REVIEWS */}
            <div
              className="group flex cursor-pointer items-center gap-4 border-l-2 border-transparent px-3 py-3 text-sm transition hover:border-black hover:bg-gray-100"
            >
              <FiStar className="text-lg" />
              <span>Reviews</span>
            </div>

          </nav>

          {/* ADMIN */}
          <p className="mb-4 mt-10 px-3 text-[11px] font-semibold tracking-[0.15em] text-gray-400">
            ADMIN
          </p>

          <nav className="space-y-1">

            {/* SETTINGS */}
            <div
              className="flex cursor-pointer items-center gap-4 border-l-2 border-transparent px-3 py-3 text-sm transition hover:border-black hover:bg-gray-100"
            >
              <FiSettings className="text-lg" />
              <span>Settings</span>
            </div>

            {/* LOGOUT */}
            <div
              className="flex cursor-pointer items-center gap-4 border-l-2 border-transparent px-3 py-3 text-sm transition hover:border-black hover:bg-gray-100"
            >
              <FiLogOut className="text-lg" />
              <span>Logout</span>
            </div>

          </nav>

        </div>
      </aside>


      {/* ================= MAIN ================= */}
      <main className="ml-64">

        {/* ================= TOP NAVBAR ================= */}
        <header className="flex h-20 items-center justify-between border-b border-gray-200 bg-white px-8">

          {/* SEARCH */}
          <div className="relative w-96">

            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

            <input
              type="text"
              placeholder="Search products, orders..."
              className="w-full border border-gray-300 bg-white py-3 pl-11 pr-4 text-sm outline-none transition focus:border-black"
            />

          </div>


          {/* RIGHT */}
          <div className="flex items-center gap-8">

            {/* NOTIFICATION */}
            <div className="relative cursor-pointer">

              <FiBell className="text-xl" />

              <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-black text-[9px] text-white">
                3
              </span>

            </div>


            {/* PROFILE */}
            <div className="flex items-center gap-3 border-l border-gray-200 pl-6">

              <div className="flex h-10 w-10 items-center justify-center bg-black text-white">
                <FiShield className="text-lg" />
              </div>

              <div>
                <p className="text-sm font-semibold">
                  ELITEMART
                </p>

                <p className="text-xs text-gray-500">
                  Administrator
                </p>
              </div>

            </div>

          </div>

        </header>


        {/* ================= CONTENT ================= */}
        <section className="px-8 py-10">

          {/* HEADING */}
          <div className="mb-10">

            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
              Admin Dashboard
            </p>

            <h1 className="text-4xl font-bold tracking-tight">
              Dashboard
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              Overview of your store performance.
            </p>

          </div>


          {/* ================= STAT CARDS ================= */}
          <div className="grid grid-cols-4 gap-5">

            {/* PRODUCTS */}
            <div className="border border-gray-200 bg-white p-6 transition hover:border-black">

              <div className="flex items-start justify-between">

                <div>
                  <p className="text-xs uppercase tracking-wider text-gray-500">
                    Total Products
                  </p>

                  <h2 className="mt-4 text-3xl font-bold">
                    248
                  </h2>
                </div>

                <FiPackage className="text-2xl text-gray-400" />

              </div>

              <div className="mt-6 flex items-center gap-2 text-xs text-gray-500">
                <FiTrendingUp />
                <span>12% vs last week</span>
              </div>

            </div>


            {/* ORDERS */}
            <div className="border border-gray-200 bg-white p-6 transition hover:border-black">

              <div className="flex items-start justify-between">

                <div>
                  <p className="text-xs uppercase tracking-wider text-gray-500">
                    Total Orders
                  </p>

                  <h2 className="mt-4 text-3xl font-bold">
                    1,542
                  </h2>
                </div>

                <FiShoppingBag className="text-2xl text-gray-400" />

              </div>

              <div className="mt-6 flex items-center gap-2 text-xs text-gray-500">
                <FiTrendingUp />
                <span>18% vs last week</span>
              </div>

            </div>


            {/* USERS */}
            <div className="border border-gray-200 bg-white p-6 transition hover:border-black">

              <div className="flex items-start justify-between">

                <div>
                  <p className="text-xs uppercase tracking-wider text-gray-500">
                    Total Users
                  </p>

                  <h2 className="mt-4 text-3xl font-bold">
                    3,892
                  </h2>
                </div>

                <FiUsers className="text-2xl text-gray-400" />

              </div>

              <div className="mt-6 flex items-center gap-2 text-xs text-gray-500">
                <FiTrendingUp />
                <span>22% vs last week</span>
              </div>

            </div>


            {/* REVENUE */}
            <div className="border border-gray-200 bg-white p-6 transition hover:border-black">

              <div className="flex items-start justify-between">

                <div>
                  <p className="text-xs uppercase tracking-wider text-gray-500">
                    Total Revenue
                  </p>

                  <h2 className="mt-4 text-2xl font-bold">
                    ₹7,48,320
                  </h2>
                </div>

                <span className="text-2xl font-semibold">
                  ₹
                </span>

              </div>

              <div className="mt-6 flex items-center gap-2 text-xs text-gray-500">
                <FiTrendingUp />
                <span>16% vs last week</span>
              </div>

            </div>

          </div>


          {/* ================= LOWER SECTION ================= */}
          <div className="mt-8 grid grid-cols-3 gap-5">

            {/* SALES */}
            <div className="col-span-2 border border-gray-200 bg-white p-7">

              <div className="flex items-center justify-between">

                <div>
                  <h2 className="text-xl font-bold">
                    Sales Overview
                  </h2>

                  <p className="mt-1 text-sm text-gray-500">
                    Monthly sales performance
                  </p>
                </div>

                <button className="border border-black px-5 py-2 text-xs font-semibold uppercase tracking-wide transition hover:bg-black hover:text-white">
                  View Report
                </button>

              </div>


              {/* GRAPH */}
              <div className="mt-10 flex h-52 items-end gap-4 border-b border-gray-200">

                <div className="w-full bg-gray-200 transition hover:bg-black" style={{ height: "35%" }} />

                <div className="w-full bg-gray-300 transition hover:bg-black" style={{ height: "50%" }} />

                <div className="w-full bg-gray-300 transition hover:bg-black" style={{ height: "43%" }} />

                <div className="w-full bg-gray-400 transition hover:bg-black" style={{ height: "65%" }} />

                <div className="w-full bg-gray-500 transition hover:bg-black" style={{ height: "58%" }} />

                <div className="w-full bg-gray-700 transition hover:bg-black" style={{ height: "82%" }} />

                <div className="w-full bg-black transition hover:bg-gray-700" style={{ height: "74%" }} />

              </div>

              <div className="mt-3 flex justify-between text-[10px] uppercase tracking-wider text-gray-400">
                <span>Mon</span>
                <span>Tue</span>
                <span>Wed</span>
                <span>Thu</span>
                <span>Fri</span>
                <span>Sat</span>
                <span>Sun</span>
              </div>

            </div>


            {/* QUICK STATS */}
            <div className="border border-gray-200 bg-white p-7">

              <h2 className="text-xl font-bold">
                Quick Stats
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Store activity
              </p>


              <div className="mt-7 space-y-3">

                <div className="flex items-center justify-between border-b border-gray-200 py-4">
                  <span className="text-sm">
                    Pending Orders
                  </span>

                  <b className="text-sm">
                    28
                  </b>
                </div>


                <div className="flex items-center justify-between border-b border-gray-200 py-4">
                  <span className="text-sm">
                    Low Stock
                  </span>

                  <b className="text-sm">
                    14
                  </b>
                </div>


                <div className="flex items-center justify-between border-b border-gray-200 py-4">
                  <span className="text-sm">
                    Completed
                  </span>

                  <b className="text-sm">
                    1,420
                  </b>
                </div>


                <div className="flex items-center justify-between py-4">
                  <span className="text-sm">
                    Reviews
                  </span>

                  <b className="text-sm">
                    856
                  </b>
                </div>

              </div>

            </div>

          </div>

        </section>

      </main>

    </div>
  );
}
