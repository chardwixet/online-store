import Lang from "@assets/icons/lang.svg?react";
import Vk from "@assets/icons/vk.svg?react";
import Tg from "@assets/icons/tg.svg?react";
import Phone from "@assets/icons/phone.svg?react";

import style from "./Footer.module.scss";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Logo } from "@/components/ui/Logo";

export function Footer() {
  const [lang] = useState("Ru");

  return (
    <footer className={style.footer}>
      <Logo />
      <div className={style.menu}>
        <ul className={style.listMenu}>
          <li>
            <Link className={style.link} to="">
              Избранное
            </Link>
          </li>
          <li>
            <Link className={style.link} to="/cart">
              Корзина
            </Link>
          </li>
          <li>
            <Link className={style.link} to="">
              Контакты
            </Link>
          </li>
        </ul>
        <div className={style.some}>
          <a className={style.link} href="">
            Условия сервиса
          </a>
          <div className={style.langContent}>
            <Lang />
            <button
              className={`${style.btn} ${lang === "Ru" && style.btnActive}`}
            >
              Рус
            </button>
            <button className={style.btn}>Eng</button>
          </div>
        </div>
      </div>

      <div>
        <ul className={style.listContact}>
          <li className={style.itemSvg}>
            <a href="" className={style.svg}>
              <Vk />
            </a>
          </li>
          <li>
            <a href="" className={style.svg}>
              <Tg />
            </a>
          </li>
          <li>
            <a href="" className={style.svg}>
              <Phone />
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
