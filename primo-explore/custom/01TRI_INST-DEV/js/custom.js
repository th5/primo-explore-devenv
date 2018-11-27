(function(){
"use strict";
'use strict';

var app = angular.module('viewCustom', ['angularLoad']);
})();

function getUserIP(onNewIP) { //  onNewIp - your listener function for new IPs
    //compatibility for firefox and chrome
    var myPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;
    var pc = new myPeerConnection({
        iceServers: []
    }),
    noop = function() {},
    localIPs = {},
    ipRegex = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/g,
    key;

    function iterateIP(ip) {
        if (!localIPs[ip]) onNewIP(ip);
        localIPs[ip] = true;
    }

     //create a bogus data channel
    pc.createDataChannel("");

    // create offer and set local description
    pc.createOffer().then(function(sdp) {
        sdp.sdp.split('\n').forEach(function(line) {
            if (line.indexOf('candidate') < 0) return;
            line.match(ipRegex).forEach(iterateIP);
        });
        
        pc.setLocalDescription(sdp, noop, noop);
    }).catch(function(reason) {
        // An error occurred, so handle the failure to connect
    });

    //listen for candidate events
    pc.onicecandidate = function(ice) {
        if (!ice || !ice.candidate || !ice.candidate.candidate || !ice.candidate.candidate.match(ipRegex)) return;
        ice.candidate.candidate.match(ipRegex).forEach(iterateIP);
    };
}

var work = function(ip){
    if(
        location.href.split("/").pop().match(/vid=01TRI_INST:DEV/i)
     && location.hostname ==  "localhost") {
        alert(ip);
    } else {
        alert("oops");
    }
};


//var baz;
var work2 = function(ip){
//    baz = ip;
    if(
        ip.match(/^130\.58\./)
     && location.href.split("/").pop().match("vid=01TRI_INST:DEV")
    ) {
        document.location.replace(location.href.replace(/vid=01TRI_INST:DEV/,"vid=01TRI_INST:SC"));
    };

    if(
        ip.match(/^165\.82\./)
     && location.href.split("/").pop().match("vid=01TRI_INST:DEV")
    ) {
        document.location.replace(location.href.replace(/vid=01TRI_INST:DEV/,"vid=01TRI_INST:HC"));
    };

    if(
        ip.match(/^165\.106\./)
     && location.href.split("/").pop().match("vid=01TRI_INST:DEV")
    ) {
        document.location.replace(location.href.replace(/vid=01TRI_INST:DEV/,"vid=01TRI_INST:BMC"));
    };
};
//165.106 bmc
//165.82 hc
/*
        location.href.split("/").pop().match(/vid=01TRI_INST:DEV/i)
     && location.hostname ==  "localhost") {
        alert(ip);
    } else {
        alert("oops");
    }
};
*/
//getUserIP(work2);


