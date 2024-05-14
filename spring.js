import {Vec} from './vector.js';

export class Springs {
    constructor(k, restLength, object1, object2) {  //k = spring stiffness
        this.k = k; // Spring constant
        this.restLength = restLength; // Rest length of the spring
        this.object1 = object1; // First object connected to the spring
        this.object2 = object2; // Second object connected to the spring
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.moveTo(this.object1.shape.position.x, this.object1.shape.position.y);
        ctx.lineTo(this.object2.shape.position.x, this.object2.shape.position.y);
        ctx.lineWidth = 2;
        ctx.strokeStyle = 'black';
        ctx.stroke();
    }

    addForce(dt) {
        // Calculate the displacement vector between the two objects
        const displacement = {
          x: this.object2.shape.position.x - this.object1.shape.position.x,
          y: this.object2.shape.position.y - this.object1.shape.position.y,
        };
    
        // Calculate the current length of the spring
        const currentLength = Math.sqrt(displacement.x ** 2 + displacement.y ** 2);
    
        // Calculate the force exerted by the spring
        const forceMagnitude = this.k * (currentLength - this.restLength);
    
        // Calculate the force components
        const forceX = (forceMagnitude / currentLength) * displacement.x;
        const forceY = (forceMagnitude / currentLength) * displacement.y;
        const force = new Vec(forceX, forceY);
        console.log(force.clone().divide(this.object1.mass));
        // Apply forces to the connected objects
        this.object1.velocity.add(force.clone().multiply(dt / this.object1.mass));
        this.object2.velocity.subtract(force.clone().multiply(dt / this.object2.mass));
        // this.object1.applyForce({ x: forceX, y: forceY });
        // this.object2.applyForce({ x: -forceX, y: -forceY });
    }
}
