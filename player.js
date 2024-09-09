const gravity = -9.81
const airFriction = 0.99
const friction = 0.94
const dt = 0.2
const maxSpeed = 30
var jump = false
var doubleTap = false

class Player extends Object{
    constructor(x, y, width, height, color) {
        super(x, y, width, height, color)
        this.velocity = new Vector(0, 0)
        this.acceleration = new Vector(0, gravity)
    }

    move() {
        // movements
        if (right || left) {
            this.velocity.x += 2*(1 - this.velocity.x/maxSpeed)*right - 2*(1 + this.velocity.x/maxSpeed)*left
        }
        if (right + left == 0) {
            this.velocity.x *= friction
        }

        if (up) {
            if (!doubleTap && this.velocity.y > 0) {
                this.acceleration.y = gravity/2
            } else {
                this.acceleration.y = gravity
            }
            
            if (jump) {
                this.velocity.y = 30
            }
            jump = false
        } else {
            this.acceleration.y = gravity
            doubleTap = true
        }

        // storing collisions before movement
        var bottom = this.collisionDown()
        var top = this.collisionUp()
        var l = this.collisionLeft()
        var r = this.collisionRight()

        // normal physics
        this.position = this.position.add(this.velocity.multiply(dt).add(this.acceleration.multiply(0.5*dt*dt)))
        this.velocity = this.velocity.add(this.acceleration.multiply(dt))

        // down collision
        if (this.position.y - this.height/2 < bottom) {
            this.position.y = bottom + this.height/2
            this.velocity.y = 0

            if (!up) {
                jump = true
                doubleTap = false
            }
        }

        // up collision
        if (this.position.y + this.height/2 > top) {
            this.position.y = top - this.height/2
            this.velocity.y = 0
        }

        // left right collisions
        if (this.position.x - this.width/2 < l) {
            this.position.x = l + this.width/2
            this.velocity.x = 0
        }

        if (this.position.x + this.width/2 > r) {
            this.position.x = r - this.width/2
            this.velocity.x = 0
        }

        // collisions
        this.updateCoordinates()
        
        this.draw()
    }
}