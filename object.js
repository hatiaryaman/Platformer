const E = 100000

class Obj extends Box{
    constructor(x, y, width, height, color) {
        super(x, y, width, height, color)

        this.coordinates = [new Vector(x - width/2, y - height/2), new Vector(x + width/2, y - height/2), new Vector(x + width/2, y + height/2), new Vector(x - width/2, y + height/2)]
        this.id = ID
        ID += 1

        boardData.push(this.coordinates)
        objects.push(this)
    }

    collideHelp(v) {
        let a = this.coordinates
        if (a[0].x < v.x && v.x < a[1].x && a[0].y < v.y && v.y < a[2].y) {
            return true
        }
    }

    collide(other) {
        let a = this.coordinates
        let b = other.coordinates

        for (let n of a) {
            if (other.collideHelp(n)) {
                return true
            }
        }

        for (let n of b) {
            if (this.collideHelp(n)) {
                return true
            }
        }

        return false
    }

    collisionMove(other) {
        let l = (this.position.x + this.width/2) - (other.position.x - other.width/2)
        let r = (other.position.x + other.width/2) - (this.position.x - this.width/2)
        let u = (other.position.y + other.height/2) - (this.position.y - this.height/2)
        let d = (this.position.y + this.height/2) - (other.position.y - other.height/2)

        let m = Math.min(l, r, d, u)
        if (m == l) {
            return [new Vector(-1*l, 0), 0]
        } else if (m == r) {
            return [new Vector(r, 0), 0]
        } else if (m == d) {
            return [new Vector(0, -1*d), 1]
        } else if (m == u){
            return [new Vector(0, u), 2]
        } else {
            return [new Vector(0,0), 3]
        }
    }

    updateCoordinates() {
        this.coordinates[0].x = this.position.x - this.width/2
        this.coordinates[0].y = this.position.y - this.height/2

        this.coordinates[1].x = this.position.x + this.width/2
        this.coordinates[1].y = this.position.y - this.height/2

        this.coordinates[2].x = this.position.x + this.width/2
        this.coordinates[2].y = this.position.y + this.height/2

        this.coordinates[3].x = this.position.x - this.width/2
        this.coordinates[3].y = this.position.y + this.height/2
    }

    drawReference(p) {
        ctx.fillStyle = this.color
        ctx.strokeStyle = this.color

        ctx.fillRect(board.width/2 + this.position.x - this.width/2 - p.position.x + camx, board.height/2 - this.position.y - this.height/2 + p.position.y + camy, this.width, this.height)
        ctx.strokeRect(board.width/2 + this.position.x - this.width/2 - p.position.x + camx, board.height/2 - this.position.y - this.height/2 + p.position.y + camy, this.width, this.height)
    }
}
