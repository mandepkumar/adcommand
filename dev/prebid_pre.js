/*
* Prebid - Configuration
* Author: Ascendeum Engg Core - 12/2020.
*/

import * as utils from '../../../src/utils';
import { tcAdunits } from './adunits';

var googletag = window.googletag || {};
googletag.cmd = googletag.cmd || [];
window.googletag = googletag;
googletag.cmd.push(function () {
    googletag.pubads().disableInitialLoad();
});
var pbjs = window.pbjs || {};
pbjs.que = pbjs.que || [];
window.pbjs = pbjs;
var pbjsAdUnits = pbjsAdUnits || [];
var dfpNetwork = 22211216372;
var fsto = 2000;
var requestManager = {
    adserverRequestSent: false,
    aps: false,
    prebid: false
};
var adsPrefix = "TimeCardCalculator_";
var REFRESH_TIMEOUT = 30000;
const adRefCap = 5;
var refCapCount = 0;
var refreshIteration = 0;
var dfr = [];
var a9S = [];
var pbjsAds = [];
var frequency = 10000;
// Tests
function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}
var isBydata = getParameterByName('bydata_debug');
// var vidazootest = getParameterByName("vidazootest");
if(frequency >= 10000) isBydata = true;
logInfo('isBydata = ', isBydata);

 var isNextM = getParameterByName('is_nm');
// logInfo(' frequency ', (isBydata + ' ' + frequency));
function detectWidth() {
    return window.screen.width || window.innerWidth && document.documentElement.clientWidth ? Math.min(window.innerWidth, document.documentElement.clientWidth) : window.innerWidth || document.documentElement.clientWidth || document.getElementsByTagName('body')[0].clientWidth;
}
var deviceWidth = detectWidth();
var deviceName = "Desktop";
if (deviceWidth < 1025) deviceName = "Tablet";
if (deviceWidth < 768) deviceName = "Mobile";
logInfo("l-v10.1.0", deviceName); 
//Floor Test
var rndNum = Math.random();
var floortest = "false";
if (rndNum < 0.20) floortest = 1;
if (rndNum < 0.15) floortest = 2;
if (rndNum < 0.10) floortest = 3;
if (rndNum < 0.05) floortest = 4;

/* Unshift polify */
function unshiftPoly(array, item) { for (var i = array.length - 1; i >= 0; i--) { array[i + 1] = array[i]; } array[0] = item; };
// Floor Test
var functQue = function () { googletag.pubads().setTargeting("floortest", floortest.toString()); };
if (typeof googletag.cmd.unshift == "undefined") { unshiftPoly(googletag.cmd, functQue); }
else { googletag.cmd.unshift(functQue); }
// Refresh Ads
var functQue = function () { googletag.pubads().setTargeting("refreshIteration", refreshIteration.toString()); };
if (typeof googletag.cmd.unshift == "undefined") { unshiftPoly(googletag.cmd, functQue); }
else { googletag.cmd.unshift(functQue); }

if(isNextM){
    tcAdunits.forEach((adu) => {
        if (adu.code === 'Top') { adu.bids= [ {bidder: 'nextMillennium',params: { placement_id: '25717'}} ]; }
        else if(adu.code === 'RightSidebar_Top') { adu.bids= [ {bidder: 'nextMillennium',params: { placement_id: '25715'}} ]; }
        else if(adu.code === 'Bottom') { adu.bids= [ {bidder: 'nextMillennium',params: { placement_id: '25713'}} ]; } 
        else if(adu.code === 'Mobile_Adhesion') { adu.bids= []; }
    });
}

logInfo("tadu - ", tcAdunits);

tcAdunits.forEach((adu) => {
    if (adu.device.indexOf(deviceName) >= 0) {
        pbjsAdUnits.push(adu);
    }
});

if (deviceName !== "Desktop" && deviceName !== "Tablet") {
    tcAdunits.forEach(cs => {
        if (deviceWidth < 601 && (cs.code === 'Mobile_Adhesion' || cs.code === 'Top' || cs.code === 'Bottom')) {
            pbjsAdUnits.push(cs);
        }
    })
}

