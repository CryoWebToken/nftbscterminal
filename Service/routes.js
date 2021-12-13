const express = require('express');
const apiResponse = require("./apiResponse");
const router = express.Router();
const { richListAPI } = require("./richList")
const { checkCollection,
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
    collectionFees,
    collectionStats,
    nftDetails,
    addcoll } = require("./apiQuery");


const { getNfts } = require("./apiMoralis");

// health check
router.get('/healthcheck', async (req, res) => {
    const data = {
        uptime: process.uptime(),
        timestamp: Date.now()
    }

    try {
        apiResponse.successResponseWithData(res, 'OK', data);
    } catch (e) {
        apiResponse.ErrorResponse(res, e);
    }

});

// get a collection stats
router.get('/nft', async (req, res) => {
    let address = req.query.address;
    let id = req.query.id;
    nftDetails(address, id).then(list => {
        try {
            apiResponse.successResponseWithData(res, 'OK', list);
        } catch (e) {
            apiResponse.ErrorResponse(res, e);
        }
    }).catch(err => {
        apiResponse.ErrorResponse(res, err);
    });
});

// get a collection stats
router.get('/richList', async (req, res) => {
    let address = req.query.address;
    richListAPI(address).then(list => {
        try {
            apiResponse.successResponseWithData(res, 'OK', list);
        } catch (e) {
            apiResponse.ErrorResponse(res, e);
        }
    }).catch(err => {
        apiResponse.ErrorResponse(res, err);
    });
});

// get a collection stats
router.get('/collectionStats', async (req, res) => {
    let address = req.query.address;
    collectionStats(address).then(collection => {
        try {
            apiResponse.successResponseWithData(res, 'OK', collection);
        } catch (e) {
            apiResponse.ErrorResponse(res, e);
        }
    }).catch(err => {
        apiResponse.ErrorResponse(res, err);
    });
});

// get a collection details
router.get('/collectionDetails', async (req, res) => {
    let address = req.query.address;
    collectionDetails(address).then(collection => {
        try {
            apiResponse.successResponseWithData(res, 'OK', collection);
        } catch (e) {
            apiResponse.ErrorResponse(res, e);
        }
    }).catch(err => {
        apiResponse.ErrorResponse(res, err);
    });
});

// get all collections
router.get('/collections', async (req, res) => {
    allCollections().then(collections => {
        try {
            apiResponse.successResponseWithData(res, 'OK', collections);
        } catch (e) {
            apiResponse.ErrorResponse(res, e);
        }
    }).catch(err => {
        apiResponse.ErrorResponse(res, err);
    });
});

// get hot collections (last 4 created)
router.get('/newCollections', async (req, res) => {
    hotCollections().then(collections => {
        try {
            apiResponse.successResponseWithData(res, 'OK', collections);
        } catch (e) {
            apiResponse.ErrorResponse(res, e);
        }
    }).catch(err => {
        apiResponse.ErrorResponse(res, err);
    });
});

// get all collections for search bar
router.get('/collectionSearch', async (req, res) => {
    collectionSearch().then(collections => {
        try {
            apiResponse.successResponseWithData(res, 'OK', collections);
        } catch (e) {
            apiResponse.ErrorResponse(res, e);
        }
    }).catch(err => {
        apiResponse.ErrorResponse(res, err);
    });
});

// sankey
router.get('/traits', async (req, res) => {
    let address = req.query.address;
    nftsForSankey(address).then(data => {
        try {
            apiResponse.successResponseWithData(res, 'OK', data);
        } catch (e) {
            apiResponse.ErrorResponse(res, e);
        }
    }).catch(err => {
        apiResponse.ErrorResponse(res, err);
    });
});

// nfts list of a collection
router.get('/nftList', async (req, res) => {
    let address = req.query.address;
    nftList(address).then(data => {
        try {
            apiResponse.successResponseWithData(res, 'OK', data);
        } catch (e) {
            apiResponse.ErrorResponse(res, e);
        }
    }).catch(err => {
        apiResponse.ErrorResponse(res, err);
    });
});

// collection stats (fees per day)
router.get('/collectionFees', async (req, res) => {
    let address = req.query.address;
    collectionFees(address).then(fees => {
        try {
            apiResponse.successResponseWithData(res, 'OK', fees);
        } catch (e) {
            apiResponse.ErrorResponse(res, e);
        }
    }).catch(err => {
        apiResponse.ErrorResponse(res, err);
    });
});

