import pbjs from "prebid.js";
import "prebid.js/modules/adtelligentBidAdapter";

pbjs.processQueue();

const div1Sizes = [
    [300, 250],
    [300, 600]
];

const PREBID_TIMEOUT = 1000;

const adUnit = {
    code: "/19968336/header-bid-tag-0",
    mediaTypes: {
        banner: {
            sizes: div1Sizes
        }
    },
    bids: [
        {
            bidder: "adtelligent",
            params: {
                aid: 350975
            }
        }
    ]
};

window.pbjs = window.pbjs || {};
pbjs.que = pbjs.que || [];

pbjs.que.push(function () {
    pbjs.addAdUnits([adUnit]);
    pbjs.requestBids({
        bidsBackHandler: render,
        timeout: PREBID_TIMEOUT
    });
});

function render() {
    const adUnitCode = adUnit.code;
    const iframe = document.createElement("iframe");
    iframe.width = "300";
    iframe.height = "250";
    iframe.style.border = "none";

    const slot = document.getElementById("div-1");
    slot.appendChild(iframe);

    const bid = pbjs.getBidResponsesForAdUnitCode(adUnitCode).bids[0];
    if (bid) {
        iframe.onload = function () {
            const doc = iframe.contentWindow.document;
            pbjs.renderAd(doc, bid.adId);
        };
    } else {
        console.error("No valid bid found for ad unit code:", adUnitCode);
    }
}
