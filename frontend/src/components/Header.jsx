import React, { useContext, useState } from "react";
import Logo from "./Logo";
import { GrSearch } from "react-icons/gr";
import { FaRegCircleUser } from "react-icons/fa6";
import { toast } from "react-toastify";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUserDetails } from "../store/userSlice";
import SummaryAPI from "../common";
import ROLE from "../common/role";
import Context from "../context";

const Header = () => {
  const user = useSelector((state) => state?.user?.user);
  const [menuDisplay, setMenuDisplay] = useState(false);
  const context = useContext(Context);

  const dispatch = useDispatch();
  const handleLogOut = async () => {
    const fetchData = await fetch(SummaryAPI.logout_user.url, {
      method: SummaryAPI.logout_user.method,
      credentials: "include",
    });

    const data = await fetchData.json();

    if (data.success) {
      toast.success(data.message);
      dispatch(setUserDetails(null));
    }
    if (data.error) {
      toast.error(data.message);
    }
  };
  console.log(context, "context");

  return (
    <header className=" bg-slate-100 h-16 shadow-md fixed w-full z-40">
      <div className="h-full container mx-auto flex items-center px-6 justify-between">
        <div className="">
          <Link to={"/"}>
            <Logo w={90} h={50} />
          </Link>
        </div>
        <div className="hidden lg:flex items-center w-full justify-between max-w-sm border rounded-full focus-within:shadow-md pl-2">
          <input
            placeholder="search Product here..."
            className="w-full outline-none h-8  "
          />
          <div className="text-lg min-w-[50px] h-8  bg-red-600 flex items-center justify-center rounded-r-full text-white">
            <GrSearch />
          </div>
        </div>
        <div className="flex items-center gap-7">
          <div className="relative  flex justify-center">
            {user?._id && (
              <div
                className="text-3xl cursor-pointer relative flex justify-center"
                onClick={() => setMenuDisplay(!menuDisplay)}
              >
                {user?.profilePic ? (
                  <img
                    src={user?.profilePic}
                    alt="user-profile"
                    className="w-10 h-10 rounded-full"
                  />
                ) : (
                  <FaRegCircleUser />
                )}
              </div>
            )}

            {menuDisplay && (
              <div className="absolute bg-white bottom-0 top-11 h-fit p-2 shadow-lg rounded ">
                <nav>
                  {user?.role === ROLE.ADMIN && (
                    <Link
                      to={"/admin-panel/all-products"}
                      className=" whitespace-nowrap hidden md:block  hover:bg-slate-100 p-2 "
                      onClick={() => setMenuDisplay(!menuDisplay)}
                    >
                      Admin Panel
                    </Link>
                  )}
                </nav>
              </div>
            )}
          </div>
          {user?._id && (
            <Link to={"cart"} className="text-2xl relative cursor-pointer">
              <span>
                <FaShoppingCart />
              </span>

              <div className="bg-red-600 text-white w-5 flex p-1 h-5 rounded-full items-center justify-center absolute -top-2 -right-2">
                <p className="text-sm">{context?.cartProductCount}</p>
              </div>
            </Link>
          )}

          <div>
            {user?._id ? (
              <button
                onClick={handleLogOut}
                className="px-3 py-1 rounded-full text-white bg-red-600 hover:bg-red-700"
              >
                Logout
              </button>
            ) : (
              <Link
                to={"/login"}
                className="px-3 py-1 rounded-full text-white bg-red-600 hover:bg-red-700"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
