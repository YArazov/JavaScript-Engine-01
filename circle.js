import {Vec} from './vector.js';
import {Aabb} from './aabb.js';

export class Circle {
	constructor(pos, r, fillColor, strokeColor) {
		this.position = pos;
        this.orientation = 0;
        
		this.radius = r;
        this.aabb = new Aabb(new Vec(0,0),new Vec(0,0));

        this.fillColor = fillColor;
        this.strokeColor = strokeColor;
	}

    calculateMass(density) {
        const area = Math.PI * this.radius * this.radius;
        return area * density;
    }

    calculateInertia(mass) {
        let inertia = 0.5 * mass * this.radius * this.radius;  //1/2 M R ^2
        return inertia;
    }

    updateAabb() {
        this.aabb.min = this.position.clone().subtractX(this.radius).subtractY(this.radius);
        this.aabb.max = this.position.clone().addX(this.radius).addY(this.radius);
    }

	draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI*2, true);
        ctx.closePath();
        if (this.fillColor) {
            ctx.fillStyle = this.fillColor;
            ctx.fill();
        }
        if (this.strokeColor){
        ctx.strokeStyle = this.strokeColor;
        ctx.lineWidth = 3;
        ctx.stroke();
        }
    }
}	