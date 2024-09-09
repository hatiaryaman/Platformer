class Box {
    constructor(x, y, width, height, color="black") {
        this.position = new Vector(x,y)
        this.width = width
        this.height = height
        this.color = color
    }

    draw() {
        ctx.fillStyle = this.color
        ctx.fillRect(board.width/2 + this.position.x - this.width/2, board.height/2 - this.position.y - this.height/2, this.width, this.height)
    }
}