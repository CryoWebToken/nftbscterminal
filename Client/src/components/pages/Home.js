import { useContext } from "react";
import { DataContext } from "../../context/DataContext";
import Error from "../main/Error";
import Loading from "../main/Loading";
import TableRank from "../main/TableRank";
import NewBanners from "../main/NewBanners";

export default function Home() {
    const dataContext = useContext(DataContext);

    if(dataContext.state.error) return (
        <section>
            <div className="wrapper global-width">
                <Error message={dataContext.state.error} />
            </div>
        </section>
    );

    if(dataContext.state.loading) return (
        <section>
            <div className="wrapper global-width">
                <Loading />
            </div>
        </section>
    );

    return (
        <section>
            <div className="wrapper global-width">
                <NewBanners
                    newCollectionsData={dataContext.newCollectionsData}
                />
            {
                dataContext.sortedCollectionsData?.length > 0 &&
                <h1>Collections by Volume</h1>
            } 
            </div>
            {
                dataContext.sortedCollectionsData?.length > 0 &&
                <TableRank
                    sortedCollectionsData={dataContext.sortedCollectionsData}
                    rankSortBy={dataContext.rankSortBy}
                    setRankSortBy={dataContext.setRankSortBy}
                    totalPageCount={dataContext.totalPageCount}
                    pageLimit={dataContext.pageLimit}
                    currPage={dataContext.currPage}
                    setCurrPage={dataContext.setCurrPage}
                />
            }
        </section>
    );
}
