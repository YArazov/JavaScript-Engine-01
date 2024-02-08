import {Vec} from './vector.js';

export class RigidBody {
	constructor(shape) {
		this.shape = shape;   
		this.velocity = new Vec(100, 10);
	}

    updateShape(dt) {
        const ds = this.velocity.clone().multiply(dt);  //multiply v * dt = giving you displacement per frame
        this.shape.position.add(ds);
    }
}