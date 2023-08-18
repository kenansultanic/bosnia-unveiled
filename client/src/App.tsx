import "./scss/app.scss";
import Router from "./router";
import Navigation from "./components/Navigation";

const App = () => {
    return (
        <div>
            <div className="app-container">
                <Navigation />
                <Router />
            </div>
        </div>
    )
}

export default App;