import "./BtnItem.css";
import { Link } from "react-router-dom";
import { intlNumFormat, intlDateFormat } from "../../helpers/functions";
import binanceLogo from "../../assets/binance-logo.webp";
import BadgeRarity from "../badges/BadgeRarity";

export default function BtnItem({
    address,
    tokenId,
    name,
    maxAmount,
    created,
    attributes,
    icon
}) {
    return (
        <Link
            to={`/item/${address}/${tokenId}`}
            className="btn-item grid--items"
        >
            <img
                className="btn-item__icon"
                src={icon}
                alt={name}
            ></img>
            <div className="btn-item__token">{`#${tokenId}`}</div>
            <div className="btn-item__date">{intlDateFormat(new Date(created))}</div>
            <div className="btn-item__amount">
                <img
                    className="binance-logo"
                    src={binanceLogo}
                    alt="currency"
                ></img>
                <div>{intlNumFormat(maxAmount)}</div>
            </div>
            <div className="btn-item__properties">
                {
                    attributes?.length > 0 &&
                    attributes.map((elem, index) => (
                        <BadgeRarity
                            key={index}
                            attribute={elem.trait_type}
                            property={elem.value}
                            rarity={elem.rarity}
                        />
                    ))
                }
            </div>
        </Link>
    );
}
