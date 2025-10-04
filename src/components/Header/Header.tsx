import classNames from "classnames";
import type React from "react";
import ButtonIcon from "../ButtonIcon/ButtonIcon";
import "./Header.scss";

type HeaderProps = React.HTMLAttributes<HTMLHeadElement> & {
  backButton?: boolean;
  onBackClick?: () => void;
};

const CLASS_NAME = "header";

const Header: React.FC<HeaderProps> = ({
  children,
  backButton,
  onBackClick,
  ...props
}) => {
  return (
    <header className={CLASS_NAME} {...props}>
      <div
        className={classNames({
          [`${CLASS_NAME}__header`]: true,
          [`${CLASS_NAME}__header--button`]: backButton,
        })}
      >
        {backButton && (
          <ButtonIcon border icon="arrow-prev" onClick={onBackClick} />
        )}
        <h1 className={`${CLASS_NAME}__title`}>{children}</h1>
      </div>
      <div className={`${CLASS_NAME}__line`} />
    </header>
  );
};

export default Header;
