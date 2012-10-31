// var audio = {};
// var to_load = {"letters":[],"answers":[],"numbers":[],"words":[],"instructions":[]};

// to_load["instructions"] = ["getstarted"];
// to_load["answers"] = ["correct","incorrect"];
// to_load["letters"] = 
// to_load["numbers"] = ["0","1","2","3","4","5","6","7","8","9"];
// to_load["words"] = ["fox","bird","cat","dog","hello"];
// var total_items = 0;
var lesson;
$(document).ready(function() {
    // count all the things we are going to load so that we know when everything is loaded
    //for( section in to_load ) { total_items += to_load[section].length; }

    lesson = new Lesson(["letters"]);

    $("#form").css({
        left: $(document).width()/2 - $("form").width()/2,
        top: $(document).height()/2 - $("form").height()/2
    });

    document.form.textarea.focus();
});

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
    } else if( doesInclude(letters,playing) || doesInclude(words,playing) ) {
        ct = setTimeout( checkInput, 250 );
    }
    playing = "";
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