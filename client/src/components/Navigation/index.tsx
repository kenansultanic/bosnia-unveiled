import "./navigation.scss";
import Logo from "../../assets/logo.png";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useThunk } from "hooks/useThunk";
import { getSearchedDestinations } from "store";
import { useAppSelector } from "store";
import useScrollPos from "hooks/useScrollPos";
import Button from "components/Button";

const Navigation = () => {
    const [navState, setNavState] = useState("showing");
    const [showSearch, setShowSearch] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const { prevScrollPos, scrollPos } = useScrollPos();

    const [getSearchedDests, isSearchedDestsLoading, searchedDestsError] = useThunk(getSearchedDestinations);

    const { destinations } = useAppSelector(state => state);

    useEffect(() => {
        if (scrollPos > 75 && scrollPos > prevScrollPos) {
            setNavState("hidden");
        } else if (scrollPos > 75 && scrollPos < prevScrollPos) {
            setNavState("minimized")
        } else {
            setNavState("showing");
        }
    }, [scrollPos]);

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        getSearchedDests(searchTerm);
    }

    console.log(destinations)

    return (
        <header className="navigation-container">
            <nav className={`nav-${navState}`}>
                <div className="nav-link">
                    <Link to={"/"}>
                        <span className="material-symbols-outlined">
                            home
                        </span>
                    </Link>
                </div>
                <div className="nav-logo">
                    <img src={Logo} alt="Word Bosnia written in old Bosnian writing" />
                </div>
                <div className="nav-link">
                    <Button
                        variant="search-open"
                        icon="search"
                        iconAriaLabel="Search"
                        onClick={() => setShowSearch(state => !state)} />
                </div>
            </nav>
            {
                showSearch ?
                    <div className="nav-search">
                        <form onSubmit={handleSearchSubmit}>
                            <input type="text" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
                        </form>
                    </div>
                : null
            }
        </header>
    );
};

export default Navigation;