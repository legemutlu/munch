import axios from 'axios';

const base = 'http://localhost:8000/api/v1';
const foodUrl = `${base}/foods`;
const categoryUrl = `${base}/categories`;
const userUrl = `${base}/users`;
const inventoryUrl = `${base}/inventories`;

// food api
export const getFoods = () => axios.get(foodUrl);
export const getFood = (id) => axios.get(`${foodUrl}/${id}`);
export const createFood = (food, config) => axios.post(foodUrl, food, config);
export const updateFood = (id, food, config) =>
  axios.patch(`${foodUrl}/${id}`, food, config);
export const deleteFood = (id, config) =>
  axios.delete(`${foodUrl}/${id}`, config);
export const getFoodStats = () => axios.get(`${foodUrl}/food-stats`);

// category api
export const getCategories = () => axios.get(categoryUrl);
export const getCategory = (id) => axios.get(`${categoryUrl}/${id}`);
export const createCategory = (category, config) =>
  axios.post(categoryUrl, category, config);
export const updateCategory = (id, category, config) =>
  axios.patch(`${categoryUrl}/${id}`, category, config);
export const deleteCategory = (id, config) =>
  axios.delete(`${categoryUrl}/${id}`, config);
export const getCategoryStats = () =>
  axios.get(`${categoryUrl}/category-stats`);

// auth api
export const login = (user) => axios.post(`${userUrl}/login`, user);
export const register = (newUser) => axios.post(`${userUrl}/signup`, newUser);
export const updatePassword = (newPassword) =>
  axios.patch(`${userUrl}/updatePassword`, newPassword);
export const resetPassword = (token, passwords) =>
  axios.patch(`${userUrl}/resetPassword/${token}`, passwords);
export const forgotPassword = (email) =>
  axios.post(`${userUrl}/forgotPassword`, email);

// user api
export const getAllUsers = (config) => axios.get(userUrl, config);
export const getUsers = (limit, page, config) =>
  axios.get(`${userUrl}?limit=${limit}&page=${page}`, config);
export const updateUser = (user, config) =>
  axios.patch(`${userUrl}/${user.id}`, user, config);
export const getUser = (id, config) => axios.get(`${userUrl}/${id}`, config);
export const getMe = (config) => axios.get(`${userUrl}/me`, config);
export const updateMe = (user, config) =>
  axios.patch(`${userUrl}/updateMe`, user, config);
export const deleteMe = (config) => axios.delete(`${userUrl}/deleteMe`, config);

// inventory api
export const getAllInventory = (config) => axios.get(inventoryUrl, config);
export const getInventory = (id, config) =>
  axios.get(`${inventoryUrl}/${id}`, config);
export const createInventory = (inventory, config) =>
  axios.post(inventoryUrl, inventory, config);
export const updateInventory = (id, inventory, config) =>
  axios.patch(`${inventoryUrl}/${id}`, inventory, config);
export const deleteInventory = (id, config) =>
  axios.delete(`${inventoryUrl}/${id}`, config);
