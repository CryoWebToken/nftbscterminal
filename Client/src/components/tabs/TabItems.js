import "./TabItems.css";
import TableItems from "../main/TableItems";
import InputControl from "../main/InputControl";

export default function TabItems({
    address,
    totalPageCount,
    pageLimit,
    currPage,
    setCurrPage,
    itemsData,
    attributesData,
    setAttributesData,
    sliderValue,
    setSliderValue,
    activeFilters,
    minAmount,
    maxAmount,
    filteredItemsData,
    itemsSortBy,
    setItemsSortBy
}) {
    return (
        <div className="tab-items global-width">
            <h1>Collection items</h1>
            <div className="tab-items__filters">
                <InputControl
                    attributesData={attributesData}
                    sliderValue={sliderValue}
                    minAmount={minAmount}
                    maxAmount={maxAmount}
                    activeFilters={activeFilters}
                    setSliderValue={setSliderValue}
                    setAttributesData={setAttributesData}
                    itemsSortBy={itemsSortBy}
                    setItemsSortBy={setItemsSortBy}
                />
                {
                    itemsData?.length > 0 &&
                    <TableItems
                        address={address}
                        totalPageCount={totalPageCount}
                        pageLimit={pageLimit}
                        currPage={currPage}
                        setCurrPage={setCurrPage}
                        itemsData={itemsData}
                    />
                }
                {
                    filteredItemsData?.length === 0 &&
                    <h3 className="tab-items__result">No items found.</h3>
                }
            </div>
        </div>
    )
}
