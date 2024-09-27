const gravity = -9.81
const airFriction = 0.99
const friction = 0.94
var dt = 0.1
const maxSpeed = 50
class Player extends Obj{
    constructor(x, y, width, height, color) {
        super(x, y, width, height, color)
        this.velocity = new Vector(0, 0)
        this.acceleration = new Vector(0, gravity)

        this.jump = false
        this.airjump = true
        this.doubleTap = false

        // Hoi Hoi
        this.ddash = 1;

        this.w = width
        this.h = height
        this.dash = 0
    }

    move() {

        if (right || left) {
            this.velocity.x += 2*(1 - this.velocity.x/(maxSpeed))*right - 2*(1 + this.velocity.x/(maxSpeed))*left
        }
        if(right + left > 0 && s == 1){
            this.velocity.x = 200
            this.velocity.x = (right == 1)? Math.abs(this.velocity.x): -1*Math.abs(this.velocity.x)
            s = 0
        }
        if (right + left == 0) {
            this.velocity.x *= friction
        }

        if (Math.abs(this.velocity.x) < 0.000001) {
            this.velocity.x = 0
        }

        this.width += ((this.w*(3 + (Math.abs(this.velocity.x)/maxSpeed))/(3 + (Math.abs(this.velocity.y)/maxSpeed))) - this.width)/4
        
        if (! down) {
            this.height += ((this.h*(3 + (Math.abs(this.velocity.y)/maxSpeed))/(3 + (Math.abs(this.velocity.x)/maxSpeed))) - this.height)/4
        }

        if (up) {
            if (!this.doubleTap && this.velocity.y > 0) {
                this.acceleration.y = gravity/2
            } else {
                if (this.jump) {
                    this.acceleration.y = gravity/2
                } else {
                    if (this.velocity.y > 0) {
                        this.acceleration.y = gravity/2
                    } else {
                        this.acceleration.y = gravity
                    }
                }
            }
            
            if (this.jump) {
                this.velocity.y = 40
            }

            this.jump = false
        } else {
            this.acceleration.y = gravity
            this.doubleTap = true
        }


        // normal physics
        this.position = this.position.add(this.velocity.multiply(dt).add(this.acceleration.multiply(0.5*dt*dt)))
        this.velocity = this.velocity.add(this.acceleration.multiply(dt))
        this.updateCoordinates()


        // check collision
        let count = 0;
        for (let i = 0; i < ID; i++) {
            if (this.id != i) {
                if (this.collide(objects[i])) {
                    count += 1
                }
            }
        }
        if (count == 0) {
            if(up && this.airjump && this.doubleTap) {
                this.velocity.y = Math.min(Math.max(40, this.velocity.y+40), 50)
                console.log(this.velocity.y)
                this.airjump = false
            }

            if(down == 1 && this.ddash == 1){
                this.velocity.y = -200
                this.ddash = 0
            }
            if (down == 0) {
                this.ddash = 1
            }
        }

        // collision
        for (let i = 0; i < ID; i++) {
            if (this.id != i) {
                if (this.collide(objects[i])) {
                    count += 1
                    let collideInfo = this.collisionMove(objects[i])

                    this.position = this.position.add(collideInfo[0])

                    if (collideInfo[1] == 1 || collideInfo[1] == 2) {
                        this.velocity.y = 0
                    }

                    if (collideInfo[1] == 0) {
                        this.velocity.x = 0
                    }

                    if (collideInfo[1] == 2) {
                        //console.log("hi")
                        if (!up) {
                            this.jump = true
                            this.doubleTap = false
                            this.airjump = true
                        }

                        if(down == 1){
                            this.height += (20 - this.height)/4
                        } else {
                            this.height += ((this.h*(3 + (Math.abs(this.velocity.y)/maxSpeed))/(3 + (Math.abs(this.velocity.x)/maxSpeed))) - this.height)/4
                        }
                    }

                }
            }
        }

        //console.log(this.airjump)
    }

    drawReference(p=this, c=this.color) {
        ctx.fillStyle = c

        camx += (this.velocity.x - camx)/10
        camy += (this.velocity.y - camy)/20

        ctx.fillStyle = this.color
        ctx.fillRect(board.width/2 + this.position.x - this.width/2 - p.position.x + camx, board.height/2 - this.position.y - this.height/2 + p.position.y + camy, this.width, this.height)
    }
}
