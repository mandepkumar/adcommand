// Size Mapping
var adSizes = [];
adSizes["RIghtSidebar_Bottom"] = [[]];       // 160x600, 300x600, 300x250 dt

export const tcAdunits = [{
    code: 'Top',
    device: [''],
    mediaTypes: { banner: { sizes: [[300,250]] } },
    bids: [
        { bidder: "appnexus", params: { placementId: "20816030" } },
        { bidder: "openx", params: { "unit": "561042203", "delDomain": "ascendeum-d.openx.net" } },
        //{ bidder: "seedtag", params: { "adUnitId": "33718445", "publisherId": "9247-2848-01", "placement": "inBanner" } },
        { bidder: "rubicon", params: { accountId: '22936', siteId: '359482', zoneId: '1936110' } },
        { bidder: "pubmatic", params: { publisherId: "160323", adSlot: "TimeCardCalculator_Top_300x250" } },
        { bidder: "ix", params: {  siteId: "620102" } },
        { bidder: "triplelift", params: { inventoryCode: "TimeCardCalculator_Mobile_Top" } },
        { bidder: "sharethrough", params: { pkey: "oyFpL7dIonSq36U4tewLJQqA" } },
        { bidder: "yieldmo", params: { placementId: '2834829907232497683' } },
        { bidder: "nextMillennium", params: { placement_id: '25717' } }, // mobile
        { bidder: "smartadserver", params: { siteId: 518853, pageId: 1623524, formatId: 113720 } },
        { bidder: "rise", params: { org: '63889b5a59cc190001431f40' } },
        { bidder: "unruly", params: { siteId: 276828 }},
        { bidder: 'pulsepoint', params: { cp: 563495, ct: 773638} },
        { bidder: '33across', params: { siteId: 'cMHD_gyo8r74o-rkHcnlxd', productId: 'siab' }},
        { bidder: "improvedigital", params :{ publisherId: 2445, placementId: 23260219}},
        { bidder: "minutemedia", params: { org: '01j1800kyzkr', placementId: "TimeCardCalculator_Top_300x250" } },
        { bidder: "vidazoo", params: { cId: "6683f48c24368641f0ed0dc9", pId: "59ac17c192832d0011283fe3" ,subDomain: "exchange" } }
    ]
}, {
    code: 'RightSidebar_Top',
    device: ['Desktop', 'Tablet'],
    mediaTypes: { banner: { sizes: [[300,600]] } },
    bids: [
        { bidder: "appnexus", params: { placementId: "20816031" } },
        //{ bidder: "seedtag", params: { "adUnitId": "33718446", "publisherId": "9247-2848-01", "placement": "inBanner" } },
        { bidder: "openx", params: { "unit": "561042204", "delDomain": "ascendeum-d.openx.net" } },
        { bidder: "triplelift", params: { inventoryCode: "TimeCardCalculator_RIghtSidebar_Top" } },
        { bidder: 'rubicon', params: { accountId: '22936', siteId: '359482', zoneId: '1936114' } },
        { bidder: "ix", params: {  siteId: "620101" } },
        { bidder: "pubmatic", params: { publisherId: "160323", adSlot: "TimeCardCalculator_RIghtSidebar_Top_300x600" } },
        { bidder: "sharethrough", params: { pkey: "oyFpL7dIonSq36U4tewLJQqA" }},
        { bidder: "yieldmo", params: { placementId: '2834829907073114130' } },
        { bidder: "nextMillennium", params: { placement_id: '25715' } },
        { bidder: "smartadserver", params: { siteId: 518853, pageId: 1623523, formatId: 113722 } },
        { bidder: "rise", params: { org: '63889b5a59cc190001431f40' } },
        { bidder: "unruly", params: { siteId: 276828 }},
        { bidder: 'pulsepoint', params: { cp: 563495, ct: 773638} },
        { bidder: '33across', params: { siteId: 'cMHD_gyo8r74o-rkHcnlxd', productId: 'siab' }},
        { bidder: "improvedigital", params :{ publisherId: 2445, placementId: 23260217}},
        { bidder: "minutemedia", params: { org: '01j1800kyzkr', placementId: "TimeCardCalculator_RIghtSidebar_Top" } },
        { bidder: "vidazoo", params: { cId: "6683f48c24368641f0ed0dc9", pId: "59ac17c192832d0011283fe3" ,subDomain: "exchange" } }
    ]
}, {
    code: 'RightSidebar_Bottom',
    device: ['Desktop', 'Tablet'],
    mediaTypes: { banner: { sizes: adSizes['RIghtSidebar_Bottom'] } },
    bids: []
}, {
    code: 'Bottom',
    device: [''],
    mediaTypes: { banner: { sizes: [[300,250]] } },
    bids: [
        { bidder: "appnexus", params: { placementId: "20816033" } },
        //", params: { "adUnitId": "33718449", "publisherId": "9247-2848-01", "placement": "inBanner" } },
        { bidder: "openx", params: { "unit": "561042207", "delDomain": "ascendeum-d.openx.net" } },
        { bidder: 'rubicon', params: { accountId: '22936', siteId: '359482', zoneId: '1936118' } },
        { bidder: "pubmatic", params: { publisherId: "160323", adSlot: "TimeCardCalculator_Bottom_300x250" } },
        { bidder: "ix", params: {  siteId: "620099" } },
        { bidder: "triplelift", params: { inventoryCode: "TimeCardCalculator_Mobile_Bottom" } },
        { bidder: "sharethrough", params: { pkey: "oyFpL7dIonSq36U4tewLJQqA" }},
        { bidder: "yieldmo", params: { placementId: '2834829906745958416' } },
        // { bidder: "nextMillennium", params: { placement_id: '25712' } }, // desktop
        { bidder: "nextMillennium", params: { placement_id: '25713' } }, // mobile 
        { bidder: "smartadserver", params: { siteId: 518853, pageId: 1623521, formatId: 113721 } },
        { bidder: "rise", params: { org: '63889b5a59cc190001431f40' } },
        { bidder: "unruly", params: { siteId: 276828 }},
        { bidder: 'pulsepoint', params: { cp: 563495, ct: 773638} },
        { bidder: '33across', params: { siteId: 'cMHD_gyo8r74o-rkHcnlxd', productId: 'siab' }},
        { bidder: "improvedigital", params :{ publisherId: 2445, placementId: 23260213}},
        { bidder: "minutemedia", params: { org: '01j1800kyzkr', placementId: "TimeCardCalculator_Bottom_300x250" } },
        { bidder: "vidazoo", params: { cId: "6683f48c24368641f0ed0dc9", pId: "59ac17c192832d0011283fe3" ,subDomain: "exchange" } }
    ]
}, {
    code: 'Mobile_Adhesion',
    device: [''],
    mediaTypes: { banner: { sizes: [[320,50]] } },
    bids: [
        { bidder: "appnexus", params: { placementId: "21047292" } },
        //{ bidder: "seedtag", params: { "adUnitId": "33718444", "publisherId": "9247-2848-01", "placement": "inScreen" } },
        { bidder: "openx", params: { "unit": "561042209", "delDomain": "ascendeum-d.openx.net" } },
        { bidder: "ix", params: {  siteId: "631289" } },
        { bidder: "triplelift", params: { inventoryCode: "TimeCardCalculator_Mobile_Adhesion_320x50" } },
        { bidder: "pubmatic", params: { publisherId: "160323", adSlot: "TimeCardCalculator_Mobile_Adhesion" } },
        { bidder: 'rubicon', params: { accountId: '22936', siteId: '359482', zoneId: '1975906' } },
        { bidder: "sharethrough", params: { pkey: "oyFpL7dIonSq36U4tewLJQqA" }},
        { bidder: "rise", params: { org: '63889b5a59cc190001431f40' } },
        { bidder: "unruly", params: { siteId: 276828 }},
        { bidder: 'pulsepoint', params: { cp: 563495, ct: 773638} },
        { bidder: '33across', params: { siteId: 'cMHD_gyo8r74o-rkHcnlxd', productId: 'inview' }},
        { bidder: "minutemedia", params: { org: '01j1800kyzkr', placementId: "TimeCardCalculator_Mobile_Adhesion" } },
        { bidder: "vidazoo", params: { cId: "6683f48c24368641f0ed0dc9", pId: "59ac17c192832d0011283fe3" ,subDomain: "exchange" } }
    ]
},{
    code:'Right1',    
    device: ['Desktop','Tablet'],
    mediaTypes:{ banner:{sizes: [[300,250],[300,50],[320,50],[320,100],[250,250],[120,240],[1,1]]}},
    bids:[
        { bidder: "rubicon", params: { accountId: '22936', siteId: '359482', zoneId: '3496116' } },
        { bidder: "ix", params: { siteId: "1127263"}},
        { bidder: "pubmatic", params: { publisherId: "160323", adSlot: "TimeCardCalculator_Right1_250x250" }},
        { bidder: "pubmatic", params: { publisherId: "160323", adSlot: "TimeCardCalculator_Right1_300x250" }},
        { bidder: "pubmatic", params: { publisherId: "160323", adSlot: "TimeCardCalculator_Right1_300x50" }},
        { bidder: "pubmatic", params: { publisherId: "160323", adSlot: "TimeCardCalculator_Right1_320x100" }},
        { bidder: "pubmatic", params: { publisherId: "160323", adSlot: "TimeCardCalculator_Right1_320x50" }},
        { bidder: "openx", params: { "unit": "561042210", "delDomain": "ascendeum-d.openx.net" } },
        { bidder: '33across', params: { siteId: 'cMHD_gyo8r74o-rkHcnlxd', productId: 'siab' }},
        { bidder: 'pulsepoint', params: { cp: 563495, ct: 773638} }
        //{ bidder: "seedtag", params: { "adUnitId": "33737028", "publisherId": "9247-2848-01", "placement": "inBanner" } }
    ]
},{
    code:'Right2',  
    isPrefix:true,
    device: ['Desktop','Tablet'],
    mediaTypes:{ banner:{sizes: [[300,250],[300,50],[320,50],[320,100],[250,250],[120,240],[1,1]]}},
    bids:[
        { bidder: "rubicon", params: { accountId: '22936', siteId: '359482', zoneId: '3496118' } },
        { bidder: "ix", params: { siteId: "1127262"}},
        { bidder: 'pulsepoint', params: { cp: 563495, ct: 773638} },
        { bidder: '33across', params: { siteId: 'cMHD_gyo8r74o-rkHcnlxd', productId: 'siab' }},
        { bidder: "pubmatic", params: { publisherId: "160323", adSlot: "TimeCardCalculator_Right2_250x250" }},
        { bidder: "pubmatic", params: { publisherId: "160323", adSlot: "TimeCardCalculator_Right2_300x250" }},
        { bidder: "pubmatic", params: { publisherId: "160323", adSlot: "TimeCardCalculator_Right2_300x50" }},
        { bidder: "pubmatic", params: { publisherId: "160323", adSlot: "TimeCardCalculator_Right2_320x100" }},
        { bidder: "pubmatic", params: { publisherId: "160323", adSlot: "TimeCardCalculator_Right2_320x50" }},
        { bidder: "openx", params: { "unit": "561042211", "delDomain": "ascendeum-d.openx.net" } }
        //{ bidder: "seedtag", params: { "adUnitId": "33763128", "publisherId": "9247-2848-01", "placement": "inBanner" } }   
    ]
}];



