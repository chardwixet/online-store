import { Headphone } from "../CardList/CardList";
import { useDispatch } from "react-redux";
import { setProduct } from "@/store/slices/cartSlice";
import { calcDisc } from "@/helper/discount";
import { openModal } from "@/store/slices/modalSlice";
import Star from "@assets/icons/star.svg?react";
import Eye from "@assets/icons/eye.svg?react";

import style from "./Card.module.scss";
import { imageLink } from "@/helper/imageLink";

interface Props {
  item: Headphone;
}

export function Card({ item }: Props) {
  const dispatch = useDispatch();

  const price = item.discount
    ? calcDisc(item.price, item.discount)
    : item.price;

  const imageUrl = imageLink(item.img);

  function handleClick(headphone: Headphone) {
    dispatch(setProduct(headphone));
  }

  return (
    <div className={style.card}>
      <div className={style.imgContent}>
        <img className={style.img} src={imageUrl} alt={item.title} />
      </div>
      <div className={style.info}>
        <div className={style.top}>
          <span className={style.title}>{item.title}</span>
          <div className={style.contentPrice}>
            <span className={style.price}>
              {price.toLocaleString("ru-RU")} ₽
            </span>
            {item.discount && (
              <span className={style.discount}>
                {item.price.toLocaleString("ru-RU")} ₽
              </span>
            )}
          </div>
        </div>
        <div className={style.bottom}>
          <span className={style.rate}>
            <Star />
            {item.rate}
          </span>

          <div className={style.btnContent}>
            <button
              className={style.btnShow}
              onClick={() => {
                dispatch(
                  openModal({
                    modalName: "productModal",
                    props: { product: item },
                  })
                );
              }}
            >
              <Eye />
            </button>

            <button
              type="button"
              onClick={() => handleClick(item)}
              className={style.btn}
            >
              Купить
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
