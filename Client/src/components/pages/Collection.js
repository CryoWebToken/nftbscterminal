import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import {
    getCollectionDetails,
    getItemsData,
    getStatsData,
    getChartVolumeData,
    getChartSalesData,
    getChartOwnersData,
    getChartMintsData,
    getChartAvgData,
    getChartFeesData
} from "../../api";
import { CHART_COLORS } from "../../helpers/constants";
import {
    DEBOUNCE_DELAY,
    PAGE_LIMIT,
    SLIDER_MAX,
    INITIAL_ITEMS_SORT_BY
} from "../../helpers/constants";
import { debounce } from "lodash";
import Error from "../main/Error";
import Loading from "../main/Loading";
import BtnCrum from "../buttons/BtnCrum";
import CardCollection from "../cards/CardCollection";
import TabStats from "../tabs/TabStats";
import TabItems from "../tabs/TabItems";

export default function Collection() {
    const address = useParams()["address"];
    const chartWrapperRef = useRef(null);
    const [width, setWidth] = useState(0);
    const [tab, setTab] = useState("Items");
    const [minAmount, setMinAmount] = useState(0);
    const [maxAmount, setMaxAmount] = useState(0);
    // ~~~ Data ~~~
    const [collectionDetails, setCollectionDetails] = useState({});
    const [rawItemsData, setRawItemsData] = useState([]);
    const [statsData, setStatsData] = useState({});
    const [itemsData, setItemsData] = useState([]);
    const [chartVolumeData, setChartVolumeData] = useState([]);
    const [chartSalesData, setChartSalesData] = useState([]);
    const [chartOwnersData, setChartOwnersData] = useState([]);
    const [chartMintsData, setChartMintsData] = useState([]);
    const [chartAvgData, setChartAvgData] = useState([]);
    const [chartFeesData, setChartFeesData] = useState([]);
    const [rawAttributesData, setRawAttributesData] = useState([]);
    const [attributesData, setAttributesData] = useState([]);
    const [sliderValue, setSliderValue] = useState([0, SLIDER_MAX]);
    // ~~~ Data manipulation ~~~
    const [filteredItemsData, setFilteredItemsData] = useState([]);
    const [sortedItemsData, setSortedItemsData] = useState([]);
    // ~~~ Filtering and sorting ~~~
    const [activeFilters, setActiveFilters] = useState([]);
    const [itemsSortBy, setItemsSortBy] = useState([...INITIAL_ITEMS_SORT_BY]);
    // ~~~ Keeping tabs on loading and error ~~~
    const [state, setState] = useState({
        loading: true,
        error: ""
    });
    // ~~~ Params for calling APIs (to be implemented) ~~~
    const [totalPageCount, setTotalPageCount] = useState(0);
    const [currPage, setCurrPage] = useState(1);

    // ~~~ Observer that reads with on resize to set width for charts ~~~
    useEffect(() => {
        const debouncedHandleObserver = debounce(entries => {
            const newWidth = entries[0].contentRect.width;
            setWidth(newWidth);
        }, DEBOUNCE_DELAY);

        const elem = chartWrapperRef?.current;
        const observer = new ResizeObserver(debouncedHandleObserver);

        
        if(elem) {
            observer.observe(elem);
        }

        return () => {
            observer.unobserve(elem);
        }
    }, []);

    // ~~~ API calls ~~~
    // ~~~ Fetching data for Collection Details ~~~
    useEffect(() => {
        let mounted = true;
        (async () => {
            if (mounted) {
                try {
                    const response = await getCollectionDetails(address);
                    setCollectionDetails(response);
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
    }, [address]);

    // ~~~ Fetching data for Items Table ~~~
    useEffect(() => {
        if(tab !== "Items") return;

        let mounted = true;
        (async () => {
            if (mounted) {
                try {
                    const response = await getItemsData(address);
                    const amounts = response.nfts.map(elem => elem.maxAmount);
                    const min = Math.floor(Math.min(...amounts));
                    const max = Math.ceil(Math.max(...amounts));

                    setRawItemsData(response.nfts);
                    setRawAttributesData(response.attributes);
                    setMinAmount(min);
                    setMaxAmount(max);
                    setSliderValue([min, max]);
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
            setState({
                loading: true,
                error: ""
            });
        }
    }, [address, tab]);

    // ~~~ Compute properties for creating inputs ~~~
    useEffect(() => {
        if(tab !== "Items") return;
        if(rawAttributesData?.length === 0) return;

        const updatedAttributes = [];
        rawAttributesData.forEach((elem, index) => {
            const properties = [];
            const keys = Object.keys(elem.values);

            keys.forEach((key, index) => {
                properties.push({
                    id: index,
                    property: key,
                    count: elem.values[key],
                    checked: false
                });
            });

            updatedAttributes.push({
                id: index,
                attribute: elem.name,
                properties: properties
            });
        });

        setAttributesData(updatedAttributes);
    }, [rawAttributesData, tab]);

    // ~~~ Update active filter on attributes data change ~~~
    useEffect(() => {
        if(tab !== "Items") return;
        if(attributesData?.length === 0) return;

        const newFilters = [];
        attributesData.forEach(attribute => {
            attribute.properties.forEach(property => {
                if(property.checked) {
                    newFilters.push({
                        attributeId: attribute.id,
                        attribute: attribute.attribute,
                        propertyId: property.id,
                        property: property.property
                    });
                }
            });
        });

        setActiveFilters(newFilters);
    }, [attributesData, tab]);

    // ~~~ Filtering ~~~
    useEffect(() => {
        if(tab !== "Items") return;
        let updatedFilteredData = [];
        // Filter based on active filters
        if(activeFilters?.length === 0) {
            updatedFilteredData = [...rawItemsData];
        } else {
            const found = [];
            for(let i = 0; i < rawItemsData.length; i++) {
                const attributes = rawItemsData[i].attributes;
                let item;
                if(attributes) {
                    activeFilters.forEach(filter => {
                        // Check if already exists
                        if(!item) {
                            const result = attributes.find(elem => {
                                return elem.trait_type === filter.attribute &&
                                       elem.value === filter.property;
                            });
                            if(result) {
                                item = rawItemsData[i];
                            }
                        }
                    });
                }
                if(item) {
                    found.push(item);
                }
            }
            updatedFilteredData = [...found];
        }
        // Filter based on amount traded
        if((sliderValue[0] !== minAmount) || (sliderValue[1] !== maxAmount)) {
            updatedFilteredData = updatedFilteredData.filter(elem =>{
                return  elem.maxAmount >= sliderValue[0] &&
                        elem.maxAmount <= sliderValue[1];
            });
            
        }

        setCurrPage(1);
        setFilteredItemsData(updatedFilteredData);
    }, [rawItemsData, activeFilters, sliderValue, minAmount, maxAmount, tab]);

    // ~~~ Sorting ~~~
    useEffect(() => {
        if(tab !== "Items") return;
        // Sort data displayed in Items Table
        const sortedData = [...filteredItemsData];
        const sortBy = itemsSortBy.find(elem => elem.checked);
        const column = sortBy ? sortBy.column : "tokenId";

        if(column !== "created") {
            sortedData.sort((a, b) => {
                if(sortBy.ascending) {
                    return a[column] - b[column];
                } else {
                    return b[column] - a[column];
                }
            });
        } else {
            sortedData.sort((a, b) => {
                return new Date(b[column]) - new Date(a[column]);
            });
        }
    
        setSortedItemsData(sortedData);
    }, [itemsSortBy, filteredItemsData, tab]);

    // ~~~ Update items data on pagination change ~~~
    useEffect(() => {
        if(tab !== "Items") return;

        const start = (currPage - 1) * PAGE_LIMIT;
        const end = start + PAGE_LIMIT;
        const slicedItemsData = [...sortedItemsData].slice(start, end);
        const updatedItemsData = [...slicedItemsData];
        // Compute rarity
        updatedItemsData.forEach(item => {
            const attributes = item.attributes;
            attributes.forEach(attribute => {
                const foundAttribute = attributesData.find(elem => elem.attribute === attribute.trait_type);
                const foundProperty = foundAttribute.properties.find(elem => {
                    return elem.property === attribute.value;
                });
                const rarity = foundProperty.count / rawItemsData.length;
                attribute.rarity = rarity;
            });
        });

        setItemsData(updatedItemsData);
        setTotalPageCount(sortedItemsData.length);
    }, [sortedItemsData, currPage, rawItemsData, attributesData, tab]);

    // ~~~ Fetching data for Stats ~~~
    useEffect(() => {
        if(tab !== "Stats") return;

        let mounted = true;
        (async () => {
            if (mounted) {
                try {
                    const response = await getStatsData(address);
                    setStatsData(response);
                } catch (err) {
                    console.error(err);
                }
            }
        })();

        return () => {
            mounted = false;
        }
    }, [address, tab]);

    // ~~~ Fetching data for Volume chart ~~~
    useEffect(() => {
        if(tab !== "Stats") return;

        let mounted = true;
        (async () => {
            if (mounted) {
                try {
                    const response = await getChartVolumeData(address);
                    setChartVolumeData(response);
                } catch (err) {
                    console.error(err);
                }
            }
        })();

        return () => {
            mounted = false;
        }
    }, [address, tab]);

    // ~~~ Fetching data for Sales chart ~~~
    useEffect(() => {
        if(tab !== "Stats") return;

        let mounted = true;
        (async () => {
            if (mounted) {
                try {
                    const response = await getChartSalesData(address);
                    setChartSalesData(response);
                } catch (err) {
                    console.error(err);
                }
            }
        })();

        return () => {
            mounted = false;
        }
    }, [address, tab]);

    // ~~~ Fetching data for Owners chart ~~~
    useEffect(() => {
        if(tab !== "Stats") return;

        let mounted = true;
        (async () => {
            if (mounted) {
                try {
                    const response = await getChartOwnersData(address);
                    setChartOwnersData(response);
                } catch (err) {
                    console.error(err);
                }
            }
        })();

        return () => {
            mounted = false;
        }
    }, [address, tab]);

    // ~~~ Fetching data for Mints chart ~~~
    useEffect(() => {
        if(tab !== "Stats") return;

        let mounted = true;
        (async () => {
            if (mounted) {
                try {
                    const response = await getChartMintsData(address);
                    setChartMintsData(response);
                } catch (err) {
                    console.error(err);
                }
            }
        })();

        return () => {
            mounted = false;
        }
    }, [address, tab]);

    // ~~~ Fetching data for Avg price chart ~~~
    useEffect(() => {
        if(tab !== "Stats") return;

        let mounted = true;
        (async () => {
            if (mounted) {
                try {
                    const response = await getChartAvgData(address);
                    setChartAvgData(response);
                } catch (err) {
                    console.error(err);
                }
            }
        })();

        return () => {
            mounted = false;
        }
    }, [address, tab]);

    // ~~~ Fetching data for Fees chart ~~~
    useEffect(() => {
        if(tab !== "Stats") return;

        let mounted = true;
        (async () => {
            if (mounted) {
                try {
                    const response = await getChartFeesData(address);
                    setChartFeesData(response);
                } catch (err) {
                    console.error(err);
                }
            }
        })();

        return () => {
            mounted = false;
        }
    }, [address, tab]);

    // ~~~ Update Loading and Error ~~~
    useEffect(() => {
        if(tab === "Items") {
            collectionDetails["name"] &&
            rawItemsData.length > 0 &&
            attributesData.length > 0 &&
            setState({
                loading: false,
                error: ""
            });
        } else if(tab === "Stats") {
            collectionDetails["name"] &&
            statsData["items"] &&
            setState({
                loading: false,
                error: ""
            });
        }

        return () => {
            setState({
                loading: true,
                error: ""
            });
        }
    }, [collectionDetails, filteredItemsData, statsData, chartVolumeData, chartSalesData, chartOwnersData, chartMintsData, chartAvgData, rawItemsData, attributesData, tab]);

    const reset = () => {
        setMinAmount(0);
        setMaxAmount(0);
        setCollectionDetails({});
        setRawItemsData([]);
        setStatsData({});
        setItemsData([]);
        setChartVolumeData([]);
        setChartSalesData([]);
        setChartOwnersData([]);
        setChartMintsData([]);
        setChartAvgData([]);
        setChartFeesData([]);
        setRawAttributesData([]);
        setAttributesData([]);
        setSliderValue([0, SLIDER_MAX]);
        setFilteredItemsData([]);
        setSortedItemsData([]);
        setActiveFilters([]);
        setItemsSortBy([...INITIAL_ITEMS_SORT_BY]);
        setState({
            loading: true,
            error: ""
        });
        setTotalPageCount(0);
        setCurrPage(1);
    }

    if(state.error) return (
        <section>
            <div ref={chartWrapperRef} className="wrapper global-width">
                <Error message={state.error} />
            </div>
        </section>
    );

    if(state.loading) return (
        <section>
            <div ref={chartWrapperRef} className="wrapper global-width">
                <Loading />
            </div>
        </section>
    );

    return (
        <section>
            <div ref={chartWrapperRef} className="wrapper global-width">
                <div className="breadcrum">
                    <BtnCrum path="" label="Collections"/>
                    {
                        collectionDetails["name"] &&
                        <div>{collectionDetails["name"]}</div>
                    }
                </div>
                {
                    collectionDetails["name"] &&
                    <CardCollection
                        collectionDetails={collectionDetails}
                        tab={tab}
                        setTab={setTab}
                    />
                }
                {
                    tab === "Stats" &&
                    <TabStats
                        colors={CHART_COLORS}
                        width={width}
                        statsData={statsData}
                        chartVolumeData={chartVolumeData}
                        chartSalesData={chartSalesData}
                        chartOwnersData={chartOwnersData}
                        chartMintsData={chartMintsData}
                        chartAvgData={chartAvgData}
                        chartFeesData={chartFeesData}
                    />
                }
            </div>
            {
                tab === "Items" &&
                <TabItems
                    address={address}
                    totalPageCount={totalPageCount}
                    pageLimit={PAGE_LIMIT}
                    currPage={currPage}
                    itemsSortBy={itemsSortBy}
                    itemsData={itemsData}
                    attributesData={attributesData}
                    minAmount={minAmount}
                    maxAmount={maxAmount}
                    filteredItemsData={filteredItemsData}
                    sliderValue={sliderValue}
                    activeFilters={activeFilters}
                    setItemsSortBy={setItemsSortBy}
                    setCurrPage={setCurrPage}
                    setAttributesData={setAttributesData}
                    setSliderValue={setSliderValue}
                />
            }
        </section>
    );
}
