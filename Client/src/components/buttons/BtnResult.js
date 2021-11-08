import "./BtnResult.css";
import { Link } from "react-router-dom";

export default function BtnResult({
    icon,
    name,
    address,
    closeModalSearch
}) {
    return (
        <Link
            to={`/collection/${address}`}
            className="btn-result"
            onClick={closeModalSearch}
        >
            <img
                src={icon}
                alt={name}
            ></img>
            <div>{name}</div>
        </Link>
    );
}
