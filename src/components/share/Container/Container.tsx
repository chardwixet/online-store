import { PropsWithChildren } from "react";
import style from "./Container.module.scss";

export function Container({ children }: PropsWithChildren) {
  return <div className={style.container}>{children}</div>;
}
