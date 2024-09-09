const E = 100000000

class Object extends Box{
    constructor(x, y, width, height, color) {
        super(x, y, width, height, color)

        this.coordinates = [new Vector(x - width/2, y - height/2), new Vector(x + width/2, y - height/2), new Vector(x + width/2, y + height/2), new Vector(x - width/2, y + height/2)]
        this.id = ID
        ID += 1

        boardData.push(this.coordinates)
    }

    collisionDown() {
        var bottom = -1*E
        
        for (let i = 0; i < ID; i++) {
            if (this.id != i) {
                let a = this.coordinates
                let b = boardData[i]

                if (((b[0].x < a[0].x) && (a[0].x < b[1].x)) || ((b[0].x < a[1].x) && (a[1].x < b[1].x)) || ((a[0].x < b[0].x) && (b[0].x < a[1].x)) || ((a[0].x < b[1].x) && (b[1].x < a[1].x))) {
                    if (b[2].y <= a[0].y && b[2].y >= bottom) {
                        bottom = b[2].y
                    }
                }
            }
        }

        return bottom
    }

    collisionUp() {
        var top = E
        
        for (let i = 0; i < ID; i++) {
            if (this.id != i) {
                let a = this.coordinates
                let b = boardData[i]

                if (((b[0].x < a[0].x) && (a[0].x < b[1].x)) || ((b[0].x < a[1].x) && (a[1].x < b[1].x)) || ((a[0].x < b[0].x) && (b[0].x < a[1].x)) || ((a[0].x < b[1].x) && (b[1].x < a[1].x))) {
                    if (b[0].y >= a[2].y && b[0].y <= top) {
                        top = b[0].y
                    }
                }
            }
        }

        return top
    }

    collisionLeft() {
        var l = -1*E
        
        for (let i = 0; i < ID; i++) {
            if (this.id != i) {
                let a = this.coordinates
                let b = boardData[i]

                if (((b[0].y < a[0].y) && (a[0].y < b[2].y)) || ((b[0].y < a[2].y) && (a[2].y < b[2].y)) || ((a[0].y < b[0].y) && (b[0].y < a[2].y)) || ((a[0].y < b[2].y) && (b[2].y < a[2].y))) {
                    if (b[1].x <= a[0].x && b[1].x >= l) {
                        l = b[1].x
                    }
                }
            }
        }

        return l
    }

    collisionRight() {
        var r = E
        
        for (let i = 0; i < ID; i++) {
            if (this.id != i) {
                let a = this.coordinates
                let b = boardData[i]

                if (((b[0].y < a[0].y) && (a[0].y < b[2].y)) || ((b[0].y < a[2].y) && (a[2].y < b[2].y)) || ((a[0].y < b[0].y) && (b[0].y < a[2].y)) || ((a[0].y < b[2].y) && (b[2].y < a[2].y))) {
                    if (b[0].x >= a[1].x && b[0].x <= r) {
                        r = b[0].x
                    }
                }
            }
        }

        return r
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
}