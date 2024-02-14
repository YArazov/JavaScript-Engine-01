import {Rect} from './rect.js';

export class Renderer {
    constructor(canv, ctx) {
        this.canvas = canv;
        this.ctx = ctx;
    }



    drawFrame(objects, fillCol, bordCol) {
        //for loops - repeat the code a number of times
        //use the counter i, after every interation, i++ means add +1 to i, 
        //i<objects.length is condition for running the loop
        //if i becomes >= to the length of the objects array stop drawing
        for (let i = 0; i<objects.length; i++) {
            objects[i].shape.draw(this.ctx, fillCol, bordCol);
        }
    }

    clearFrame() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}