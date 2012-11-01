var eletype;
$(document).ready(function() {
    /*
        center the form
    */
    $("#form").css({
        left: $(document).width()/2 - $("form").width()/2,
        top: 20
    });

    /*
        try to maintain the focus on the text area so people don't get confused
    */
    $(window).focus(function() {
        document.form.textarea.focus();
    });

    /*
        show/hide about copy
    */
    $("#about").toggle(function(){
        $("p",this).show();
    }, function(){
        $("p",this).hide();
    });

    /*
        select a section to practice
    */
    $("#section").change(function() {
        clearTimeout( timeout );
        $("#section").hide();
        var s = new Array();
        if( $(this).val() == 1 ) {
            s.push("letters");
        } else if( $(this).val() == 2 ) {
            s.push("words");
        } else if( $(this).val() == 3 ) {
            s.push("letters");
            s.push("words");
        }
        eletype = new Eletype(s);
        document.form.textarea.focus();
    });

    /*
        button for inverting colors on screen
    */
    $("#contrast").toggle(function(){
    	$(".invert").css({
    		"background-color": "black",
    		"color": "white"
    	});
        document.form.textarea.focus();
    },function(){
    	$(".invert").css({
    		"background-color": "white",
    		"color": "black"
    	});
        document.form.textarea.focus();
    });

    /*
        try to maintain the focus on the text area so people don't get confused
    */
    document.form.textarea.focus();

    /*
        if a section is not picked, auto pick letters
        and begin the lesson
    */
    var timeout = setTimeout( function(){
        clearTimeout(timeout);
        $("#section").hide();
        eletype = new Eletype(["letters"]);
        document.form.textarea.focus();
    }, 5000 );
});