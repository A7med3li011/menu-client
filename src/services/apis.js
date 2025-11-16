import axios from "axios";

// export const baseUrl = `http://localhost:3001/api/v1`;
// export const imageBase = `http://localhost:3001/uploads/`;

export const baseUrl = `https://api.stationonelounge.com/api/v1`;
export const imageBase = `https://api.stationonelounge.com/uploads/`;

// ==================== CATEGORIES ====================
export async function getCategories() {
  const { data } = await axios.get(`${baseUrl}/category`);
  return data?.data;
}
export async function getOffers() {
  const { data } = await axios.get(`${baseUrl}/offers/slider`);
  return data?.data;
}
export async function getOfferDetails(id) {
  const { data } = await axios.get(`${baseUrl}/offers/slider/${id}`);
  return data?.data;
}

export async function getCategory(id) {
  const { data } = await axios.get(`${baseUrl}/category/${id}`);
  return data;
}

// ==================== SUBCATEGORIES ====================
export async function getSubCategoriesByCategory(categoryId) {
  const { data } = await axios.get(
    `${baseUrl}/subcategory/category/${categoryId}`
  );
  return data.data || [];
}

export async function getSubCategory(id) {
  const { data } = await axios.get(`${baseUrl}/subcategory/${id}`);
  return data;
}

// ==================== PRODUCTS ====================
export async function getProductsBySubCategory(subCategoryId) {
  const { data } = await axios.get(`${baseUrl}/product/cat/${subCategoryId}`);
  return data;
}
export async function getProductsByMainCategory(categoryId) {
  const { data } = await axios.get(`${baseUrl}/product/category/${categoryId}`);
  return data;
}

export async function getProduct(id) {
  const { data } = await axios.get(`${baseUrl}/product/${id}`);
  return data;
}
export async function sendReview(body) {
  const { data } = await axios.post(`${baseUrl}/review`, body);
  return data;
}
