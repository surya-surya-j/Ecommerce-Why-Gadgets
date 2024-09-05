import React, { useContext, useEffect, useState } from "react";
import SummaryAPI from "../common";
import Context from "../context";
import displayINRCurrency from "../helpers/displayCurrency";
import { MdDelete } from "react-icons/md";

const Cart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const context = useContext(Context);
  const loadingCart = new Array(context?.cartProductCount).fill(null);

  const fetchData = async () => {
    const responce = await fetch(SummaryAPI.addToCartProductView.url, {
      method: SummaryAPI.addToCartProductView.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
    });

    const responceData = await responce?.json();

    if (responceData?.success) {
      setData(responceData?.data);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const increaseQty = async (id, qty) => {
    const response = await fetch(SummaryAPI.updateCardProduct.url, {
      method: SummaryAPI.updateCardProduct.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        _id: id,
        quantity: qty + 1,
      }),
    });

    const responceData = await response.json();

    console.log(responceData, "data");

    if (responceData.success) {
      fetchData();
    }
  };

  const decreaseQty = async (id, qty) => {
    if (qty >= 2) {
      const response = await fetch(SummaryAPI.updateCardProduct.url, {
        method: SummaryAPI.updateCardProduct.method,
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          _id: id,
          quantity: qty - 1,
        }),
      });

      const responceData = await response.json();

      console.log(responceData, "data");

      if (responceData.success) {
        fetchData();
      }
    }
  };

  const handleLoading = async () => {
    await fetchData();
  };

  useEffect(() => {
    setLoading(true);
    handleLoading();
    setLoading(false);
  }, []);

  const deleteProduct = async (id) => {
    const response = await fetch(SummaryAPI.deleteCartProduct.url, {
      method: SummaryAPI.deleteCartProduct.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        _id: id,
      }),
    });

    const responceData = await response.json();

    if (responceData.success) {
      fetchData();
      context.fetchUserAddToCart();
    }
  };

  const totalQty = data.reduce(
    (previousValue, currentvalue) => previousValue + currentvalue.quantity,
    0
  );

  const totalPrice = data.reduce(
    (prev, cur) =>
      prev + cur.quantity * cur?.productId?.sellingPrice * cur.quantity,
    0
  );

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
            ? loadingCart.map((el, index) => (
                <div
                  key={el + "Add to cart" + index}
                  className="w-full bg-slate-200 h-32 my-2 border border-slate-300 animate-pulse rounded "
                ></div>
              ))
            : data?.map((product, index) => (
                <div
                  key={product._id}
                  className="w-full bg-white h-32 my-2 border border-slate-300  rounded grid grid-cols-[128px,1fr] "
                >
                  <div className="w-32 h-32 bg-slate-200">
                    <img
                      src={product?.productId?.productImage[0]}
                      alt=""
                      className="w-full h-full object-scale-down mix-blend-multiply"
                    />
                  </div>

                  <div className="px-4 py-2 relative">
                    {/* delete product */}
                    <div
                      className="absolute right-0 text-red-600 rounded-full p-2 hover:bg-red-600 hover:text-white cursor-pointer"
                      onClick={() => deleteProduct(product?._id)}
                    >
                      <MdDelete />
                    </div>
                    <h2 className="text-lg lg:text-xl text-ellipsis line-clamp-1">
                      {product?.productId?.productName}
                    </h2>
                    <p className="text-slate-500 capitalize">
                      {product?.productId?.category}
                    </p>
                    <div className="flex items-center justify-between">
                      <p className="text-red-600 font-medium text-lg">
                        {displayINRCurrency(product?.productId?.sellingPrice)}
                      </p>
                      <p className="text-slate-600 font-semibold  text-lg">
                        {displayINRCurrency(
                          product?.productId?.sellingPrice * product?.quantity
                        )}
                      </p>
                    </div>
                    <div className="flex items-center gap-3 mt-1">
                      <button
                        className="p-1 border border-red-600 hover:bg-red-600 hover:text-white text-red-600 w-6 h-6 flex justify-center items-center rounded "
                        onClick={() =>
                          decreaseQty(product?._id, product?.quantity)
                        }
                      >
                        -
                      </button>
                      <span>{product?.quantity}</span>
                      <button
                        className="p-1 border hover:bg-red-600 hover:text-white border-red-600 text-red-600 w-6 h-6 flex justify-center items-center rounded "
                        onClick={() =>
                          increaseQty(product?._id, product?.quantity)
                        }
                      >
                        +
                      </button>
                    </div>
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
            <div className="h-40 bg-white py-2">
              <h2 className="text-white bg-red-600 px-4 py-1">Summary</h2>
              <div className="flex items-center justify-between px-4 gap-2 font-medium text-lg text-slate-600">
                <p>Quantity</p>
                <p>{totalQty}</p>
              </div>

              <div className="flex items-center justify-between px-4 gap-2 font-medium text-lg text-slate-600">
                <p>Total Price</p>
                <p>{displayINRCurrency(totalPrice)}</p>
              </div>
              <div className="flex items-center justify-center">
                <button className="bg-blue-600 p-2 text-white w-60 rounded-full mt-2  ">
                  Payment
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
