import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_CLEAR_ITEMS,
  CART_INCREASE_QUANTITY,
  CART_DECREASE_QUANTITY
} from '../constants/cartConstants';

export const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const item = action.payload.data.data;

      const existItem = state.cartItems.find(el => el._id === item._id);

      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map(el =>
            el._id === existItem._id ? item : el
          )
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item]
        };
      }

    case CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter(el => el._id !== action.payload)
      };
    case CART_INCREASE_QUANTITY:
      const increseItem = state.cartItems.find(
        el => el._id === action.payload.id
      );
      if (increseItem.quantity >= 1) {
        increseItem.quantity = increseItem.quantity + 1;
        return {
          ...state,
          cartItems: [...state.cartItems]
        };
      }
    case CART_DECREASE_QUANTITY:
      const decreaseItem = state.cartItems.find(
        el => el._id === action.payload.id
      );
      if (decreaseItem.quantity > 1) {
        decreaseItem.quantity = decreaseItem.quantity - 1;
        return {
          ...state,
          cartItems: [...state.cartItems]
        };
      }
    case CART_CLEAR_ITEMS:
      return {
        ...state,
        cartItems: []
      };
    default:
      return state;
  }
};
