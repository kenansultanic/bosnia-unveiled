import "./scss/app.scss";
import Router from "./router";
import Navigation from "./components/Navigation";

const App = () => {
    return (
        <div className="app-container">
            <Navigation />
            <Router />
        </div>
    )
}

export default App;