import "./home.scss";
import bihBordersDark from "../../assets/bihBordersDark.svg";
import bihBordersLight from "../../assets/bihBordersLight.svg";
import Tilt from "react-parallax-tilt";
import DestinationCard from "components/DestinationCard";
import SearchBar from "components/SearchBar";
import useSnapScrolled from "hooks/useSnapScrolled";

const Home = () => {
    const snapScrolled = useSnapScrolled();
    const secondScreenOpacity = snapScrolled ? 1 : 0;

    // tiltMaxAngleX = { 1}
    // tiltMaxAngleY = { 1}
    // perspective = { 500}

    return (
        <div className="home-container">
            <div className="home-first-screen">
                <div className="home-heading-section">
                    <h1 className="home-main-heading">App Name</h1>
                    <p className="home-main-moto">Explore hidden places of Bosnia & Herzegovina</p>
                </div>
                <div className="home-picks-section">
                    <div className="home-picks-section-wrapper">
                        <h2 className="home-picks-heading">Our Top Picks</h2>
                        <div className="home-picks-container">
                            <DestinationCard width="7vw" height="10vw" className="home-picks-card" />
                            <DestinationCard width="7vw" height="10vw" className="home-picks-card" />
                            <DestinationCard width="7vw" height="10vw" className="home-picks-card" />
                        </div>
                    </div>
                </div>
                <div className="home-main-section">
                    {/* <div className="home-bg-wrapper"> */}
                        <div className="home-search-bar"></div>
                    {/* </div> */}
                </div>
            </div>

            <div className="home-second-screen">
                <div
                    className="home-second-screen-desc"
                    style={{ opacity: secondScreenOpacity }}>
                    [Second Screen Content]
                </div>
            </div>
        </div>
    );
};

export default Home;