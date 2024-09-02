import React, { useEffect, useState } from "react";
import UploadProduct from "../components/UploadProduct";
import SummaryAPI from "../common";
import AdminProduct from "../components/AdminProduct";

function AllProducts() {
  const [uploadProduct, setUploadProduct] = useState(false);
  const [allproduct, setAllProduct] = useState([]);

  const fetchAllProducts = async () => {
    const productsResponce = await fetch(SummaryAPI.allproduct.url);
    const dataResponce = await productsResponce.json();

    setAllProduct(dataResponce?.data || []);
    console.log(allproduct, "all");
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);
  return (
    <div>
      <div className="bg-white py-2 px-4  flex justify-between items-center">
        <h1 className="font-bold text-lg">AllProducts</h1>
        <button
          className="border-2 border-red-600 text-red-600 py-1 px-3 rounded-full transition-all hover:bg-red-600  hover:text-white"
          onClick={() => setUploadProduct(true)}
        >
          Upload Products
        </button>
      </div>

      {/* All product fetching from DB */}
      <div className="flex items-center justify-around  flex-wrap gap-5 py-4 h-[calc(100vh-205px)] overflow-y-scroll ">
        {allproduct.map((product, index) => {
          return (
            <AdminProduct
              data={product}
              key={index + "all products"}
              fetchdata={fetchAllProducts}
            />
          );
        })}
      </div>

      {/* upload Component product */}
      {uploadProduct && (
        <UploadProduct
          onClose={() => setUploadProduct(false)}
          fetchdata={fetchAllProducts}
        />
      )}
    </div>
  );
}

export default AllProducts;
