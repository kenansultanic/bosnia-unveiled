import "./navigation.scss";
import Logo from "../../assets/logo.png";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useScrollPos from "hooks/useScrollPos";
import Button from "components/Button";

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
                    <img src={Logo} alt="Word Bosnia written in old Bosnian writing" />
                </div>
                <div className="nav-link">
                    <Button
                        variant="search-open"
                        icon="search"
                        iconAriaLabel="Search"></Button>
                </div>
            </nav>
        </header>
    );
};

export default Navigation;