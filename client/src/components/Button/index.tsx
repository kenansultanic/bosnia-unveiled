import { ReactNode, ButtonHTMLAttributes } from "react";
import "./button.scss";

interface Props {
    className: string,
    children?: ReactNode,
    icon?: string,
    iconAriaHidden?: boolean,
    iconAriaLabel?: string
}

const Button = ({ children, className, icon, iconAriaHidden, iconAriaLabel, ...rest }: Props & ButtonHTMLAttributes<HTMLButtonElement>) => {
    const buttonContent = (
        <span className="button-content">
            {
                icon &&
                <span
                    className="material-symbols-outlined"
                    aria-hidden={iconAriaHidden}
                    aria-label={iconAriaLabel}>
                    {icon}
                </span>
            }
            <span>{children}</span>
        </span>
    );

    return (
        <button
            onClick={() => console.log("hehe")}
            className={`button button-${className}`}
            {...rest}>
            <span className="button-hover-overlay"></span>
            {buttonContent}
            {buttonContent}
        </button>
    );
};

export default Button;