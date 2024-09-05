const backendDomain = "http://localhost:8000";

const SummaryAPI = {
  signUp: {
    url: `${backendDomain}/api/signup`,
    method: "post",
  },
  signIn: {
    url: `${backendDomain}/api/signin`,
    method: "post",
  },
  current_user: {
    url: `${backendDomain}/api/user-details`,
    method: "get",
  },
  logout_user: {
    url: `${backendDomain}/api/user-logout`,
    method: "get",
  },
  allUser: {
    url: `${backendDomain}/api/all-user`,
    method: "get",
  },
  updateUser: {
    url: `${backendDomain}/api/update-user`,
    method: "post",
  },
  uploadProduct: {
    url: `${backendDomain}/api/upload-product`,
    method: "post",
  },
  allproduct: {
    url: `${backendDomain}/api/get-product`,
    method: "get",
  },
  updateProduct: {
    url: `${backendDomain}/api/update-product`,
    method: "post",
  },
  categoryProducts: {
    url: `${backendDomain}/api/get-categoryProducts`,
    method: "get",
  },
  categoryWiseProduct: {
    url: `${backendDomain}/api/category-products`,
    method: "post",
  },
  productDetails: {
    url: `${backendDomain}/api/product-details`,
    method: "post",
  },
  addToCartProduct: {
    url: `${backendDomain}/api/addtocart`,
    method: "post",
  },
  addToCartProductCount: {
    url: `${backendDomain}/api/countaddtocartproduct`,
    method: "get",
  },
  addToCartProductView: {
    url: `${backendDomain}/api/view-cart-product`,
    method: "get",
  },
  updateCardProduct: {
    url: `${backendDomain}/api/update-cart-product`,
    method: "post",
  },
  deleteCartProduct: {
    url: `${backendDomain}/api/delete-cart-product`,
    method: "post",
  },
  searchProduct: {
    url: `${backendDomain}/api/search`,
    method: "get",
  },
  filterProducts: {
    url: `${backendDomain}/api/filter-product`,
    method:"post"
  },
};

export default SummaryAPI;
