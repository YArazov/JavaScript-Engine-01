export class Vec {      //export allows us to import it in other files
    //class means this is a template, used for making objects
    constructor(x, y) {   //call the constructor with the keyword new, and create an object
        this.x = x; //create attribute this.x and give it value x from the input
        this.y = y;
    }

    //chainable methods
    copy (v) {  //copy the xy of another vector into this
        this.x = v.x;
        this.y = v.y;
        return this;
    }
    
    add (v) {       //add a vector to this
        this.x += v.x;  //+= means add and store, this.x = this.x + v.x;
        this.y += v.y;  //+= is an "operator"
        return this;    //finish the function and return a value
    }

    subtract (v) {
        this.x -= v.x;
        this.y -= v.y;
        return this;
    }

    multiply (s) {
        this.x *= s;
        this.y *= s;
        return this;
    }
    
    divide (s) {
        this.x /= s;
        this.y /= s;
        return this;
    }
    
    //non-chainable
    clone () {  //create a new vector with xy of this
        return new Vec(this.x, this.y);
    }

    magnitude () {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }
}