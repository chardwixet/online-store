import { Container } from "../Container";
import { Footer } from "../Footer";
import { Header } from "../Header";
import { Outlet } from "react-router-dom";

import style from "./Layout.module.scss";
import { useDispatch } from "react-redux";
import { getProduct } from "@/store/slices/cartSlice";

export function Layout() {
  const dispatch = useDispatch();

  dispatch(getProduct());
  return (
    <Container>
      <div className={style.content}>
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </Container>
  );
}
