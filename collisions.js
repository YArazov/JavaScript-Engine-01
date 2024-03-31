import {Circle} from './circle.js';
import {Rect} from './rect.js';
import {renderer} from './main.js';

export class Collisions {
    constructor() {
        this.collisions = [];
    }

    clearCollisions() {
        this.collisions = [];
    }

    narrowPhazeDetection(objects) {
        for (let i=0; i<objects.length; i++) {
            for (let j=0; j<objects.length; j++) {  //try j=i+1
                if(j > i) {
                    //detect collisions
                    if(objects[i].shape instanceof Circle && 
                        objects[j].shape instanceof Circle) {
                        this.detectCollisionCircleCircle(objects[i], objects[j]);
                    }   //later detect rectangle rectangle here
                    else if (objects[i].shape instanceof Circle && 
                        objects[j].shape instanceof Rect) {
                            this.detectCollisionCirclePolygon(objects[i], objects[j]); // detect collision instead of just closest vertex
                            // this.findClosestVertex(objects[j].shape.vertices, objects[i].shape.position);
                    }
                    else if (objects[i].shape instanceof Rect && 
                        objects[j].shape instanceof Circle) {
                            this.detectCollisionCirclePolygon(objects[j], objects[i]);
                            // this.findClosestVertex(objects[i].shape.vertices, objects[j].shape.position);
                    }
                }
            }
        }
    }

    detectCollisionCircleCircle(o1, o2) {   //o1 and o2 are rigidBodies from array objects in main
        const s1 = o1.shape;    //rigidBodies have shape circle or rectangle
        const s2 = o2.shape;    //shape has position and radius
        const dist = s1.position.distanceTo(s2.position);
        if (dist < s1.radius + s2.radius) {
            const overlap = s1.radius + s2.radius - dist;
            //unit vector from s1 to s2
            const normal = s2.position.clone().subtract(s1.position).normalize();   //unit vector(direction) normal(perpendicular) to contact surface
            this.collisions.push({  //object
                collidedPair: [o1, o2], //[array]
                overlap: overlap,
                normal: normal
            })
        }
    }

    //detect rectangles collisions
    detectCollisionCirclePolygon (c, p) {
        // console.log(c, p);
        const vertices = p.shape.vertices;
        const cShape = c.shape;
        let axis, overlap, normal;

        overlap = Number.MAX_VALUE;

        for (let i=0; i<vertices.length; i++) {
            const v1 = vertices[i]; //i = 0,1,2,3
            const v2 = vertices[(i+1)%vertices.length]; //1,2,3,0
            axis = v2.clone().subtract(v1).rotateCCW90().normalize();
            //we found the vector from v1 to v2, then rotated to point out of polygon, 
            //then normalized to make length 1 (unit vector)
            //find min and max projections on this axis
            const [min1, max1] = this.projectVertices(vertices, axis);
            const [min2, max2] = this.projectCircle(cShape.position, cShape.radius, axis);
            if (min1 >= max2 || min2 >= max1) {
                return; //we have separation, therefore no collision
            }

            const axisOverlap = Math.min(max2-min1, max1-min2); //find on which axis we have the smallest overlap
            if (axisOverlap < overlap) {
                overlap = axisOverlap;
                normal = axis;
            }
        }
         //also test for axis that is from the closest Vertex to the center of circle
        //find overlaps for axis from polygon closest vertex to center of circle
        const closestVertex = this.findClosestVertex(vertices, cShape.position);// finding the closest vertex
        axis = closestVertex.clone().subtract(cShape.position).normalize(); 

        const [min1, max1] = this.projectVertices(vertices, axis); //project the rectangle(polygon)
        const [min2, max2] = this.projectCircle(cShape.position, cShape.radius, axis);
        // project the circle by projecting circle position(center), circle radius, and axis
        if (min1 >= max2 || min2 >= max1) {// returns if there is no overlap and both have to be false for there to be an overlap
            return;
        }

        const axisOverlap = Math.min(max2-min1, max1-min2); // code used to find overlaps so we can relsolve them
        if (axisOverlap < overlap) {
            overlap = axisOverlap;
            normal = axis;
        }
        //set correct direction of the collision normal 
        //(direction of collision from 1st to 2nd object)
        const vec1to2 = p.shape.position.clone().subtract(c.shape.position); // finds vector from polygon to circle  
        if (normal.dot(vec1to2) < 0) { // checks if vector is in correct direction, if not, flips it
            normal.invert();
     
        }
        //add collision info
        this.collisions.push({ // push (add to end of array) collision information to collision array
            collidedPair: [c, p],// pair of objects
            overlap: overlap,// amount of overlap
            normal: normal,       //direction from c1 to c2
        });
    }
    


    projectVertices (vertices, axis) {
        let min, max;
        min = vertices[0].dot(axis);
        max = min;

        for (let i=1; i<vertices.length; i++) {
            const proj = vertices[i].dot(axis);//dot product gives us the projection
            if (proj < min) {
                min = proj;
            }
            if (proj > max) {
                max = proj;
            }
        }

        return [min, max];
    }

    projectCircle (center, radius, axis) {
        let min,max;

        const direction = axis.clone();
        const points = [
            center.clone().moveDistInDir(radius, direction),
            center.clone().moveDistInDir(-radius, direction)
        ];  //points are two points on circle along axis
        min = points[0].dot(axis);  //projection of points on axis
        max = points[1].dot(axis);
        if(min > max) {
            const t = min;
            min = max;
            max = t;    //swap min and max if they are opposite
        }
        return [min, max];
    }

    findClosestVertex (vertices, center) {  //returns the i of the closest of vertices to a center point
        let minDist = Number.MAX_VALUE;
        let vertexDist, closestVertex;
        for (let i=0; i<vertices.length; i++) {
            vertexDist = vertices[i].distanceTo(center);
            if (vertexDist < minDist) {
                minDist = vertexDist;
                closestVertex = vertices[i];
            }
        }
        renderer.renderedNextFrame.push(closestVertex);
        return closestVertex;
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