if (deviceName !== "Mobile") {
    logInfo('window.ascObject ', window.ascObject);
    var sizstr = '';
    var adsizes = [[300, 250], [300, 600]];
    window.ascObject && window.ascObject.right_sidebar_bottom_adsizes && window.ascObject.right_sidebar_bottom_adsizes.forEach((adsz) => {
        logInfo('window.adsz ', adsz);
        sizstr += adsz[0] + 'x' + adsz[1] + '-';
    });
    logInfo('window.sizstr ', sizstr);
    var rightSideBottomBids = [
        { bidder: "appnexus", params: { placementId: "20816032" } },
        //{ bidder: "seedtag", params: { "adUnitId": "33718448", "publisherId": "9247-2848-01", "placement": "inBanner" } },
        { bidder: "openx", params: { "unit": "561042206", "delDomain": "ascendeum-d.openx.net" } },
        { bidder: "triplelift", params: { inventoryCode: "TimeCardCalculator_RIghtSidebar_Bottom" } },
        { bidder: 'rubicon', params: { accountId: '22936', siteId: '359482', zoneId: '1936116' } },
        { bidder: "yieldmo", params: { placementId: '2834829906913730577' } },
        { bidder: 'nextMillennium', params: { placement_id: '25714' }},
        { bidder: "smartadserver", params: { siteId: 518853, pageId: 1623522, formatId: 113719 }},
        { bidder: 'rise', params: { org: '63889b5a59cc190001431f40'}},
        { bidder: "unruly", params: { siteId: 276828 }},
        { bidder: "improvedigital", params :{ publisherId: 2445, placementId: 23260215}},
        { bidder: "sharethrough", params: { pkey: "oyFpL7dIonSq36U4tewLJQqA" }},
        { bidder: "minutemedia", params: { org: '01j1800kyzkr', placementId: "TimeCardCalculator_RIghtSidebar_Bottom" } }
    ];

    if (sizstr && sizstr === '300x600-') {
        adsizes = [[300, 600]];
        rightSideBottomBids.push({ bidder: 'ix', params: { size: [300, 600], siteId: "620100" } });
        rightSideBottomBids.push({ bidder: "pubmatic", params: { publisherId: "160323", adSlot: "TimeCardCalculator_RIghtSidebar_Bottom_300x600" } });
    } else if (sizstr && sizstr === '300x250-') {
        adsizes = [[300, 250]];
        rightSideBottomBids.push({ bidder: 'ix', params: { size: [300, 250], siteId: "620100" } });
        rightSideBottomBids.push({ bidder: "pubmatic", params: { publisherId: "160323", adSlot: "TimeCardCalculator_RIghtSidebar_Bottom_300x250" } });
    } else {
        adsizes = [[300, 250], [300, 600]];
        rightSideBottomBids.push({ bidder: 'ix', params: { size: [300, 250], siteId: "620100" } });
        rightSideBottomBids.push({ bidder: "pubmatic", params: { publisherId: "160323", adSlot: "TimeCardCalculator_RIghtSidebar_Bottom_300x250" } });
        rightSideBottomBids.push({ bidder: 'ix', params: { size: [300, 600], siteId: "620100" } });
        rightSideBottomBids.push({ bidder: "pubmatic", params: { publisherId: "160323", adSlot: "TimeCardCalculator_RIghtSidebar_Bottom_300x600" } });
    }
    pbjsAdUnits.forEach((adu) => {
        if (adu.code.indexOf('RightSidebar_Bottom') >= 0) {
            adu.mediaTypes.banner.sizes = adsizes;
            if(isNextM){
                adu.bids = [{ bidder: 'nextMillennium', params: { placement_id: '25714' }}];
            }else {
                adu.bids = rightSideBottomBids;
            } 
        }
    });
}
logInfo("pbjsAdUnits  ", pbjsAdUnits);

