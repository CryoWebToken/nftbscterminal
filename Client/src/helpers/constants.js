export const ROUTES = [
    {
        id: 0,
        path: "/",
        label: "Collections"
    },
    {
        id: 1,
        path: "/rich",
        label: "Rich list"
    },
    {
        id: 2,
        path: "/list",
        label: "List project"
    },
];

export const DEBOUNCE_DELAY = 100;

export const OPTIONS_RANK_SORT_BY = [
    {
        label: "#",
        name: "rank"
    },
    {
        label: "Collection",
        name: "name"
    },
    {
        label: "Supply",
        name: "items"
    },
    {
        label: "Owners",
        name: "owners"
    },
    {
        label: "Sales (7d)",
        name: "sales7d"
    },
    {
        label: "Sales (all)",
        name: "sales"
    },
    {
        label: "Avg Price",
        name: "average"
    },
    {
        label: "Volume (7d)",
        name: "volume7d"
    },
    {
        label: "Volume (all)",
        name: "volume"
    },
];

export const PAGE_LIMIT = 5;

export const CHART_STATS = [
    {
        label: "Items",
        name: "items"
    },
    {
        label: "Owners",
        name: "owners"
    },
    {
        label: "Avg. amount",
        name: "avg_amount"
    },
    {
        label: "Min. amount",
        name: "min_amount"
    },
    {
        label: "Max. amount",
        name: "min_amount"
    },
    {
        label: "Sales 24h",
        name: "sales_24h"
    },
    {
        label: "Sales 7d",
        name: "sales_7d"
    },
    {
        label: "Sales 30d",
        name: "sales_30d"
    },
    {
        label: "Sales",
        name: "sales"
    },
    {
        label: "Volume 24h",
        name: "volume_24h"
    },
    {
        label: "Volume 7d",
        name: "volume_7d"
    },
    {
        label: "Volume 30d",
        name: "volume_30d"
    },
    {
        label: "Volume",
        name: "volume"
    },
];

export const CHART_COLORS = ["23, 190, 207", "188, 189, 34", "227, 119, 194", "127, 127, 127", "255, 127, 14", "148, 103, 189", "140, 86, 75"];

export const CHART_OPTIONS = {
    layout: {
        backgroundColor: "transparent",
        textColor: "#31344b",
        fontSize: 16,
        fontFamily: "Nunito Sans"
    },
    priceScale: {
        borderColor: "#44476a"
    },
    timeScale: {
        borderColor: "#44476a",
        timeVisible: true,
        secondsVisible: false
    },
    crosshair: {
        vertLine: {
            color: "#44476a",
            width: 0.5,
            style: 0,
            visible: true,
            labelVisible: true,
        },
        horzLine: {
            color: "#44476a",
            width: 0.5,
            style: 0,
            visible: true,
            labelVisible: true,
        },
        mode: 0,
    },
    grid: {
        vertLines: {
            color: "#44476a60",
            style: 2,
            visible: true,
        },
        horzLines: {
            color: "#44476a60",
            style: 2,
            visible: true,
        }
    }
}

export const INITIAL_DND = {
    rows: {},
    columns: {
        "column-1": {
            id: "column-1",
            rowIds: []
        }
    },
    columnOrder: ["column-1"]
}

export const SANKEY_COLORS = ["#17becf", "#bcbd22", "#e377c2", "#7f7f7f"];

export const SLIDER_MAX = 9999;

export const INITIAL_ITEMS_SORT_BY = [
    {
        id: 0,
        label: "Token ID",
        ascending: true,
        checked: true,
        column: "tokenId"
    },
    {
        id: 1,
        label: "Lowest amount",
        ascending: true,
        checked: false,
        column: "maxAmount"
    },
    {
        id: 2,
        label: "Highest amount",
        ascending: false,
        checked: false,
        column: "maxAmount"
    },
    {
        id: 3,
        label: "Recently minted",
        ascending: false,
        checked: false,
        column: "created"
    },
];
