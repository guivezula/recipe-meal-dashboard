import React from "react";
import IconSet from "../../assets/icons";
import "./Icon.scss";

type IconProps = React.HTMLAttributes<HTMLDivElement> & {
  icon: keyof typeof IconSet;
  size?: string;
};

const CLASS_NAME = "icon";

const Icon: React.FC<IconProps> = ({ icon, size, ...props }) => {
  const IconSVG = IconSet[icon];

  if (IconSVG) {
    return (
      <div className={CLASS_NAME} style={{ width: size, height: size }} {...props}>
        <img src={IconSVG} alt={icon} />
      </div>
    );
  }

  return null;
};

export default Icon;
