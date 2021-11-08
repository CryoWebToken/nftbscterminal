const { sequelize } = require('./database');
const Sequelize = require('sequelize');
const { QueryTypes } = require('sequelize');
const { connect } = require('./connectSQL');
const { Nft, Collections, Transaction, Log_event, Collections_data } = require('./models');
const { fetchNFTIds, fetchNFTMedadata, fetchNftTnx } = require('../Service/dataFetch')
const _ = require('lodash');

// fetch collections from db and then fetches nft ids from contract
async function fetchTransactions() {
    setTimeout(() => {
        Nft.findAll(
            {
                attributes: ['nftID', 'contract'],
                logging: false, raw: true
            })
            .then(nfts => {
                if (nfts === null) {
                    fetchTransactions();
                } else {
                    for (let i = 0; i < nfts.length; i++) {
                        setTimeout(function () {
                            fetchNftTnx(nfts[i].contract, nfts[i].nftID).then(res => {
                                Transaction.findAll({
                                    where: {
                                        contract: nfts[i].contract,
                                        nftID: nfts[i].nftID
                                    },
                                    attributes: ['tx_hash'],
                                    logging: false, raw: true
                                }).then(transactions => {
                                    if (transactions.length === 0) {
                                        let data = []
                                        let logs = []
                                        res.forEach(el => {
                                            data.push({
                                                tx_hash: el.tx_hash,
                                                contract: nfts[i].contract,
                                                nftId: nfts[i].nftID,
                                                block_signed_at: el.block_signed_at,
                                                block_height: el.block_height,
                                                from: el.from_address,
                                                to: el.to_address,
                                                val: el.value == "0" ? 0 : Number((Number(el.value) / 10 ** 18).toFixed(8)),
                                                fee: Number((el.gas_spent * el.gas_price / 10 ** 18).toFixed(8)),
                                            })
                                            if (el.log_events.length > 0) {
                                                el.log_events.forEach(log => {
                                                    if (log.decoded &&
                                                        (
                                                            (log.decoded.name == "Transfer"
                                                                && log.raw_log_topics
                                                                && log.raw_log_topics.length == 4
                                                            )
                                                            || log.decoded.name == "Deposit")
                                                    ) {
                                                        logs.push({
                                                            tx_hash: el.tx_hash,
                                                            contract: nfts[i].contract,
                                                            nftId: nfts[i].nftID,
                                                            block_signed_at: log.block_signed_at,
                                                            type: log.decoded.name,
                                                            val1: log.decoded.params[0].value,
                                                            val2: log.decoded.params[1].value,
                                                        })
                                                    }
                                                })
                                            }
                                        })
                                        Transaction.bulkCreate(data, { logging: false, raw: true });
                                        Log_event.bulkCreate(logs, { logging: false, raw: true });
                                        nfts.length - 1 == i ? fetchTransactions() : null;
                                    } else {
                                        let data = []
                                        let logstoAdd = []
                                        res.forEach(el => {
                                            data.push({
                                                tx_hash: el.tx_hash,
                                                contract: nfts[i].contract,
                                                nftId: nfts[i].nftID,
                                                block_signed_at: el.block_signed_at,
                                                block_height: el.block_height,
                                                from: el.from_address,
                                                to: el.to_address,
                                                val: el.value == "0" ? 0 : Number((Number(el.value) / 10 ** 18).toFixed(8)),
                                                fee: Number((el.gas_spent * el.gas_price / 10 ** 18).toFixed(8)),
                                                log_events: el.log_events
                                            })
                                        })
                                        let toAddTnx = _(data)
                                            .differenceBy(transactions, 'tx_hash')
                                            .map(_.partial(_.pick, _, 'tx_hash', 'contract', 'nftId', 'block_signed_at', 'block_height', 'from', 'to', 'val', 'fee', 'log_events'))
                                            .value();
                                        toAddTnx.forEach(el => {
                                            if (el.log_events.length > 0) {
                                                el.log_events.forEach(log => {
                                                    if (log.decoded &&
                                                        (
                                                            (log.decoded.name == "Transfer"
                                                                && log.raw_log_topics
                                                                && log.raw_log_topics.length == 4
                                                            )
                                                            || log.decoded.name == "Deposit")
                                                    ) {
                                                        logstoAdd.push({
                                                            tx_hash: el.tx_hash,
                                                            contract: nfts[i].contract,
                                                            nftId: nfts[i].nftID,
                                                            block_signed_at: log.block_signed_at,
                                                            type: log.decoded.name,
                                                            val1: log.decoded.params[0].value,
                                                            val2: log.decoded.params[1].value,
                                                        })
                                                    }
                                                })
                                            }
                                            delete el.log_events;
                                        });
                                        toAddTnx.length == 0 ? null : Transaction.bulkCreate(toAddTnx, { logging: false, raw: true });
                                        logstoAdd.length == 0 ? null : Log_event.bulkCreate(logstoAdd, { logging: false, raw: true });
                                        nfts.length - 1 == i ? fetchTransactions() : null;
                                    }
                                }).catch(err => {
                                    nfts.length - 1 == i ? fetchTransactions() : null;
                                    console.log(err)
                                });
                            }).catch(err => {
                                nfts.length - 1 == i ? fetchTransactions() : null;
                                console.log(err)
                            })
                        }, 500 * 1 * i) // 1 sec * index
                    };
                }
            }).catch(err => {
                fetchTransactions();
                throw err;
            });
    }, 30 * 60 * 1000); // 30 min then re fetch nfts tnx
}