// collection stats (volume per day)
router.get('/collectionVolume', async (req, res) => {
    let address = req.query.address;
    collectionVolume(address).then(volume => {
        try {
            apiResponse.successResponseWithData(res, 'OK', volume);
        } catch (e) {
            apiResponse.ErrorResponse(res, e);
        }
    }).catch(err => {
        apiResponse.ErrorResponse(res, err);
    });
});

// collection stats (sales per day)
router.get('/collectionSales', async (req, res) => {
    let address = req.query.address;
    collectionSales(address).then(sales => {
        try {
            apiResponse.successResponseWithData(res, 'OK', sales);
        } catch (e) {
            apiResponse.ErrorResponse(res, e);
        }
    }).catch(err => {
        apiResponse.ErrorResponse(res, err);
    });
});

// collection stats (mints per day)
router.get('/collectionMints', async (req, res) => {
    let address = req.query.address;
    collectionMints(address).then(mints => {
        try {
            apiResponse.successResponseWithData(res, 'OK', mints);
        } catch (e) {
            apiResponse.ErrorResponse(res, e);
        }
    }).catch(err => {
        apiResponse.ErrorResponse(res, err);
    });
});

// collection stats (avg sale price per day)
router.get('/collectionAvg', async (req, res) => {
    let address = req.query.address;
    collectionAvg(address).then(price => {
        try {
            apiResponse.successResponseWithData(res, 'OK', price);
        } catch (e) {
            apiResponse.ErrorResponse(res, e);
        }
    }).catch(err => {
        apiResponse.ErrorResponse(res, err);
    });
});

// collection stats (unique owners per day)
router.get('/collectionOwners', async (req, res) => {
    let address = req.query.address;
    collectionOwners(address).then(price => {
        try {
            apiResponse.successResponseWithData(res, 'OK', price);
        } catch (e) {
            apiResponse.ErrorResponse(res, e);
        }
    }).catch(err => {
        apiResponse.ErrorResponse(res, err);
    });
});

// profile nfts on bsc
router.get('/profile', async (req, res) => {
    let address = req.query.address;
    getNfts(address).then(nfts => {
        try {
            apiResponse.successResponseWithData(res, 'Found Data', nfts);
        } catch (e) {
            apiResponse.ErrorResponse(res, e);
        }
    }).catch(err => {
        apiResponse.ErrorResponse(res, err);
    });
});

// post new collection
router.post('/addCollection', async (req, res) => {
    let email = req.query.email;
    let banner = req.query.banner;
    let icon = req.query.icon;
    let projectName = req.query.projectName;
    let projectAddress = req.query.projectAddress;
    let projectUrl = req.query.projectUrl;
    let projectTwitter = req.query.projectTwitter;
    let projectDiscord = req.query.projectDiscord;
    let shortDesc = req.query.shortDesc;

    email = email === undefined ? "N/A" : email.replace(/'|"/g, "");
    banner = banner === undefined ? "N/A" : banner.replace(/'|"/g, "");
    icon = icon === undefined ? "N/A" : icon.replace(/'|"/g, "");
    projectName = projectName === undefined ? "N/A" : projectName.replace(/'|"/g, "");
    projectAddress = projectAddress === undefined ? "N/A" : projectAddress.replace(/'|"/g, "");
    projectUrl = projectUrl === undefined ? "" : projectUrl.replace(/'|"/g, "");
    projectTwitter = projectTwitter === undefined ? "" : projectTwitter.replace(/'|"/g, "");
    projectDiscord = projectDiscord === undefined ? "" : projectDiscord.replace(/'|"/g, "");
    shortDesc = shortDesc === undefined ? "N/A" : shortDesc.replace(/'|"/g, "");

    checkCollection(projectAddress).then(async (result) => {
        if (result) {
            apiResponse.ErrorResponse(res, "Collection already exists");
        } else {
            let collection = {
                email: email,
                banner: banner,
                icon: icon,
                projectName: projectName,
                projectAddress: projectAddress,
                projectUrl: projectUrl,
                projectTwitter: projectTwitter,
                projectDiscord: projectDiscord,
                shortDesc: shortDesc
            }
            addcoll(collection).then(() => {
                apiResponse.successResponse(res, 'Success');
            }).catch(err => {
                apiResponse.ErrorResponse(res, err);
            });
        }
    }).catch(e => {
        apiResponse.ErrorResponse(res, e.original.code);
    });
});

module.exports = router;
