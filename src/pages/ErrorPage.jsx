import {Link} from "react-router-dom";

const ErrorPage = () => {
    return (
        <div className="text-2xl">
            <span className="text-orange-600">Error!!!</span> Ge back to <Link to="/">home page</Link>.
        </div>
    );
};

export default ErrorPage;