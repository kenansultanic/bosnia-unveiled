import "./search-bar.scss";
import useScrollPos from "hooks/useScrollPos";
import useSnapScrolled from "hooks/useSnapScrolled";

const SearchBar = () => {
    const isSnapScrolled = useSnapScrolled();

    const cn = `search-bar${isSnapScrolled ? "-snap-scrolled" : ""}`;

    return (
        <div className={`search-bar-container`}>
            <form className="search-bar-form">
                <div className="search-bar-inputs"></div>
                <button className="search-bar-submit-button">
                    <span className="material-symbols-outlined search-bar-submit-button-icon">
                        search
                    </span>
                    <span className="search-bar-submit-button-text">Search</span>
                </button>
            </form>
        </div>
    );
};

export default SearchBar;