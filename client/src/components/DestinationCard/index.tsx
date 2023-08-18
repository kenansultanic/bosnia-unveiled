import "./destination-card.scss";
import Tilt from "react-parallax-tilt";

interface DestinationCardProps {
    width: string,
    height: string,
    className?: string
}

const DestinationCard = ({ width, height, className }: DestinationCardProps) => {
    return (
        <Tilt
            tiltMaxAngleX={3}
            tiltMaxAngleY={3}
            perspective={500}
            className={`destination-card-container ${className}`}
            style={{
                width,
                height
            }}>
            DestinationCard
        </Tilt>
    );
};

export default DestinationCard;