var eletype, timeout;

startAnyways = function() {
    clearTimeout( timeout );
    eletype = new Eletype(["letters"]);
    document.form.textarea.focus();
}

$(document).ready(function() {
    $("#form").css({
        left: $(document).width()/2 - $("form").width()/2,
        top: 20
    });

    $(window).focus(function() {
        document.form.textarea.focus();
    });

    $("#section").change(function() {
        clearTimeout( timeout );
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

    document.form.textarea.focus();
    timeout = setTimeout( startAnyways, 5000 );
});