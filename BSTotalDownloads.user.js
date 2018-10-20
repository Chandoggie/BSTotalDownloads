// ==UserScript==
// @name         BSTotalDownloads
// @namespace    https://github.com/Chandoggie/BSTotalDownloads
// @version      0.3
// @description  Adds up all the `Download: ###` and displays them at the top of the Users BeatSaver page.
// @author       Chandoggie
// @icon         https://i.imgur.com/BeIFkaB.png
// @match        https://beatsaver.com/browse/byuser/*
// @match        https://beatsaver.com/index.php/browse/byuser/*
// @match        https://www.beatsaver.com/browse/byuser/*
// @match        https://www.beatsaver.com/index.php/browse/byuser/*
// @require      https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js
// ==/UserScript==

//Non-intrusive "Thank You" watermark. <3
$(".text-center:last").append($(".b"), '<b>|| <a href="https://github.com/Chandoggie/BSTotalDownloads">Thanks for using BSTD! 🖤</a></b>');


// Checker for having a full page of songs. Displays text if over 15.
var tableIDs = [];

$('table').each(function(){
   tableIDs.push(this.id);
});

var totalsongs = tableIDs.length;
var testing = $('button').text();
if (totalsongs == 15 && testing.includes("Page")) {
    $(".row:first").prepend('<h4><b><i><font size="3" color="red">This user has 15+ songs. BSTD does not support multipage loading as of yet.<br />If you would like to help add that functionality, feel free to contact me from <a href="https://github.com/Chandoggie/BSTotalDownloads">HERE</a></font></i></b></h4>');
} else {
};

// Setting vars based on webpage data.
var Download = $("td").text();
var SplitDownload = Download.split("Downloads: ");
var SplitFinished = Download.split("Finished: ");

//Removes the first useless split of each array
var indexToRemove = 0;
var numberToRemove = 1;

function spliceFun(array) {
    return array.splice(indexToRemove, numberToRemove);
}

spliceFun(SplitDownload);
spliceFun(SplitFinished);

// Logs the array, separates the correct infomation from the other information
SplitDownload.forEach(function(element, index, array) {
    array[index] = parseInt(element.replace(/\s/g, '').replace(/(?:\r\n|\r|\n)/g, '').replace(/\| F.*/g, '').replace("|", ''));
});
SplitFinished.forEach(function(element, index, array) {
    array[index] = parseInt(element.replace(/\s/g, '').replace(/\|.*/g,'').replace("||", ''));
});

// Totals the array
var totalnumber = 0;
for (var i = 0; i < SplitDownload.length; i++) {
    totalnumber += SplitDownload[i]
}
totalnumber = totalnumber.toString();
var totalFnumber = 0;
for (var f = 0; f < SplitFinished.length; f++) {
    totalFnumber += SplitFinished[f]
}
totalFnumber = totalFnumber.toString();

// Add Commas to Numbers
function toCommas(value) {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Adds to the webpage
$(".row:first").prepend('<h4><b>Total Downloads: ' + toCommas(totalnumber) + '<br /><br />Total Finishes: ' + toCommas(totalFnumber) + '<br /><br />Total Songs: ' + totalsongs + '</b></h4>');

// Updater
var version = 0.3;
var request = new XMLHttpRequest();
request.onreadystatechange = function() {
    if (request.readyState == XMLHttpRequest.DONE) {
        var updatedScriptVersion = request.responseText;
        if (version < updatedScriptVersion) {
            console.log("Update script");
            window.location.href = "https://raw.githubusercontent.com/Chandoggie/BSTotalDownloads/master/BSTotalDownloads.user.js";
        }
    }
};
request.open('GET', 'https://raw.githubusercontent.com/Chandoggie/BSTotalDownloads/master/version.json', true);
request.send(null);
