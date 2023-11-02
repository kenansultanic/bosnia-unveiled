import "./search.scss";
import { useState, useEffect, FormEvent } from "react";
import useScrollPos from "hooks/useScrollPos";
import Button from "components/Button";

interface Props {
    mainSectionRef: any
}

const SearchBar = ({ mainSectionRef }: Props) => {
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
                top: "unset",
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
        mainSectionRef.current?.scrollIntoView({behavior: "smooth"});
    };

    return (
        <section
            style={positionStyle}
            className={`home-search-section ${applyBorderFixes && "home-search-section-border-fix"}`}>
            <div
                style={!animatePositionUp ? { border: "none", height: "130px" } : {}}
                className={`home-search-container ${applyBorderFixes ? "home-search-container-border-fix" : ""}`}>
                <form onSubmit={onFormSubmit}>
                    <div className="search-form-inputs">
                        <div className="search-form-input-container">
                            <label htmlFor="location">Your Location</label>
                            <input
                                type="text"
                                name="location"
                                placeholder="Sarajevo"
                                value={location}
                                className="search-form-input"
                                onChange={e => setLocation(e.target.value)} />
                        </div>
                        <div className="search-form-input-container">
                            <label htmlFor="categories">Categories</label>
                            <input
                                type="text"
                                name="categories"
                                placeholder="Old town"
                                value={""}
                                className="search-form-input"
                                onChange={e => setSelectedCategories([...selectedCategories, e.target.value])} />
                        </div>
                        <div className="search-slider">
                            <label htmlFor="distance">Distance (km)</label>
                            <input
                                type="range"
                                name="distance"
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