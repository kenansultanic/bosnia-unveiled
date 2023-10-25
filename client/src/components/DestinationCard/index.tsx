import "./destination-card.scss";
import Tilt from "react-parallax-tilt";

interface Props {
    className?: string,
    image: string
}

const DestinationCard = ({ className, image }: Props) => {
    return (
        <Tilt
            tiltMaxAngleX={7}
            tiltMaxAngleY={7}
            perspective={450}
            className={`dest-card ${className}`}>
            <div
                tabIndex={0}
                className="dest-card-container">
                <div className="dest-card-img">
                    <img src={image} />
                </div>
                <div className="dest-card-description">
                    <div className="dest-card-heading">
                        <h3>Vodopadi Kravice I Tako To</h3>
                        <span className="material-symbols-outlined" aria-hidden="true">
                            partly_cloudy_day
                        </span>
                    </div>
                    {/* <div className="dest-card-location">
                        <span className="material-symbols-outlined" aria-hidden="true">
                            location_on
                        </span>
                        <div>Ljubuski</div>
                    </div> */}
                    <p className="dest-card-sub-heading">Picturesque waterfalls near city of Ljubuški</p>
                </div>
            </div>
        </Tilt>
    );
};

export default DestinationCard;