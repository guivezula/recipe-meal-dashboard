import type React from "react";
import type { PropsWithChildren } from "react";
import ButtonIcon from "../ButtonIcon/ButtonIcon";
import "./Modal.scss";

type ModalProps = React.HTMLAttributes<HTMLDivElement> & PropsWithChildren & {
    open: boolean;
    onClose?: () => void;
}

const CLASS_NAME = "modal";

const Modal: React.FC<ModalProps> = ({ children, open, onClose, ...props}) => {
    if (!open) {
        return null;
    }

    return (
        <div className={`${CLASS_NAME}__overlay`} {...props}>
            <div className={CLASS_NAME}>
                <div className={`${CLASS_NAME}__header`}>
                    <ButtonIcon icon="close" onClick={onClose} />
                </div>
                <div className={`${CLASS_NAME}__content`}>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default Modal;