import axios from 'axios';

const foodUrl = 'http://localhost:8000/api/v1/foods';
const categoryUrl = 'http://localhost:8000/api/v1/categories';
const userUrl = 'http://localhost:8000/api/v1/users';

// food api
export const getFoods = () => axios.get(foodUrl);
export const getFood = id => axios.get(`${foodUrl}/${id}`);
export const createFood = newFood => axios.post(foodUrl, newFood);
export const updateFood = (id, updatedFood) =>
  axios.patch(`${foodUrl}/${id}`, updatedFood);
export const deleteFood = (id, config) => axios.delete(`${foodUrl}/${id}`,config);
export const getFoodStats = () => axios.get(`${foodUrl}/food-stats`);

// category api
export const getCategories = () => axios.get(categoryUrl);
export const getCategory = id => axios.get(`${categoryUrl}/${id}`);
export const createCategory = newCategory =>
  axios.post(categoryUrl, newCategory);
export const updateCategory = (id, updatedCategory) =>
  axios.patch(`${categoryUrl}/${id}`, updatedCategory);
export const deleteCategory = id => axios.delete(`${categoryUrl}/${id}`);
export const getCategoryStats = () =>
  axios.get(`${categoryUrl}/category-stats`);

// auth api
export const login = user => axios.post(`${userUrl}/login`, user);
export const register = newUser => axios.post(`${userUrl}/signup`, newUser);
export const updatePassword = newPassword =>
  axios.patch(`${userUrl}/updatePassword`, newPassword);
export const resetPassword = (token, passwords) =>
  axios.patch(`${userUrl}/resetPassword/${token}`, passwords);
export const forgotPassword = email =>
  axios.post(`${userUrl}/forgotPassword`, email);

// user api
export const getAllUsers = config => axios.get(userUrl, config);
export const getUsers = (limit, page, config) =>
  axios.get(`${userUrl}?limit=${limit}&page=${page}`, config);
export const updateUser = (user, config) =>
  axios.patch(`${userUrl}/${user.id}`, user, config);
export const getUser = (id, config) => axios.get(`${userUrl}/${id}`, config);
export const getMe = config => axios.get(`${userUrl}/me`, config);
export const updateMe = (user, config) => axios.patch(`${userUrl}/updateMe`, user ,config);
export const deleteMe = config => axios.delete(`${userUrl}/deleteMe`,config);
