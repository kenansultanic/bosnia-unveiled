import "./destination-card.scss";
import Tilt from "react-parallax-tilt";

interface Props {
    className?: string,
    orientation: string,
    image: string
}

const DestinationCard = ({ className, orientation, image }: Props) => {
    if (orientation === "horizontal") {
        return (
            <Tilt
                tiltMaxAngleX={5}
                tiltMaxAngleY={5}
                perspective={1000}
                className={`dest-card-horizontal ${className}`}>
                <div className="dest-card-horizontal-img">
                    <img src={image} />
                </div>
                <div className="dest-card-horizontal-description"></div>
            </Tilt>
        );
    } else {
        return (
            <Tilt
                tiltMaxAngleX={7}
                tiltMaxAngleY={7}
                perspective={450}
                className={`dest-card-vertical ${className}`}>
                <div
                    tabIndex={0}
                    className="dest-card-vertical-container">
                    <div className="dest-card-vertical-img">
                        <img src={image} />
                    </div>
                    <div className="dest-card-vertical-description">vertical</div>
                </div>
            </Tilt>
        );
    }
};

export default DestinationCard;