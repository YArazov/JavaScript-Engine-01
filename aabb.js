import {Vec} from './vector.js';

export class Aabb { //axis-aligned bounding box
	constructor() {
		this.min = new Vec(0, 0);   //top left corner 
        this.max = new Vec(0, 0);   //bottom right corner
	}

    draw(ctx, strokeColor) {
        //draws a rectangle box around the object
        ctx.strokeRect(
            this.min.x,
            this.min.y,
            this.max.x - this.min.x,
            this.max.y - this.min.y
        );   //x, y,(top left corner) width, height
    }
}