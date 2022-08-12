const BASE_URL = 'http://3.38.183.31:8000';
const API = {
  allProduct: `${BASE_URL}/products`,
  productList: `${BASE_URL}/products?`,
  subCategory: `${BASE_URL}/products?second_category=`,
  follow: `${BASE_URL}/posts/follow`,
  search: `${BASE_URL}/search/products?keyword=`,
  login: `${BASE_URL}/users/login`,
};
export default API;
