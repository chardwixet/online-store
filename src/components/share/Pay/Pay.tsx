import { Headphone } from "../CardList";
import Star from "@assets/icons/star.svg?react";
import { calcDisc } from "@/helper/discount";
import Cleave from "cleave.js/react";
import style from "./Pay.module.scss";
import { cvv, expirationDate, number } from "card-validator";
import { useState } from "react";

interface Props {
  total: {
    totalCount: number;
    totalPrice: number;
  };
}

export function Pay({ total }: Props) {
  const [cardData, setCardData] = useState({
    number: "",
    expiry: "",
    cvv: "",
  });

  const [errors, setErrors] = useState({
    number: "",
    expiry: "",
    cvv: "",
  });

  function validateNumber() {
    const newErrors = {
      number: "",
      expiry: "",
      cvv: "",
    };

    const numberValidation = number(cardData.number);
    if (!numberValidation.isValid) {
      newErrors.number = "Неверный номер карты";
    }

    const expiryValidation = expirationDate(cardData.expiry);
    if (!expiryValidation.isValid) {
      newErrors.expiry = "Неверный срок карты";
    }

    const cvvValidation = cvv(cardData.cvv);
    if (!cvvValidation.isValid) {
      newErrors.cvv = "Неверный cvv карты";
    }

    setErrors(newErrors);
    return Object.values(newErrors).every((error) => !error);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (validateNumber()) {
      console.log("валидно");
    }
  }

  return (
    <div className={style.content}>
      <div className={style.cartInfo}>
        <span>Количество товаров: {total.totalCount}</span>
        <span>Сумма: {total.totalPrice.toLocaleString("ru-RU")} ₽</span>
      </div>

      <form onSubmit={handleSubmit} className={style.form}>
        <div className={style.info}>
          <label>Номер карты</label>
          <Cleave
            className={`${style.input} ${style.number}`}
            placeholder="0000 0000 0000 0000"
            options={{
              delimiter: " ",
              blocks: [4, 4, 4, 4],
              numericOnly: true,
            }}
            onChange={(e) =>
              setCardData({ ...cardData, number: e.target.value })
            }
          ></Cleave>
          {errors.number && <div style={{ color: "red" }}>{errors.number}</div>}
        </div>
        <div className={style.bottomInfo}>
          <div className={style.info}>
            <label>Срок действия</label>
            <Cleave
              className={`${style.input} ${style.expire}`}
              placeholder="ММ / ГГ"
              options={{ date: true, datePattern: ["m", "y"] }}
              onChange={(e) =>
                setCardData({ ...cardData, expiry: e.target.value })
              }
            />
            {errors.expiry && (
              <div style={{ color: "red" }}>{errors.expiry}</div>
            )}
          </div>

          <div className={style.info}>
            <label>CVC/CVV</label>
            <Cleave
              className={`${style.input} ${style.cvv}`}
              onChange={(e) =>
                setCardData({ ...cardData, cvv: e.target.value })
              }
              options={{ blocks: [3], numericOnly: true }}
            />
            {errors.cvv && <div style={{ color: "red" }}>{errors.cvv}</div>}
          </div>
        </div>

        <button type="submit" className={style.btn}>
          Оплатить {total.totalPrice.toLocaleString("ru-RU")} ₽
        </button>
      </form>
    </div>
  );
}
