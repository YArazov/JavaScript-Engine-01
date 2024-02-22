export class Collisions {
	constructor(x, y) {
		this.collisions = [];
		
	} 
    clearCollisions(){
        this.collisions = [];
    }
    narrowPhaseDetection(objects){
        for(let i=0; i<objects.length; i++){
            for(let j=0; i<objects.length; j++){
            if(j>i){
                //detect collisions
                //circle collisions
                if(objects[i].shape instanceof Circle && 
                    objects[j].shape instanceof Circle){
                        detectCollisionCircleCircle(objects[i],objects[j]);
                    }
                //rectangle collisions

            }
            } 
        }
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
                normal: normal
            });
        }
    }
}