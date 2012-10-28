var audio = {};
var tracks = ["a","b","c","correct","incorrect", "instructions"];

$(document).ready(function() {
    for( var i = 0, len = tracks.length; i < len; i++ ) {
        audio[tracks[i]] = new Audio();
        audio[tracks[i]].setAttribute("src","jams/"+tracks[i]+".m4a");
        audio[tracks[i]].addEventListener("canplaythrough",onLoadedHandler,false);
        audio[tracks[i]].addEventListener("ended",onEndedHandler,false);
        audio[tracks[i]].load();
    }

    $("#form").css({
        left: $(document).width()/2 - $("form").width()/2,
        top: $(document).height()/2 - $("form").height()/2
    });

    document.form.textarea.focus();
});

var loaded = 0;
var playing = "";
onLoadedHandler = function(event) {
    loaded++;
    if( loaded == tracks.length ) {
        playing = "instructions";
        audio["instructions"].play();
    }
}

var t;
onEndedHandler = function(event) {
    clearTimeout(t);
    if( playing == "instructions" ) {
        t = setTimeout( playNext, 500 );
    } else if( playing == "a" ) {
        ct = setTimeout( checkInput, 250 );
    }
    playing = "";
}

var ct;
var redo_counter;
checkInput = function() {
    clearTimeout( ct );
    if( $("#textarea").val() == "a" ) {
        audio["correct"].play();
    } else if( $("#textarea").val() == "" ) {
        ct = setTimeout( checkInput, 1000 );
    } else if( $("#textarea").val() != "a" ) {
        audio["incorrect"].play();
        ct = setTimeout( checkInput, 1000 );
    }
    $("#textarea").val("");
}

playNext = function() {
    playing = "a";
    audio["a"].play();
}