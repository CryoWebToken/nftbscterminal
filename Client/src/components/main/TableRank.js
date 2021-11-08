import "./TableRank.css";
import { OPTIONS_RANK_SORT_BY } from "../../helpers/constants";
import BtnRankSort from "../buttons/BtnRankSort";
import BtnCollection from "../buttons/BtnCollection";
import Pagination from "./Pagination";

export default function TableRank({
    sortedCollectionsData,
    rankSortBy,
    setRankSortBy,
    totalPageCount,
    pageLimit,
    currPage,
    setCurrPage
}) {
    return (
        <div className="table global-width">
            <div className="table-list table-list--rank">
                <div className="table-list__header grid--rank">
                    {
                        OPTIONS_RANK_SORT_BY.map((elem, index) => (
                            <BtnRankSort
                                key={index}
                                name={elem.name}
                                label={elem.label}
                                rankSortBy={rankSortBy}
                                setRankSortBy={setRankSortBy}
                            />
                        ))
                    }
                </div>
                <div className="table-list__body">
                    {
                        sortedCollectionsData?.length > 0 &&
                        sortedCollectionsData.map((elem, index) => (
                            <BtnCollection
                                key={index}
                                rank={elem.rank}
                                icon={elem.icon}
                                name={elem.name}
                                address={elem.address}
                                items={elem.items}
                                owners={elem.owners}
                                average={elem.average}
                                sales_7d={elem.sales7d}
                                sales={elem.sales}
                                volume_7d={elem.volume7d}
                                volume={elem.volume}
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
