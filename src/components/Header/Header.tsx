import type React from "react";
import "./Header.scss";

type HeaderProps = React.HTMLAttributes<HTMLHeadElement>;

const CLASS_NAME = "header";

const Header: React.FC<HeaderProps> = ({ children, ...props }) => {
    return (
        <header className={CLASS_NAME} {...props}>
            <h1 className={`${CLASS_NAME}__title`}>{children}</h1>
            <div className={`${CLASS_NAME}__line`} />
        </header>
    )
}

export default Header;