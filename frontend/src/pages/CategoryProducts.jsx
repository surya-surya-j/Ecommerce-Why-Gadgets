import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import productCategory from "../helpers/productCategory";

import SearchVericalProduct from "../components/SearchVericalProduct";
import SummaryAPI from "../common";

const CategoryProducts = () => {
  const params = useParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const location = useLocation();
  const urlSearch = new URLSearchParams(location.search);
  const urlcategoryListInArray = urlSearch.getAll("category");

  const urlCategoryListObject = {};

  urlcategoryListInArray.forEach((el) => {
    urlCategoryListObject[el] = true;
  });

  // console.log("urlCategoryListObject", urlCategoryListObject);

  // console.log("urlcategoryListInArray", urlcategoryListInArray);

  const [selectCategory, setSelectCategory] = useState(urlCategoryListObject);
  const [filterCategoryList, setFilterCategoryList] = useState([]);

  // sorting
  const [sortBy, setSortBy] = useState("");

  const fetchData = async () => {
    const responce = await fetch(SummaryAPI.filterProducts.url, {
      method: SummaryAPI.filterProducts.method,
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        category: filterCategoryList,
      }),
    });

    const dataResponce = await responce.json();

    setData(dataResponce?.data || []);
    console.log(dataResponce);
  };

  const handleSelectCategory = (e) => {
    const { name, value, checked } = e.target;

    setSelectCategory((prev) => {
      return {
        ...prev,
        [value]: checked,
      };
    });
  };

  useEffect(() => {
    fetchData();
  }, [filterCategoryList]);

  useEffect(() => {
    const arrayofcategory = Object.keys(selectCategory)
      .map((categoryKeyName) => {
        if (selectCategory[categoryKeyName]) {
          return categoryKeyName;
        }

        return null;
      })
      .filter((el) => el);

    setFilterCategoryList(arrayofcategory);

    const urlFormat = arrayofcategory.map((el, index) => {
      if (arrayofcategory.length - 1 === index) {
        return `category=${el}`;
      }
      return `category=${el}&&`;
    });

    // console.log("urlFormat");
    navigate("/product-category?" + urlFormat.join(""));
    // product-category?category=Mouse&&category=camera
  }, [selectCategory]);

 const handleOnChangeSortBy = (e) => {
   const { value } = e.target;

   setSortBy(value);

   if (value === "asc") {
     setData((preve) => preve.sort((a, b) => a.sellingPrice - b.sellingPrice));
   }

   if (value === "dsc") {
     setData((preve) => preve.sort((a, b) => b.sellingPrice - a.sellingPrice));
   }
 };
  useEffect(() => {}, [sortBy]);

  return (
    <div className="container mx-auto p-4">
      {/* desktop version */}
      <div className="hidden lg:grid grid-cols-[200px,1fr]">
        {/* leftside */}
        <div className="bg-white p-2 min-h-[calc(100vh-120px)] overflow-y-scroll">
          <div>
            {/* sort by */}
            <h3 className="text-base uppercase font-medium text-slate-500 border-b pb-1 border-slate-300 ">
              Sort by
            </h3>

            <form className="text-sm flex flex-col gap-2 py-2">
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  name="sortBy"
                  checked={sortBy === "asc"}
                  onChange={handleOnChangeSortBy}
                  value={"asc"}
                />
                <label>Price - Low to High</label>
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  name="sortBy"
                  checked={sortBy === "dsc"}
                  onChange={handleOnChangeSortBy}
                  value={"dsc"}
                />
                <label>Price - High to Low</label>
              </div>
            </form>
          </div>

          <div>
            {/* filter by */}
            <h3 className="text-base uppercase font-medium text-slate-500 border-b pb-1 border-slate-300 ">
              filter by
            </h3>

            <form className="text-sm flex flex-col gap-2 py-3">
              {productCategory?.map((categoryName, index) => {
                return (
                  <div className="flex items-center  gap-3">
                    <input
                      type="checkbox"
                      name={"category"}
                      checked={selectCategory[categoryName?.value]}
                      value={categoryName?.value}
                      id={categoryName?.value}
                      onChange={handleSelectCategory}
                    />
                    <label htmlFor={categoryName?.value}>
                      {categoryName?.label}
                    </label>
                  </div>
                );
              })}
            </form>
          </div>
        </div>
        {/* right side */}
        <div className="px-4">
          <p className="font-medium text-slate-800 text-lg  my-2">
            Search Results :{data.length}
          </p>
          <div className=" overflow-y-scroll max-h-[calc(100vh-120px)] ">
            {data.length !== 0 && (
              <SearchVericalProduct loading={loading} data={data} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryProducts;
