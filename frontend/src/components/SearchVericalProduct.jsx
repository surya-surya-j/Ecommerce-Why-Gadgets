import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import scrollTop from '../helpers/scrollTop';
import displayINRCurrency from '../helpers/displayCurrency';
import addToCart from '../helpers/addtoCart';
import Context from '../context';

const SearchVericalProduct = ({ loading,data=[] }) => {
      const loadingList = new Array(13).fill(null);
      const { fetchUserAddToCart } = useContext(Context);

      const handleAddToCart = async (e, id) => {
        await addToCart(e, id);
        fetchUserAddToCart();
      };
  return (
    <div className=" grid grid-cols-[repeat(auto-fit,minmax(260px,220px))] justify-center gap-2 md:justify-between md:gap-4 overflow-x-scroll scrollbar-none transition-all">
      {loading
        ? loadingList.map((product) => (
            <div className="w-full min-w-[280px]  md:min-w-[320px] max-w-[280px] md:max-w-[320px]   bg-white rounded-sm shadow   ">
              <div className="bg-slate-200 h-48 p-4 min-w-[280px] md:min-w-[145px] flex items-center justify-center animate-pulse "></div>
              <div className="p-4 grid gap-3">
                <p className="font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black py-2 p-1 animate-pulse rounded-full bg-slate-200"></p>
                <p className="capitalize text-slate-500 p-1 animate-pulse rounded-full bg-slate-200 py-2"></p>
                <div className="flex gap-2">
                  <p className="text-red-600 font-medium p-1 animate-pulse rounded-full bg-slate-200 w-full py-2"></p>
                  <p className="text-slate-500  line-through p-1 animate-pulse rounded-full bg-slate-200 w-full py-2"></p>
                </div>
                <button className="text-sm  text-white px-3 animate-pulse rounded-full bg-slate-200 py-2"></button>
              </div>
            </div>
          ))
        : data.map((product, index) => (
            <Link
              to={"/products/" + product?._id}
              className="w-full min-w-[280px]  md:min-w-[260px] max-w-[280px] md:max-w-[260px]   bg-white rounded-sm shadow "
              key={product?._id}
              onClick={scrollTop}
            >
              <div className="bg-slate-200 h-48 p-4 min-w-[280px] md:min-w-[145px] flex items-center justify-center ">
                <img
                  src={product?.productImage[0]}
                  alt=""
                  className="object-scale-down h-full hover:scale-110 transition-all mix-blend-multiply"
                />
              </div>
              <div className="p-4 grid gap-3">
                <h2 className="font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black">
                  {product?.productName}
                </h2>
                <p className="capitalize text-slate-500">{product.category}</p>
                <div className="flex gap-2">
                  <p className="text-red-600 font-medium">
                    {displayINRCurrency(product?.sellingPrice)}
                  </p>
                  <p className="text-slate-500  line-through">
                    {displayINRCurrency(product?.price)}
                  </p>
                </div>
                <button
                  className="text-sm bg-red-600 hover:bg-red-700 text-white px-3 py-0.5 rounded-full"
                  onClick={(e) => handleAddToCart(e, product?._id)}
                >
                  Add to Cart
                </button>
              </div>
            </Link>
          ))}
    </div>
  );
};

export default SearchVericalProduct