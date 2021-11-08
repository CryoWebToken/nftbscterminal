const { sequelize } = require('../Database/database');
const { QueryTypes } = require('sequelize');
const { Collections, RichList } = require('../Database/models');


// fetch collections from db and then fetches nft ids from contract
async function richListAPI(address) {
    return new Promise((resolve, reject) => {
        const sql = `SELECT owners, items, amount, total, value
                    FROM nftonbsc.richLists
                    where address  = '${address}'`;
        sequelize.query(sql, {
            type: QueryTypes.SELECT,
            logging: false,
            raw: true
        }).then(list => {
            const dataToSend = {
                attributes: ["owners", "items", "amount"],
                data: []
            }
            list.forEach(el => {
                dataToSend.data.push({
                    owners: el.owners,
                    items: el.items,
                    amount: el.amount,
                    total: el.total,
                    value: el.value,
                })
            })
            resolve(dataToSend)
        }).catch(err => {
            reject(err)
        });
    });
}

// fetch collections from db and then fetches nft ids from contract
async function richListQuery() {
    Collections.findAll({ logging: false, raw: true })
        .then(collection => {
            if (collection === null) {
                return;
            } else {
                collection.forEach((el, index) => {
                    setTimeout(function () {
                        richlist(el.address).then(res => {
                            //   insertRichList(el.address, res)
                        }).catch(err => {
                            console.log(err)
                        })
                    }, 5 * 1000 * 60 * index) // 5 mins * index
                });
            }
        }).catch(err => {
            throw err;
        });
}

// insert nft ids into data
async function insertRichList(address, list) {

    let ListsInDb = await RichList.findAll({
        where: {
            address: address,
        },
        logging: false,
        raw: true
    });

    if (ListsInDb.length === 0) {
        let data = []
        list.data.forEach(el => {
            data.push({
                address: address,
                owners: "Owners",
                items: el.items,
                amount: el.amount,
                total: el.total,
                value: el.value,
            })
        })
        await RichList.bulkCreate(data, { logging: false, raw: true });
    } else {
        await RichList.destroy({
            where: {
                address: address
            }, logging: false, raw: true
        }).then(res => {
            let data = []
            list.data.forEach(el => {
                data.push({
                    address: address,
                    owners: "Owners",
                    items: el.items,
                    amount: el.amount,
                    total: el.total,
                    value: el.value,
                })
            })
            RichList.bulkCreate(data, { logging: false, raw: true });
        }).catch(err => {
            console.log(err)
        })

    }
}


