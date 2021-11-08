import "./CardNew.css";
import { Link } from "react-router-dom";
import { intlNumFormat } from "../../helpers/functions";

export default function CardNew({
    name,
    address,
    icon,
    banner,
    items
}) {
    return (
        <Link
            to={`/collection/${address}`}
            className="card-new"
        >
            <div className="card-new__banner">
                <img
                    src={banner}
                    alt={name}
                ></img>
            </div>
            <div className="card-new__details">
                <div className="card-new__details__name">{name}</div>
                <div className="card-new__details__items">{intlNumFormat(items)} items</div>
            </div>
            <div className="card-new__image">
                <img
                    src={icon}
                    alt={name}
                ></img>
            </div>
        </Link>
    );
}
