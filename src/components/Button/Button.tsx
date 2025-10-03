import type React from "react";
import "./Button.scss";

const CLASS_NAME = "button";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button: React.FC<ButtonProps> = ({ children, ...props}) => {
    return (
        <button className={CLASS_NAME} {...props}>
            {children}
        </button>
    );
}

export default Button;