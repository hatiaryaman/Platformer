var physics = 1
document.addEventListener("visibilitychange", (e)=>{
    physics = 1 - physics
})
// board setup
const board = document.getElementById('board');
const ctx = board.getContext('2d');

board.width = window.innerWidth
board.height = window.innerHeight

// level setup
var time = Date.now()
var boardData = []
var ID = 0;

// Editing vars
var toggle = 0

var mouseX1 = 0
var mouseY1 = 0
var mouseX2 = 0
var mouseY2 = 0

var background = new Box(0, 0, board.width, board.height)
console.log('e')
// level generating
var objects = []
var camx = 0;
var camy = 0;

// offscreen boundaries
new Obj(0, -1 * board.height / 2 - 50, board.width + 100000, 100, "white")

// little thing
new Obj(-100, -1*board.height/2 + 25, 100, 50, "white")
new Obj(-125, -1*board.height/2 + 75, 50, 50, "white")
new Obj(-100, -1*board.height/2 + 125, 100, 50, "white")

// editing    
document.addEventListener("mousedown", function (e) {
    if (editor == 1) {
        if (toggle == 0) {
            let v1 = new Vector(e.clientX, e.clientY)
            mouseX1 = v1.x - board.width/2 
            mouseY1 = board.height/2 - v1.y
        } else {       
            let v1 = new Vector(e.clientX, e.clientY)
            mouseX2 = v1.x - board.width/2 
            mouseY2 = board.height/2 - v1.y

            objects.push(new Obj((mouseX1 + mouseX2) / 2, (mouseY1 + mouseY2) / 2, Math.abs(mouseX1 - mouseX2), Math.abs(mouseY1 - mouseY2), "white"))
            objects.pop(-1)
            mouseX2 = 0
            mouseX1 = 0
            mouseY2 = 0
            mouseY1 = 0
        }

        toggle = 1 - toggle

    }
})

// player
var player = new Player(0, 0, 50, 50, "aquamarine")

function run() {
    background.draw()

    for (let obj of objects) {
        obj.drawReference(player)
    }

    player.move()

    // framerate
    var t = Date.now()
    dt = physics*(t - time) / 50
    time = t

    console.log(1/dt)
    //Promise.all([new Promise((res)=>{requestAnimationFrame (res);}), new Promise((res)=>{setTimeout(res, 16)})]).then(run);
    requestAnimationFrame (run)
}

run()