function loadLibScriptsFile() {
    /* A9 Load Lib */
    !function (a9, a, p, s, t, A, g) {
        if (a[a9]) return; function q(c, r) { a[a9]._Q.push([c, r]) } a[a9] = {
            init: function () { q("i", arguments) }, fetchBids: function () { q("f", arguments) }, setDisplayBids: function () { }, _Q: []
        }; A = p.createElement(s); A.async = !0; A.src = t; g = p.getElementsByTagName(s)[0]; g.parentNode.insertBefore(
            A, g)
    }("apstag", window, document, "script", "//c.amazon-adsystem.com/aax2/apstag.js");
    /* A9 Init */
    apstag.init({
        pubID: '9ecbab04-5067-4c7a-9bdd-1bc1227c13df',
        adServer: 'googletag'
    });
    // Load GPT
    (function () {
        var gads = document.createElement('script');
        gads.async = true;
        gads.type = 'text/javascript';
        gads.src = 'https://securepubads.g.doubleclick.net/tag/js/gpt.js';
        var node = document.getElementsByTagName('script')[0];
        node.parentNode.insertBefore(gads, node);
    })();
}

function loadPWTScript(src, callback) {
    (function () {
        var purl = window.location.href;
        var url = src;
        var profileVersionId = '';
        if (purl.indexOf('pwtv=') > 0) {
            var regexp = /pwtv=(.*?)(&|$)/g;
            var matches = regexp.exec(purl);
            if (matches.length >= 2 && matches[1].length > 0) {
                profileVersionId = '/' + matches[1];
            }
        }
        var wtads = document.createElement('script');
        wtads.async = true;
        wtads.type = 'text/javascript';
        wtads.src = url + profileVersionId + '/pwt.js';
        var node = document.getElementsByTagName('script')[0];
        wtads.onload = () => callback(wtads);
        node.parentNode.insertBefore(wtads, node);
    })();
}

/* Add test bids */
var testbids = getParameterByName('testbids');
if (testbids == "true") {
    var additionalBids = [
        { bidder: "rubicon", params: { accountId: '1001', siteId: '113932', zoneId: '535510' } },
        { bidder: "appnexus", params: { placementId: "13144370" } },
    ];
    for (var i = pbjsAdUnits.length - 1; i >= 0; i--) {
        pbjsAdUnits[i].bids = [];
        for (var y = additionalBids.length - 1; y >= 0; y--) {
            pbjsAdUnits[i].bids.push(additionalBids[y]);
        }
    }
}

// if(vidazootest) {
//     for (var i = pbjsAdUnits.length - 1; i >= 0; i--) {
//         pbjsAdUnits[i].bids = [{ bidder: "vidazoo", params: { cId: "6683f48c24368641f0ed0dc9", pId: "59ac17c192832d0011283fe3" ,subDomain: "exchange" } }];
//     }
// }

