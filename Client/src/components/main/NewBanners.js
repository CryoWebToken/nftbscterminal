import "./NewBanners.css";
import CardNew from "../cards/CardNew";

export default function NewBanners({ newCollectionsData }) {
    return (
        <div className="new-banners">
            {
                newCollectionsData?.length > 0 &&
                <>
                    <h1>New collections</h1>
                    <div className="new-banners__collections grid--new">
                        {
                            newCollectionsData.map((elem, index) => (
                                <CardNew
                                    key={index}
                                    name={elem.name}
                                    address={elem.address}
                                    icon={elem.icon}
                                    banner={elem.banner}
                                    items={elem.items}
                                />
                            ))
                        }
                    </div>
                </>
            }
        </div>
    );
}
