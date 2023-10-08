import "./navigation.scss";
import logo from "../../assets/bhwanderlust.png";

const Navigation = () => {
    return (
        <header className="navigation-container">
            {/* <nav></nav> */}
            <div>[ NAVIGATION ]<button>hehe</button></div>
            <div className="navigation-logo">
                <img src={logo} />
            </div>
            <div>[ NAVIGATION ]</div>
        </header>
    );
};

export default Navigation;