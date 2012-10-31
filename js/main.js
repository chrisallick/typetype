var lesson;
$(document).ready(function() {
    lesson = new Lesson(["words"]);
    //lesson = new Lesson(["letters"]);

    $("#form").css({
        left: $(document).width()/2 - $("form").width()/2,
        top: 20
    });

    $("#contrast").toggle(function(){
    	$(".invert").css({
    		"background-color": "black",
    		"color": "white"
    	});
    	//$("#textarea").css("color","white");
    },function(){
    	$(".invert").css({
    		"background-color": "white",
    		"color": "black"
    	});
    });

    document.form.textarea.focus();
});