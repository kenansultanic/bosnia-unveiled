import "./navigation.scss";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useScrollPos from "hooks/useScrollPos";

const Navigation = () => {
    const [navState, setNavState] = useState("showing");
    const { prevScrollPos, scrollPos } = useScrollPos();

    useEffect(() => {
        if (scrollPos > 75 && scrollPos > prevScrollPos) {
            setNavState("hidden");
        } else if (scrollPos > 75 && scrollPos < prevScrollPos) {
            setNavState("minimized")
        } else {
            setNavState("showing");
        }
    }, [scrollPos]);

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
                    <span className="material-symbols-outlined">
                        crowdsource
                    </span>
                </div>
                <div className="nav-link">
                    <Link to={"/dest"}>
                        <span className="material-symbols-outlined">
                            search
                        </span>
                    </Link>
                </div>
            </nav>
        </header>
    );
};

export default Navigation;