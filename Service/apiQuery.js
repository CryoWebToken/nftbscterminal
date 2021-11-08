const { sequelize } = require('../Database/database');
const { QueryTypes } = require('sequelize');
const { Collections, Collections_data, CollectionRequest } = require('../Database/models');

// check if collection exists
async function checkCollection(projectAddress) {
    return new Promise((resolve, reject) => {
        Collections.findOne({
            where: { address: projectAddress },
            logging: false, raw: true
        }).then(collection => {
            collection === null ? resolve(false) : resolve(true)
        }).catch(err => {
            reject(err)
        });
    });
}

// get an nft details
async function nftDetails(address, id) {
    const promise1 = new Promise((resolve, reject) => {
        const sql = `SELECT nfts.nftID as id, nfts.contract as address, nfts.name, nfts.\`desc\` as description, nfts.url, nfts.image,
                    nfts.image_256, nfts.attr as attributes,
                    t.collection
                    FROM nftonbsc.nfts
                    inner join (select name as collection, address from collections) t on t.address = nfts.contract
                    where nfts.contract = '${address}' and nfts.nftID = ${id};`;
        sequelize.query(sql, {
            type: QueryTypes.SELECT,
            logging: false,
            raw: true
        }).then(nft => {
            nft[0].attributes = JSON.parse(nft[0].attributes);
            nft === null ? reject("not found") : resolve(nft);
        }).catch(err => {
            reject(err)
        });
    });
    const promise2 = new Promise((resolve, reject) => {
        const sql = `SELECT tx_hash, block_signed_at, block_height, \`from\`, \`to\`, val, fee
                    FROM nftonbsc.transactions where contract = '${address}' and nftId = ${id};`;
        sequelize.query(sql, {
            type: QueryTypes.SELECT,
            logging: false,
            raw: true
        }).then(transactions => {
            transactions === null ? reject("not found") : resolve(transactions);
        }).catch(err => {
            reject(err)
        });
    });
    let vals = await Promise.all([promise1, promise2]).then((values) => {

        let final = {
            ...values[0][0],
            transactions: values[1]
        };

        return final;

    }).catch(err => {
        console.log(err);
        return err;
    });

    return vals;
}

// user add collection
async function addcoll(collection) {
    return new Promise((resolve, reject) => {
        CollectionRequest.create({
            name: collection.projectName,
            banner: collection.banner,
            icon: collection.icon,
            email: collection.email,
            address: collection.projectAddress,
            url: collection.projectUrl,
            twitter: collection.projectTwitter,
            discord: collection.projectDiscord,
            desc: collection.shortDesc
        }, { logging: false, raw: true }
        ).then(collection => {
            resolve(true)
        }).catch(err => {
            reject(err)
        });
    });
}

