import "./home.scss";
import pickImg1 from "../../assets/background2.jpg";
import pickImg2 from "../../assets/background4.jpg";
import pickImg3 from "../../assets/background5.jpg";
import { useState, useEffect, useRef } from "react";
import { useThunk } from "hooks/useThunk";
import { getDestinations, getClosestDestinations, useAppDispatch, useAppSelector } from "store";
import SearchBar from "./SearchBar";
import Footer from "components/Footer";
import DestinationCard from "components/DestinationCard";
import Map from "components/Map";
import SearchMotive from "./SearchMotive";
import SearchCardsSkeleton from "./SearchCardsSkeleton";

const Home = () => {
    const mainSectionRef = useRef(null);
    const [hoveredPickCard, setHoveredPickCard] = useState<string | null>(null);
    const { destinations } = useAppSelector(state => state);
    const [getClosestDests, isClosestDestsLoading, closestDestsError] = useThunk(getClosestDestinations);
    const [getDests, s, a] = useThunk(getDestinations);
    // console.log(destinations)
    useEffect(() => {
        // getClosestDests();
    }, []);


    const handleSearchSubmit = (location: string, categories: string[], distance: number) => {
        getClosestDests({ locationId: 1, distance: 40, categories: [] });
    };

    const getOverlayClassname = (key: string) => {
        if (hoveredPickCard && hoveredPickCard === key) {
            return "top-pick-card-hovered";
        } else if (hoveredPickCard && hoveredPickCard !== key) {
            return "top-pick-card-minimized";
        } else {
            return "";
        }
    };

    return (
        <main className="home">
            <div className="home-container">
                <header className="home-heading">
                    <h1 className="home-main-heading">Bosnia Unveiled</h1>
                    <p className="home-sub-heading">Explore hidden destinations of Bosnia & Herzegovina</p>
                </header>
                <SearchBar mainSectionRef={mainSectionRef} handleSearchSubmit={handleSearchSubmit} />
                <section className="home-top-picks-section">
                    <h2>Our top <span>picks</span></h2>
                    <div className="home-top-picks">
                        <div className={`top-pick-card-wrapper ${getOverlayClassname("jajce")}`}
                            onMouseEnter={() => setHoveredPickCard("jajce")}
                            onMouseLeave={() => setHoveredPickCard(null)}>
                            <DestinationCard
                                className="top-pick-card top-pick-card-1"
                                id={99}
                                image={pickImg1}
                                title={"Jajce"}
                                subTitle={"neki subtitle"}
                                categories={["park", "priroda"]} />
                        </div>
                        <div className={`top-pick-card-wrapper ${getOverlayClassname("vodopadi")}`}
                            onMouseEnter={() => setHoveredPickCard("vodopadi")}
                            onMouseLeave={() => setHoveredPickCard(null)}>
                            <DestinationCard
                                className="top-pick-card top-pick-card-2"
                                id={99}
                                image={pickImg1}
                                title={"Vodopadi Kravice"}
                                subTitle={"neki subtitle"}
                                categories={["park", "priroda"]} />
                        </div>
                        <div className={`top-pick-card-wrapper ${getOverlayClassname("sarajevo")}`}
                            onMouseEnter={() => setHoveredPickCard("sarajevo")}
                            onMouseLeave={() => setHoveredPickCard(null)}>
                            <DestinationCard
                                className="top-pick-card top-pick-card-3"
                                id={99}
                                image={pickImg1}
                                title={"Sarajevo"}
                                subTitle={"neki subtitle"}
                                categories={["park", "priroda"]} />
                        </div>
                    </div>
                </section>
                <section className="home-center-image-section"></section>

                <section ref={mainSectionRef} className="home-main-section">
                    {
                        isClosestDestsLoading ?
                            <SearchCardsSkeleton />
                            : destinations.searchedDestinations.length === 0 ?
                                <SearchMotive />
                                : null
                    }
                    <Map />
                </section>

                <Footer className="home-footer" />
            </div>
        </main>
    );
};

export default Home;