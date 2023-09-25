import "./scss/app.scss";
import 'material-symbols/outlined.css';
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