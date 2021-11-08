import { useContext, useState, useEffect, useRef, useReducer } from "react";
import { DataContext } from "../../context/DataContext";
import { getSankeyData } from "../../api";
import { DEBOUNCE_DELAY, INITIAL_DND, SANKEY_COLORS } from "../../helpers/constants";
import { debounce } from "lodash";
import { v4 as uuidv4 } from "uuid";
import Error from "../main/Error";
import Loading from "../main/Loading";
import ModalRich from "../modals/ModalRich";
import BtnRichList from "../buttons/BtnRichList";
import ChartSankey from "../charts/ChartSankey";
import DnD from "../dragndrop/DnD";

function reducer(state, action) {
    const error = action.payload.error;
    const loading = action.payload.loading;
    const dndData = action.payload.dndData;
    const orderedDndData = action.payload.orderedDndData;
  
    switch (action.type) {
        case "updateDndDataOrder":
            return {
                ...state,
                dndData: orderedDndData
            };
        case "updateDndData":
            return {
                ...state,
                dndData: dndData
            };
        case "updateLoading":
            return {
                ...state,
                loading: loading
            };
        case "updateError":
            return {
                ...state,
                error: error
            };
        case "reset":
            return {
                dndData: dndData,
                loading: loading,
                error: error
            };
        case "init":
            return action.payload;
        default:
            return {};
    }
}

export default function Rich() {
    const dataContext = useContext(DataContext);
    const chartWrapperRef = useRef(null);
    // ~~~ Modal ~~~
    const [showModalRich, setShowModalRich] = useState(false);
    const [showRichOptions, setShowRichOptions] = useState(false);
    // ~~~ Keeping tabs on loading and error ~~~
    const [state, dispatch] = useReducer(reducer, {
        dndData: INITIAL_DND,
        loading: true,
        error: ""
    });
    // ~~~ Data ~~~
    const [width, setWidth] = useState(0);
    const [valueSelected, setValueSelected] = useState({
        name: "Alpies",
        address: "0x57a7c5d10c3f87f5617ac1c60da60082e44d539e"
    });
    const [sankeyData, setSankeyData] = useState([]);
    const [attributes, setAttributes] = useState([]);
    
    // ~~~ Observer that reads with on resize to set width for chart ~~~
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
    // ~~~ Fetch data for Sankey Chart ~~~
    useEffect(() => {
        let mounted = true;
        (async () => {
            if (mounted) {
                try {
                    const response = await getSankeyData(valueSelected.address);
                    setAttributes(response.attributes);
                    setSankeyData(response.data);
                } catch (err) {
                    dispatch({
                        type: "updateError", payload: {
                            error: err.message
                        }
                    });
                    dispatch({
                        type: "updateLoading", payload: {
                            loading: false
                        }
                    });
                }
            }
        })();

        return () => {
            mounted = false;
            dispatch({
                type: "reset", payload: {
                    dndData: INITIAL_DND,
                    loading: true,
                    error: ""
                }
            });
        }
    }, [valueSelected]);

    useEffect(() => {
        // Create the initial data for DnD
        if(attributes?.length === 0) return;
        const column = "column-1";

        const rowIds = [];
        const rows = {};
        attributes.forEach((attribute, index) => {
            const id = uuidv4();
            rowIds.push(id);
            rows[id] = {
                id: id,
                key: attribute,
                color: SANKEY_COLORS[index]
            }
        });
        
        const newDndData = {
            ...INITIAL_DND,
            columns: {
                ...INITIAL_DND.columns,
                [column]: {
                    ...INITIAL_DND.columns[column],
                    rowIds: rowIds
                }
            },
            rows: rows
        }

        // Dispatch to remove error and loading and update DnD data
        dispatch({
            type: "updateError", payload: {
                error: ""
            }
        });
        dispatch({
            type: "updateLoading", payload: {
                loading: false
            }
        });
        dispatch({
            type: "updateDndData", payload: {
                dndData: newDndData
            }
        });

        return () => {
            dispatch({
                type: "reset", payload: {
                    dndData: INITIAL_DND,
                    loading: true,
                    error: ""
                }
            });
        }
    }, [attributes]);

    const closeModalRich = () => {
        setShowRichOptions(false);
        setShowModalRich(false);
    }

    const openModalRich = () => {
        setShowRichOptions(true);
        setShowModalRich(true);
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
            <div ref={chartWrapperRef} className="global-width">
                <ModalRich
                    showModalRich={showModalRich}
                    closeModalRich={closeModalRich}
                />
                {
                    dataContext.searchList?.length > 0 &&
                    <div className="rich-wrapper">
                        <BtnRichList
                            showRichOptions={showRichOptions}
                            openModalRich={openModalRich}
                            closeModalRich={closeModalRich}
                            options={dataContext.searchList}
                            valueSelected={valueSelected}
                            setValueSelected={setValueSelected}
                        />
                        <p>Visualize the distribution of current owners for the {valueSelected.name} collection. The diagram displays the flow of current owners into the following:<br></br>- intervals for the number of items (NFTs) that the owners currently hold; <br></br>- intervals for the total amount in BNB of those items based on the last amount transferred.</p>
                    </div>
                }

                {
                    sankeyData.length > 0 &&
                    <div className="dnd-wrappper">
                        <DnD
                            state={state}
                            dispatch={dispatch}
                        />
                        <ChartSankey
                            width={width}
                            state={state}
                            data={sankeyData}
                        />
                    </div>
                }
            </div>
        </section>
    );
}
