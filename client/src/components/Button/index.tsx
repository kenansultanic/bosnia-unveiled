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
    return (
        <button
            className={`button button-${className}`}
            {...rest}>
            {icon &&
                <span
                    className="material-symbols-outlined"
                    aria-hidden={iconAriaHidden}
                    aria-label={iconAriaLabel}>
                    {icon}
                </span>}
            {children}
        </button>
    );
};

export default Button;