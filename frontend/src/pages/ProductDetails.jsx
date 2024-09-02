import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SummaryAPI from "../common";
import { FaStar } from "react-icons/fa";
import { FaStarHalf } from "react-icons/fa";
import displayINRCurrency from "../helpers/displayCurrency";
import VerticalCardProduct from "../components/VerticalCardProducts";
import CategoryWiseProducts from "../components/CategoryWiseProducts";


const ProductDetails = () => {
  const [data, setData] = useState({
    productName: "",
    brandName: "",
    category: "",
    productImage: [],
    description: "",
    price: "",
    sellingPrice: "",
  });
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const productImageListLoading = new Array(4).fill(null);
  const [activeImg, setActiveImg] = useState("");
  const [zoomImage, setZoomImage] = useState(false);
  const [zoomCoordinate, setZoomCoordinate] = useState({
    x: 0,
    y: 0,
  });

  const fetchProductDetails = async () => {
    setLoading(true);
    const responce = await fetch(SummaryAPI.productDetails.url, {
      method: SummaryAPI.productDetails.method,
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ productId: params?.id }),
    });
    setLoading(false);
    const dataResponce = await responce.json();

    setData(dataResponce?.data);

    setActiveImg(dataResponce?.data?.productImage[0]);
  };

  useEffect(() => {
    fetchProductDetails();
  }, []);

  const handleMouseEnterProduct = (imageUrl) => {
    setActiveImg(imageUrl);
  };

  const handleZoomImage = useCallback(
    (e) => {
      setZoomImage(true);
      const { left, top, width, height } = e.target.getBoundingClientRect();

      console.log(left, top, width, height, "e");

      const x = (e.clientX - left) / width;
      const y = (e.clientY - top) / height;

      setZoomCoordinate({
        x,
        y,
      });
    },
    [zoomCoordinate]
  );

  const handleLeaveImageZoom = () => {
    setZoomImage(false);
  };
  return (
    <div className="container mx-auto p-4">
      <div className=" min-h-[200px] flex flex-col lg:flex-row gap-4">
        {/* product image */}
        <div className="h-96 flex flex-col lg:flex-row-reverse gap-4">
          <div className="h-[300px] w-[300px] lg:h-96 lg:w-96 bg-slate-200 relative p-2 ">
            <img
              src={activeImg}
              alt=""
              className=" h-full w-full object-scale-down mix-blend-multiply"
              onMouseMove={handleZoomImage}
              onMouseLeave={handleLeaveImageZoom}
            />
            {/* product Zoom */}
            {zoomImage && (
              <div className="hidden lg:block absolute min-w-[500px] min-h-[400px] overflow-hidden bg-slate-200 p-1 -right-[510px] top-0">
                <div
                  className="w-full h-full min-h-[400px] min-w-[500px] mix-blend-multiply scale-125 "
                  style={{
                    backgroundImage: `url(${activeImg})`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: `${zoomCoordinate.x * 100}% ${
                      zoomCoordinate.y * 100
                    }%`,
                  }}
                ></div>
              </div>
            )}
          </div>

          <div className="h-full">
            {loading ? (
              <div className="flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full">
                {productImageListLoading?.map((el, index) => (
                  <div
                    key={"loading-image"}
                    className="h-20 w-20 bg-slate-200 rounded animate-pulse"
                  ></div>
                ))}
              </div>
            ) : (
              <div className="flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full">
                {data?.productImage?.map((imageUrl, index) => (
                  <div
                    key={imageUrl}
                    className="h-20 w-20 bg-slate-200 rounded p-1"
                  >
                    <img
                      src={imageUrl}
                      alt="product-img"
                      className="w-full h-full object-scale-down mix-blend-multiply cursor-pointer"
                      onMouseEnter={() => handleMouseEnterProduct(imageUrl)}
                      onClick={() => handleMouseEnterProduct(imageUrl)}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        {/* product details */}
        {loading ? (
          <div className="grid gap-1 w-full">
            <p className="bg-slate-200 animate-pulse h-6 lg:h-8 w-full rounded-full inline-block "></p>
            <p className="text-2xl lg:text-4xl font-medium h-6 bg-slate-200 animate-pulse w-full lg:h-8"></p>
            <p className="capitalize text-slate-400 bg-slate-200 min-w-[100px] animate-pulse h-6 w-full lg:h-8"></p>

            <div className="text-red-600 bg-slate-200 h-6 lg:h-8 animate-pulse  flex items-center gap-1 w-full"></div>

            <div className="flex items-center gap-2 text-2xl font-medium my-1 h-6 lg:h-8 animate-pulse lg:text-3xl w-full">
              <p className="text-red-600 bg-slate-200 w-full"></p>
              <p className="text-slate-400 line-through bg-slate-200 w-full"></p>
            </div>

            <div className="flex items-center gap-3 my-2 w-full">
              <button className="h-6 lg:h-8 bg-slate-200 rounded animate-pulse w-full"></button>
              <button className="h-6 lg:h-8 bg-slate-200 rounded animate-pulse w-full"></button>
            </div>

            <div className="w-full">
              <p className="text-slate-600 font-medium my-1 h-6 bg-slate-200 lg:h-8 rounded animate-pulse w-full"></p>
              <p className="h-10 bg-slate-200 rounded animate-pulse lg:h-12 w-full"></p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-1">
            <p className="bg-red-200 text-red-600 px-2 rounded-full inline-block w-fit">
              {data?.brandName}
            </p>
            <p className="text-2xl lg:text-4xl font-medium">
              {data?.productName}
            </p>
            <p className="capitalize text-slate-400">{data?.category}</p>

            <div className="text-red-600 flex items-center gap-1">
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStarHalf />
            </div>

            <div className="flex items-center gap-2 text-2xl font-medium my-1 lg:text-3xl">
              <p className="text-red-600">
                {displayINRCurrency(data?.sellingPrice)}
              </p>
              <p className="text-slate-400 line-through">
                {displayINRCurrency(data?.price)}
              </p>
            </div>

            <div className="flex items-center gap-3 my-3">
              <button className="border-2 border-red-600 rounded px-3 py-1 min-w-[120px] text-red-600 font-medium hover:bg-red-600 hover:text-white">
                Buy
              </button>
              <button className="border-2 border-red-600 rounded px-3 py-1 min-w-[120px] font-medium text-white bg-red-600 hover:text-red-600 hover:bg-white ">
                Add to Cart
              </button>
            </div>

            <div>
              <p className="text-slate-600 font-medium my-1">Description:</p>
              <p>{data?.description}</p>
            </div>
          </div>
        )}
      </div>

      {data.category && (
        <CategoryWiseProducts category={data?.category} heading={"Mobiles"} />
      )}
    </div>
  );
};

export default ProductDetails;
