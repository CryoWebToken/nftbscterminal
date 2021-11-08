import "./Success.css";
import ThumbsUp from "../icons/ThumbsUp";

export default function Success({ message }) {
    return (
        <div className="success">
            <div>
                <ThumbsUp />
                <span>Success!</span>
            </div>
            <div>{message}</div>
        </div>
    );
}
