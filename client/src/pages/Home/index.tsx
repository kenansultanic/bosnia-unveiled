import "./home.scss";
import pickImg1 from "../../assets/background2.jpg";
import pickImg2 from "../../assets/background4.jpg";
import pickImg3 from "../../assets/background5.jpg";
import { useEffect, useRef } from "react";
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
    const { destinations } = useAppSelector(state => state);
    const [getClosestDests, isClosestDestsLoading, closestDestsError] = useThunk(getClosestDestinations);

    useEffect(() => {
    }, []);

    const handleSearchSubmit = () => {
        getClosestDests({ locationId: 1, distance: 1000, categories: [] });
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
                        <DestinationCard
                            className="pick-card"
                            image={pickImg1} />
                        <DestinationCard
                            className="pick-card"
                            image={pickImg2} />
                        <DestinationCard
                            className="pick-card"
                            image={pickImg3} />
                    </div>
                </section>
                <section className="home-center-image-section"></section>

                <section ref={mainSectionRef} className="home-main-section">
                    {
                        isClosestDestsLoading ?
                            <SearchCardsSkeleton />
                        : destinations.searchedDestinations.length === 0 ?
                            <SearchMotive />
                        : <Map />
                    }
                </section>

                <Footer className="home-footer" />
            </div>
        </main>
    );
};

export default Home;