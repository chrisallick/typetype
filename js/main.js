var eletype;
$(document).ready(function() {
    eletype = new Lesson(["letters"]);

    $("#form").css({
        left: $(document).width()/2 - $("form").width()/2,
        top: 20
    });

    $("#contrast").toggle(function(){
    	$(".invert").css({
    		"background-color": "black",
    		"color": "white"
    	});
    },function(){
    	$(".invert").css({
    		"background-color": "white",
    		"color": "black"
    	});
    });

    document.form.textarea.focus();
});