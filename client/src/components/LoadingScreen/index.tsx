import "./loading-screen.scss";
import { CSSProperties } from "react";
import { PropagateLoader } from "react-spinners";

const override: CSSProperties = {
    display: "block",
    marginLeft: "78px"
};

function LoadingScreen() {
    return (
        <div className="loading-screen">
            <div className="loading-wrapper">
                <div className="loading-text">Bosnia Unvelied</div>
                <PropagateLoader
                    color={"#262626"}
                    cssOverride={override}
                    size={15}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                />
            </div>
        </div>
    );
}

export default LoadingScreen;