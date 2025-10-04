import classNames from "classnames";
import type React from "react";
import IconSet from "../../assets/icons";
import Icon from "../Icon/Icon";
import "./ButtonIcon.scss";

type ButtonIconProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    icon: keyof typeof IconSet;
    border?: boolean;
}

const CLASS_NAME = "button-icon";

const ButtonIcon: React.FC<ButtonIconProps> = ({ icon, border, ...props}) => {
    return (
        <button className={classNames({
            [CLASS_NAME]: true,
            [`${CLASS_NAME}--border`]: border,
        })} {...props}>
            <Icon icon={icon} />
        </button>
    );
};

export default ButtonIcon;