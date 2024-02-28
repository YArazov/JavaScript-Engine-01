import {Circle} from './circle.js';
import {Rect} from './rect.js';

export class Collisions {
	constructor(x, y) {
		this.collisions = [];
		
	} 
    clearCollisions(){
        this.collisions = [];
    }
    narrowPhaseDetection(objects){
        for(let i=0; i<objects.length; i++){
            for(let j=0; j<objects.length; j++){
            if(j>i){
                //detect collisions
                //circle collisions
                if(objects[i].shape instanceof Circle && 
                    objects[j].shape instanceof Circle){
                        this.detectCollisionCircleCircle(objects[i],objects[j]);
                    }
                //rectangle collisions
                else if (objects[i].shape instanceof Rect && objects[j].shape instanceof Rect){
                    this.detectCollisionRectangleRectangle(objects[i], objects[j]);
            }
            } 
        }}
    }
    detectCollisionCircleCircle(o1,o2){
        const s1 = o1.shape;
        const s2 = o2.shape;
        const dist = s1.position.distanceTo(s2.position);
        if(dist < s1.radius + s2.radius){//circle collision
            const overlap = s1.radius + s2.radius - dist;
            const normal = s2.position.clone().subtract(s1.position).normalize();
            this.collisions.push({
                collidedPair:[o1,o2],
                overlap: overlap,
                normal: normal//unit vector from s1 to s2
            });
        }
    }

    pushOffObjects(o1,o2, overlap, normal){
    
        if (o1.shape.position && o2.shape.position) {
            o1.shape.position.subtract(normal.clone().multiply(overlap / 2));
            o2.shape.position.add(normal.clone().multiply(overlap / 2));
          }
    }
    resolveCollisions() {
        let collidedPair, overlap, normal, o1, o2;
        for(let i= 0; i< this.collisions.length; i++){
            ({collidedPair, overlap, normal}= this.collisions[i]);
            [o1,o2] = collidedPair;
            if(o1 instanceof Circle && o2 instanceof Circle){
            this.pushOffObjects(o1, o2, overlap, normal);}
        }
    }
    detectCollisionRectangleRectangle(o1, o2) {
        const r1 = o1.shape;
        const r2 = o2.shape;

        // Check if the rectangles overlap
        if (r1.position.x < r2.position.x + r2.width &&
            r1.position.x + r1.width > r2.position.x &&
            r1.position.y < r2.position.y + r2.height &&
            r1.position.y + r1.height > r2.position.y) { 
                console.log("true");

            // Calculate overlap along x-axis and y-axis
            const overlapX = Math.min(r1.position.x + r1.width, r2.position.x + r2.width) - Math.max(r1.position.x, r2.position.x);
            const overlapY = Math.min(r1.position.y + r1.height, r2.position.y + r2.height) - Math.max(r1.position.y, r2.position.y);
            const overlap = Math.min(overlapX, overlapY);
            
            this.collisions.push({
                collidedPair: [o1, o2],
                overlap: overlap,
                normal: undefined // This will need to be updated later
            });
            
        }
    }
    }
