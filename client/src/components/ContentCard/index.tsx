import { ReactElement } from "react";
import "./content-card.scss";

interface Props {
    className?: string,
    icon: string,
    iconAriaLabel: string,
    heading: string,
    children: string | ReactElement[]
}

const ContentCard = ({ className, icon, iconAriaLabel, heading, children }: Props) => {
    return (
        <div className={`content-card ${className}`}>
            <span className="material-symbols-outlined content-card-icon" aria-label={iconAriaLabel}>
                {icon}
            </span>
            <h3 className="content-card-heading">{heading}</h3>
            <div className="content-card-paragraph">{children}</div>
        </div>
    );
};

export default ContentCard;