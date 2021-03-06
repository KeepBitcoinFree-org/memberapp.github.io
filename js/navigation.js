"use strict";

function displayContentBasedOnURLParameters() {

    //Careful with input here . . . comes from URL so can contain any characters, so we want to sanitize it before using.

    var url = window.location.href;
    var action = sanitizeAlphanumeric(url.substring(url.indexOf('#') + 1).toLowerCase());
    if (action.startsWith("memberposts")) {
        showMemberPosts(Number(getParameterByName("start")), Number(getParameterByName("limit")), sanitizeAlphanumeric(getParameterByName("qaddress")));
    } else if (action.startsWith("notifications")) {
        showNotifications(Number(getParameterByName("start")), Number(getParameterByName("limit")), sanitizeAlphanumeric(getParameterByName("qaddress")));
    } else if (action.startsWith("member")) {
        showMember(sanitizeAlphanumeric(getParameterByName("qaddress")));
    } else if (action.startsWith("followers")) {
        showFollowers(sanitizeAlphanumeric(getParameterByName("qaddress")));
    } else if (action.startsWith("following")) {
        showFollowing(sanitizeAlphanumeric(getParameterByName("qaddress")));
    } else if (action.startsWith("blockers")) {
        showBlockers(sanitizeAlphanumeric(getParameterByName("qaddress")));
    } else if (action.startsWith("blocking")) {
        showBlocking(sanitizeAlphanumeric(getParameterByName("qaddress")));
    } else if (action.startsWith("ratings")) {
        showRatings(sanitizeAlphanumeric(getParameterByName("qaddress")));
    } else if (action.startsWith("bootstrap")) {
        showBootstrap(sanitizeAlphanumeric(pubkey));
    } else if (action.startsWith("posts")) {
        showPosts(Number(getParameterByName("start")), Number(getParameterByName("limit")), sanitizeAlphanumeric(getParameterByName("type")));
    } else if (action.startsWith("feed")) {
        showFeed(Number(getParameterByName("start")), Number(getParameterByName("limit")), sanitizeAlphanumeric(getParameterByName("type")));
    } else if (action.startsWith("comments")) {
        showComments(Number(getParameterByName("start")), Number(getParameterByName("limit")), sanitizeAlphanumeric(getParameterByName("type")));
    } else if (action.startsWith("trustgraph")) {
        showTrustGraph(sanitizeAlphanumeric(getParameterByName("member")), sanitizeAlphanumeric(getParameterByName("target")));
    } else if (action.startsWith("topic")) {
        //Warning - topicname may contain special characters
        showTopic(Number(getParameterByName("start")), Number(getParameterByName("limit")), getParameterByName("topicname"), sanitizeAlphanumeric(getParameterByName("type")));
    } else if (action.startsWith("thread")) {
        showThread(sanitizeAlphanumeric(getParameterByName("root")), sanitizeAlphanumeric(getParameterByName("post")));
    } else if (action.startsWith("settings")) {
        showSettings();
    } else if (action.startsWith("new")) {
        showNewPost();
    } else if (action.startsWith("map")) {
        showMap(sanitizeAlphanumeric(getParameterByName("geohash")), sanitizeAlphanumeric(getParameterByName("post")));
    } else if (action.startsWith("login")) {
        if (pubkey == "" || pubkey == null || pubkey == undefined) {
            showLogin();
        }else{
            showPosts(0, 25);    
        }
    } else {
        showPosts(0, 25);
    }
}

function hideAll() {
    document.getElementById('feed').style.display = "none";
    document.getElementById('posts').style.display = "none";
    document.getElementById('comments').style.display = "none";
    document.getElementById('thread').style.display = "none";
    document.getElementById('topic').style.display = "none";
    document.getElementById('memberposts').style.display = "none";
    document.getElementById('notifications').style.display = "none";
    //remove the content too, so that we don't get conflicting ids
    document.getElementById('feed').innerHTML = "";
    document.getElementById('posts').innerHTML = "";
    document.getElementById('comments').innerHTML = "";
    document.getElementById('thread').innerHTML = "";
    document.getElementById('topic').innerHTML = "";
    document.getElementById('memberposts').innerHTML = "";
    document.getElementById('notifications').innerHTML = "";
    
    document.getElementById('settings').style.display = "none";
    document.getElementById('loginbox').style.display = "none";
    document.getElementById('followers').style.display = "none";
    document.getElementById('following').style.display = "none";
    document.getElementById('blockers').style.display = "none";
    document.getElementById('blocking').style.display = "none";
    document.getElementById('member').style.display = "none";
    document.getElementById('newpost').style.display = "none";
    document.getElementById('ratings').style.display = "none";
    document.getElementById('map').style.display = "none";
    document.getElementById('trustgraph').style.display = "none";
    document.getElementById('bootstrap').style.display = "none";
    document.getElementById('community').style.display = "none";
    
}

function show(theDiv) {
    hideAll();
    document.getElementById(theDiv).style.display = "block";
}

function showLogin() {
    show("loginbox");
}

function showMap(geohash, posttrxid) {
    show("map");
    getAndPopulateMap(geohash, posttrxid);
    document.getElementById('map').style.display = "block";
}

function hideMap() {
    //show("map");
    //getAndPopulateMap();
    document.getElementById('map').style.display = "none";
}

function showRatings(qaddress) {
    show("ratings");
    getAndPopulateRatings(qaddress);
    document.getElementById('ratings').style.display = "block";
}

function showBootstrap(qaddress) {
    show("bootstrap");
    getAndPopulateBootstrap(qaddress);
}

