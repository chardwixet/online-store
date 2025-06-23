import { useDispatch, useSelector } from "react-redux";
import style from "./CartShopList.module.scss";
import { RootState } from "@/store";
import { CartItem } from "../CartItem";
import { openModal } from "@/store/slices/modalSlice";

export interface Computer {
  id: number;
  img: string;
  title: string;
  price: number;
  discount?: number;
  rate: number;
  descr: string;
}

export interface Products {
  title: string;
  arr: Computer[];
}

export function CartShopList() {
  const data = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();

  return (
    <div className={style.content}>
      <h2 className={style.title}>Корзина</h2>
      <div className={style.cart}>
        <ul className={style.cartList}>
          {Object.values(data.products).map((item) => (
            <li key={item.data.title + item.data.id}>
              <CartItem item={item} />
            </li>
          ))}
        </ul>
        <div className={style.right}>
          <div className={style.total}>
            <div className={style.totalPrice}>
              <span>ИТОГО</span>
              <span>₽ {data.totalPrice.toLocaleString("ru-RU")}</span>
            </div>
            <button
              className={`${style.pay} ${!data.totalCount && style.disabled}`}
              onClick={() =>
                dispatch(
                  openModal({
                    modalName: "payModal",
                    props: {
                      total: {
                        totalPrice: data.totalPrice,
                        totalCount: data.totalCount,
                      },
                    },
                  })
                )
              }
            >
              Перейти к оформлению
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