// get a collection stats
async function collectionStats(address) {
    const promise1 = new Promise((resolve, reject) => {

        const sql = `select count(DISTINCT log_events.val2) as owners
                    from nftonbsc.log_events
                    where log_events.contract = '${address}'
                    and \`type\` = 'Transfer'`;
        sequelize.query(sql, {
            type: QueryTypes.SELECT,
            logging: false,
            raw: true
        }).then(sales => {
            sales === null ? reject(false) : resolve(sales)
        }).catch(err => {
            reject(err)
        });
    });

    const promise2 = new Promise((resolve, reject) => {
        const sql = `Select count(nfts.nftID) as items from nfts
                    where nfts.contract = '${address}'`;
        sequelize.query(sql, {
            type: QueryTypes.SELECT,
            logging: false,
            raw: true
        }).then(sales => {
            sales === null ? reject(false) : resolve(sales)
        }).catch(err => {
            reject(err)
        });
    });

    const promise3 = new Promise((resolve, reject) => {
        const sql = `select min(val) as \`floor\`,
                    max(val) as ath,
                    (sum(val) / count(val)) as average
                    from nftonbsc.transactions
                    where contract = '${address}'
                    and val <> 0;`;
        sequelize.query(sql, {
            type: QueryTypes.SELECT,
            logging: false,
            raw: true
        }).then(sales => {
            sales === null ? reject(false) : resolve(sales)
        }).catch(err => {
            reject(err)
        });
    });

    const promise4 = new Promise((resolve, reject) => {
        const sql = `SELECT COUNT(*) AS 'All'
                    , (SELECT COUNT(*) FROM transactions WHERE block_signed_at >= DATE(NOW()) - INTERVAL 1 DAY
                        and contract = '${address}') AS '24h'
                    , (SELECT COUNT(*) FROM transactions WHERE block_signed_at >= DATE(NOW()) - INTERVAL 7 DAY
                        and contract = '${address}') AS '7days'
                    , (SELECT COUNT(*) FROM transactions WHERE block_signed_at >= DATE(NOW()) - INTERVAL 70 DAY
                        and contract = '${address}') AS '30days'
                    FROM transactions
                    where contract = '${address}'
                    and transactions.val <> 0`;
        sequelize.query(sql, {
            type: QueryTypes.SELECT,
            logging: false,
            raw: true
        }).then(sales => {
            sales === null ? reject(false) : resolve(sales)
        }).catch(err => {
            reject(err)
        });
    });

    const promise5 = new Promise((resolve, reject) => {
        const sql = `SELECT sum(val) AS 'All'
                    , (SELECT sum(val) FROM transactions WHERE block_signed_at >= DATE(NOW()) - INTERVAL 1 DAY
                        and contract = '${address}') AS '24h'
                    , (SELECT sum(val) FROM transactions WHERE block_signed_at >= DATE(NOW()) - INTERVAL 7 DAY
                        and contract = '${address}') AS '7days'
                    , (SELECT sum(val) FROM transactions WHERE block_signed_at >= DATE(NOW()) - INTERVAL 70 DAY
                        and contract = '${address}') AS '30days'
                    FROM transactions
                    where contract = '${address}'`;
        sequelize.query(sql, {
            type: QueryTypes.SELECT,
            logging: false,
            raw: true
        }).then(sales => {
            sales === null ? reject(false) : resolve(sales)
        }).catch(err => {
            reject(err)
        });
    });

    const promise6 = new Promise((resolve, reject) => {
        const sql = `SELECT sum(fee) AS fees
                    , (SELECT sum(fee) FROM transactions WHERE block_signed_at >= DATE(NOW()) - INTERVAL 1 DAY
                        and contract = '${address}') AS '24h'
                    , (SELECT sum(fee) FROM transactions WHERE block_signed_at >= DATE(NOW()) - INTERVAL 7 DAY
                        and contract = '${address}') AS '7days'
                    , (SELECT sum(fee) FROM transactions WHERE block_signed_at >= DATE(NOW()) - INTERVAL 70 DAY
                        and contract = '${address}') AS '30days'
                    FROM transactions
                    where contract = '${address}'`;
        sequelize.query(sql, {
            type: QueryTypes.SELECT,
            logging: false,
            raw: true
        }).then(sales => {
            sales === null ? reject(false) : resolve(sales)
        }).catch(err => {
            reject(err)
        });
    });
    const promise7 = new Promise((resolve, reject) => {

        const sql = `SELECT sum(value) as owners from richLists
                    where address = '${address}'`;
        sequelize.query(sql, {
            type: QueryTypes.SELECT,
            logging: false,
            raw: true
        }).then(sales => {
            sales === null ? reject(false) : resolve(sales)
        }).catch(err => {
            reject(err)
        });
    });

    let vals = await Promise.all([promise1, promise2, promise3, promise4, promise5, promise6, promise7]).then((values) => {

        let final = {
            owners: values[0][0].owners,
            items: values[1][0].items,
            floor: values[2][0].floor,
            ath: values[2][0].ath,
            average: values[2][0].average,
            sales_all: values[3][0].All,
            sales_24h: values[3][0]['24h'],
            sales_7d: values[3][0]['7days'],
            sales_30d: values[3][0]['30days'],
            volume_all: values[4][0].All,
            volume_24h: values[4][0]['24h'],
            volume_7d: values[4][0]['7days'],
            volume_30d: values[4][0]['30days'],
            fees: values[5][0]['fees'],
            fees_24h: values[5][0]['24h'],
            fees_7d: values[5][0]['7days'],
            fees_30d: values[5][0]['30days'],
            currentOwners: values[6][0].owners,
        };

        return final;

    }).catch(err => {
        console.log(err);
        return err;
    });

    return vals;
};


// get a collection details
async function collectionDetails(address) {
    return new Promise((resolve, reject) => {
        Collections.findOne({
            where: { address: address },
            attributes: ['name', 'banner', 'icon', 'email', 'address', 'url', 'twitter', 'discord', 'desc'],
            logging: false, raw: true
        }).then(collection => {
            collection === null ? reject("not found") : resolve(collection);
        }).catch(err => {
            reject(err)
        });
    });
}