pbjs.que.push(function () {
    pbjs.setConfig({ priceGranularity: "high" });
    pbjs.setConfig({
        userSync: {
            syncEnabled: true,
            syncsPerBidder: 5,
            syncDelay: 3000,
            filterSettings: {
                iframe: {
                    bidders: '*',
                    filter: 'include'
                },
                image: {
                    bidders: '*',
                    filter: 'include'
                }
            },
            topics: {
                maxTopicCaller: 4,
                bidders: [{
                    bidder: 'pubmatic',
                    iframeURL: 'https://ads.pubmatic.com/AdServer/js/topics/topics_frame.html'
                }, {
                    bidder: 'rtbhouse',
                    iframeURL: 'https://topics.authorizedvault.com/topicsapi.html'
                }, {
                    bidder: 'openx',
                    iframeURL: 'https://pa.openx.net/topics_frame.html'
                }, {
                    bidder: 'improvedigital',
                    iframeURL: 'https://hb.360yield.com/privacy-sandbox/topics.html'
                }, {
                    bidder: 'onetag',
                    iframeURL: 'https://onetag-sys.com/static/topicsapi.html'
                }, {
                    bidder: 'taboola',
                    iframeURL: 'https://cdn.taboola.com/libtrc/static/topics/taboola-prebid-browsing-topics.html'
                }, {
                    bidder: 'discovery',
                    iframeURL: 'https://api.popin.cc/topic/prebid-topics-frame.html'
                }, {
                    bidder: 'undertone',
                    iframeURL: 'https://creative-p.undertone.com/spk-public/topics_frame.html'
                }, {
                    bidder: 'vidazoo',
                    iframeURL: 'https://static.vidazoo.com/topics_api/topics_frame.html'
                }]
            }
        }
    });
    pbjs.enableAnalytics([{
        provider: "bydata",
        options: {
            clientId: 'asc129168',
            logFrequency: frequency
        }
    }]);
    pbjs.setConfig({ deviceAccess: true });
    pbjs.setConfig({ "useBidCache": true });
    pbjs.setConfig({ disableAjaxTimeout: true });
    pbjs.setConfig({ 'auctionOptions': { 'suppressStaleRender': true } });
    pbjs.setConfig({
        eventHistoryTTL: 60 // maximum time (in seconds) that events should be kept in memory
    });
    pbjs.setConfig({ maxRequestsPerOrigin: 6 });
    pbjs.setConfig({
        minBidCacheTTL: 0  // minimum time (in seconds) that bids should be kept in cache
    });
    pbjs.setConfig({ timeoutBuffer: 1000 });
    pbjs.setConfig({
        floors: {
            enforcement: {
                "enforceJS": true,
                "enforcePBS": true,
                "floorDeals": true,
                "bidAdjustment": true
            },
            data: {
                "currency": "USD",
                "skipRate": 0,
                "schema": {
                    "fields": ["mediaType"]
                },
                "values": {
                    "banner": 0.01,
                    "native": 0.01,
                    "video": 0.01
                },
                "default": 0.01
            }
        }
    });
    pbjs.setBidderConfig({
        bidders: ['openx','rubicon','ix','pubmatic','pulsepoint','33across',"improvedigital","rise","unruly"],   // seedtag - can list more bidders here if they share the same config
        config: {
            schain: {
                validation: "relaxed",
                config: {
                    ver: "1.0",
                    complete: 1,
                    nodes: [
                        {
                            asi: "ascendeum.com",
                            sid: "asc129168",
                            hp: 1
                        }
                    ]
                }
            }
        }
    });
    pbjs.bidderSettings = {
        improvedigital:{
            storageAllowed: true
        },
        appnexus: {
            storageAllowed: true
        },
        openx: {
            storageAllowed: true
        },
        pubmatic: {
            storageAllowed: true
        },
        rubicon: {
            storageAllowed: true
        },
        triplelift: {
            storageAllowed: true
        },
        ix: {
            storageAllowed: true
        },
        vidazoo: {
            storageAllowed: true
        },
        rise: {
            storageAllowed: true
        },
        minutemedia: {
            storageAllowed: true
        },
        sharethrough: {
            storageAllowed: true
        },
        nextMillennium: {
            storageAllowed: true
        },
        yieldmo: {
            storageAllowed: true
        },
        smartadserver: {
            storageAllowed: true
        },
        unruly: {
            storageAllowed: true
        },
        standard: {
            storageAllowed: true,
            adserverTargeting: [{
                key: "hb_bidder",
                val: function (bidResponse) {
                    return bidResponse.bidderCode;
                }
            }, {
                key: "hb_adid",
                val: function (bidResponse) {
                    return bidResponse.adId;
                }
            }, {
                key: "hb_pb",
                val: function (bidResponse) {
                    if (bidResponse.cpm >= 20) return '20.00';
                    return bidResponse.pbHg;
                }
            }, {
                key: 'hb_size',
                val: function (bidResponse) {
                    return bidResponse.size;
                }
            }]
        }
    };
});

window.addEventListener('DOMContentLoaded', (event) => {
    logInfo("NEW DOM LOADED EVENT");
    loadLibScriptsFile();
    //loadPWTScript('//ads.pubmatic.com/AdServer/js/pwt/160323/4154', function () {
        setTimeout(() => {
            var adsOnPage = getAdCodesFromPage('[data-ad]');
            logInfo("adsOnPage ", adsOnPage);
            renderAdsOnPage(adsOnPage);
        }, 500);
    //});
});

