class Vector {
    constructor(x, y){
        this.x = x
        this.y = y
    }

    get mag() {
        return Math.sqrt(this.x*this.x + this.y*this.y)
    }

    add(other) {
        return new Vector(this.x + other.x, this.y + other.y)
    }

    subtract(other) {
        return new Vector(this.x - other.x, this.y - other.y)
    }

    dot(other) {
        return this.x*other.x + this.y*other.y
    }

    multiply(num) {
        return new Vector(this.x*num, this.y*num)
    }
}