// get all collections query
async function allCollections() {
    return new Promise((resolve, reject) => {
        Collections_data.findAll({
            order: [
                ['volume', 'DESC'],
            ],
            attributes: ['address', 'name', 'icon', 'volume', ['users', 'owners'], 'items', 'sales', 'volume7d', 'sales7d', 'average'],
            logging: false, raw: true
        }).then(collection => {
            collection === null ? resolve(false) : resolve(collection)
        }).catch(err => {
            reject(err)
        });
    });
}

// get collection volume
async function collectionVolume(address) {
    return new Promise((resolve, reject) => {
        const sql = `SELECT Date(block_signed_at) as \`time\`, sum(val) as value
                    FROM nftonbsc.transactions
                    where contract = '${address}'
                    group by \`time\`
                    ORDER by \`time\` ASC;`;
        sequelize.query(sql, {
            type: QueryTypes.SELECT,
            logging: false,
            raw: true
        }).then(volume => {
            volume === null ? reject(false) : resolve(volume)
        }).catch(err => {
            reject(err)
        });
    });
}

// get collection fees
async function collectionFees(address) {
    return new Promise((resolve, reject) => {
        const sql = `SELECT Date(block_signed_at) as \`time\`, sum(fee) as value
                    FROM nftonbsc.transactions
                    where contract = '${address}'
                    group by \`time\`
                    ORDER by \`time\` ASC;`;
        sequelize.query(sql, {
            type: QueryTypes.SELECT,
            logging: false,
            raw: true
        }).then(fees => {
            fees === null ? reject(false) : resolve(fees)
        }).catch(err => {
            reject(err)
        });
    });
}

// get collection sales
async function collectionSales(address) {
    return new Promise((resolve, reject) => {
        const sql = `SELECT Date(block_signed_at) as \`time\`, count(val) as value
                    FROM nftonbsc.transactions 
                    where contract = '${address}'
                    and val <> 0
                    group by \`time\`
                    ORDER by \`time\` ASC;`;
        sequelize.query(sql, {
            type: QueryTypes.SELECT,
            logging: false,
            raw: true
        }).then(sales => {
            sales === null ? reject(false) : resolve(sales)
        }).catch(err => {
            reject(err)
        });
    });
}

// get collection mints
async function collectionMints(address) {
    return new Promise((resolve, reject) => {
        const sql = `Select count(t.nftId) as value, t.\`time\` 
                    FROM 
                    (SELECT nftId, min(Date(block_signed_at)) as \`time\`
                    FROM nftonbsc.log_events 
                    where contract = '${address}'
                    and val1 = '0x0000000000000000000000000000000000000000'
                    and \`type\` ='Transfer'
                    GROUP BY nftId) as t
                    group by t.\`time\` 
                    ORDER by t.\`time\` asc`;
        sequelize.query(sql, {
            type: QueryTypes.SELECT,
            logging: false,
            raw: true
        }).then(mints => {
            if (mints && mints != null && mints.length > 0) {
                for (let i = 1; i < mints.length; i++) {
                    mints[i].value = mints[i].value + mints[i - 1].value;
                }
                resolve(mints)
            } else {
                reject("No data found")
            }
        }).catch(err => {
            reject(err)
        });
    });
}

// get collection avg price
async function collectionAvg(address) {
    return new Promise((resolve, reject) => {
        const sql = `SELECT Date(block_signed_at) as \`time\`, (sum(val) / count(val)) as value
                    FROM nftonbsc.transactions
                    where contract = '${address}'
                    and val <> 0
                    group by \`time\`
                    ORDER by \`time\` ASC;
`;
        sequelize.query(sql, {
            type: QueryTypes.SELECT,
            logging: false,
            raw: true
        }).then(price => {
            price === null ? reject(false) : resolve(price)
        }).catch(err => {
            reject(err)
        });
    });
}

// get collection unique owners
async function collectionOwners(address) {
    return new Promise((resolve, reject) => {
        const sql = `SELECT  val2 as value, Date(block_signed_at) as \`time\`
                    FROM nftonbsc.log_events
                    where contract = '${address}'
                    and \`type\` = 'Transfer'
                    GROUP by value,\`time\`
                    ORDER by \`time\` ASC;`;
        sequelize.query(sql, {
            type: QueryTypes.SELECT,
            logging: false,
            raw: true
        }).then(owners => {
            if (owners && owners != null && owners.length > 0) {
                let unique = []
                for (let i = 0; i < owners.length; i++) {
                    let uniq = unique.findIndex(obj => obj.value == owners[i].value)

                    if (uniq == -1) {
                        unique.push({ value: owners[i].value, time: owners[i].time })
                    }
                }
                let final = [{ value: 1, time: unique[0].time }]
                for (let i = 1; i < unique.length; i++) {
                    if (unique[i].time == unique[i - 1].time) {
                        final[final.length - 1].value += 1;
                    } else {
                        final.push({ value: final[final.length - 1].value, time: unique[i].time })
                    }
                }
                resolve(final)
            } else {
                reject("No data found")
            }
        }).catch(err => {
            reject(err)
        });
    });
}

