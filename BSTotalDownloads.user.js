// ==UserScript==
// @name         BSTotalDownloads
// @namespace    https://github.com/Chandoggie/BSTotalDownloads
// @version      0.1
// @description  Adds up all the `Download: ###` and displays them at the top of the Users BeatSaver page.
// @author       Chandoggie
// @icon         https://i.imgur.com/BeIFkaB.png
// @match        https://beatsaver.com/browse/byuser/*
// @match        https://beatsaver.com/index.php/browse/byuser/*
// @require      https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js
// ==/UserScript==

var Download = $("td").text();
var SplitDownload = Download.split("Downloads: ");
// console.log($("td").text()); -- Used to log the original text input pre-split
// console.log(SplitDownload);  -- Used to log the original text input post-split

//Removes the first useless split
var indexToRemove = 0;
var numberToRemove = 1;
SplitDownload.splice(indexToRemove, numberToRemove);

// Logs the array, separates the downloads from the other information
SplitDownload.forEach(function(element, index, array) {
    array[index] = parseInt(element.replace(/ /g, '').replace(/(?:\r\n|\r|\n)/g, '').replace(/\ \\|\\|F.*/, '').replace("||", ''));
    console.log("Current Numbers: " + element.replace(/ /g, '').replace(/(?:\r\n|\r|\n)/g, '').replace(/\ \\|\\|F.*/, '').replace("||", ''));
});
console.log("Current Numbers Array: " + SplitDownload);

var totalnumber = 0;
for (var i = 0; i < SplitDownload.length; i++) {
    totalnumber += SplitDownload[i]
}

totalnumber = totalnumber.toString();
console.log("Final Number Edit: " + totalnumber);

// Adds Commas to Numbers
function toCommas(value) {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

/*
// First Attempt at adding the number to the page.
var div = document.createElement('div');
div.innerHTML = totalnumber;
div.style = "top:0;position:fixed;z-index:99999;color:#9d9d9d;padding:20px;background-color:#333;max-height:340px;";
document.body.appendChild(div);

// Second Attempt at adding the number to the page.
$("[id^=song]:first").append('<tr><td>Total Downloads: ' + toCommas(totalnumber) + '</td></tr>');
*/

// Adds to the webpage
$(".row:first").prepend('<b>Total Downloads: ' + toCommas(totalnumber) + '</b>');

// Updater
var version = 0.1;
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
request.send(null);