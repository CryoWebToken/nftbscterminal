import "./CardItem.css";
import { trimAddress } from "../../helpers/functions";
import BadgeRarity from "../badges/BadgeRarity";

export default function CardItem({ itemData }) {
    return (
        <div className="card-item">
            <img src={itemData["image"]} alt="token"></img>
            <div className="card-item__stats">
                <div className="grid--item">
                    <div>Contract</div>
                    <a
                        href={`https://bscscan.com/address/${itemData["address"]}`}
                        rel="noreferrer"
                        target="_blank"
                    >{trimAddress(itemData["address"])}</a>
                </div>
                <div className="grid--item">
                    <div>Collection</div>
                    <div>{itemData["collection"]}</div>
                </div>
                <div className="grid--item">
                    <div>Description</div>
                    <div>{itemData["description"]}</div>
                </div>
                <div className="grid--item">
                    <div>Trait | Property [Rarity]%</div>
                    <div className="card-item__traits">
                        {
                            itemData["attributes"]?.length > 0 &&
                            itemData["attributes"].map((elem, index) => (
                                <BadgeRarity
                                    key={index}
                                    attribute={elem.trait_type}
                                    property={elem.value}
                                    rarity={elem.rarity}
                                />
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}
