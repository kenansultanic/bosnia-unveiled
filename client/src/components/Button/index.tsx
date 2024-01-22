import { ReactNode, ButtonHTMLAttributes } from "react";
import "./button.scss";

interface Props {
    variant: string,
    className?: string,
    children?: ReactNode,
    icon?: string,
    iconAriaHidden?: boolean,
    iconAriaLabel?: string,
    onClick?: any,
    ref?: any
}

const Button = ({ variant, children, className, icon, iconAriaHidden, iconAriaLabel, onClick, ...rest }: Props & ButtonHTMLAttributes<HTMLButtonElement>) => {
    return (
        <button
            onClick={onClick}
            className={`${variant} ${className}`}
            {...rest}>
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
        </button >
    );
};

export default Button;