function renderAdRunTime(adsOnPage) {
    logInfo("renderAdRunTime ", adsOnPage);
    pbjs.que.push(function () {
        var spaAdunits = [];
        var spaAdunitsCodeArr = [];
        for (let i = 0; i < adsOnPage.length; i++) {
            for (let j = 0; j < pbjsAdUnits.length; j++) {
                var pbjsAdu = pbjsAdUnits[j];
                if (adsOnPage[i].dataset.ad.toString() === pbjsAdu.code.toString()) {
                    var useAdUnits = {};
                    let gpidAdunit = '/' + dfpNetwork + '/' + adsPrefix + pbjsAdu.code;
                    useAdUnits.adunit = gpidAdunit;
                    useAdUnits.code = adsOnPage[i].id;
                    useAdUnits.mediaTypes = pbjsAdu.mediaTypes;
                    useAdUnits.bids = pbjsAdu.bids;
                    if(!useAdUnits.ortb2Imp){
                        useAdUnits.ortb2Imp = {
                            ext: {
                                gpid: gpidAdunit,
                                data: {
                                    adserver: {
                                        name: 'gam',
                                        adslot: gpidAdunit
                                    },
                                    pbadslot: gpidAdunit,
                                    gpid: gpidAdunit
                                }
                            }
                        };
                    }
                    pbjsAds.push(useAdUnits);
                    spaAdunits.push(useAdUnits);
                    spaAdunitsCodeArr.push(useAdUnits.code);
                }
            }
        }
        logInfo("spaAdunits ", spaAdunits)
        logInfo("spaAdunitsCodeArr ", spaAdunitsCodeArr);
        var tempa9S = [];
        if (spaAdunits) {
            //logInfo('A9 slots');
            if (typeof apstag !== 'undefined') {
                for (var i = 0, len = spaAdunits.length; i < len; i++) {
                    tempa9S.push({
                        slotID: spaAdunits[i].code,
                        slotName: spaAdunits[i].adunit,
                        sizes: spaAdunits[i].mediaTypes.banner.sizes
                    });
                }
            }
        }
        logInfo('tempa9S slots', tempa9S);
        if (spaAdunits.length == 0) return false;
        var prebidBack = false;
        var a9Back = false;
        var renderAdsDone = false;

        function renderAds(force = false) {
            if (force) {
                prebidBack = true;
                a9Back = true;
            }
            if (!prebidBack) return false;
            if (!a9Back) return false;
            if (renderAdsDone) return false;

            googletag.cmd.push(function () {
                // googletag.pubads().collapseEmptyDivs();
                // Existing adunits
                let existingAdunitCodes = googletag.pubads().getSlots().map(function (slot) { return slot.getSlotElementId() });
                logInfo("** existingAdunitCodes  ** ", existingAdunitCodes);
                for (var i = spaAdunits.length - 1; i >= 0; i--) {
                    if (existingAdunitCodes.indexOf(spaAdunits[i].code) < 0) {
                        logInfo("** slot defined for  ** ", spaAdunits[i].code);
                        var myslot = googletag.defineSlot(spaAdunits[i].adunit, spaAdunits[i].mediaTypes.banner.sizes, spaAdunits[i].code).addService(googletag.pubads());
                        // A9 Targeting
                        if (typeof apstag !== 'undefined') {
                            apstag.setDisplayBids();
                        }
                        // Set Targeting
                        pbjs.setTargetingForGPTAsync(spaAdunitsCodeArr);
                        // Display adunits
                        googletag.pubads().refresh([myslot]);

                    }
                }
            });
            renderAdsDone = true;
            // Run Callback
            //callback();
        } // end renderAds
        // Force render fallback
        setTimeout(function () { renderAds(true); }, fsto);
        /* A9 Request Bids */
        logInfo("render ads aps ", tempa9S);
        if (tempa9S.length > 0 && typeof apstag !== 'undefined') {
            apstag.fetchBids({
                slots: tempa9S
                // timeout: config.timeout
            },
                function (bids) {
                    //console.log('A9 bids are back: ',bids);
                    a9Back = true;
                    renderAds();
                }); // End callback
        } else {
            a9Back = true;
        }
        logInfo("render ads ", spaAdunits);
        /* Code to Push User ID manually Using ID HUB Exposed function to get User IDs *Start**/
        if (PWT && typeof PWT.getUserIds == "function") {
            logInfo("***  PWT *** ", PWT);
            spaAdunits.forEach(function (adUnit) {
                adUnit.bids.forEach(function (bid) {
                    bid["userId"] = PWT.getUserIds();
                    bid["userIdAsEids"] = owpbjs.getUserIdsAsEids();
                });
            });
        }
        /* Code to Push User ID manually Using ID HUB Exposed function to get User IDs *End**/
        /* Prebid Request Bids*/
        pbjs.requestBids({
            //    timeout: config.timeout,
            adUnits: spaAdunits,
            bidsBackHandler: function (bids) {
                prebidBack = true;
                renderAds();
            }
        });
    });
}

