import React, { useState } from "react";
import loginIcon from "../assest/signin.gif";
import { FaEye } from "react-icons/fa";

import { FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import imageBase64 from "../helpers/imageBase64";
import SummaryAPI from "../common";
import { toast } from "react-toastify";

function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setConfirmPassword] = useState(false);
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    profilePic: "",
  });
  const navigate = useNavigate();
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

    if (data.password === data.confirmPassword) {
      const dataResponce = await fetch(SummaryAPI.signUp.url, {
        method: SummaryAPI.signUp.method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const userData = await dataResponce.json();

      if (userData.success) {
        toast.success(userData.message);
        navigate("/login");
      }

      if (userData.error) {
        toast.error(userData.message);
      }

      console.log(userData, "data");
    } else {
       toast.error("please check the password and confirm password");
    }
  };

  const handleUploadPic = async (e) => {
    const file = e.target.files[0];

    if (!file) {
      console.warn("No file selected.");
      return;
    }

    if (!file.type.startsWith("image/")) {
      console.error("Selected file is not an image.");
      return;
    }

    try {
      const imagePic = await imageBase64(file);

      setData((prev) => ({
        ...prev,
        profilePic: imagePic,
      }));
    } catch (error) {
      console.error("Error converting image to Base64:", error);
    }
  };

  return (
    <section id="signup">
      <div className="mx-auto container p-4">
        <div className="bg-white p-5 w-full max-w-sm mx-auto">
          <div className="w-20 h-20 mx-auto relative overflow-hidden  rounded-full">
            <div>
              <img src={data.profilePic || loginIcon} alt="login-icon" />
            </div>
            <form action="">
              <label>
                <input
                  type="file"
                  className="hidden"
                  onChange={handleUploadPic}
                />
                <div className="text-xs bg-slate-200 bg-opacity-90 pb-4 pt-2 cursor-pointer  text-center absolute bottom-0 w-full">
                  Upload Photo
                </div>
              </label>
            </form>
          </div>
          <form className="pt-6 flex flex-col gap-2" onSubmit={handleOnSubmit}>
            <div className="grid">
              <label>Name:</label>
              <div className="bg-slate-200 p-2">
                <input
                  name="name"
                  value={data.name}
                  onChange={handleOnchange}
                  type="text"
                  placeholder="enter your name"
                  className="w-full h-full outline-none bg-transparent"
                  required
                />
              </div>
            </div>
            <div className="grid">
              <label>Email:</label>
              <div className="bg-slate-200 p-2">
                <input
                  name="email"
                  value={data.email}
                  onChange={handleOnchange}
                  type="email"
                  placeholder="enter your email"
                  className="w-full h-full outline-none bg-transparent"
                  required
                />
              </div>
            </div>
            <div>
              <label>Password:</label>
              <div className="bg-slate-200 flex p-2">
                <input
                  name="password"
                  onChange={handleOnchange}
                  value={data.password}
                  type={showPassword ? "text" : "password"}
                  placeholder="enter your password"
                  className="w-full h-full outline-none bg-transparent"
                  required
                />
                <div
                  className="cursor-pointer text-xl"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <span>{showPassword ? <FaEyeSlash /> : <FaEye />}</span>
                </div>
              </div>
            </div>
            <div>
              <label>Confirm Password:</label>
              <div className="bg-slate-200 flex p-2">
                <input
                  name="confirmPassword"
                  onChange={handleOnchange}
                  value={data.confirmPassword}
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="enter your confirm pssword"
                  className="w-full h-full outline-none bg-transparent"
                  required
                />
                <div
                  className="cursor-pointer text-xl"
                  onClick={() => setConfirmPassword(!showConfirmPassword)}
                >
                  <span>
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
              </div>
            </div>
            <button className="bg-red-600 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6 ">
              Signup
            </button>
          </form>
          <p className="my-4">
            Already have account ?
            <Link
              to={"/login"}
              className="text-red-500  hover:text-red-700 hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}

export default Signup;
