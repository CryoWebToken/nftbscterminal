import "./CardCollection.css";
import Link from "../icons/Link";
import Twitter from "../icons/Twitter";
import Box from "../icons/Box";
import Discord from "../icons/Discord";
import BtnTab from "../buttons/BtnTab";

export default function CardCollection({ collectionDetails, tab, setTab }) {
    const {
        name,
        icon,
        address,
        banner,
        desc,
        twitter,
        url,
        discord
    } = collectionDetails;

    return (
        <div className="card-collection">
            {
                banner &&
                <img
                    className="card-collection__banner"
                    src={banner}
                    alt={name}
                ></img>
            }
            <div className="card-collection__details">
                {
                    icon &&
                    <div className="card-collection__icon">
                        <img
                            src={icon}
                            alt={name}
                        ></img>
                    </div>
                }
                <div className="card-collection__links">
                    {
                        address &&
                        <a className="center" href={`https://bscscan.com/address/${address}`} target="_blank" rel="noreferrer">
                            <Box />
                        </a>
                    }
                    {
                        url &&
                        <a className="center" href={url} target="_blank" rel="noreferrer">
                            <Link />
                        </a>
                    }
                    {
                        twitter &&
                        <a className="center" href={twitter} target="_blank" rel="noreferrer">
                            <Twitter />
                        </a>
                    }
                    {
                        discord &&
                        <a className="center" href={discord} target="_blank" rel="noreferrer">
                            <Discord />
                        </a>
                    }
                </div>
                <div className="card-collection__name">
                    {
                        name &&
                        <h2>{name}</h2>
                    }
                    {
                        desc &&
                        <div>{desc}</div>
                    }
                </div>
                <div className="card-collection__tabs center">
                    <BtnTab
                        name="Items"
                        tab={tab}
                        setTab={setTab}
                    />
                    <BtnTab
                        name="Stats"
                        tab={tab}
                        setTab={setTab}
                    />
                </div>
            </div>
        </div>
    );
}
