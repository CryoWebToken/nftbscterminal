import axios from "axios";

export const getNewCollections = async () => {
    try {
        const response = await axios.get(`/api/newCollections`);
        const data = response.data;

        if(data["status"]) {
            return data["data"];
        } else {
            throw Error(data["message"]);
        }
    } catch (err) {
        throw new Error(err.message);
    }
}

export const getSearchList = async () => {
    try {
        const response = await axios.get(`/api/collectionSearch`);
        const data = response.data;

        if(data["status"]) {
            return data["data"];
        } else {
            throw Error(data["message"]);
        }
    } catch (err) {
        throw new Error(err.message);
    }
}

export const getCollectionsData = async () => {
    try {
        const response = await axios.get(`/api/collections`);
        const data = response.data;

        if(data["status"]) {
            return data["data"];
        } else {
            throw Error(data["message"]);
        }
    } catch (err) {
        throw new Error(err.message);
    }
}

export const getCollectionDetails = async address => {
    try {
        const response = await axios.get(`/api/collectionDetails?address=${address}`);
        const data = response.data;

        if(data["status"]) {
            return data["data"];
        } else {
            throw Error(data["message"]);
        }
    } catch (err) {
        throw new Error(err.message);
    }
}

export const getItemsData = async address => {
    try {
        const response = await axios.get(`/api/nftList?address=${address}`);
        const data = response.data;
        if(data["status"]) {
            return data["data"];
        } else {
            throw Error(data["message"]);
        }
    } catch (err) {
        throw new Error(err.message);
    }
}

export const getStatsData = async address => {
    try {
        const response = await axios.get(`/api/collectionStats?address=${address}`);
        const data = response.data;

        if(data["status"]) {
            return data["data"];
        } else {
            throw Error(data["message"]);
        }
    } catch (err) {
        throw new Error(err.message);
    }
}

export const getChartVolumeData = async address => {
    try {
        const response = await axios.get(`/api/collectionVolume?address=${address}`);
        const data = response.data;

        if(data["status"]) {
            return data["data"];
        } else {
            throw Error(data["message"]);
        }
    } catch (err) {
        throw new Error(err.message);
    }
}

export const getChartSalesData = async address => {
    try {
        const response = await axios.get(`/api/collectionSales?address=${address}`);
        const data = response.data;

        if(data["status"]) {
            return data["data"];
        } else {
            throw Error(data["message"]);
        }
    } catch (err) {
        throw new Error(err.message);
    }
}

export const getChartOwnersData = async address => {
    try {
        const response = await axios.get(`/api/collectionOwners?address=${address}`);
        const data = response.data;

        if(data["status"]) {
            return data["data"];
        } else {
            throw Error(data["message"]);
        }
    } catch (err) {
        throw new Error(err.message);
    }
}

export const getChartMintsData = async address => {
    try {
        const response = await axios.get(`/api/collectionMints?address=${address}`);
        const data = response.data;

        if(data["status"]) {
            return data["data"];
        } else {
            throw Error(data["message"]);
        }
    } catch (err) {
        throw new Error(err.message);
    }
}

export const getChartAvgData = async address => {
    try {
        const response = await axios.get(`/api/collectionAvg?address=${address}`);
        const data = response.data;

        if(data["status"]) {
            return data["data"];
        } else {
            throw Error(data["message"]);
        }
    } catch (err) {
        throw new Error(err.message);
    }
}

export const getChartFeesData = async address => {
    try {
        const response = await axios.get(`/api/collectionFees?address=${address}`);
        const data = response.data;

        if(data["status"]) {
            return data["data"];
        } else {
            throw Error(data["message"]);
        }
    } catch (err) {
        throw new Error(err.message);
    }
}

export const submitProject = async data => {
    const {
        email,
        banner,
        icon,
        projectName,
        projectAddress,
        projectUrl,
        projectTwitter,
        projectDiscord,
        shortDesc
    } = data;

    try {
        const response = await axios.post(`/api/addCollection?email=${email}&projectName=${projectName}&shortDesc=${shortDesc}&projectAddress=${projectAddress}&icon=${icon}&banner=${banner}&projectUrl=${projectUrl}&projectTwitter=${projectTwitter}&projectDiscord=${projectDiscord}
        `);
        const data = response.data;

        if(data["status"]) {
            return data["message"];
        } else {
            throw Error(data["message"]);
        }
    } catch (err) {
        throw new Error(err.message);
    }
}

export const getSankeyData = async address => {
    try {
        const response = await axios.get(`/api/richList?address=${address}`);
        const data = response.data;

        if(data["status"]) {
            return data["data"];
        } else {
            throw Error(data["message"]);
        }
    } catch (err) {
        throw new Error(err.message);
    }
}

export const getItemData = async (address, tokenId) => {
    try {
        const response = await axios.get(`/api/nft?address=${address}&id=${tokenId}`);
        const data = response.data;

        if(data["status"]) {
            return data["data"];
        } else {
            throw Error(data["message"]);
        }
    } catch (err) {
        throw new Error(err.message);
    }
}