function showNewPost() {
    show("newpost");
    if (currentTopic != "") {
        document.getElementById('memorandumtopicarea').style.display = "block";
        document.getElementById('memotopicarea').style.display = "block";
        document.getElementById('memotopic').value = currentTopic;
        document.getElementById('memorandumtopic').value = currentTopic;
    } else {
        document.getElementById('memorandumtopicarea').style.display = "none";
        document.getElementById('memotopicarea').style.display = "none";
        document.getElementById('memotopic').value = "";
        document.getElementById('memorandumtopic').value = "";
    }
    //Do calculations on maxlengths for topics and titles
    topictitleChanged("memorandum");
    topictitleChanged("memo");
    document.getElementById('newpostbutton').style.display = "block";
}


function showNotifications(start, limit) {
    
    if (pubkey == "" || pubkey == null || pubkey == undefined) {
        showPosts(0, 25);
        return;
    }
    
    getAndPopulateNotifications(start, limit, "notifications", pubkey);
     
}

function showSettings() {
    //Need to be logged in
    if (pubkey == "" || pubkey == null || pubkey == undefined) {
        showPosts(0, 25);
        return;
    }
    getAndPopulateSettings();
    getAndPopulate(0, 25, 'memberposts', pubkey);
    document.getElementById('settings').style.display = "block";
    document.getElementById('settingsfollow').style.display = "block";
}

function showMember(qaddress) {
    getAndPopulateMember(qaddress);
    getAndPopulate(0, 25, 'memberposts', qaddress);
    document.getElementById('member').style.display = "block";
    document.getElementById('memberfollow').style.display = "block";
    document.getElementById('memberblock').style.display = "block";
    document.getElementById('community').style.display = "block";
    document.getElementById('ratings').style.display = "block";
    document.getElementById('trustgraph').style.display = "block";
}

//deprecated - now on member page
function showTrustGraph(member, target) {
    show("trustgraph");
    getAndPopulateTrustGraph(member, target);
}

function showMemberPosts(start, limit, qaddress) {
    getAndPopulate(start, limit, 'memberposts', qaddress);
}

//These three should be refactored away
function showFeed(start, limit, type) {
    showPFC(start, limit, 'posts', pubkey, type);
}
function showPosts(start, limit, type) {
    showPFC(start, limit, 'posts', pubkey, type);
}
function showComments(start, limit, type) {
    showPFC(start, limit, 'comments', pubkey, type);
}

function showPFC(start, limit, page, pubkey, type){
    var topicNameHOSTILE=currentTopic;
    if(topicNameHOSTILE!=""){
        getAndPopulateTopic(start, limit, 'topic', pubkey, type, topicNameHOSTILE);
        //document.location.href=document.location.href+"&topic="+encodeURIComponent(topicNameHOSTILE);
    }else{
        getAndPopulate(start, limit, page, pubkey, type);
    }
}


//Topics
function showTopic(start, limit, topicNameHOSTILE, type) {
    //Warning, topicname may contain hostile characters
    enterTopic(topicNameHOSTILE);
    getAndPopulateTopic(start, limit, 'topic', pubkey, type, topicNameHOSTILE);
}

function topicChanged(){
    var selector=document.getElementById('topicselector');
    
    //special case, no topic selected
    if(selector.selectedIndex==0){
        exitTopic();
        showPosts(0, 25);
        document.location.href="#posts?type=all&start=0&limit=25";
        return;
    }

    //Warning, topicname may contain hostile characters
    var topicnameHOSTILE=selector.options[selector.selectedIndex].value;
    showTopic(0,25,topicnameHOSTILE,'new');
}

function exitTopic(){
    currentTopic = "";
    document.getElementById('memotopic').value = "";
    document.getElementById('memorandumtopic').value = "";    
}

function enterTopic(topicNameHOSTILE){
    //Warning, topicname may contain hostile characters
    currentTopic = topicNameHOSTILE;
    document.getElementById('memotopic').value = topicNameHOSTILE;
    document.getElementById('memorandumtopic').value = topicNameHOSTILE;
    document.location.href="#topic?topicname="+encodeURIComponent(topicNameHOSTILE);
    var selector=document.getElementById('topicselector');
    selector.selectedIndex=1;
    selector.options[selector.selectedIndex].value=topicNameHOSTILE;
    selector.options[selector.selectedIndex].text=topicNameHOSTILE.substring(0,15);

}


function showThread(roottxid, txid) {
    getAndPopulateThread(roottxid, txid, 'thread');
}

function showFollowers(qaddress) {
    getAndPopulateFollowers(qaddress);
}

function showFollowing(qaddress) {
    getAndPopulateFollowing(qaddress);
}

function showBlockers(qaddress) {
    getAndPopulateBlockers(qaddress);
}

function showBlocking(qaddress) {
    getAndPopulateBlocking(qaddress);
}



var detectBackOrForward = function (onBack, onForward) {
    //Note, sometimes onForward is being called even though it a regular navigation click event
    let hashHistory = [window.location.hash];
    let historyLength = window.history.length;

    return function () {
        var hash = window.location.hash, length = window.history.length;
        if (hashHistory.length && historyLength == length) {
            if (hashHistory[hashHistory.length - 2] == hash) {
                hashHistory = hashHistory.slice(0, -1);
                onBack();
            } else {
                hashHistory.push(hash);
                onForward();
            }
        } else {
            hashHistory.push(hash);
            historyLength = length;
        }
    }
};

window.addEventListener("hashchange", detectBackOrForward(
    function () { displayContentBasedOnURLParameters(); },
    function () { displayContentBasedOnURLParameters(); /*This doesn't seem to work accurately if history is over 50*/ }
));

