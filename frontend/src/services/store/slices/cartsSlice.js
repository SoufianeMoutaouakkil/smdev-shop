import { createSlice } from "@reduxjs/toolkit";
import { addReducerApiCases } from "../../shared/reducerManager";
import {
  generateApiActions,
  generateExportedActions,
} from "../../shared/actionsManager";

const initialState = localStorage.getItem("carts")
  ? JSON.parse(localStorage.getItem("carts"))
  : { cartItems: [] };

const cartsApiActions = generateApiActions("carts");

const cartsSlice = createSlice({
  name: "carts",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existItem = state.cartItems.find((x) => x.product === item.product);

      if (existItem) {
        state.cartItems = state.cartItems.map((x) =>
          x.product === existItem.product ? item : x
        );
      } else {
        state.cartItems = [...state.cartItems, item];
      }

      state.itemsPrice = state.cartItems.reduce(
        (acc, item) => acc + item.price * item.qty,
        0
      );
      state.deliveryPrice = state.totalPrice > 100 ? 0 : 10;
      state.totalPrice = state.itemsPrice + state.deliveryPrice;

      localStorage.setItem("carts", JSON.stringify(state));
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (x) => x._id !== action.payload._id
      );
    },
  },
  extraReducers: (builder) => {
    addReducerApiCases(builder, cartsApiActions);
  },
});

export const {
  cartsGetAll,
  cartsGetById,
  cartsCreate,
  cartsUpdate,
  cartsRemove,
  cartsSearch,
} = generateExportedActions("carts", cartsApiActions);
export const { addToCart, removeFromCart } = cartsSlice.actions;
export default cartsSlice.reducer;
