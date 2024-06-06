import pbjs from 'prebid.js';
import 'prebid.js/modules/adtelligentBidAdapter';

console.log('Prebid.js loaded');

pbjs.que.push(function() {
    console.log('Prebid queue function running');


var adUnits = [

    // Video instream adUnit
    {
        code: 'test-div',
        mediaTypes: {
            video: {
                context: 'instream',
                playerSize: [640, 480]
            }
        },
        bids: [{
            bidder: 'adtelligent',
            params: {
                aid: 331133
            }
        }]
    },

    // Video outstream adUnit
    {
        code: 'test-div',
        mediaTypes: {
            video: {
                context: 'outstream',
                playerSize: [640, 480]
            }
        },
        bids: [{
            bidder: 'adtelligent',
            params: {
                aid: 331133
            }
        }]
    },

    // Video ADPOD adUnit
    {
        code: 'test-div',
        sizes: [[640, 480]],
        mediaTypes: {
            video: {
                context: 'adpod',
                playerSize: [640, 480]
            }
        },
        bids: [{
            bidder: 'adtelligent',
            params: {
                aid: 331133
            }
        }]
    },

    // Banner adUnit
    {
        code: 'test-div',
        mediaTypes:{
            banner:{
                sizes: [[300, 250]]
            }
        },
        bids: [{
            bidder: 'adtelligent',
            params: {
                aid: 350975
            }
        }]
    }
];


console.log('Ad units defined: ', adUnits);

pbjs.addAdUnits(adUnits);
pbjs.requestBids({
    bidsBackHandler: function(bidResponses) {
        console.log('Bid responses: ', bidResponses);
        if (bidResponses && Object.keys(bidResponses).length > 0) {
            const validBidResponses = Object.values(bidResponses).find(response => response.bids && response.bids.length > 0);
            if (validBidResponses) {
                const adId = validBidResponses.bids[0].adId;
                console.log('Rendering ad with adId: ', adId);
                pbjs.renderAd(document, 'test-div', adId);
            } else {
                console.log('No valid bids received');
            }
        } else {
            console.log('No bid responses received');
        }
    }
});
});
