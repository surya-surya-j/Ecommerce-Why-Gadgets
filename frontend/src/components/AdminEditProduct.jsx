import React, { useState } from "react";
import { CgClose } from "react-icons/cg";
import productCategory from "../helpers/productCategory";
import { FaCloudUploadAlt } from "react-icons/fa";
import uploadImage from "../helpers/uploadImage";
import DisplayImage from "./DisplayImage";
import { MdDelete } from "react-icons/md";
import SummaryAPI from "../common";
import { toast } from "react-toastify";

const AdminEditProduct = ({ onClose, productData, fetchdata }) => {
  const [openFullScreenImg, setOpenFullScreenImg] = useState(false);
  const [fullScreenImg, setFullScreenImg] = useState("");
  const [data, setData] = useState({
    ...productData,
    productName: productData?.productName,
    brandName: productData?.brandName,
    category: productData?.category,
    productImage: productData?.productImage || [],
    description: productData?.description,
    price: productData?.price,
    sellingPrice: productData?.sellingPrice,
  });

  const handleOnchange = async (e) => {
    const { name, value } = e.target;

    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  const handleUploadProduct = async (e) => {
    const file = e?.target?.files[0];

    const uploadImageCloudinary = await uploadImage(file);

    setData((prev) => {
      return {
        ...prev,
        productImage: [...prev.productImage, uploadImageCloudinary.url],
      };
    });
  };

  const handleDeleteProductImage = async (index) => {
    const newProductImage = [...data.productImage];
    newProductImage.splice(index, 1);
    setData((prev) => {
      return {
        ...prev,
        productImage: [...newProductImage],
      };
    });
  };

  // upload product logic

  const handleOnsubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(SummaryAPI.updateProduct.url, {
      method: SummaryAPI.updateProduct.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const responceData = await response.json();

    if (responceData.success) {
      toast.success(responceData?.message);
      fetchdata();
      onClose();
    }

    if (responceData.error) {
      toast.error(responceData?.message);
    }
  };
  return (
    <div className="fixed bg-slate-200 bg-opacity-35 w-full h-full top-0 left-0 bottom-0 right-0 flex justify-center items-center">
      <div className="bg-white p-4 rounded w-full max-w-2xl h-full max-h-[80%] overflow-hidden">
        <div className="flex justify-between items-center pb-3">
          <h2 className="font-bold">Edit Product</h2>
          <div
            className=" w-fit ml-auto text-2xl hover:text-red-700 cursor-pointer"
            onClick={onClose}
          >
            <CgClose />
          </div>
        </div>

        <form
          className="grid p-4 gap-2 overflow-y-scroll h-full "
          onSubmit={handleOnsubmit}
        >
          <label htmlFor="productName">Product Name :</label>
          <input
            type="text"
            id="productName"
            name="productName"
            placeholder="Enter Product Name"
            value={data.productName}
            onChange={handleOnchange}
            className="p-2 bg-slate-100 border rounded"
            required
          />
          <label htmlFor="productName" className="mt-3">
            Brand Name :
          </label>
          <input
            type="text"
            id="brandName"
            name="brandName"
            placeholder="Enter Brend Name"
            value={data.brandName}
            onChange={handleOnchange}
            className="p-2 bg-slate-100 border rounded"
            required
          />
          <label htmlFor="category" className="mt-3">
            Category :
          </label>
          <select
            name="category"
            id="category"
            value={data.category}
            className="p-2 bg-slate-100 border rounded"
            onChange={handleOnchange}
            required
          >
            <option value={""}>Select Category</option>
            {productCategory.map((el, index) => {
              return (
                <option value={el.value} key={el.value + index}>
                  {el.label}
                </option>
              );
            })}
          </select>

          <label htmlFor="productImage" className="mt-3">
            Product Image
          </label>

          <label htmlFor="uploadImageInput">
            <div className="p-2 bg-slate-100 border rounded h-36 w-full flex justify-center items-center cursor-pointer">
              <div className="text-slate-500 flex justify-center items-center flex-col gap-2">
                <span className="text-4xl">
                  <FaCloudUploadAlt />
                </span>
                <p className="text-sm">Upload Product Image</p>

                <input
                  type="file"
                  id="uploadImageInput"
                  className="hidden"
                  onChange={handleUploadProduct}
                />
              </div>
            </div>
          </label>

          <div>
            {data?.productImage[0] ? (
              <div className="flex gap-2 items-center">
                {data?.productImage.map((el, index) => {
                  return (
                    <div className="relative group" key={index}>
                      <img
                        src={el}
                        width={80}
                        height={80}
                        alt="el"
                        className="bg-slate-100 border cursor-pointer"
                        onClick={() => {
                          setOpenFullScreenImg(true);
                          setFullScreenImg(el);
                        }}
                      />
                      <div
                        className="absolute bottom-0 right-0 p-1 text-white bg-red-600 rounded-full hidden group-hover:block cursor-pointer"
                        onClick={() => handleDeleteProductImage(index)}
                      >
                        <MdDelete />
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-red-600 text-xs">
                * Please Upload product Image
              </p>
            )}
          </div>
          <label htmlFor="price" className="mt-3">
            Price :
          </label>
          <input
            type="number"
            id="price"
            name="price"
            placeholder="Enter price"
            value={data.price}
            onChange={handleOnchange}
            className="p-2 bg-slate-100 border rounded"
            required
          />
          <label htmlFor="sellingPrice" className="mt-3">
            Selling Price:
          </label>
          <input
            type="number"
            id="sellingPrice"
            name="sellingPrice"
            placeholder="Enter price"
            value={data.sellingPrice}
            onChange={handleOnchange}
            className="p-2 bg-slate-100 border rounded"
            required
          />
          <label htmlFor="sellingPrice" className="mt-3">
            Description
          </label>
          <textarea
            name={"description"}
            value={data.description}
            onChange={handleOnchange}
            className="h-28 bg-slate-100 resize-none p-1"
            placeholder="Enter Product Description"
            required
          ></textarea>
          <button className="px-3 py-1 bg-red-600 text-white mb-10 hover:bg-red-700">
            Update Product
          </button>
        </form>
      </div>
      {/* display image full screen */}
      {openFullScreenImg && (
        <DisplayImage
          onClose={() => setOpenFullScreenImg(false)}
          imgUrl={fullScreenImg}
        />
      )}
    </div>
  );
};

export default AdminEditProduct;
