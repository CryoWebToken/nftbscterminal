import "./BtnCrum.css";
import { Link } from "react-router-dom";

export default function BtnCrum({ path, label }) {
    return (
        <Link
            to={`/${path}`}
            className="btn-crum"
        >
            <div>{label}</div>
            <div>&#62;</div>
        </Link>
    );
}
