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
        
    }
}