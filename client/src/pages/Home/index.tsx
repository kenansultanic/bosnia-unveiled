import "./home.scss";
import Tilt from "react-parallax-tilt";
import bihBordersDark from "../../assets/bihBordersDark.svg";
import bihBordersLight from "../../assets/bihBordersLight.svg";
import DestinationCard from "components/DestinationCard";

const Home = () => {
    return (
        <div className="home-container">
            <div className="home-first-section">
                <Tilt
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
                    <Tilt perspective={500} tiltMaxAngleX={10} tiltMaxAngleY={10} scale={1.1}>
                        <DestinationCard />
                    </Tilt>
                    <Tilt perspective={500} tiltMaxAngleX={10} tiltMaxAngleY={10} scale={1.1}>
                        <DestinationCard />
                    </Tilt>
                    <Tilt perspective={500} tiltMaxAngleX={10} tiltMaxAngleY={10} scale={1.1}>
                        <DestinationCard />
                    </Tilt>
                    <Tilt perspective={500} tiltMaxAngleX={10} tiltMaxAngleY={10} scale={1.1}>
                        <DestinationCard />
                    </Tilt>
                    <Tilt perspective={500} tiltMaxAngleX={10} tiltMaxAngleY={10} scale={1.1}>
                        <DestinationCard />
                    </Tilt>
                    <Tilt perspective={500} tiltMaxAngleX={10} tiltMaxAngleY={10} scale={1.1}>
                        <DestinationCard />
                    </Tilt>
                </div>
            </div>
        </div>
    );
};

export default Home;