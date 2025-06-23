
import { Computer } from "@/components/share/CartShopList";
import { calcDisc } from "@/helper/discount";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface SomeArr {
  data: Computer;
  count: number;
  price: number;
}

export interface Cart {
  products: Record<string, SomeArr>;
  totalPrice: number;
  totalCount: number;
}

const initialState: Cart = {
  products: {},
  totalPrice: 0,
  totalCount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    getProduct(state) {
      const session = sessionStorage.getItem("cart");
      let cart: Cart;
      if (session) {
        cart = JSON.parse(session);
        state.products = cart.products;
        state.totalCount = cart.totalCount;
        state.totalPrice = cart.totalPrice;
      }
    },
    setProduct(state, action: PayloadAction<Computer>) {
      const product =
        state.products[action.payload.title + "_" + action.payload.id];

      const price = action.payload.discount
        ? calcDisc(action.payload.price, action.payload.discount)
        : action.payload.price;

      state.totalPrice += price;

      state.totalCount += 1;

      if (product) {
        product.count = product.count + 1;

        product.price += price;
      } else {
        state.products[action.payload.title + "_" + action.payload.id] = {
          data: action.payload,
          count: 1,
          price: price,
        };
      }

      sessionStorage.setItem("cart", JSON.stringify(state));
    },
    removeProduct(state, action) {
      const product =
        state.products[action.payload.title + "_" + action.payload.id];

      const price = action.payload.discount
        ? calcDisc(action.payload.price, action.payload.discount)
        : action.payload.price;

      state.totalPrice -= price;
      state.totalCount -= 1;

      if (product.count > 1) {
        product.count -= 1;
        product.price -= price;
      } else {
        delete state.products[action.payload.title + "_" + action.payload.id];
      }

      sessionStorage.setItem("cart", JSON.stringify(state));
    },
    deleteProduct(state, action) {
      const product =
        state.products[action.payload.title + "_" + action.payload.id];

      state.totalPrice -= product.price;
      state.totalCount -= product.count;

      delete state.products[action.payload.title + "_" + action.payload.id];

      sessionStorage.setItem("cart", JSON.stringify(state));
    },
  },
});

export const { getProduct, setProduct, removeProduct, deleteProduct } =
  cartSlice.actions;

export default cartSlice.reducer;
