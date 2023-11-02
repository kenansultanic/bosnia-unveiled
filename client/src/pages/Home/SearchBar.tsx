import "./search-bar.scss";
import { useState, useEffect, FormEvent } from "react";
import useScrollPos from "hooks/useScrollPos";
import Button from "components/Button";

const SearchBar = () => {
    const [animatePositionUp, setAnimatePositionUp] = useState(true);
    const [positionStyle, setPositionStyle] = useState({});
    const { scrollPos } = useScrollPos();

    const [location, setLocation] = useState('');
    const [distance, setDistance] = useState(20);
    const [selectedCategories, setSelectedCategories] = useState(["nature", "park"]);

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

    const onFormSubmit = (e: FormEvent) => {
        e.preventDefault();

        console.log(e)
    };

    return (
        <section
            style={positionStyle}
            className={`home-search-section ${applyBorderFixes && "home-search-section-border-fix"}`}>
            <div
                style={!animatePositionUp ? { border: "none", height: "150px" } : {}}
                className={`home-search-container ${applyBorderFixes ? "home-search-container-border-fix" : ""}`}>
                <form onSubmit={onFormSubmit}>
                    <div className="search-form-inputs">
                        <input
                            type="text"
                            value={location}
                            onChange={e => setLocation(e.target.value)} />
                        <input
                            type="text"
                            value={""}
                            onChange={e => setSelectedCategories([...selectedCategories, e.target.value])} />
                        <div className="search-slider" data-slider-value={distance}>
                            <input
                                type="range"
                                step={20}
                                min={20}
                                max={100}
                                value={distance}
                                onChange={e => setDistance(parseInt(e.target.value))} />
                            <div className="search-slider-indicator">
                                <div className="search-slider-indicator-element">
                                    <span></span>
                                    <span className={distance === 20 ? "indicator-selected-value" : ""}>20</span>
                                </div>
                                <div className="search-slider-indicator-element">
                                    <span></span>
                                    <span className={distance === 40 ? "indicator-selected-value" : ""}>40</span>
                                </div>
                                <div className="search-slider-indicator-element">
                                    <span></span>
                                    <span className={distance === 60 ? "indicator-selected-value" : ""}>60</span>
                                </div>
                                <div className="search-slider-indicator-element">
                                    <span></span>
                                    <span className={distance === 80 ? "indicator-selected-value" : ""}>80</span>
                                </div>
                                <div className="search-slider-indicator-element">
                                    <span></span>
                                    <span className={distance === 100 ? "indicator-selected-value" : ""}>100</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Button
                        onClick={() => {
                        }}
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