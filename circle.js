import {Aabb} from './aabb.js';

export class Circle {
	constructor(pos, r) {
		this.position = pos
		this.radius = r;
        this.orientation = 0;
        this.aabb = new Aabb();
	}

    updateAabb () {
        this.vertices = [];
        this.aabb.min.x = this.position.x - this.radius;
        this.aabb.min.y = this.position.y - this.radius;
        this.aabb.max.x = this.position.x + this.radius;
        this.aabb.max.y = this.position.y + this.radius;
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
    }
}