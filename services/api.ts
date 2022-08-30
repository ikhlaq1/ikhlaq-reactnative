import Category from "../types/CategoryType";
import ProductData from "../types/ProductTypes";
import http from "./http-common";

const getProductDetails = (id: any) => {
  return http.get<ProductData>(`/products/${id}`);
};
const getAll = () => {
  return http.get<Array<ProductData>>("/products");
};
const getCategories = () => {
  return http.get<Array<Category>>("/categories");
};

const addProduct = (data:ProductData) => {
  return http.post<ProductData>(`/products}`,data);
};

const apiService = {
  getAll,
  getProductDetails,
  getCategories,
  addProduct
};
export default apiService;
