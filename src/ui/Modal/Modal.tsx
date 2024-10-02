import { ReactNode, useCallback, useEffect, useRef, useState } from "react";
import style from "./Modal.module.scss";
import Portal from "../Portal/Portal";
import { classNames } from "../../utils/classNames";
import { Button } from "../Button";
import { CloseCrossSvg } from "../../assets/svg/CloseCrossSvg";

interface ModalProps {
  children?: ReactNode;
  isOpen?: boolean;
  onClose?: () => void;
  lazy?: boolean;
  hiddenClose?: boolean;
  isSpecial?: boolean;
}

function Modal(props: ModalProps) {
  const {
    children,
    isOpen,
    onClose,
    lazy,
    isSpecial = false,
    hiddenClose = false,
  } = props;

  const [isClosing, setIsClosing] = useState(false);
  const [isMouned, setIsMouned] = useState(false);

  //для первого монтирования если передал lazy
  useEffect(() => {
    if (isOpen) {
      setIsMouned(true);
    }
  }, [isOpen]);

  const timeRef = useRef<ReturnType<typeof setTimeout>>();

  const closeHandler = useCallback(() => {
    if (onClose) {
      setIsClosing(true);
      timeRef.current = setTimeout(() => {
        setIsClosing(false);
        onClose();
      }, 300);
    }
  }, [onClose]);

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeHandler();
      }
    },
    [closeHandler]
  );

  const onContentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  useEffect(() => {
    if (isOpen) {
      window.addEventListener("keydown", onKeyDown);
      document.body.classList.add(style.bodyOpen);
    }

    return () => {
      clearTimeout(timeRef.current);
      window.removeEventListener("keydown", onKeyDown);
      document.body.classList.remove(style.bodyOpen);
    };
  }, [isOpen, onKeyDown]);

  //для первого монтирования

  if (lazy && !isMouned) {
    return null;
  }
  const mods: Record<string, boolean | undefined> = {
    [style.open]: isOpen,
    [style.close]: isClosing,
    [style.special]: isSpecial,
  };

  return (
    <Portal>
      <div className={classNames(style.modal, mods)}>
        <div className={style.overlay} onClick={closeHandler}>
          <div className={style.content} onClick={onContentClick}>
            {hiddenClose && (
              <Button onClick={closeHandler} className={style.closeCross}>
                <CloseCrossSvg />
              </Button>
            )}
            {children}
          </div>
        </div>
      </div>
    </Portal>
  );
}

export default Modal;
