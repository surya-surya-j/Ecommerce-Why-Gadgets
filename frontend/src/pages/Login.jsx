import React, { useContext, useState } from "react";
import loginIcon from "../assest/signin.gif";
import { FaEye } from "react-icons/fa";

import { FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import SummaryAPI from "../common";
import { toast } from "react-toastify";
import Context from "../context";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const { fetchUserDetails, fetchUserAddToCart } = useContext(Context);

  
  

  const handleOnchange = (e) => {
    const { name, value } = e.target;

    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const dataResponce = await fetch(SummaryAPI?.signIn?.url, {
      method: SummaryAPI?.signIn?.method,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const dataAPI = await dataResponce?.json();

    if (dataAPI?.success) {
      toast.success(dataAPI?.message);
      navigate("/");
      fetchUserDetails();
      fetchUserAddToCart()
    }

    if (dataAPI?.error) {
      toast.error(dataAPI?.message);
    }
  };

  return (
    <section id="login">
      <div className="mx-auto container p-4">
        <div className="bg-white p-5 w-full max-w-sm mx-auto">
          <div className="w-20 h-20 mx-auto">
            <img src={loginIcon} alt="login-icon" />
          </div>
          <form className="pt-6 flex flex-col gap-2" onSubmit={handleOnSubmit}>
            <div className="grid">
              <label>Email:</label>
              <div className="bg-slate-200 p-2">
                <input
                  name="email"
                  value={data?.email}
                  onChange={handleOnchange}
                  type="email"
                  placeholder="enter email"
                  className="w-full h-full outline-none bg-transparent"
                />
              </div>
            </div>
            <div>
              <label>Password:</label>
              <div className="bg-slate-200 flex p-2">
                <input
                  name="password"
                  onChange={handleOnchange}
                  value={data?.password}
                  type={showPassword ? "text" : "password"}
                  placeholder="enter password"
                  className="w-full h-full outline-none bg-transparent"
                />
                <div
                  className="cursor-pointer text-xl"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <span>{showPassword ? <FaEyeSlash /> : <FaEye />}</span>
                </div>
              </div>
              <Link
                to={"/forgot-password"}
                className="block w-fit ml-auto hover:underline hover:text-red-500"
              >
                Forgot Passwod ?
              </Link>
            </div>
            <button className="bg-red-600 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6 ">
              Login
            </button>
          </form>
          <p className="my-4">
            Dont't have account ?{" "}
            <Link
              to={"/signup"}
              className="text-red-500  hover:text-red-700 hover:underline"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}

export default Login;
