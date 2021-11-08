import"./TableItems.css";
import Pagination from "../main/Pagination";
import BtnItem from "../buttons/BtnItem";
import InfoMsg from "./InfoMsg";
import { getColorFromRarity } from "../../helpers/functions";

export default function TableItems({
    address,
    totalPageCount,
    pageLimit,
    currPage,
    setCurrPage,
    itemsData
}) {

    return (
        <div className="table">
            <div className="table-list table-list--items">
                <div className="table-list__header grid--items">
                    <div>Item</div>
                    <div>Token id</div>
                    <div>Minting date</div>
                    <div className="center">
                        <span>Max amount</span>
                        <InfoMsg
                            message={
                                <div>
                                    <div>Refers to the maximum amount the item was traded at.</div>
                                    <br></br>
                                    <div>Items that were only transferred have a max amount of 0.</div>
                                </div>
                            }
                        />
                    </div>
                    <div className="center">
                        <span>Trait | Property [Rarity%]</span>
                        <InfoMsg
                            message={
                                <div>
                                    <div>Rarity is highlighted as follows:</div>
                                    <div className="legend">
                                        <div className={`background--${getColorFromRarity(0.01)}`}></div>
                                        <span>less than or equal to 0.01%</span>
                                    </div>
                                    <div className="legend">
                                        <div className={`background--${getColorFromRarity(0.10)}`}></div>
                                        <span>less than or equal to 0.10%</span>
                                    </div>
                                    <div className="legend">
                                        <div className={`background--${getColorFromRarity(1.00)}`}></div>
                                        <span>less than or equal to 1%</span>
                                    </div>
                                    <div className="legend">
                                        <div className={`background--${getColorFromRarity(1.01)}`}></div>
                                        <span>greater than 1%</span>
                                    </div>
                                </div>
                            }
                        />
                    </div>
                </div>
                <div className="table-list__body">
                    {
                        itemsData.map((elem, index) => (
                            <BtnItem
                                key={index}
                                address={address}
                                tokenId={elem.tokenId}
                                name={elem.name}
                                maxAmount={elem.maxAmount}
                                created={elem.created}
                                attributes={elem.attributes}
                                icon={elem.icon}
                            />
                        ))
                    }
                </div>
                <Pagination
                    totalPageCount={totalPageCount}
                    pageLimit={pageLimit}
                    currPage={currPage}
                    setCurrPage={setCurrPage}
                />
            </div>
        </div>
    );
}
