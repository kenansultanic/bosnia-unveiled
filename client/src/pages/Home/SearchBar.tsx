import "./search.scss";
import { useState, useEffect, FormEvent } from "react";
import { Range } from "react-range";
import useScrollPos from "hooks/useScrollPos";
import Button from "components/Button";
import Dropdown from "./Dropdown";

interface Props {
    mainSectionRef: any,
    handleSearchSubmit: any
}

const SearchBar = ({ mainSectionRef, handleSearchSubmit }: Props) => {
    const [searchBarAnimation, setSearchBarAnimation] = useState("search-animate-up");
    const { scrollPos } = useScrollPos();

    const [location, setLocation] = useState("");
    const [categories, setCategories] = useState([]);
    const [distance, setDistance] = useState([40]);
    const [locationError, setLocationError] = useState("");

    useEffect(() => {
        if (scrollPos < 700) {
            setSearchBarAnimation("search-animate-up");
        } else {
            setSearchBarAnimation("search-animate-down");
        }
    }, [scrollPos]);

    let applyBorderFixes: boolean = false;
    if (searchBarAnimation === "search-animate-up") {
        applyBorderFixes = true;
    }

    const onFormSubmit = (e: FormEvent) => {
        e.preventDefault();

        if (!location) {
            setLocationError("Location required");
        } else {
            setLocationError("");
            handleSearchSubmit(location, categories, distance[0]);
            mainSectionRef.current?.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <section
            className={`home-search-section ${searchBarAnimation} ${applyBorderFixes && "home-search-section-border-fix"}`}>
            <div
                className={`home-search-container ${applyBorderFixes ? "home-search-container-border-fix" : ""}`}>
                <form onSubmit={onFormSubmit}>
                    <div className="search-form-inputs">
                        <div className="search-form-input-container">
                            <label htmlFor="location">Your Location</label>
                            {/* <input
                                type="text"
                                name="location"
                                placeholder="Sarajevo"
                                value={location}
                                className="search-form-input"
                                onChange={e => setLocation(e.target.value)} /> */}
                            <Dropdown handleChange={(val: any) => setLocation(val.value)} isMulti={false} scrollPos={scrollPos} />
                            {
                                locationError ? <div className="input-error">{locationError}</div> : null 
                            }
                        </div>
                        <div className="search-form-input-container">
                            <label htmlFor="categories">Categories</label>
                            {/* <input
                                type="text"
                                name="categories"
                                placeholder="Old town"
                                value={""}
                                className="search-form-input"
                                onChange={e => setSelectedCategories([...selectedCategories, e.target.value])} /> */}
                            <Dropdown handleChange={(val: any) => setCategories(val)} isMulti={true} scrollPos={scrollPos} />
                        </div>
                        <div className="search-form-input-container search-slider">
                            <label htmlFor="distance">Distance (km) - <span className="distance">{distance}</span></label>
                            <Range
                                step={20}
                                min={40}
                                max={200}
                                values={distance}
                                onChange={distance => setDistance(distance)}
                                renderTrack={({ props, children }) => (
                                    <div
                                        {...props}
                                        style={{
                                            ...props.style,
                                            height: '6px',
                                            width: '92%',
                                            margin: "15px 4%",
                                            borderRadius: "10px",
                                            backgroundColor: '#ddd'
                                        }}
                                    >
                                        {children}
                                    </div>
                                )}
                                renderThumb={({ props }) => (
                                    <div
                                        {...props}
                                        style={{
                                            ...props.style,
                                            height: '30px',
                                            width: '20px',
                                            border: "1px solid #333",
                                            borderRadius: "10px",
                                            backgroundColor: '#FFD53D',
                                            transition: "100ms"
                                        }}
                                    />
                                )} />
                            {/* <input
                                type="range"
                                name="distance"
                                step={20}
                                min={20}
                                max={100}
                                value={distance}
                                onChange={e => setDistance(parseInt(e.target.value))} /> */}
                            {/* <div className="search-slider-indicator">
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
                            </div> */}
                        </div>
                    </div>
                    <Button
                        variant="primary search-form-submit-button"
                        icon="search"
                        iconAriaLabel="Search">
                    </Button>
                </form>
            </div>
        </section>
    );
};

export default SearchBar;
