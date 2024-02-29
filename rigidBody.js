import {Vec} from './vector.js';

export class RigidBody {
	constructor(shape) {
		this.shape = shape;   //rect or circle obj
		this.velocity = new Vec(0, 0);
		this.angularVelocity = 2;
	}	

	updateShape(dt) {
		const ds = this.velocity.clone().multiply(dt);  //multiply v * dt = giving you displacement per frame
		this.shape.position.add(ds);
		this.shape.orientation += this.angularVelocity * dt;
    } 

}