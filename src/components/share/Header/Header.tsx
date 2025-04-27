import CartIcon from "@assets/icons/cart.svg?react";

import style from "./Header.module.scss";
import { Link } from "react-router-dom";
import { RootState } from "@/store";
import { useSelector } from "react-redux";
import { Logo } from "@/components/ui/Logo";

export function Header() {
  const data = useSelector((state: RootState) => state.cart);

  return (
    <header className={style.header}>
      <Logo />
      <nav>
        <ul className={style.listBtn}>
          <li className={style.item}>
            <Link className={style.link} to={"/cart"}>
              {data.totalCount > 0 && (
                <span className={`${style.count} ${style.cart}`}>
                  {data.totalCount}
                </span>
              )}
              <CartIcon className={style.icon} />
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
