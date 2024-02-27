import {Circle} from './circle.js';
import {Rect} from './rect.js';

export class Collisions {
	constructor(x, y) {
		this.collisions = [];
	}

    clearCollisions() {
        this.collisions = [];
    }

    narrowPhazeDetection(objects) {
        for(let i=0; i<objects.length; i++) {
            for(let j=0; j<objects.length; j++) {
                if(j>i) {
                    //detect collisions
                    //circle collisions
                    if(objects[i].shape instanceof Circle &&
                        objects[j].shape instanceof Circle) {
                        this.detectCollisionCircleCircle(objects[i], objects[j]);
                    }
                    //rectangle collisions
                    if(objects[i].shape instanceof Rect &&
                        objects[j].shape instanceof Rect) {
                        this.detectCollisionRectRect(objects[i], objects[j]);
                    }
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

    detectCollisionRectRect(o1, o2) {
        const s1 = o1.shape;
        const s2 = o2.shape;
        const dist = s1.position.distanceTo(s2.position);
        s1.left = s1.position.x - s1.width / 2;
        s1.right = s1.position.x + s1.width / 2;
        s1.top = s1.position.y - s1.height / 2;
        s1.bottom = s1.position.y + s1.height / 2;
         s2.left = s2.position.x - s2.width / 2;
        s2.right = s2.position.x + s2.width / 2;
        s2.top = s2.position.y - s2.height / 2;
        s2.bottom = s2.position.y + s2.height / 2;
        if (s1.left < s2.right &&
            s1.right > s2.left &&
            s1.top < s2.bottom &&
            s1.bottom > s2.top) {
            // The rectangles are colliding
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
        let collidedPair, overlap, normal, o1, o2;
        for(let i=0; i<this.collisions.length; i++) {
            ({collidedPair, overlap, normal} = this.collisions[i]);
        [o1, o2] = collidedPair;
        this.pushOffObjects(o1, o2, overlap, normal);
        }
    }
    
}
