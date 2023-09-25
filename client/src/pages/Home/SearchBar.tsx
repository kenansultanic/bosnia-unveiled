import { useState, useEffect } from "react";
import useScrollPos from "hooks/useScrollPos";
import Button from "components/Button";

const SearchBar = () => {
    const [animatePositionUp, setAnimatePositionUp] = useState(true);
    const [positionStyle, setPositionStyle] = useState({});
    const scrollPos = useScrollPos(50);

    useEffect(() => {
        if (scrollPos > 700) {
            setPositionStyle({
                position: "fixed",
                top: "auto",
                animationName: "search-slide-up"
            });
            setAnimatePositionUp(false);
        } else {
            setAnimatePositionUp(true);
        }
    }, [scrollPos]);

    useEffect(() => {
        if (animatePositionUp && Object.keys(positionStyle).length !== 0) {
            setPositionStyle({});
        }
    }, [animatePositionUp]);

    let applyBorderFixes: boolean = false;
    if (animatePositionUp) {
        applyBorderFixes = true;
    }

    return (
        <section
            style={positionStyle}
            className={`home-search-section ${applyBorderFixes && "home-search-section-border-fix"}`}>
            <div
                style={!animatePositionUp ? { border: "none", height: "180px" } : {}}
                className={`home-search-container ${applyBorderFixes ? "home-search-container-border-fix" : ""}`}>
                <form>
                    <div className="search-form-inputs"></div>
                    <Button
                        className="primary search-form-submit-button"
                        icon="search"
                        iconAriaLabel="Search">
                    </Button>
                </form>
            </div>
        </section>
    );
};

export default SearchBar;