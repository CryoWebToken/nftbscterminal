const axios = require('axios');
require('dotenv').config();

const chain = process.env.BSC_CHAIN_ID
const cov_api = process.env.COV_API
const cov_key = process.env.COV_KEY

// fetch NFT ids
async function fetchNFTIds(address) {
    let NFTs = [];
    let pageNumber = 0;
    let pageSize = 9999;
    let total_count = 0;

    return new Promise((resolve, reject) => {
        (function getNFTsIds() {
            let url = `${cov_api}/${chain}/tokens/${address}/nft_token_ids/?page-number=${pageNumber}&page-size=${pageSize}&key=${cov_key}`;
            axios.get(url, { timeout: 60000 }).then(response => {
                let nftData = response.data.data;
                if (response.data
                    && nftData
                    && nftData.items
                    && nftData.items.length != 0) {
                    total_count = nftData.pagination.total_count;
                    nftData.items.forEach(el => {
                        NFTs.push(Number(el.token_id));
                    });
                    if (nftData.pagination.has_more) {
                        pageNumber++;
                        getNFTsIds();
                    } else if (!nftData.pagination.has_more && NFTs.length == total_count) {
                        console.log(`Fetched all ${NFTs.length} NFTs for ${address}`);
                        resolve(NFTs);
                    } else {
                        console.log(`Incorrect fetch data`);
                        reject(false);
                    }
                }
            }).catch(error => {
                reject(error);
                console.log(error);
            });
        })();
    });
}

// fetch NFT metadata
async function fetchNFTMedadata(address, nftId) {
    return new Promise((resolve, reject) => {
        let url = `${cov_api}/${chain}/tokens/${address}/nft_metadata/${nftId}/?&key=${cov_key}`;
        axios.get(url, { timeout: 60000 }).then(response => {
            let nftData = response.data.data;
            if (response.data
                && nftData
                && nftData.items
                && nftData.items.length != 0) {
                resolve(nftData.items[0]);
            } else {
                reject(false);
            }
        }).catch(error => {
            reject(error);
            console.log(error);
        });
    });
}

// fetch Collection transaction
async function fetchNftTnx(address, nftID) {
    return new Promise((resolve, reject) => {
        let url = `${cov_api}/${chain}/tokens/${address}/nft_transactions/${nftID}/?&key=${cov_key}`;
        axios.get(url, { timeout: 60000 }).then(response => {
            let nftData = response.data.data;
            if (response.data
                && nftData
                && nftData.items
                && nftData.items[0].nft_transactions
                && nftData.items[0].nft_transactions.length != 0) {
                resolve(nftData.items[0].nft_transactions);
            } else {
                reject(false);
            }
        }).catch(error => {
            reject(error);
            console.log(error);
        });
    });
}


module.exports = { fetchNFTIds, fetchNFTMedadata, fetchNftTnx };