function renderAdsOnPage(adsOnPage) {
    logInfo("renderAdsOnPage ", adsOnPage);
    var spaAdunits = [];
    var spaAdunitsCodeArr = [];
    for (let i = 0; i < adsOnPage.length; i++) {
        for (let j = 0; j < pbjsAdUnits.length; j++) {
            var pbjsAdu = pbjsAdUnits[j];
            if (adsOnPage[i].dataset.ad.toString() === pbjsAdu.code.toString()) {
                var useAdUnits = {};
                let gpidAdunit = '/' + dfpNetwork + '/' + adsPrefix + pbjsAdu.code;
                useAdUnits.adunit = gpidAdunit;
                useAdUnits.code = adsOnPage[i].id;
                useAdUnits.mediaTypes = pbjsAdu.mediaTypes;
                useAdUnits.bids = pbjsAdu.bids;
                if(!useAdUnits.ortb2Imp){
                    useAdUnits.ortb2Imp = {
                        ext: {
                            gpid: gpidAdunit,
                            data: {
                                adserver: {
                                    name: 'gam',
                                    adslot: gpidAdunit
                                },
                                pbadslot: gpidAdunit,
                                gpid: gpidAdunit
                            }
                        }
                    };
                }
                pbjsAds.push(useAdUnits);
                spaAdunits.push(useAdUnits);
                spaAdunitsCodeArr.push(useAdUnits.code);
            }
        }
    }

    logInfo("spaAdunits ", spaAdunits)
    logInfo("spaAdunitsCodeArr ", spaAdunitsCodeArr);

    googletag.cmd.push(function () {
        if (spaAdunits) {
            for (var i = 0, len = spaAdunits.length; i < len; i++) {
                googletag.defineSlot(spaAdunits[i].adunit, spaAdunits[i].mediaTypes.banner.sizes, spaAdunits[i].code).addService(googletag.pubads());
            }
        }
        pbjs.setTargetingForGPTAsync(spaAdunitsCodeArr);
        // Init DFP
        googletag.pubads().enableSingleRequest();
        googletag.enableServices();
        googletag.pubads().collapseEmptyDivs();
    });

    // logInfo("SPA ADUNITS --- ", spaAdunits);
    /* A9 Slots */
    if (spaAdunits) {
        //logInfo('A9 slots');
        if (typeof apstag !== 'undefined') {
            for (var i = 0, len = spaAdunits.length; i < len; i++) {
                a9S.push({
                    slotID: spaAdunits[i].code,
                    slotName: spaAdunits[i].adunit,
                    sizes: spaAdunits[i].mediaTypes.banner.sizes
                });
            }
        }
    }
    logInfo('A9 slots', a9S);

    function biddersBack() {
        if (requestManager.aps === true && requestManager.prebid === true) {
            logInfo("bidders Back");
            sendAdserverRequest();
        }
        return;
    }

    // sends adserver request
    function sendAdserverRequest() {
        if (requestManager.adserverRequestSent === true) {
            return;
        }
        //logInfo("send Adserver Request");
        requestManager.adserverRequestSent = true;
        googletag.cmd.push(function () {
            googletag.pubads().refresh();
        });
    }
    //APS request
    if (a9S && a9S.length > 0 && typeof apstag !== 'undefined') {
        apstag.fetchBids({
            slots: a9S
        }, function (bids) {
            googletag.cmd.push(function () {
                apstag.setDisplayBids();
                requestManager.aps = true;
                biddersBack();
            });
        }
        );
    }
    /* Code to Push User ID manually Using ID HUB Exposed function to get User IDs *Start**/
    // if (PWT && typeof PWT.getUserIds == "function") {
    //     logInfo("***  PWT *** ", PWT);
    //     spaAdunits.forEach(function (adUnit) {
    //         adUnit.bids.forEach(function (bid) {
    //             bid["userId"] = PWT.getUserIds();
    //             bid["userIdAsEids"] = owpbjs.getUserIdsAsEids();
    //         });
    //     });
    // }
    /* Code to Push User ID manually Using ID HUB Exposed function to get User IDs *End**/
    // logInfo("AFTER CHANGE ****** ",spaAdunits);
    pbjs.que.push(function () {
        pbjs.addAdUnits(spaAdunits);
        pbjs.requestBids({
            bidsBackHandler: function (bidResponses) {
                googletag.cmd.push(function () {
                    pbjs.setTargetingForGPTAsync();
                    requestManager.prebid = true;
                    biddersBack();
                })
            }
        });
    });
    setTimeout(function () { sendAdserverRequest(); }, fsto);
}

