import SummaryAPI from "../common";

const fetchCategoryWiseProduct = async (category) => {
  const response = await fetch(SummaryAPI.categoryWiseProduct.url, {
    method: SummaryAPI.categoryWiseProduct.method,
    headers: {
      "Content-Type": "application/json", // Fixed content-type header
    },
    body: JSON.stringify({
      // Correctly use JSON.stringify
      category: category,
    }),
  });

  const dataResponse = await response.json(); // Fixed typo: responce to response

  return dataResponse;
};

export default fetchCategoryWiseProduct;
