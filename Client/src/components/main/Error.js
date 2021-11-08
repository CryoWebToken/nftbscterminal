import "./Error.css";
import Octagon from "../icons/Octagon";

export default function Error({ message }) {
    return (
        <div className="error">
            <div>
                <Octagon />
                <span>Error!</span>
            </div>
            <div>{message}</div>
        </div>
    );
}
