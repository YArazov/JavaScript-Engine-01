import {Aabb} from './aabb.js';
import {Vec} from './vector.js';

export class Circle {
	constructor(pos, r) {
		this.position = pos
		this.radius = r;
        this.orientation = 0;
        this.aabb = new Aabb(new Vec(0, 0), new Vec(0, 0));
	}

	draw(ctx, strokeColor, fillColor) {
        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI*2, true);
        ctx.closePath();
        if (fillColor) {
            ctx.fillStyle = fillColor;
            ctx.fill();
        }
        ctx.strokeStyle = strokeColor;
        ctx.lineWidth = 3;
        ctx.stroke();


        ctx.strokeStyle = 'red'; // Change color for the bounding box
        this.aabb.draw(ctx, 'red'); // Draw the AABB using its draw method
    }
    updateAabb() {
        const minX = this.position.x - this.radius;
        const minY = this.position.y - this.radius;
        const maxX = this.position.x + this.radius;
        const maxY = this.position.y + this.radius;

        this.aabb.min.x = minX;
        this.aabb.min.y = minY;
        this.aabb.max.x = maxX;
        this.aabb.max.y = maxY;

    }
    updatePosition(newPosition) {
        const deltaX = newPosition.x - this.position.x;
        const deltaY = newPosition.y - this.position.y;
    
        // Update the position of the circle
        this.position = newPosition;
    
        // Update the AABB position by adding the same delta values
        this.aabb.min.x += deltaX;
        this.aabb.min.y += deltaY;
        this.aabb.max.x += deltaX;
        this.aabb.max.y += deltaY;

        
    }
}