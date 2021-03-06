"use strict";

//These 4 functions could be refactored into a single functions
function getAndPopulateFollowers(qaddress) {
    show('followers');
    var page="followers";
    getJSON(server + '?action=followers&qaddress=' + qaddress + '&address=' + pubkey).then(function (data) {
        var contents = "";
        for (var i = 0; i < data.length; i++) {
            contents = contents + getMembersWithRatingHTML(i,page,data[i]);
        }

        document.getElementById('follows').innerHTML = contents;
        var disable=false;
        if(qaddress!=pubkey){
            disable=true;
        }
        addStarRatings(data,page,disable);
    }, function (status) { //error detection....
        alert('Something went wrong.');
    });

}

function getAndPopulateFollowing(qaddress) {
    show('following');
    var page="following";
    getJSON(server + '?action=following&qaddress=' + qaddress + '&address=' + pubkey).then(function (data) {
        var contents = "";
        for (var i = 0; i < data.length; i++) {
            contents = contents + getMembersWithRatingHTML(i,page,data[i]);
        }
        document.getElementById('followingtable').innerHTML = contents;

        var disable=false;
        if(qaddress!=pubkey){
            disable=true;
        }
        addStarRatings(data,page,disable);
    }, function (status) { //error detection....
        alert('Something went wrong.');
    });
}

function getAndPopulateBlockers(qaddress){
    show('blockers');
    var page="blockers";
    getJSON(server+'?action=blockers&qaddress='+qaddress+'&address='+pubkey).then(function(data) {
        var contents="";
        for(var i=0;i<data.length;i++){
            contents=contents+getMembersWithRatingHTML(i,page,data[i]);
        }
        document.getElementById('blocks').innerHTML = contents;
        
        var disable=false;
        if(qaddress!=pubkey){
            disable=true;
        }
        addStarRatings(data,page,disable);

    }, function(status) { //error detection....
        alert('Something went wrong.');
    });

}

function getAndPopulateBlocking(qaddress){
    show('blocking');
    var page="blocking";
    getJSON(server+'?action=blocking&qaddress='+qaddress+'&address='+pubkey).then(function(data) {
        var contents="";
        for(var i=0;i<data.length;i++){
            contents=contents+getMembersWithRatingHTML(i,page,data[i]);
        }
        document.getElementById('blockingtable').innerHTML = contents;
        
        var disable=false;
        if(qaddress!=pubkey){
            disable=true;
        }
        addStarRatings(data,page,disable);

    }, function(status) { //error detection....
        alert('Something went wrong.');
    });
}
