import React, { useContext, useEffect, useState } from "react";
import SummaryAPI from "../common";
import Context from "../context";

const Cart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const context = useContext(Context);
  const loadingCart = new Array(context?.cartProductCount).fill(null);

  const fetchData = async () => {
    setLoading(true);
    const responce = await fetch(SummaryAPI.addToCartProductView.url, {
      method: SummaryAPI.addToCartProductView.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
    });

    setLoading(false);
    const responceData = await responce?.json();

    console.log(responceData, "responce");

    if (responceData?.success) {
      setData(responceData?.data);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="container mx-auto px-5 ">
      <div className="text-center text-lg my-3">
        {data.length === 0 && !loading && (
          <p className="bg-white py-5">No Data</p>
        )}
      </div>

      <div className="flex flex-col lg:flex-row gap-10 lg:justify-between p-4">
        {/* view product */}
        <div className="w-full max-w-3xl">
          {loading
            ? loadingCart.map((el) => (
                <div
                  key={el + "Add to cart"}
                  className="w-full bg-slate-200 h-32 my-2 border border-slate-300 animate-pulse rounded "
                ></div>
              ))
            : data?.map((product, index) => (
                <div
                  key={product + "Add to cart"}
                  className="w-full bg-white h-32 my-2 border border-slate-300  rounded grid grid-cols-[128px,1fr] "
                >
                  <div className="w-32 h-32 bg-slate-200">
                    <img
                      src={product?.productId?.productImage[0]}
                      alt=""
                      className="w-full h-full object-scale-down mix-blend-multiply"
                    />
                  </div>
                  <div className="p-4">
                    <h2 className="text-lg lg:text-xl text-ellipsis line-clamp-1">
                      {product?.productId?.productName}
                    </h2>
                    <p>{product?.productId?.category}</p>
                  </div>
                </div>
              ))}
        </div>

        {/* Summary */}

        <div className="mt-5 lg:mt-0 w-full max-w-sm">
          {loading ? (
            <div className="h-36 bg-slate-200 border border-slate-300 animate-pulse">
              Total
            </div>
          ) : (
            <div className="h-36 bg-slate-200">Total</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
