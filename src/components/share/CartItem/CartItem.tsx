import { useDispatch } from "react-redux";
import {
  deleteProduct,
  removeProduct,
  setProduct,
  SomeArr,
} from "@/store/slices/cartSlice";
import PlusIcon from "@assets/icons/plus.svg?react";
import MinusIcon from "@assets/icons/minus.svg?react";
import DeleteIcon from "@assets/icons/delete.svg?react";

import style from "./CartItem.module.scss";
import { calcDisc } from "@/helper/discount";
import { imageLink } from "@/helper/imageLink";
import { Computer } from "../CartShopList";

interface Props {
  item: SomeArr;
}

export function CartItem({ item }: Props) {
  const dispatch = useDispatch();
  const imageUrl = imageLink(item.data.img);

  const price = item.data.discount
    ? calcDisc(item.data.price, item.data.discount)
    : item.data.price;

  function handleAddClick(computer: Computer) {
    dispatch(setProduct(computer));
  }

  function handleRemoveClick(computer: Computer) {
    dispatch(removeProduct(computer));
  }

  function handleDeleteClick(computer: Computer) {
    dispatch(deleteProduct(computer));
  }

  return (
    <div className={style.card}>
      <button
        onClick={() => handleDeleteClick(item.data)}
        className={style.deleteBtn}
      >
        <DeleteIcon />
      </button>
      <div className={style.top}>
        <img className={style.img} src={imageUrl} alt={item.data.title} />
        <div className={style.contentTitle}>
          <span className={style.title}>{item.data.title}</span>
          <span className={style.price}>{price.toLocaleString("ru-RU")} ₽</span>
        </div>
      </div>
      <div className={style.bottom}>
        <div className={style.contentCount}>
          <button
            type="button"
            onClick={() => handleRemoveClick(item.data)}
            className={style.btn}
          >
            <MinusIcon />
          </button>
          <span className={style.count}>{item.count}</span>
          <button
            type="button"
            onClick={() => handleAddClick(item.data)}
            className={style.btn}
          >
            <PlusIcon />
          </button>
        </div>
        <span className={style.priceCard}>
          {item.price.toLocaleString("ru-RU")} ₽
        </span>
      </div>
    </div>
  );
}
