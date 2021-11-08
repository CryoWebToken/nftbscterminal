import "./BtnCollection.css";
import { Link } from "react-router-dom";
import { intlNumFormatMaxDecimals } from "../../helpers/functions";
import binanceLogo from "../../assets/binance-logo.webp";

export default function BtnCollection({
    rank,
    icon,
    name,
    address,
    items,
    owners,
    average,
    sales_7d,
    sales,
    volume_7d,
    volume,
}) {
    return (
        <Link
            to={`/collection/${address}`}
            className="btn-collection grid--rank"
        >
            <div className="btn-collection__rank">{rank}</div>
            <div className="btn-collection__name">
                <img
                    className="btn-collection__name__icon"
                    src={icon}
                    alt={name}
                ></img>
                <div>{name}</div>
            </div>
            <div className="btn-collection__items">{intlNumFormatMaxDecimals(items)}</div>
            <div className="btn-collection__owners">{intlNumFormatMaxDecimals(owners)}</div>
            <div className="btn-collection__sales_7d">{intlNumFormatMaxDecimals(sales_7d)}</div>
            <div className="btn-collection__sales">{intlNumFormatMaxDecimals(sales)}</div>
            <div className="btn-collection__average">
                <img
                    className="binance-logo"
                    src={binanceLogo}
                    alt="currency"
                ></img>
                <div>{intlNumFormatMaxDecimals(average)}</div>
            </div>
            <div className="btn-collection__volume_7d">             
                <img
                    className="binance-logo"
                    src={binanceLogo}
                    alt="currency"
                ></img>
                <div>{intlNumFormatMaxDecimals(volume_7d)}</div>
            </div>
            <div className="btn-collection__volume">             
                <img
                    className="binance-logo"
                    src={binanceLogo}
                    alt="currency"
                ></img>
                <div>{intlNumFormatMaxDecimals(volume)}</div>
            </div>
        </Link>
    );
}
