var eletype;
$(document).ready(function() {
    eletype = new Eletype();

    /*
        center the form
    */
    $("#form").css({
        left: $(document).width()/2 - $("form").width()/2,
        top: $(document).height()/2 - $("#form").height()/2 - 100
    });

    $("#instructions").css({
        left: $(document).width()/2 - $("#instructions").width()/2,
        top: $(document).height()/2 - $("#instructions").height()/2 - 100
    });

    $(window).resize(function(){
        $("#form").css({
            left: $(document).width()/2 - $("form").width()/2,
            top: $(document).height()/2 - $("#form").height()/2 - 100
        });

        $("#instructions").css({
            left: $(document).width()/2 - $("#instructions").width()/2,
            top: $(document).height()/2 - $("#instructions").height()/2 - 100
        });        
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
        $("h2",this).hide();
        $("p",this).show();
    }, function(){
        $("h2",this).show();
        $("p",this).hide();
    });

    $("#playchirp").click(function(e){
        e.preventDefault();
        if( eletype ) {
            eletype.sections.instructions.play("chirp");
            var wait = setTimeout( function(){
                clearTimeout(wait);
                $(".active").removeClass("active").addClass("done").prev().addClass("active");
            }, 2000 );
        }
    });

    $("#testspeakers").click(function(e){
        e.preventDefault();
        if( eletype ) {
            eletype.sections.instructions.play("chirp");
            $(this).text("You should hear a bird");
            var wait = setTimeout( function(){
                clearTimeout(wait);
                $(".active").removeClass("active").addClass("done").prev().addClass("active");
            }, 3000 );
        }
    });

    /*
        select a section to practice
    */
    $("#section").change(function() {
        $(".active").removeClass("active").addClass("done").prev().addClass("active");

        var s = new Array();
        if( $(this).val() == 1 ) {
            s.push("letters");
        } else if( $(this).val() == 2 ) {
            s.push("words");
        } else if( $(this).val() == 3 ) {
            s.push("letters");
            s.push("words");
        }
        eletype.load(s);
    });

    /*
        fired when instructions have loaded and we're ready
    */
    onEletypeReady = function() {
        $("#instructions").animate({
            opacity: 1
        });

        $("#section").animate({
            opacity: 1
        })
    }

    /*
        fired when lesson begins
    */
    onEletypeBegin = function() {
        $("#instructions").animate({
            opacity: 0,
            top: 40
        }, function(){ $(this).hide(); });
        $("#textarea").show();
        $("#contrast").fadeIn();
        document.form.textarea.focus();
    }

    /*
        button for inverting colors on screen
    */
    $("#contrast").toggle(function(){
    	$(".invert").css({
    		"background-color": "black",
    		"color": "white"
    	});
        document.form.textarea.focus();
        eletype.textcolor = "white";
    },function(){
    	$(".invert").css({
    		"background-color": "white",
    		"color": "black"
    	});
        document.form.textarea.focus();
        eletype.textcolor = "black";
    });

    /*
        try to maintain the focus on the text area so people don't get confused
    */
    document.form.textarea.focus();

    /*
        if a section is not picked, auto pick letters
        and begin the lesson
    */
    // var timeout = setTimeout( function(){
    //     clearTimeout(timeout);
    //     $("#instructions").animate({
    //         opacity: 0,
    //         top: 40
    //     }, function(){ $(this).hide(); });
    //     $("#section").fadeOut();
    //     eletype.load(["letters"]);
    //     document.form.textarea.focus();
    // }, 5000 );
});