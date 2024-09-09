// board setup
const board = document.getElementById('board');
const ctx = board.getContext('2d');

board.width = window.innerWidth
board.height = window.innerHeight

// level setup
var boardData = []
var ID = 0;

var background = new Box(0, 0, board.width, board.height)

// offscreen boundaries
new Object(0, board.height/2 + 5, board.width, 10)
new Object(0, -1*board.height/2 - 5, board.width, 10)
new Object(-1*board.width/2 - 5, 0, 10, board.height)
new Object(board.width/2 + 5, 0, 10, board.height)
var o1 = new Object(0, -200, 500, 30, "white")
var o2 = new Object(310, -250, 50, 10, "white")

// player
var player = new Player(0, 0, 30, 30, "white")

function run() {
    background.draw()
    o1.draw()
    o2.draw()
    player.move()

    requestAnimationFrame(run)
}

run()