// get hot collections query
async function hotCollections() {
    return new Promise((resolve, reject) => {
        const sql = `SELECT collections.icon,
        collections.banner,
        collections.address,
        collections.name,
        COUNT(nfts.contract) AS items
        FROM collections
        LEFT JOIN nfts
        ON collections.address = nfts.contract
        GROUP BY address,icon,banner,name,collections.createdAt
        ORDER BY collections.createdAt DESC
        LIMIT 3`;
        sequelize.query(sql, {
            type: QueryTypes.SELECT,
            logging: false,
            raw: true
        }).then(collections => {
            resolve(collections)
        }).catch(err => {
            reject(err)
        });
    });
}

// get collections for searchbar
async function collectionSearch() {
    return new Promise((resolve, reject) => {
        const sql = `SELECT name, icon, address FROM nftonbsc.collections`;
        sequelize.query(sql, {
            type: QueryTypes.SELECT,
            logging: false,
            raw: true
        }).then(collections => {
            resolve(collections)
        }).catch(err => {
            reject(err)
        });
    });
}

// get nfts of a sankey chart
async function nftsForSankey(contract) {
    return new Promise((resolve, reject) => {
        const sql = `SELECT attr FROM nftonbsc.nfts where contract = '${contract}'`;
        sequelize.query(sql, {
            type: QueryTypes.SELECT,
            logging: false,
            raw: true
        }).then(attrs => {
            sankey(contract, attrs).then(res => {
                resolve(res)
            }).catch(err => {
                reject(err)
            });
        }).catch(err => {
            reject(err)
        });
    });
}

// generate sankey chart
async function sankey(contract, attrList) {
    switch (contract) {
        case '0x0a8901b0E25DEb55A87524f0cC164E9644020EBA':
        case '0x3da8410e6EF658c06E277a2769816688c37496CF':
        case '0x44d85770aEa263F9463418708125Cd95e308299B':
        case '0xda938c7b9cb9f357c7f51d6aaa6b4fd9a0d6fd92':
        case '0x1e8dc7d18a655e7386eb0c957b61c6a487803a88':
        case '0x77F7D480d221E8349ef85Ac42B3EAb965d351e67':
            return new Promise((resolve, reject) => { // has trait type
                try {
                    let attributes = [];
                    let data = [];

                    JSON.parse(attrList[1].attr).forEach(el => {
                        attributes.push(el.trait_type);
                    });

                    for (let i = 0; i < attrList.length; i++) {
                        if (attrList[i].attr != null) {
                            attrList[i].attr = JSON.parse(attrList[i].attr);
                            let row = {};
                            attrList[i].attr.forEach(el => {
                                let key = el.trait_type;
                                let val = el.value;
                                row = {
                                    ...row,
                                    [key]: val,
                                };
                            });
                            data.push(row);
                        }
                    }

                    let result = {
                        type: 'sankey',
                        attributes: attributes,
                        data: data
                    };
                    resolve(result);
                } catch (err) {
                    console.log(err);
                    reject(err)
                }
            });
        case '0x897fd4ce6dbcbf31039754fdc8f77ce4c3521ee0':
            return new Promise((resolve, reject) => { // has custom traits
                try {
                    let attributes = [];
                    let data = [];

                    for (var property in JSON.parse(attrList[1].attr)) {
                        attributes.push(property);
                    }

                    for (let i = 0; i < attrList.length; i++) {
                        let att = JSON.parse(attrList[i].attr);
                        att == null ? null : data.push(JSON.parse(attrList[i].attr));
                    }

                    let result = {
                        type: 'sankey',
                        attributes: attributes,
                        data: data
                    };
                    resolve(result);
                } catch (err) {
                    reject(err)
                }
            });
        case '0x73096042a5297128e2bB074Bd91450Db58F3B4eA':
            return new Promise((resolve, reject) => { // has id
                try {
                    let attributeName = Object.keys(JSON.parse(attrList[1].attr))[0];
                    let data = [];
                    for (let i = 0; i < attrList.length; i++) {
                        let att = JSON.parse(attrList[i].attr);
                        att == null ? data.push("null") : data.push(att[attributeName].toString());
                    }

                    const counts = {};
                    data.forEach((x) => {
                        counts[x] = (counts[x] || 0) + 1;
                    });

                    let result = {
                        type: 'list',
                        data: counts
                    };
                    resolve(result);
                } catch (err) {
                    console.log(err);
                    reject(err)
                }
            });
        case '0xc2027db8c0d68bfd60ff394e47dc210fc9e1407a': // not attr
            return new Promise((resolve, reject) => {
                let result = {
                    type: 'No Attributes',
                };
                resolve(result);
            });
        default:
            return new Promise((resolve, reject) => { // not found
                reject('Contract not found')
            });
    }
}


