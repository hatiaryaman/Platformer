// key presses
var left = 0;
var right = 0;
var down = 0;
var up = 0;
var editor = 0
var b = 0
var s = 0
document.addEventListener("keydown", function(e) {
    if (e.key == "ArrowRight" || e.key == "d") {
        right = 1
    }
    if (e.key == "ArrowLeft" || e.key == "a") {
        left = 1
    }
    if (e.key == "ArrowDown" || e.key == "s") {
        down = 1
    }
    if (e.key == "ArrowUp" || e.key == "w") {
        up = 1
    }
    if (e.key == " ") {
        editor = (editor == 0)? 1 : 0
    }
    if (e.key == "Enter") {
        s = (s == 0)? 1 : 0
    }

})

document.addEventListener("keyup", function(e) {
    if (e.key == "ArrowRight" || e.key == "d") {
        right = 0
    }
    if (e.key == "ArrowLeft" || e.key == "a") {
        left = 0
    }
    if (e.key == "ArrowDown" || e.key == "s") {
        down = 0
    }
    if (e.key == "ArrowUp" || e.key == "w") {
        up = 0
    }

})
