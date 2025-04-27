import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { Product } from "../Product";
import { useEffect } from "react";
import { closeModal } from "@/store/slices/modalSlice";
import CloseIcon from "@assets/icons/close.svg?react";

import style from "./Modal.module.scss";
import { Pay } from "../Pay";

export function Modal() {
  const modals = useSelector((state: RootState) => state.modal);
  const dispatch = useDispatch();

  useEffect(() => {
    document.body.style.overflow = modals.productModal.isOpen
      ? "hidden"
      : "auto";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [modals.productModal.isOpen]);

  function handleCloseModal(modalName: string) {
    dispatch(closeModal({ modalName }));
  }

  return Object.entries(modals).map(
    ([modalName, { isOpen, props }]) =>
      isOpen && (
        <div
          onClick={() => handleCloseModal(modalName)}
          className={style.back}
          key={modalName}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className={style.modal}
            role="dialog"
            aria-modal="true"
          >
            <button
              type="button"
              className={style.closeBtn}
              onClick={() => handleCloseModal(modalName)}
            >
              <CloseIcon />
            </button>
            {modalName === "productModal" && props?.product && (
              <Product product={props.product} />
            )}
            {modalName === "payModal" && props?.total && (
              <Pay total={props.total} />
            )}
          </div>
        </div>
      )
  );
}
