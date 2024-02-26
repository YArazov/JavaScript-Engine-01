import { Circle } from "./circle";
export class Collisions {
	constructor(x, y) {
		this.collisions = [];
	}

    clearCollisions() {
        this.collisions = [];
    }

    narrowPhazeDetection(objects) {
        for(let i=0; i<objects.length; i++) {
            for(let j=0; i<objects.length; j++) {
                if(j>i) {
                    //detect collisions
                    //circle collisions
                    if(object[i].shape instanceof Circle &&
                        object[j].shape instanceof Circle) {
                            this.detectCollisionCircleCircle(object[i], object[j]);
                        }
                    //rectangle collisions
                }
            }
        }
    }
    detectCollisionCircleCircle(o1, o2) {
        const s1 = o1.shape;
        const s2 = o2.shape;
        const dist = s1.position.distanceTo(s2.position);
        if (dist < s1.radius + s2.radius) { //the circles collide
            const overlap = s1.radius + s2.radius - dist;
            const normal = s2.position.clone().subtract(s1.position).normalize();
            this.collisions.push({
                collidedPair: [o1, o2],
                overlap: overlap,
                normal: normal  //unit vector from s1 to s2
            });
        }
    }

    pushOffObjects(o1, o2, overlap, normal) {
        o1.shape.position.subtract(normal.clone().multiply(overlap/2));
        o2.shape.position.add(normal.clone().multiply(overlap/2));
    }

    resolveCollisions() {

    }
}