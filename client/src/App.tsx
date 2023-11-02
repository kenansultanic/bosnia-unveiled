import "./scss/app.scss";
import 'material-symbols/outlined.css';
import { Outlet } from "react-router-dom";
import Navigation from "components/Navigation";

const App = () => {
    return (
        <div className="app-container">
            <Navigation />
            <Outlet />
        </div>
    )
}

export default App;