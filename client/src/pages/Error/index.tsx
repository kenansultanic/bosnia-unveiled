import { useRouteError } from "react-router-dom";

const Error = () => {
    const error: any = useRouteError();
    console.log(error);

    return (
        <div>
            <i>{`${error.status} ${error.statusText}`}</i>
        </div>
    );
};

export default Error;