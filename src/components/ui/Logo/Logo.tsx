import { Link } from "react-router-dom";
import style from "./Logo.module.scss";

export function Logo() {
  return (
    <Link className={style.logo} to={"/"}>
      Logo
    </Link>
  );
}
