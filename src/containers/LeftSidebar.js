import routes from "../routes/sidebar";
import { NavLink, Link, useLocation } from "react-router-dom";
import XMarkIcon from "@heroicons/react/24/outline/XMarkIcon";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { FaBars, FaGreaterThan, FaLessThan } from "react-icons/fa";

function LeftSidebar() {
  const [sidebarWidth, setSidebarWidth] = useState(320); // Initialize with the full width (320px)
  const location = useLocation();
  const dispatch = useDispatch();

  const close = () => {
    document.getElementById("left-sidebar-drawer").click();
  };

  const handleWidth = () => {
    setSidebarWidth((prevWidth) => (prevWidth === 320 ? 80 : 320));
  };

  return (
    <div
      className="drawer-side z-30 transition-all duration-300 overflow-x-hidden"
      style={{ width: `${sidebarWidth}px` }}
    >
      <label htmlFor="left-sidebar-drawer" className="drawer-overlay"></label>

      <ul className="menu pt-2 bg-base-100 min-h-full text-base-content">
        <button
          className="btn btn-ghost bg-base-300 btn-circle z-50 top-0 right-0 mt-4 mr-2 absolute lg:hidden"
          onClick={close}
        >
          <XMarkIcon className="h-5 inline-block w-5" />
        </button>

        <li className="mb-2 font-semibold text-xl">
          <Link className="justify-between" onClick={handleWidth}>
            {sidebarWidth === 320 && (
              <div className="flex-row flex items-center gap-3">
                <div className="bg-[#5D17EB] p-2 rounded-xl text-white">AC</div>
                <span>AI Caller</span>
              </div>
            )}
            <div className="flex justify-center items-center">
              <FaBars />
            </div>
          </Link>
        </li>
        {routes.map((route, k) => (
          <li key={k}>
            <NavLink
              end
              to={route.path}
              className={({ isActive }) =>
                `${isActive ? "font-semibold bg-base-200" : "font-normal"}`
              }
            >
              {route.icon}
              {sidebarWidth === 320 && <span>{route.name}</span>}{" "}
              {/* Show text only when full width */}
              {location.pathname === route.path ? (
                <span
                  className="absolute inset-y-0 left-0 w-1 rounded-tr-md rounded-br-md bg-primary"
                  aria-hidden="true"
                ></span>
              ) : null}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default LeftSidebar;
