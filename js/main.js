var audio = {};
var to_load = ["a","b","c","d","e","f","g","h","i","correct","incorrect","getstarted"];

var instructions = ["getstarted"];
var answers = ["correct","incorrect"];
var letters = ["a","b","c","d","e","f","g","h","i"];
$(document).ready(function() {
    for( var i = 0, len = to_load.length; i < len; i++ ) {
        audio[to_load[i]] = new Audio();
        if (audio[to_load[i]].canPlayType("audio/wav")) {
            audio[to_load[i]].setAttribute("src","jams/"+to_load[i]+".wav");
        } else {
            audio[to_load[i]].setAttribute("src","jams/"+to_load[i]+".m4a");
        }
        audio[to_load[i]].addEventListener("canplaythrough",onLoadedHandler,false);
        audio[to_load[i]].addEventListener("ended",onEndedHandler,false);
        audio[to_load[i]].load();
    }

    $("#form").css({
        left: $(document).width()/2 - $("form").width()/2,
        top: $(document).height()/2 - $("form").height()/2
    });

    document.form.textarea.focus();
});


/*
    array to check item agains
    return true if item in array, false if not
*/
doesInclude = function( array, item ) {
    return (array.indexOf(item) != -1);
}

/*
    set loaded to 0 and count up as audio is loaded
    if they are all loaded, play the first letter
*/
var loaded = 0;
var playing = "";
onLoadedHandler = function(event) {
    loaded++;
    if( loaded == to_load.length ) {
        playing = "getstarted";
        audio["getstarted"].play();
    }
}

/*
    t - timeout to play next

    if you just read the instructions
        play the next letter in half a second
    if it's a letter
        check to see if thye got it correct
*/
var t;
onEndedHandler = function(event) {
    clearTimeout(t);
    if( playing == "getstarted" ) {
        t = setTimeout( playNext, 500 );
    } else if( playing == "correct" ) {
        t = setTimeout( playNext, 1000 );
    } else if( doesInclude(letters,playing) ) {
        ct = setTimeout( checkInput, 250 );
    }
    playing = "";
}

/*
    if the value is correct, end the round
*/
roundOver = function() {

}

/*
    ct - how often to check the input
    redo_counter - when to re-read instructions to player

    clear the ct timeout
    is it correct
        play correct
    is if empty?
        wait and check again
    is it wrong?
        play incorrect
    set value of input to ""
*/
var ct;
var redo_counter;
checkInput = function() {
    clearTimeout( ct );
    if( $("#textarea").val() == waiting_for ) {
        waiting_for = "";
        playing = "correct";
        audio[playing].play();
    } else if( $("#textarea").val() == "" ) {
        ct = setTimeout( checkInput, 1000 );
    } else if( $("#textarea").val() != waiting_for ) {
        audio["incorrect"].play();
        ct = setTimeout( checkInput, 1000 );
    }
    $("#textarea").val("");
}

/*
    next - random value from 0 - length of letters array

    pick a random letter
    set playing to that letter
    play it
*/
var waiting_for = "";
playNext = function() {
    var next = Math.floor(Math.random()*letters.length);
    waiting_for = playing = letters[next];
    audio[playing].play();
}