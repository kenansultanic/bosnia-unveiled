import { useState, useEffect } from "react";
import useScrollPos from "hooks/useScrollPos";
import Button from "components/Button";
import { useGetClosestDestinationsQuery} from "../../store/destinationsApi";

const SearchBar = () => {
    const [animatePositionUp, setAnimatePositionUp] = useState(true);
    const [positionStyle, setPositionStyle] = useState({});
    const scrollPos = useScrollPos(50);

    const [location, setLocation] = useState('');
    const [selectedCategories, setSelectedCategories] = useState([''])
    const [distance, setDistance] = useState(10)

    const res = useGetClosestDestinationsQuery({locationID: 1, distance: 10, categories: ['grad', 'selo']})
    console.info(res)

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
                    <div className="search-form-inputs">
                        <input onChange={e => setLocation(e.target.value)}/>
                        <input onChange={e => setSelectedCategories([...selectedCategories, e.target.value])}/>
                        <input type="range" onChange={e => setDistance(Number(e.target.value))} />
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