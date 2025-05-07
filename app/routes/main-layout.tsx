import type { JSX } from "react";
import { FaHome, FaPen } from "react-icons/fa";
import { Provider } from "react-redux";
import { Link, NavLink, Outlet } from "react-router";

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <Navbar />

      {/* Menu Bar */}
      <MenuBar />

      {/* Main Content */}
      <Outlet />
    </div>
  );
}

function Navbar() {
  return (
    <nav className="bg-blue-500 text-white py-4">
      <div className="container mx-auto flex items-center justify-between px-6">
        <Link to="/" className="flex-col hidden sm:flex">
          <span className="text-2xl font-bold">เบตง "วีระราษฎร์ประสาน"</span>
          <span>ระบบงานสารบรรณออนไลน์</span>
        </Link>
        <Link to="/" className="flex flex-col visible sm:hidden">
          <span className="text-2xl font-bold">วส สารบรรณ</span>
        </Link>
        <div>
          <button className="font-bold bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded focus:outline-none cursor-pointer">
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

type TItemMunu = {
  name: string;
  link: string;
  icon: JSX.Element;
};

function ItemMunu({ item }: { item: TItemMunu }) {
  return (
    <NavLink
      to={item.link}
      className={({ isActive }) =>
        `flex items-center justify-center gap-3 px-4 py-2  hover:bg-gray-600 hover:text-white focus:outline-none rounded font-bold ${
          isActive ? "bg-gray-600 text-white" : "text-gray-700"
        }`
      }
    >
      {item.icon} <span className="hidden sm:flex">{item.name}</span>
    </NavLink>
  );
}

function MenuBar() {
  const items: TItemMunu[] = [
    {
      name: "หน้าแรก",
      link: "/",
      icon: <FaHome />,
    },
    {
      name: "สร้างบันทึก",
      link: "/create",
      icon: <FaPen />,
    },
  ];

  return (
    <div className="bg-gray-100 py-2 border-b border-gray-300">
      <div className="container mx-auto flex space-x-4 px-2">
        {/* Add more menu items as needed */}
        {items.map((item, index) => (
          <ItemMunu item={item} key={index} />
        ))}
      </div>
    </div>
  );
}

export default App;