function getPbjsAdUnitByCode(code) {
    //logInfo("code ", code);
    let returnAdUnit = false;
    pbjsAdUnits.forEach(function (au) {
        if (au.code.toLowerCase() == code.toLowerCase())
            returnAdUnit = Object.assign({}, au);
    });
    return returnAdUnit;
}

function randomString(length) {
    var chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var result = '';
    for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    var timestamp = new Date().getUTCMilliseconds();
    result += timestamp;
    return result;
}

function getAdCodesFromPage(selector = '[data-ad]', inView = true) {
    let adCodes = document.querySelectorAll(selector);
    logInfo("GetAdCodesFromPage ", adCodes);
    let returnEls = [];
    adCodes.forEach(function (el) {
        let thisPbjsAdUnit = getPbjsAdUnitByCode(el.dataset.ad);
        logInfo("thisPbjsAdUnit ", thisPbjsAdUnit);
        if (!thisPbjsAdUnit) {
            utils.logError('Didn`t find an adunit to map:', el.dataset.ad);
            return false;
        }
        if (el.dataset.adDisplayed && el.dataset.adDisplayed == "true") {
            return false;
        } else {
            if (!inView) {
                if (el.dataset.ad === 'Mobile_Adhesion') {
                    var parentDiv = document.createElement('div');
                    parentDiv.id = "asc-ad-wrapper";
                    parentDiv.className = 'sticky';
                    // add gpt script on asc-ad div
                    if (!el.id) el.id = "asc-Mobile_Adhesion-hgbxO568"; //"Asc-"+el.dataset.ad + "-"+randomString(5);
                    el.innerHTML = "<script type='text/javascript'> googletag.cmd.push(function() { googletag.display('" + el.id + "');});</script>";
                    el.dataset.adDisplayed = true;
                    parentDiv.appendChild(el);
                    document.body.appendChild(parentDiv);
                    returnEls.push(el);
                }
            } else if (el.dataset.ad !== 'Mobile_Adhesion') {
                if (!el.id) el.id = "asc-" + el.dataset.ad + "-" + randomString(3);
                if (!el.dataset.sizes) el.dataset.sizes = JSON.stringify(thisPbjsAdUnit.mediaTypes.banner.sizes);
                el.dataset.adDisplayed = true;
                el.innerHTML = "<script type='text/javascript'> googletag.cmd.push(function() { googletag.display('" + el.id + "');});</script>";
                returnEls.push(el);
            }
        }
    });
    return returnEls;
}

/* destroy slot */
function destroyAdhesionSlot(e) {
    logInfo('pgadu - ', e);
    //  logInfo("1.pgadu - ",pbjsAds);
    for (let index = 0; index < pbjsAds.length; index++) {
        const element = pbjsAds[index];
        //  logInfo("2.pgadu - ",element);
        if (element.code && e && element.code.toString() === e.toString()) {
            var t = document.getElementById(element.code);
            logInfo("pgadu - ", t);
            if (t) {
                var e = googletag.pubads().getSlots().filter(function (e) {
                    return e.getSlotElementId() == t.id
                });
                //  logInfo("4.pgadu - ",e);
                if (e.length && e.length > 0) {
                    googletag.cmd.push(function () {
                        var isDestroy = googletag.destroySlots(e);
                        logInfo("pgadu - ", isDestroy);
                    });
                }
                t.innerHTML = "";
                t.className = "";
            }
        }
    }
}

/* refresh Ads */
function pbjsRefInd(i) {
    logInfo("Refresh ", dfr[i]);
    googletag.pubads().refresh([dfr[i]]);
}

