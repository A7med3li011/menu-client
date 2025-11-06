import axios from "axios";

// export const baseUrl = `https://admin.patriacoffeebeans.com/api/v1`;
// export const imageBase = `https://admin.patriacoffeebeans.com/uploads/`;
export const baseUrl = `http://localhost:3001/api/v1`;
export const imageBase = `http://localhost:3001/uploads/`;

// ==================== CATEGORIES ====================
export async function getCategories() {
  const { data } = await axios.get(`${baseUrl}/category`);
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
  const { data } = await axios.get(
    `${baseUrl}/product/bysubcat/${subCategoryId}`
  );
  return data;
}

export async function getProduct(id) {
  const { data } = await axios.get(`${baseUrl}/product/${id}`);
  return data;
}
