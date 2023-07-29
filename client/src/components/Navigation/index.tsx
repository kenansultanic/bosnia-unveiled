import "./navigation.scss";
import { Dispatch, SetStateAction } from "react";

interface NavigationProps {
    theme: string,
    setTheme: Dispatch<SetStateAction<string>>
}

const Navigation = ({ theme, setTheme }: NavigationProps) => {
    const handleThemeChange = () => {
        if (theme === "light") {
            setTheme("dark");
        } else {
            setTheme("light");
        }
    };

    return (
        <div className="navigation-container">
            <div>[ NAVIGATION ]</div>
            <div className="navigation-logo">[ LOGO ]</div>
            <div>
                [ NAVIGATION ]
                <button onClick={handleThemeChange}>[ theme ]</button>
            </div>
        </div>
    );
};

export default Navigation;