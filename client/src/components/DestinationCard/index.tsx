import "./destination-card.scss";
import { Link } from "react-router-dom";
import Tilt from "react-parallax-tilt";

interface Props {
    className?: string,
    id: number,
    image: string,
    title: string,
    subTitle: string,
    categories: string[],
    borderColor?: string
}

const DestinationCard = ({ className, id, image, title, subTitle, categories, borderColor }: Props) => {
    const renderedCategories = categories.map((c: string) => (
        <div key={c} className="content-card-category">
            <span>{c}</span>
        </div>
    ));

    const borderStyle: any = {};
    if (borderColor) {
        borderStyle.borderColor = borderColor;
    }

    return (
        <Link
            to={`/${id}`}
            className="card-link">
            <Tilt
                tiltMaxAngleX={7}
                tiltMaxAngleY={7}
                perspective={750}
                className={`dest-card ${className}`}
                style={borderStyle}>
                <div
                    // tabIndex={0}
                    className="dest-card-container">
                    <div className="dest-card-img">
                        <img src={image} />
                    </div>
                    <div className="dest-card-description">
                        <div className="dest-card-heading">
                            <h3>{title}</h3>
                        </div>
                        <p className="dest-card-sub-heading">{subTitle}</p>
                        <div className="dest-card-categories">{renderedCategories}</div>
                    </div>
                </div>
            </Tilt>
            {className && className.includes("top-pick-card") ?
                <div className="top-pick-card-overlay"><span>{title}</span><span>{title}</span></div>
                : null
            }
        </Link>
    );
};

export default DestinationCard;