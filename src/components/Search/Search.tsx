import type React from "react";
import "./Search.scss";

type SearchProps = React.InputHTMLAttributes<HTMLInputElement>;
const CLASS_NAME = "search";

const Search: React.FC<SearchProps> = ({ ...props }) => {
    return (
        <input className={CLASS_NAME} {...props} />
    )
}

export default Search;