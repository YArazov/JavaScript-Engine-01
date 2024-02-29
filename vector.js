export class Vec {
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}
    //chainable methods
	copy (v) {	//copy the xy of another vector into this
		this.x = v.x;
		this.y = v.y;
		return this;
	}
	
	setX(s) {	
		this.x = s;
		return this;
	}

	setY(s) {	
		this.y = s;
		return this;
	}

	add (v) {		//add a vector to this
		this.x += v.x;
		this.y += v.y;
		return this;
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

	absolute() {
		this.x = Math.abs(this.x);
		this.y = Math.abs(this.y);
		return this;
	}

	normalize() {
		const length = this.magnitude();
		if (length > 0) {	
			this.x /= length;
			this.y /= length;
		}
		return this;
	}
	
	rotate (angle) {		//rotate CCW by angle
		const x = this.x;
		const y = this.y;
		this.x = x * Math.cos(angle) - y * Math.sin(angle);
		this.y = x * Math.sin(angle) + y * Math.cos(angle);
		return this;
	}

	//non-chainable
	clone () {	//create a new vector with xy of this
		return new Vec(this.x, this.y);
	}

    magnitude () {
		return Math.sqrt(this.x * this.x + this.y * this.y);
	}

	distanceTo (v) {
		return this.clone().subtract(v).magnitude();
	}

	drawPoint(ctx, strokeColor) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, 5, 0, Math.PI*2, true);	//radius 5
        ctx.closePath();
        ctx.strokeStyle = strokeColor;
        ctx.stroke();
    }
}

