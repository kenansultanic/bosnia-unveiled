import "./navigation.scss";
import Logo from "../../assets/logo.png";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useThunk } from "hooks/useThunk";
import { getSearchedDestinations } from "store";
import { useAppSelector } from "store";
import useScrollPos from "hooks/useScrollPos";
import Button from "components/Button";
import SearchSkeleton from "./SearchSkeleton";

const Navigation = () => {
    const [navState, setNavState] = useState("showing");
    const [showSearch, setShowSearch] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const { prevScrollPos, scrollPos } = useScrollPos();

    const [getSearchedDests, isSearchedDestsLoading, searchedDestsError] = useThunk(getSearchedDestinations);

    const { destinations: { searchedDestinationsByName } } = useAppSelector(state => state);

    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollPos > 75 && scrollPos > prevScrollPos) {
            setNavState("hidden");
        } else if (scrollPos > 75 && scrollPos < prevScrollPos) {
            setNavState("minimized")
        } else {
            setNavState("showing");
        }
    }, [scrollPos]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                setShowSearch(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref]);

    useEffect(() => {
        const timeout = setTimeout(() => {
            if (searchTerm) {
                getSearchedDests(searchTerm);
            }
        }, 250);

        return () => {
            clearTimeout(timeout);
        };
    }, [searchTerm]);

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
    }

    const renderedSearchedDestinationsByName = searchedDestinationsByName.map((dest, i) => {
        return (
            <Link
                to={`/${dest.id}`}
                key={i}
                className="searched-dest-by-name"
                onClick={() => setShowSearch(false)}>
                <p>{dest.title}</p>
                <p>{dest.sub_title}</p>
            </Link>
        );
    });

    return (
        <header ref={ref} className="navigation-container">
            <nav className={`nav-${navState}`}>
                <div className="nav-link">
                    <Link to={"/destinations?page=1"}>
                        <span className="material-symbols-outlined">
                            map
                        </span>
                    </Link>
                </div>
                <div className="nav-logo">
                    <Link to="/">
                        <img src={Logo} alt="Word Bosnia written in old Bosnian writing" />
                    </Link>
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
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={e => setSearchTerm(e.target.value)}
                                placeholder="Search destinations by name..." />
                        </form>
                        {
                            isSearchedDestsLoading ?
                                <SearchSkeleton /> :
                                searchedDestinationsByName.length > 0 && searchTerm ?
                                    <div className="searched-dests-by-name-container">
                                        {renderedSearchedDestinationsByName}
                                    </div>
                                    : <div>No destinations to show</div>
                        }
                    </div>
                    : null
            }
        </header>
    );
};

export default Navigation;