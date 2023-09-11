import "./destination-card.scss";
import Tilt from "react-parallax-tilt";

interface Props {
    className?: string,
    orientation: string,
    image: string
}

const DestinationCard = ({ className, orientation, image }: Props) => {
    return (
        <Tilt
            tiltMaxAngleX={3}
            tiltMaxAngleY={3}
            perspective={500}
            className={`dest-card ${className}`}>
            <div className="dest-card-img">
                <img src={image} />
            </div>
            <div className="dest-card-description"></div>
        </Tilt>
    );
};

export default DestinationCard;