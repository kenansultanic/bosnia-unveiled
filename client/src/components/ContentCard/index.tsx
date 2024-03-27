import { ReactNode } from "react";
import "./content-card.scss";

interface Props {
    className?: string,
    icon: string,
    iconAriaHidden?: boolean,
    iconAriaLabel?: string,
    heading: string,
    children: string | ReactNode
}

const ContentCard = ({ className, icon, iconAriaHidden, iconAriaLabel, heading, children }: Props) => {
    return (
        <div className={`content-card ${className}`}>
            <span className="material-symbols-outlined content-card-icon" aria-label={iconAriaLabel} aria-hidden={iconAriaHidden}>
                {icon}
            </span>
            <h3 className="content-card-heading">{heading}</h3>
            <div className="content-card-paragraph">{children}</div>
        </div>
    );
};

export default ContentCard;