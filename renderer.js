import {Circle} from './circle.js';
import {Rect} from './rect.js';

export class Renderer {
    constructor(canv, ctx) {
        this.canvas = canv;
        this.ctx = ctx;
    }
    
    drawFrame(objects, fillCol, bordCol) {
        for (let i = 0; i<objects.length; i++) {
            objects[i].shape.draw(this.ctx, fillCol, bordCol);
            objects[i].shape.aabb.draw(this.ctx, "red");
            objects[i].shape.vertices.forEach(vertex => {
                vertex.drawPoint(this.ctx, "black");
            });
        } 
    }

    clearFrame() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    
}