import "./BadgeRarity.css";
import { intlNumFormatMaxDecimals, getColorFromRarity } from "../../helpers/functions";

export default function BadgeRarity({ attribute, property, rarity }) {
    return (
        <div className={`badge-rarity center`}>
            <div>{attribute} | {property}</div>
            <div className={`badge-rarity__rarity center background--${getColorFromRarity(rarity * 100)}`}>
                <div>{`${intlNumFormatMaxDecimals(rarity * 100, 3)}%`}</div>
            </div>
        </div>
    );
}
