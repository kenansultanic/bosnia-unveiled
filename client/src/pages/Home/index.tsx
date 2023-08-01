import "./home.scss";
import bihBordersDark from "../../assets/bihBordersDark.svg";
import bihBordersLight from "../../assets/bihBordersLight.svg";
import Tilt from "react-parallax-tilt";
import DestinationCard from "components/DestinationCard";
import SearchBar from "components/SearchBar";
import useSnapScrolled from "hooks/useSnapScrolled";

const Home = () => {
    const snapScrolled = useSnapScrolled();
    const frstSectionBgImage = snapScrolled ? "" : "linear-gradient(rgba(0, 0, 0, 0) 30%, rgba(0, 0, 0, .75) 75%, rgba(0, 0, 0, 1) 100%)";
    const frstSectionBgColor = snapScrolled ? "white" : "";
    const scndSectionBgColor = snapScrolled ? "white" : "black";

    return (
        <div className="home-container">
            <div
                className="home-first-section"
                style={{
                    backgroundColor: frstSectionBgColor,
                    backgroundImage: frstSectionBgImage
                }}>
                <div className="home-main-section">
                    <h1 className="home-main-heading">
                        <span className="home-main-heading-row home-main-heading-row-1">Explore Hidden</span>
                        <span className="home-main-heading-row home-main-heading-row-2">Destinations of</span>
                        <span className="home-main-heading-row home-main-heading-row-3">Bosnia & Herzegovina</span>
                    </h1>

                    <div className="home-main-top-picks">
                        <h1 className="home-main-top-picks-heading">Our top picks</h1>
                        <div className="home-main-top-picks-cards">
                            <Tilt perspective={500} tiltMaxAngleX={10} tiltMaxAngleY={10} scale={1.025}>
                                <DestinationCard width="175px" height="225px" />
                            </Tilt>
                            <Tilt perspective={500} tiltMaxAngleX={10} tiltMaxAngleY={10} scale={1.025}>
                                <DestinationCard width="175px" height="225px" />
                            </Tilt>
                            <Tilt perspective={500} tiltMaxAngleX={10} tiltMaxAngleY={10} scale={1.025}>
                                <DestinationCard width="175px" height="225px" />
                            </Tilt>
                        </div>
                    </div>
                </div>

                <SearchBar />

                {/* <Tilt
                    className="home-bih"
                    perspective={500}
                    tiltMaxAngleX={10}
                    tiltMaxAngleY={10}
                    // glareEnable={true}
                    // glareMaxOpacity={0.75}
                    // glareColor="#ffffff"
                    // glarePosition="all"
                    // glareBorderRadius="40%"
                    scale={1.05}>
                    <img className="home-img" src={bihBordersLight} />
                </Tilt>

                <div className="home-destination-cards">
                    <Tilt perspective={500} tiltMaxAngleX={20} tiltMaxAngleY={10} scale={1.1}>
                        <DestinationCard />
                    </Tilt>
                    <Tilt perspective={500} tiltMaxAngleX={20} tiltMaxAngleY={10} scale={1.1}>
                        <DestinationCard />
                    </Tilt>
                    <Tilt perspective={500} tiltMaxAngleX={20} tiltMaxAngleY={10} scale={1.1}>
                        <DestinationCard />
                    </Tilt>
                </div> */}
            </div>
            <div
                className="home-second-section"
                style={{ backgroundColor: scndSectionBgColor }}>
                    <p>Ovdje sam mislio staviti mapu i rezultate pretrage, znaci kad user klikne search automatski scrolla ovdje i pokaze rezultate</p>
                </div>
        </div>
    );
};

export default Home;