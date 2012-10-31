var lesson;
$(document).ready(function() {
    //lesson = new Lesson(["words"]);
    lesson = new Lesson(["letters"]);

    $("#form").css({
        left: $(document).width()/2 - $("form").width()/2,
        top: 20
    });

    document.form.textarea.focus();
});