// fetch collections from db and then fetches nft ids from contract
async function fetchCollections() {
    Collections.findAll({ logging: false, raw: true })
        .then(collection => {
            if (collection === null) {
                return;
            } else {
                collection.forEach((el, index) => {
                    setTimeout(function () {
                        fetchNFTIds(el.address).then(res => {
                            insertNftIds(el.address, res)
                        }).catch(err => {
                            console.log(err)
                        })
                    }, 1000 * 10 * index) // 10 sec * index
                });
            }
        }).catch(err => {
            throw err;
        });
}

// insert nft ids into data
async function insertNftIds(address, nftIds) {

    let nftsInDb = await Nft.findAll({
        where: {
            contract: address,
        },
        logging: false,
        raw: true
    });

    if (nftsInDb.length === 0) {
        let data = []
        nftIds.forEach(el => {
            data.push({
                contract: address,
                nftID: el
            })
        })
        await Nft.bulkCreate(data, { logging: false, raw: true });
        console.log(`added ${nftIds.length} NFTs to ${address}`)
    } else {
        let dataInDb = nftsInDb.map(({ nftID }) => nftID)
        let toAddNftIds = _.difference(nftIds, dataInDb);
        if (toAddNftIds.length > 0) {
            let data = []
            toAddNftIds.forEach(el => {
                data.push({
                    contract: address,
                    nftID: el
                })
            })
            await Nft.bulkCreate(data, { logging: false, raw: true });
            console.log(`added ${toAddNftIds.length} NFTs to ${address}`)
        }
    }
}

