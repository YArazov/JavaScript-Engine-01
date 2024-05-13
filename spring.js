export class Springs {
    constructor(k, restLength, object1, object2) {  //k = spring stiffness
        this.k = k; // Spring constant
        this.restLength = restLength; // Rest length of the spring
        this.object1 = object1; // First object connected to the spring
        this.object2 = object2; // Second object connected to the spring
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.moveTo(this.object1.position.x, this.object1.position.y);
        ctx.lineTo(this.object2.position.x, this.object2.position.y);
        ctx.lineWidth = 2;
        ctx.stroke();
    }

    addForce() {
        // Calculate the displacement vector between the two objects
        const displacement = {
          x: this.object2.position.x - this.object1.position.x,
          y: this.object2.position.y - this.object1.position.y,
        };
    
        // Calculate the current length of the spring
        const currentLength = Math.sqrt(displacement.x ** 2 + displacement.y ** 2);
    
        // Calculate the force exerted by the spring
        const forceMagnitude = this.k * (currentLength - this.restLength);
    
        // Calculate the force components
        const forceX = (forceMagnitude / currentLength) * displacement.x;
        const forceY = (forceMagnitude / currentLength) * displacement.y;
    
        // Apply forces to the connected objects
        this.object1.applyForce({ x: forceX, y: forceY });
        this.object2.applyForce({ x: -forceX, y: -forceY });
    }
}