// get nfts of a collection
async function nftList(address) {
    return new Promise((resolve, reject) => {
        const sql = `SELECT nfts.nftID as tokenId, nfts.image as icon, nfts.attr as \`attributes\`, t.created, t.maxAmount
                    FROM nftonbsc.nfts
                    inner join (
                    SELECT contract, nftId, min(block_signed_at) as created, max(val) as maxAmount
                    FROM nftonbsc.transactions where contract = "${address}"
                    GROUP by nftId
                    ) t
                    on nfts.nftID = t.nftId
                    where nfts.contract = "${address}"
                    order by tokenId ASC`;
        sequelize.query(sql, {
            type: QueryTypes.SELECT,
            logging: false,
            raw: true
        }).then(nftList => {
            if (nftList.length > 0) {
                for (let i = 0; i < nftList.length; i++) {
                    if (nftList[i].attributes != null) {
                        nftList[i].attributes = JSON.parse(nftList[i].attributes);
                    }
                }
                if (address == "0x897fd4ce6dbcbf31039754fdc8f77ce4c3521ee0") {
                    for (let i = 0; i < nftList.length; i++) {
                        let trt = [];
                        for (const property in nftList[i].attributes) {
                            trt.push({ trait_type: property, value: nftList[i].attributes[property] });
                        }
                        nftList[i].attributes = trt;
                    }
                } else if (address == "0x73096042a5297128e2bB074Bd91450Db58F3B4eA") {
                    for (let i = 0; i < nftList.length; i++) {
                        nftList[i].attributes = [{ trait_type: Object.keys(nftList[i].attributes)[0], value: nftList[i].attributes[Object.keys(nftList[i].attributes)[0]] }];
                    }
                }
                attributeList(nftList).then(res => {
                    resolve({ nfts: nftList, attributes: res })
                }).catch(err => {
                    console.log(err);
                    reject(err)
                });
            } else {
                reject('Contract not found')
            }
        }).catch(err => {
            reject(err)
        });
    });
}

// generate attributes for nft list
async function attributeList(nftList) {
    return new Promise((resolve, reject) => { // has trait type
        try {
            let attributes = [];
            let data = [];

            for (let i = 0; i < nftList.length; i++) {
                if (nftList[i].attributes != null) {
                    nftList[i].attributes.forEach(el => {
                        attributes.push({ name: el.trait_type, values: {} });
                    });
                }
            }
            let duplicateRemover = new Set();

            attributes.filter((obj) => {
                if (duplicateRemover.has(JSON.stringify(obj))) return false;
                duplicateRemover.add(JSON.stringify(obj));
                return true;
            });

            attributes = [...duplicateRemover];
            for (let i = 0; i < attributes.length; i++) {
                attributes[i] = JSON.parse(attributes[i]);
            }

            nftList.forEach((x) => {
                if (x.attributes != null) {
                    x.attributes.forEach(el => {
                        data.push(el);
                    });
                }
            });

            data.forEach(element => {
                const isObjectPresent = attributes.findIndex((o) => o.name === element.trait_type);
                attributes[isObjectPresent].values = {
                    ...attributes[isObjectPresent].values,
                    [element.value]: (attributes[isObjectPresent].values[element.value] ? attributes[isObjectPresent].values[element.value] + 1 : 1)
                };
            });

            resolve(attributes);
        } catch (err) {
            console.log(err);
            reject(err)
        }
    });
}

module.exports = {
    checkCollection,
    hotCollections,
    collectionSearch,
    nftsForSankey,
    nftList,
    allCollections,
    collectionVolume,
    collectionSales,
    collectionMints,
    collectionAvg,
    collectionOwners,
    collectionDetails,
    collectionStats,
    collectionFees,
    nftDetails,
    addcoll
};