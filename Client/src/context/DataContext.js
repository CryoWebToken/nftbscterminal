import React, { useState, useEffect } from "react";
import {
    getSearchList,
    getNewCollections,
    getCollectionsData,
    getNFTData
} from "../api";
import { PAGE_LIMIT } from "../helpers/constants";
import { sortByName } from "../helpers/functions";

export const DataContext = React.createContext();
DataContext.displayName = "DataProvider";

export default function DataProvider({ children }) {
    // ~~~ Auth details ~~~
    const [address, setAddress] = useState(null);
    // ~~~ Modals ~~~
    const [showModalSearch, setShowModalSearch] = useState(false);
    const [showModalMenu, setShowModalMenu] = useState(false);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [showModalConnect, setShowModalNfts] = useState(false);
    // ~~~ Params for calling  APIs ~~~
    const [totalPageCount, setTotalPageCount] = useState(0);
    const [currPage, setCurrPage] = useState(1);
    // ~~~ Params for sorting and filtering ~~~
    const [searchValue, setSearchValue] = useState("");
    const [rankSortBy, setRankSortBy] = useState({
        column: "volume",
        ascending: false
    });
    // ~~~ Data ~~~
    const [searchList, setSearchList] = useState([]);
    const [newCollectionsData, setNewCollectionsData] = useState([]);
    const [rawCollectionsData, setRawCollectionsData] = useState([]);
    const [collectionsData, setCollectionsData] = useState([]);
    // ~~~ Data manipulation ~~~
    const [filteredSearchList, setFilteredSearchList] = useState([]);
    const [sortedCollectionsData, setSortedCollectionsData] = useState([]);
    // ~~~ Keeping tabs on loading and error ~~~
    const [state, setState] = useState({
        loading: true,
        error: ""
    });
    // ~~~ Keeping tabs on loading, error and success ~~~
    const [stateNfts, setStateNfts] = useState({
        data: [],
        loading: false,
        error: "",
    });

    // ~~~ API calls ~~~
    // ~~~ Fetching data for Search Bar ~~~
    useEffect(() => {
        let mounted = true;
        (async () => {
            if (mounted) {
                try {
                    const response = await getSearchList();
                    const sorted = response.sort((a, b) => sortByName(a, b, "name"));
                    setSearchList(sorted);
                } catch (err) {
                    // Leave empty so it won't display
                    return;
                }
            }
        })();

        return () => {
            mounted = false;
        }
    }, []);

    // ~~~ Fetching data for Rank Table and New collections banners ~~~
    useEffect(() => {
        let mounted = true;
        (async () => {
            if (mounted) {
                try {
                    const promise1 = getCollectionsData();
                    const promise2 = getNewCollections();
                   
                    const [response1, response2] = await Promise.all([promise1, promise2])

                    response1.forEach((elem, index) => {
                        elem.rank = index + 1;
                    });
                    setRawCollectionsData(response1);
                    setTotalPageCount(response1.length);
                    setNewCollectionsData(response2);
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
        }
    }, []);

    // ~~~ Fetching data for NFTs page ~~~
    useEffect(() => {
        if(!address) return;

        let mounted = true;
        (async () => {
            if (mounted) {
                try {
                    const response = await getNFTData(address);
                    setStateNfts({
                        data: response,
                        loading: false,
                        error: ""
                    });
                } catch (err) {
                    setStateNfts({
                        data: [],
                        loading: false,
                        error: err.message
                    });
                }
            }
        })();

        return () => {
            mounted = false;
            setStateNfts({
                data: [],
                loading: true,
                error: ""
            });
        }
    }, [address]);

    // ~~~ Update items data on pagination change ~~~
    useEffect(() => {
        const start = (currPage - 1) * PAGE_LIMIT;
        const end = start + PAGE_LIMIT;
        const updatedCollectionsData = [...rawCollectionsData].slice(start, end);
        setCollectionsData(updatedCollectionsData);
    }, [rawCollectionsData, currPage]);

    // ~~~  Filtering ~~~
    useEffect(() => {
        // Filter Search list for Search Bar
        if(searchList?.length === 0) return;

        const results = [...searchList]
            .filter(elem => elem.name.toLowerCase()
            .includes(searchValue.toLowerCase()));

        results.sort((a, b) => sortByName(a, b, "name"));

        setFilteredSearchList(results);
    }, [searchValue, searchList]);

    // ~~~ Sorting ~~~
    useEffect(() => {
        // Sort data displayed in Rank Table
        if(collectionsData?.length === 0) return;

        const sortedData = [...collectionsData];
        const column = rankSortBy.column;

        // Check if it is a number of string
        if(typeof collectionsData[0][column] === "number") {
            sortedData.sort((a, b) => {
                if(rankSortBy.ascending) {
                    return a[column] - b[column];
                } else {
                    return b[column] - a[column];
                }
            });
        } else {
            sortedData.sort((a, b) => sortByName(a, b, column));

            if(rankSortBy.ascending) {
                sortedData.reverse();
            }
        }

        setSortedCollectionsData(sortedData);
    }, [rankSortBy, collectionsData]);

    // ~~~ Modal search controlls ~~~ 
    useEffect(() => {
        // Criteria to open/close modal-search for Search Bar
        if(searchValue || showSuggestions) {
            setShowModalSearch(true);
        } else {
            setShowModalSearch(false);
        }
    }, [searchValue, showSuggestions]);

    const handleLogin = async () => {
        if (window.ethereum) {
            try {
                const res = await window.ethereum.request({
                    method: 'eth_requestAccounts',
                });
                setAddress(res[0]);
                closeModalConnect();
            } catch (error) {
                alert("Something went wrong. Please try again!");
            }
        } else {
            alert("Please install the MetaMask extension!");
        }
    }

    const handleLogout = () => {
        setAddress(null);
        closeModalConnect();
    }

    const closeModalSearch = () => {
        setShowSuggestions(false);
        setSearchValue("");
    }

    const openModalSearch = () => {
        setShowSuggestions(true);
    }

    const closeModalMenu = () => {
        setShowModalMenu(false);
    }

    const openModalMenu = () => {
        setShowModalMenu(true);
    }

    const closeModalConnect = () => {
        setShowModalNfts(false);
    }

    const openModalConnect = () => {
        setShowModalNfts(true);
    }

    return (
        <DataContext.Provider
            value={{
                state: state,
                address: address,
                showSuggestions: showSuggestions,
                showModalSearch: showModalSearch,
                showModalMenu: showModalMenu,
                showModalConnect: showModalConnect,
                searchValue: searchValue,
                rankSortBy: rankSortBy,
                totalPageCount: totalPageCount,
                currPage: currPage,
                pageLimit: PAGE_LIMIT,
                newCollectionsData: newCollectionsData,
                searchList: searchList,
                filteredSearchList: filteredSearchList,
                sortedCollectionsData: sortedCollectionsData,
                stateNfts: stateNfts,
                setSearchValue: setSearchValue,
                setRankSortBy: setRankSortBy,
                setCurrPage: setCurrPage,
                openModalSearch: openModalSearch,
                closeModalSearch: closeModalSearch,
                openModalMenu: openModalMenu,
                closeModalMenu: closeModalMenu,
                openModalConnect: openModalConnect,
                closeModalConnect: closeModalConnect,
                handleLogin: handleLogin,
                handleLogout: handleLogout
            }}
        >
            {children}
        </DataContext.Provider>
    );
}
