import React, { useEffect, useState } from "react";
import SummaryAPI from "../common/index";
import { Link } from "react-router-dom";

const Categorylist = () => {
  const [categoryProduct, setCategoryproduct] = useState([]);

  const [loading, setLoading] = useState(false);

  const categoryLoading = new Array(13).fill(null);

  const fetchCategoryProduct = async () => {
    setLoading(true);
    const responce = await fetch(SummaryAPI.categoryProducts.url);
    const dataResponce = await responce.json();
    setLoading(false);
    setCategoryproduct(dataResponce.data);
  };

  useEffect(() => {
    fetchCategoryProduct();
  }, []);

  return (
    <div className="container p-2 mx-auto">
      <div className="flex items-center gap-4 justify-between overflow-scroll scrollbar-none">
        {loading
          ? categoryLoading.map((category, index) => (
              <div
                className="h-16 w-16 md:w-20 rounded-full md:h-20 overflow-hidden bg-slate-200 animate-pulse"
                key={index}
              >
                {category}
              </div>
            ))
          : categoryProduct?.map((product, index) => (
              <Link
                to={"/product-category/" + product?.category}
                className="cursor-pointer"
                key={product?._id}
              >
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden p-4 bg-slate-200 flex items-center justify-center">
                  <img
                    src={product?.productImage[0]}
                    alt={product?.category}
                    className="h-full object-scale-down mix-blend-multiply hover:scale-125 transition-all"
                  />
                </div>
                <p className="text-center md:text-base text-sm capitalize">
                  {product?.category}
                </p>
              </Link>
            ))}
      </div>
    </div>
  );
};

export default Categorylist;
