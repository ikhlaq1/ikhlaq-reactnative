import Category from "../types/CategoryType";
import ProductData from "../types/ProductTypes";
import http from "./http-common";

const get = (id: any) => {
  return http.get<ProductData>(`/products/${id}`);
};
const getAll = () => {
  return http.get<Array<ProductData>>("/products");
};
const getCategories = () => {
  return http.get<Array<Category>>("/categories");
};
const apiService = {
  getAll,
  get,
  getCategories,
};
export default apiService;
