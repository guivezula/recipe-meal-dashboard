import classNames from "classnames";
import type React from "react";
import Search from "../Search/Search";
import "./Filter.scss";

type FilterProps = React.HTMLAttributes<HTMLInputElement> & {
    onSearch?: (filter: string) => void;
    placeholder?: string;
}

const CLASS_NAME = "filter";

const Filter: React.FC<FilterProps> = ({ placeholder, onSearch, children }) => {
    const handleSearch = (event: any) => {
        const { value } = event.target;
        !!onSearch && onSearch(value as string);
    };

    return (
        <div className={classNames({
            [CLASS_NAME]: true,
            [`${CLASS_NAME}--children`]: !!children,
        })}>
            <Search placeholder={placeholder} onChange={handleSearch} />
            {!!children && children}
        </div>
    )
}

export default Filter;