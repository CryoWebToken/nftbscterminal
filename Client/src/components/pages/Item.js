import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getItemData, getItemsData } from "../../api";
import Error from "../main/Error";
import Loading from "../main/Loading";
import BtnCrum from "../buttons/BtnCrum";
import CardItem from "../cards/CardItem";
import TableTransactions from "../main/TableTransactions";

export default function Item() {
    const address = useParams()["address"];
    const tokenId = useParams()["token"];
    // ~~~ Data ~~~
    const [itemData, setItemData] = useState({});
    // ~~~ Keeping tabs on loading and error ~~~
    const [state, setState] = useState({
        loading: true,
        error: ""
    });

    // ~~~ API calls ~~~
    // ~~~ Fetching data for Collection Details ~~~
    useEffect(() => {
        let mounted = true;
        (async () => {
            if (mounted) {
                try {
                    const promise1 = getItemData(address, tokenId);
                    const promise2 = getItemsData(address);
                    const [response1, response2] = await Promise.all([promise1, promise2]);
                    const attributesData = response2.attributes;

                    // Compute rarity
                    response1.attributes?.length > 0 &&
                    response1.attributes.forEach(attribute => {
                        const foundAttribute = attributesData.find(elem => elem.name === attribute.trait_type);
                        const count = foundAttribute.values[attribute.value];
                        const rarity = count / response2.nfts.length;
                        attribute.rarity = rarity;
                    });
                    setItemData(response1);
                    setState({
                        loading: false,
                        error: ""
                    });
                } catch (err) {
                    setState({
                        loading: false,
                        error: err.message
                    });
                }
            }
        })();

        return () => {
            mounted = false;
            reset();
        }
    }, [address, tokenId]);

    const reset = () => {
        setItemData({});
        setState({
            loading: true,
            error: ""
        });
    }

    if(state.error) return (
        <section>
            <div className="wrapper global-width">
                <Error message={state.error} />
            </div>
        </section>
    );

    if(state.loading) return (
        <section>
            <div className="wrapper global-width">
                <Loading />
            </div>
        </section>
    );

    return (
        <section>
            <div className="wrapper global-width">
                <div className="breadcrum">
                    <BtnCrum path="" label="Collections"/>
                    <BtnCrum path={`collection/${address}`} label={itemData["collection"]}/>
                    {
                        itemData["collection"] &&
                        <div>{itemData["name"]}</div>
                    }
                </div>
                {
                    itemData["name"] &&
                    <h1>{`${itemData["name"]}`}</h1>
                }
                <CardItem
                    address={address}
                    tokenId={tokenId}
                    itemData={itemData}
                />
            </div>
            {
                itemData["transactions"]?.length &&
                <div className="item-wrapper">
                    <h2>Transactions</h2>
                    <TableTransactions
                        transactions={itemData["transactions"]}
                    />
                </div>
            }
        </section>
    );
}