// get a collection richlist
async function richlist(address) {
    const promise1 = new Promise((resolve, reject) => {

        const sql = `SELECT tx_hash, log_events.nftId, max(log_events.block_signed_at) as \`date\`, log_events.val2 as owner
                    FROM nftonbsc.log_events
                    where log_events.contract  = '${address}'
                    and \`type\` = "Transfer"
                    GROUP by log_events.nftId, log_events.val2,log_events.val1,tx_hash
                    order by log_events.nftId,\`date\` desc; `;
        sequelize.query(sql, {
            type: QueryTypes.SELECT,
            logging: false,
            raw: true
        }).then(tnx => {
            tnx === null ? reject(false) : resolve(tnx)
        }).catch(err => {
            reject(err)
        });
    });

    const promise2 = new Promise((resolve, reject) => {
        const sql = `SELECT tx_hash , val
FROM nftonbsc.transactions where contract  = '${address}'`;
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

    let vals = await Promise.all([promise1, promise2]).then((values) => {
        let final;
        calculateList(values[0], values[1]).then(res => {
            res === null ? reject(false) : insertRichList(address, res)
        }).catch(err => {
            reject(err)
        });
        return final;

    }).catch(err => {
        console.log(err);
        return err;
    });
    return vals;
}

async function calculateList(data, tnx) {
    return new Promise((resolve, reject) => { // has trait type

        const dataToSend = {
            attributes: ["owners", "items", "amount"],
            data: [
                {
                    owners: "Owners",
                    items: "Items (0 - 1]",
                    amount: "[0 - 0.1] BNB",
                    total: 0,
                    value: 0,
                },
                {
                    owners: "Owners",
                    items: "Items (0 - 1]",
                    amount: "(0.1 - 1] BNB",
                    total: 0,
                    value: 0,
                },
                {
                    owners: "Owners",
                    items: "Items (0 - 1]",
                    amount: "(1 - 10] BNB",
                    total: 0,
                    value: 0,
                },
                {
                    owners: "Owners",
                    items: "Items (0 - 1]",
                    amount: "(10 - 100] BNB",
                    total: 0,
                    value: 0,
                },
                {
                    owners: "Owners",
                    items: "Items (0 - 1]",
                    amount: "> 100 BNB",
                    total: 0,
                    value: 0,
                },
                {
                    owners: "Owners",
                    items: "Items (1 - 10]",
                    amount: "[0 - 0.1] BNB",
                    total: 0,
                    value: 0,
                },
                {
                    owners: "Owners",
                    items: "Items (1 - 10]",
                    amount: "(0.1 - 1] BNB",
                    total: 0,
                    value: 0,
                },
                {
                    owners: "Owners",
                    items: "Items (1 - 10]",
                    amount: "(1 - 10] BNB",
                    total: 0,
                    value: 0,
                },
                {
                    owners: "Owners",
                    items: "Items (1 - 10]",
                    amount: "(10 - 100] BNB",
                    total: 0,
                    value: 0,
                },
                {
                    owners: "Owners",
                    items: "Items (1 - 10]",
                    amount: "> 100 BNB",
                    total: 0,
                    value: 0,
                },
                {
                    owners: "Owners",
                    items: "Items (10 - 100]",
                    amount: "[0 - 0.1] BNB",
                    total: 0,
                    value: 0,
                },
                {
                    owners: "Owners",
                    items: "Items (10 - 100]",
                    amount: "(0.1 - 1] BNB",
                    total: 0,
                    value: 0,
                },
                {
                    owners: "Owners",
                    items: "Items (10 - 100]",
                    amount: "(1 - 10] BNB",
                    total: 0,
                    value: 0,
                },
                {
                    owners: "Owners",
                    items: "Items (10 - 100]",
                    amount: "(10 - 100] BNB",
                    total: 0,
                    value: 0,
                },
                {
                    owners: "Owners",
                    items: "Items (10 - 100]",
                    amount: "> 100 BNB",
                    total: 0,
                    value: 0,
                },
                {
                    owners: "Owners",
                    items: "Items (100 - 1000]",
                    amount: "[0 - 0.1] BNB",
                    total: 0,
                    value: 0,
                },
                {
                    owners: "Owners",
                    items: "Items (100 - 1000]",
                    amount: "(0.1 - 1] BNB",
                    total: 0,
                    value: 0,
                },
                {
                    owners: "Owners",
                    items: "Items (100 - 1000]",
                    amount: "(1 - 10] BNB",
                    total: 0,
                    value: 0,
                },
                {
                    owners: "Owners",
                    items: "Items (100 - 1000]",
                    amount: "(10 - 100] BNB",
                    total: 0,
                    value: 0,
                },
                {
                    owners: "Owners",
                    items: "Items (100 - 1000]",
                    amount: "> 100 BNB",
                    total: 0,
                    value: 0,
                },
                {
                    owners: "Owners",
                    items: "Items > 1,000",
                    amount: "[0 - 0.1] BNB",
                    total: 0,
                    value: 0,
                },
                {
                    owners: "Owners",
                    items: "Items > 1,000",
                    amount: "(0.1 - 1] BNB",
                    total: 0,
                    value: 0,
                },
                {
                    owners: "Owners",
                    items: "Items > 1,000",
                    amount: "(1 - 10] BNB",
                    total: 0,
                    value: 0,
                },
                {
                    owners: "Owners",
                    items: "Items > 1,000",
                    amount: "(10 - 100] BNB",
                    total: 0,
                    value: 0,
                },
                {
                    owners: "Owners",
                    items: "Items > 1,000",
                    amount: "> 100 BNB",
                    total: 0,
                    value: 0,
                },

            ]
        }

        let recentOwner = []
        for (let i = 0; i < data.length; i++) {
            if (recentOwner.length === 0) {
                recentOwner.push(data[i])
            } else {
                if (recentOwner[recentOwner.length - 1].nftId === data[i].nftId && data[i].date > recentOwner[recentOwner.length - 1].date) {
                    recentOwner[recentOwner.length - 1] = data[i]
                } else if (recentOwner[recentOwner.length - 1].nftId !== data[i].nftId) {
                    recentOwner.push(data[i])
                }
            }
        }

        for (let i = 0; i < recentOwner.length; i++) {
            let index = tnx.findIndex(x => x.tx_hash == recentOwner[i].tx_hash);
            if (index != -1) {
                recentOwner[i].value = tnx[index].val;
            }
        }

        let final = [{ owner: recentOwner[0].owner, count: 1, value: recentOwner[0].value }]
        for (let i = 1; i < recentOwner.length; i++) {
            const isObjectPresent = final.findIndex((o) => o.owner === recentOwner[i].owner);
            if (isObjectPresent == -1) {
                final.push({ owner: recentOwner[i].owner, count: 1, value: recentOwner[i].value })
            } else {
                final[isObjectPresent].count += 1
                final[isObjectPresent].value += recentOwner[i].value
            }
        }

        for (let i = 0; i < final.length; i++) {
            let cnt = final[i].count;
            let amt = final[i].value;
            if (cnt === 1) {
                if (amt >= 0 && amt <= 0.1) {
                    dataToSend.data[0].total += amt
                    dataToSend.data[0].value += 1
                } else if (amt > 0.1 && amt <= 1) {
                    dataToSend.data[1].total += amt
                    dataToSend.data[1].value += 1
                } else if (amt > 1 && amt <= 10) {
                    dataToSend.data[2].total += amt
                    dataToSend.data[2].value += 1
                } else if (amt > 10 && amt <= 100) {
                    dataToSend.data[3].total += amt
                    dataToSend.data[3].value += 1
                } else if (amt > 100) {
                    dataToSend.data[4].total += amt
                    dataToSend.data[4].value += 1
                }
            } else if (cnt > 1 && cnt <= 10) {
                if (amt >= 0 && amt <= 0.1) {
                    dataToSend.data[5].total += amt
                    dataToSend.data[5].value += 1
                } else if (amt > 0.1 && amt <= 1) {
                    dataToSend.data[6].total += amt
                    dataToSend.data[6].value += 1
                } else if (amt > 1 && amt <= 10) {
                    dataToSend.data[7].total += amt
                    dataToSend.data[7].value += 1
                } else if (amt > 10 && amt <= 100) {
                    dataToSend.data[8].total += amt
                    dataToSend.data[8].value += 1
                } else if (amt > 100) {
                    dataToSend.data[9].total += amt
                    dataToSend.data[9].value += 1
                }
            } else if (cnt > 10 && cnt <= 100) {
                if (amt >= 0 && amt <= 0.1) {
                    dataToSend.data[10].total += amt
                    dataToSend.data[10].value += 1
                } else if (amt > 0.1 && amt <= 1) {
                    dataToSend.data[11].total += amt
                    dataToSend.data[11].value += 1
                } else if (amt > 1 && amt <= 10) {
                    dataToSend.data[12].total += amt
                    dataToSend.data[12].value += 1
                } else if (amt > 10 && amt <= 100) {
                    dataToSend.data[13].total += amt
                    dataToSend.data[13].value += 1
                } else if (amt > 100) {
                    dataToSend.data[14].total += amt
                    dataToSend.data[14].value += 1
                }
            } else if (cnt > 100 && cnt <= 1000) {
                if (amt >= 0 && amt <= 0.1) {
                    dataToSend.data[15].total += amt
                    dataToSend.data[15].value += 1
                } else if (amt > 0.1 && amt <= 1) {
                    dataToSend.data[16].total += amt
                    dataToSend.data[16].value += 1
                } else if (amt > 1 && amt <= 10) {
                    dataToSend.data[17].total += amt
                    dataToSend.data[17].value += 1
                } else if (amt > 10 && amt <= 100) {
                    dataToSend.data[18].total += amt
                    dataToSend.data[18].value += 1
                } else if (amt > 100) {
                    dataToSend.data[19].total += amt
                    dataToSend.data[19].value += 1
                }
            } else if (cnt > 1000) {
                if (amt >= 0 && amt <= 0.1) {
                    dataToSend.data[20].total += amt
                    dataToSend.data[20].value += 1
                } else if (amt > 0.1 && amt <= 1) {
                    dataToSend.data[21].total += amt
                    dataToSend.data[21].value += 1
                } else if (amt > 1 && amt <= 10) {
                    dataToSend.data[22].total += amt
                    dataToSend.data[22].value += 1
                } else if (amt > 10 && amt <= 100) {
                    dataToSend.data[23].total += amt
                    dataToSend.data[23].value += 1
                } else if (amt > 100) {
                    dataToSend.data[24].total += amt
                    dataToSend.data[24].value += 1
                }
            }
        }
        resolve(dataToSend)
    });
}

module.exports = {
    richListQuery, richListAPI
};