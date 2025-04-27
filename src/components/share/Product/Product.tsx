import { Headphone } from "../CardList";
import Star from "@assets/icons/star.svg?react";
import style from "./Product.module.scss";
import { calcDisc } from "@/helper/discount";
import { imageLink } from "@/helper/imageLink";

interface Props {
  product: Headphone;
}

export function Product({ product }: Props) {
  const imageUrl = imageLink(product.img);

  const price = product.discount
    ? calcDisc(product.price, product.discount)
    : product.price;
  return (
    <div className={style.content}>
      <div className={style.imageBlock}>
        <img className={style.img} src={imageUrl} alt={product.title} />
      </div>
      <div>
        <h2>{product.title}</h2>
        <h3>Описание</h3>
        <p>{product.descr}</p>
        <div className={style.contentBottom}>
          <span className={style.rate}>
            <Star />
            {product.rate}
          </span>
          <div className={style.contentPrice}>
            <span className={style.price}>
              {price.toLocaleString("ru-RU")} ₽
            </span>
            {product.discount && (
              <span className={style.discount}>
                {product.price.toLocaleString("ru-RU")} ₽
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
