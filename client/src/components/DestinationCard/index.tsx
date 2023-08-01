import "./destination-card.scss";

interface DestinationCardProps {
    width: string,
    height: string
}

const DestinationCard = ({ width, height }: DestinationCardProps) => {

    return (
        <div
            className="destination-card-container"
            style={{
                width,
                height
            }}>
            
        </div>
    );
};

export default DestinationCard;