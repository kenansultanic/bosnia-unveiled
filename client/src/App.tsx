import "./scss/app.scss";
import { useState } from "react";
import Router from "./router";
import Navigation from "./components/Navigation";

const App = () => {
    const [theme, setTheme] = useState("light");

    return (
        <div className={`theme-${theme}`}>
            <div className="app-container">
                <Navigation theme={theme} setTheme={setTheme} />
                <Router />
            </div>
        </div>
    )
}

export default App;