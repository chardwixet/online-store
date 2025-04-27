import { Route, Routes } from "react-router-dom";
import { Home } from "./components/share/Home";
import { CartShopList } from "./components/share/CartShopList";
import { Layout } from "./components/share/Layout";

export const routes = (
  <Routes>
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="cart" element={<CartShopList />} />
    </Route>
  </Routes>
);