// fetch nft IDs from DB and then fetch nft metadata
async function fetchNftids() {
    setTimeout(() => {
        Nft.findAll({
            where: sequelize.where(sequelize.col('createdAt'), '=', sequelize.col('updatedAt')),
            logging: false, raw: true
        }).then(nfts => {
            console.log(nfts.length, `NFTs to get metadata`)
            if (nfts.length != 0) {
                for (let i = 0; i < nfts.length; i++) {
                    setTimeout(function () {
                        fetchNFTMedadata(nfts[i].contract, nfts[i].nftID).then(res => {
                            if (res.nft_data && res.nft_data[0].external_data && res.nft_data[0].external_data.attributes) {
                                console.log("fetched for", Number(res.nft_data[0].token_id), "Nb", i + 1, "/", nfts.length)
                                let name, desc;
                                name = (res.nft_data[0].external_data.name.replace(/\\/g, '')).replace(/'/g, "\\'");
                                desc = desc ? (res.nft_data[0].external_data.description.replace(/\\/g, '')).replace(/'/g, "\\'") : null;
                                let sql = `UPDATE nfts SET 
                                name = '${name}',
                                \`desc\` = '${desc}',
                                url = '${res.nft_data[0].token_url}', 
                                image = '${res.nft_data[0].external_data.image}', 
                                image_256 = '${res.nft_data[0].external_data.image_256}', 
                                owner = '${res.nft_data[0].owner_address}', 
                                burned = ${res.nft_data[0].burned}, 
                                attr = '${JSON.stringify(res.nft_data[0].external_data.attributes).replace(/'/g, "\\'")}',
                                updatedAt = UTC_TIMESTAMP()
                                WHERE contract = '${nfts[i].contract}'
                                AND nftID = '${nfts[i].nftID}'`
                                connect(sql).then(res => {
                                    nfts.length - 1 == i ? fetchNftids() : null;
                                }).catch(err => {
                                    nfts.length - 1 == i ? fetchNftids() : null;
                                    console.log(err)
                                })
                            } else {
                                nfts.length - 1 == i ? fetchNftids() : null;
                                console.log("no data for", nfts[i].nftID, nfts[i].contract, "Nb", i + 1, "/", nfts.length)
                            }
                        }).catch(err => {
                            nfts.length - 1 == i ? fetchNftids() : null;
                            console.log(err)
                        })
                    }, 500 * 1 * i) // 500 millisec * index
                };
            } else {
                fetchNftids()
            }
        }).catch(err => {
            fetchNftids()
            console.log(err);
        });
    }, 5 * 60 * 1000); // 5 min then re fetch nfts ids
}

// update collection data
async function collectionData() {
    const sql = `SELECT collections.address,
		collections.name,
		collections.icon,
		t.volume,
		t.sales,
		t.users,
		t.average,
		y.volume as volume7d,
		y.sales as sales7d,
		COUNT(nfts.contract) AS items
        FROM collections
        inner join
        (SELECT transactions.contract, SUM(transactions.val) as volume,count(transactions.val) as sales,(SUM(transactions.val) / count(transactions.val)) as average, p.users as users
		FROM nftonbsc.transactions
		inner join
		(SELECT contract, count(DISTINCT val2) as users
		FROM nftonbsc.log_events where \`type\` = 'Transfer' group by contract) as p
		on transactions.contract = p.contract
		where  transactions.val <> 0
		group by contract) as t
		on collections.address = t.contract
        inner join
        (SELECT transactions.contract, SUM(transactions.val) as volume,count(transactions.val) as sales
		FROM nftonbsc.transactions
		inner join
		(SELECT contract, count(DISTINCT val2) as users
		FROM nftonbsc.log_events group by contract) as p
		on transactions.contract = p.contract
		where  transactions.val <> 0
		and block_signed_at >= DATE(NOW()) - INTERVAL 7 DAY
		group by contract) as y
		on collections.address = y.contract
        left JOIN nfts
        ON collections.address = nfts.contract
        GROUP BY address,name,icon,t.volume,t.users`;
    sequelize.query(sql, {
        type: QueryTypes.SELECT,
        logging: false,
        raw: true
    }).then(collections => {
        if (collections.length > 0) {
            Collections_data.destroy({
                truncate: true,
                logging: false, raw: true
            }).then(() => {
                Collections_data.bulkCreate(collections, { logging: false, raw: true }).then(res => {
                    console.log(res.length, "collections data updated")
                }).catch(err => {
                    console.log(err)
                })
            }).catch(err => {
                console.log(err)
            })
        }
    }).catch(err => {
        console.log(err)
    });
}

module.exports = { fetchCollections, fetchNftids, fetchTransactions, collectionData };