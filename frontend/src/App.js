import React from 'react';
import { matchRoutes, Navigate, useLocation, useRoutes, useNavigate } from 'react-router-dom';

//Private Routes
import DashboardLayout from './private/layouts/DashboardLayout';
import AccountView from './private/views/account/AccountView';
import CustomerListView from './private/views/customer/CustomerListView';
import CustomerView from './private/views/customer/CustomerView';
import DashboardView from './private/views/reports/DashboardView';
import LoginView from './private/views/auth/LoginView';
import NotFoundView from './private/views/errors/NotFoundView';
import CategoryListView from './private/views/category/CategoryListView';
import CategoryDetails from './private/views/category/CategoryDetails';
import CategoryCreateView from './private/views/category/CategoryCreateView';
import RegisterView from './private/views/auth/RegisterView';
import SettingsView from './private/views/settings/SettingsView';
import FoodListView from './private/views/food/FoodListView';
import FoodCreate from './private/views/food/FoodCreateView';
import FoodDetails from './private/views/food/FoodDetails';
import InventoryListView from './private/views/inventory/InventoryListView';
import InventoryCreate from './private/views/inventory/InventoryCreateView';
import InventoryDetails from './private/views/inventory/InventoryDetails';
import OrderListView from './private/views/order/OrderListView';
import OrderDetails from './private/views/order/OrderDetails';

//Public Routes
import Container from './web/Container';
import Landing from './web/components/Landing/Landing';
import Login from './web/components/Login/Login.js';
import Register from './web/components/Register/Register';
import Menu from './web/components/Menu/Menu';
import MenuItem from './web/components/MenuItem/MenuItem';
import MenuItemDetail from './web/components/MenuItemDetail/MenuItemDetail';
import Cart from './web/components/Cart/Cart';
import Order from './web/components/Order/Order';
import { useSelector } from 'react-redux';


const App = () => {
  const userLoginState = useSelector(state => state.login);
  const { userInfo } = userLoginState;

  const location = useLocation();
  const navigate = useNavigate();
  console.log(userInfo)
  const routes = [
    {
      path: '/',
      element: <Container />,
      children: [
        { path: 'menu', element: <Menu /> },
        { path: '/:category', element: <MenuItem /> },
        { path: '/:category/:item/:id', element: <MenuItemDetail /> },
        { path: 'cart', element: <Cart /> },
        { path: 'order', element: <Order /> },
        { path: '/', element: <Landing /> },
        { path: 'login', element: <Login /> },
        { path: 'register', element: <Register /> }
      ]
    }
  ];

  if(userInfo && userInfo.user && userInfo.user.role !== "customer"){
    routes.push(
      {
        path: 'business',
        element: <DashboardLayout />,
        children: [
          { path: '/', element: <DashboardView /> },
          { path: 'account', element: <AccountView /> },
          { path: 'customers', element: <CustomerListView /> },
          { path: 'customers/:id', element: <CustomerView /> },
          { path: 'dashboard', element: <DashboardView /> },
          { path: 'settings', element: <SettingsView /> },
          { path: 'login', element: <LoginView /> },
          { path: 'register', element: <RegisterView /> },
          { path: 'foods', element: <FoodListView /> },
          { path: 'foods/create', element: <FoodCreate /> },
          { path: 'foods/:id', element: <FoodDetails /> },
          { path: 'categories', element: <CategoryListView /> },
          { path: 'categories/:id', element: <CategoryDetails /> },
          { path: 'categories/create', element: <CategoryCreateView /> },
          { path: 'inventories', element: <InventoryListView /> },
          { path: 'inventories/:id', element: <InventoryDetails /> },
          { path: 'inventories/create', element: <InventoryCreate /> },
          { path: 'orders', element: <OrderListView /> },
          { path: 'orders/:id', element: <OrderDetails /> },
          { path: '404', element: <NotFoundView /> },
          { path: '*', element: <Navigate to="/business/404" /> }
        ]
      }
    )
  }else if((userInfo && userInfo.user.role === "customer" ) || !userInfo){
    let pathName = location.pathname.split('/')[1];
    if(pathName === "business"){
      navigate('/login')
    }
  }

  return useRoutes(routes);
};

export default App;
