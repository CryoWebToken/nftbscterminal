import { useContext } from "react";
import { DataContext } from "../../context/DataContext";
import Error from "../main/Error";
import Loading from "../main/Loading";
import Message from "../main/Message";
import CardNft from "../cards/CardNft";

export default function Nfts() {
    const dataContext = useContext(DataContext);

    if(!dataContext.address) return (
        <section className="global-width">
            <Message message="Please connect your wallet to view NFTs."/>
        </section>
    );

    if(dataContext.stateNfts.error) return (
        <section>
            <Error message={dataContext.stateNfts.error} />
        </section>
    );

    if(dataContext.stateNfts.loading) return (
        <section>
            <Loading />
        </section>
    );

    return (
        <section className="global-width">
            <div className="nfts-wrapper"><h1>My NFTs</h1></div>
            <div className="grid--nfts">
                {
                    dataContext.stateNfts.data.length === 0 &&
                    <div>No NFTs to display.</div>
                }
                {
                    dataContext.stateNfts.data.length > 0 &&
                    dataContext.stateNfts.data.map((elem, ind) => (
                        <CardNft
                            key={ind}
                            nft={elem}
                        />
                    ))
                }
            </div>
        </section>
    );
}
