import "./home.scss";
import pickImg1 from "../../assets/background2.jpg";
import pickImg2 from "../../assets/background4.jpg";
import pickImg3 from "../../assets/background5.jpg";
import SearchBar from "./SearchBar";
import Footer from "components/Footer";
import DestinationCard from "components/DestinationCard";

const Home = () => {
    return (
        <main className="home">
            <div className="home-container">
                <header className="home-heading">
                    <h1 className="home-main-heading">App Name</h1>
                    <p className="home-sub-heading">Explore hidden destinations of Bosnia & Herzegovina</p>
                </header>
                <SearchBar />
                <section className="home-top-picks-section">
                    <h2>Our top <span>picks</span></h2>
                    <div className="home-top-picks">
                        <DestinationCard
                            className="pick-card"
                            orientation="vertical"
                            image={pickImg1} />
                        <DestinationCard
                            className="pick-card"
                            orientation="vertical"
                            image={pickImg2} />
                        <DestinationCard
                            className="pick-card"
                            orientation="vertical"
                            image={pickImg3} />
                    </div>
                </section>
                <section className="home-center-image-section"></section>

                <section className="home-main-section"></section>

                <Footer className="home-footer" />
            </div>
        </main>
    );
};

export default Home;