function pbjsRefOAd(code) {
    pbjs.que.push(function () {
        if (code.indexOf('Mobile_Adhesion') >= 0) {
            if (refCapCount < adRefCap) {
                refCapCount++;
            } else {
                destroyAdhesionSlot(code);
                return false;
            }
        }
        logInfo("pbjsRefOAd ", code);
        console.log(" pbjsAds ", pbjsAds);
        var calla9S = [];
        var refAdunits = [];
        for (var i = 0; i < pbjsAds.length; i++) {
            if (pbjsAds[i].code == code) {
                refAdunits.push(pbjsAds[i]);
                calla9S.push({
                    slotID: pbjsAds[i].code,
                    slotName: pbjsAds[i].adunit,
                    sizes: pbjsAds[i].mediaTypes.banner.sizes
                });
            }
        }
        console.log("calla9S", calla9S);
        console.log("refAdunits", refAdunits);
        if (calla9S && calla9S.length > 0 && typeof apstag !== 'undefined') {
            apstag.fetchBids({
                slots: calla9S,
                timeout: 2000
            },
                function (bids) {
                    logInfo('bids back ', bids);
                });
        }
        pbjs.requestBids({
            timeout: 2000,
            adUnits: refAdunits,
            //adUnitCodes: [code],
            bidsBackHandler: function (bids) {
                // /* A9 Set Bids */
                if (typeof apstag !== 'undefined') { apstag.setDisplayBids(); }
                pbjs.setTargetingForGPTAsync([code]);
                refreshIteration++;
                googletag.cmd.push(function () {
                    googletag.pubads().setTargeting("refreshIteration", refreshIteration.toString());
                });
                // Refresh Individual
                dfr = googletag.pubads().getSlots();
                for (var i = 0, y = dfr.length; i < y; i++) {
                    if (code == dfr[i].getSlotElementId()) {
                        pbjsRefInd(i);
                    }
                }
            }
        });
    });
}

googletag.cmd.push(function () {
    googletag.pubads().addEventListener('impressionViewable', function (event) {
        var slot = event.slot;
        logInfo('Impression for slot became viewable.', slot.getSlotElementId());  //4
        setTimeout(function () { pbjsRefOAd(slot.getSlotElementId()) }, REFRESH_TIMEOUT);
    });
    googletag.pubads().addEventListener('slotRenderEnded', function (event) {
        var slot = event.slot;
        logInfo('Slot finished rendering.', slot.getSlotElementId());  // 1
        if (!event.isEmpty) {
            if (slot.getSlotElementId().indexOf('Mobile_Adhesion') >= 0) {
                logInfo("Not Empty slot -- ", slot.getSlotElementId());
                var adDiv = document.getElementById(slot.getSlotElementId());
                // add close button on asc-ad div
                var button_obj = document.createElement('button');
                button_obj.type = 'button';
                var t = document.createTextNode("x");
                button_obj.appendChild(t);
                button_obj.id = "btn-ad-close"
                button_obj.onclick = function () {
                    var x = document.querySelector("#asc-ad-wrapper.sticky");
                    x.style.display = "none";
                };
                adDiv.appendChild(button_obj);
                button_obj.style.display = 'block';
            }
        } else {
            if (slot.getSlotElementId().indexOf('Mobile_Adhesion') >= 0) {
                logInfo("Empty slot -- ", slot.getSlotElementId());
                var btnClose = document.getElementById('btn-ad-close');
                if (btnClose) btnClose.style.display = 'none';
            }
        }
    });
    googletag.pubads().addEventListener('slotVisibilityChanged', function (event) {
        var slot = event.slot;
        if (slot.getSlotElementId().indexOf('Top') >= 0 && deviceName === 'Mobile') {
            // Slot specific logic.
            if (event.inViewPercentage <= 0) {
                logInfo('Visible : ', slot.getSlotElementId() + ' && ' + event.inViewPercentage + '%');
                let adsOnPage = getAdCodesFromPage('[data-ad]', false);
                renderAdRunTime(adsOnPage);
            }
        }
    });
});

googletag.cmd.push(function () {
    logInfo("dfpKt XX  ",window.asc_data);
    if (isBydata) googletag.pubads().setTargeting("bydata", isBydata.toString());
});

function logInfo(message, meta) {
    utils.logInfo(buildLogMessage(message), meta);
}

function buildLogMessage(message) {
    return 'Ascendeum Prebid: ' + message;
}
