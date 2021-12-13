import "./CardNft.css";
import { NFTRADE_URL_ADDRESS } from "../../helpers/constants";

export default function CardNft({ nft }) {
    const {
        title,
        description,
        image,
        token_address,
        token_id
    } = nft;

    return (
        <a
            href={`${NFTRADE_URL_ADDRESS}/${token_address}/${token_id}`}
            target="_blank"
            rel="noreferrer"
            className="card-nft"
        >
            <div className="card-nft__title">{title}</div>
            <div className="card-nft__description">{description}</div>
            <div className="card-nft__media">
                <img src={image} alt="nft"></img>
            </div>
        </a>
    );
}
