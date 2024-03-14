import {Vec} from './vector.js';
export class VectorDrawer {
    constructor(canvas, ctx) {
        this.canvas = canvas;
        this.ctx = ctx;
    }

    // Draw vectors and their operations
    
    drawVectorAdding() {
        // Define vectors for addition operation
        const addVector1 = new Vec(100, 200);
        addVector1.renderOrigin = new Vec(0, 0);
        addVector1.draw(this.ctx, "blue");

        const addVector2 = new Vec(250, 200);
        addVector2.renderOrigin = new Vec(0, 0);
        addVector2.draw(this.ctx, "red");

        const addSumVector = addVector1.add(addVector2);
        addSumVector.renderOrigin = new Vec(0, 0);
        addSumVector.draw(this.ctx, "black");

        // Draw bounding box around related vectors
        this.drawBoundingBox([addVector1, addVector2, addSumVector], "Addition", 80, 180);
    }
    drawVectorSubtracting() {
        const subVector1 = new Vec(100, 300);
        subVector1.renderOrigin = new Vec(0, 0);
        subVector1.draw(this.ctx, "green");
        
        const subVector2 = new Vec(250, 300);
        subVector2.renderOrigin = new Vec(0, 0);
        subVector2.draw(this.ctx, "orange");
        
        const subDifferenceVector = subVector1.clone().subtract(subVector2);
        subDifferenceVector.renderOrigin = new Vec(0, 0);
        subDifferenceVector.draw(this.ctx, "purple");
        
        // Draw bounding box around related vectors
        this.drawBoundingBox([subVector1, subVector2, subDifferenceVector], "Subtraction", 80, 180);
    }
    drawVectorMultiplying() {
        const mulVector = new Vec(100, 400);
        mulVector.renderOrigin = new Vec(0, 0);
        mulVector.draw(this.ctx, "cyan");
        
        const multipliedVector = mulVector.clone().multiply(2);
        multipliedVector.renderOrigin = new Vec(0, 0);
        multipliedVector.draw(this.ctx, "magenta");
        
        // Draw bounding box around related vectors
        this.drawBoundingBox([mulVector, multipliedVector], "Multiplication", 80, 180);
    }
    drawVectorRotating() {
        const rotVector = new Vec(100, 500);
        rotVector.renderOrigin = new Vec(0, 0);
        rotVector.draw(this.ctx, "yellow");
        
        const rotatedVector = rotVector.clone().rotate(Math.PI / 2);
        rotatedVector.renderOrigin = new Vec(0, 0);
        rotatedVector.draw(this.ctx, "brown");
        
        // Draw bounding box around related vectors
        this.drawBoundingBox([rotVector, rotatedVector], "Rotation", 80, 180);
    }

    // Draw bounding box around related vectors and add title
    drawBoundingBox(vectors, title, x, y) {
        let minX = Number.MAX_VALUE;
        let minY = Number.MAX_VALUE;
        let maxX = Number.MIN_VALUE;
        let maxY = Number.MIN_VALUE;

        vectors.forEach(vector => {
            minX = Math.min(minX, vector.x);
            minY = Math.min(minY, vector.y);
            maxX = Math.max(maxX, vector.x);
            maxY = Math.max(maxY, vector.y);
        });

        const padding = 10;

        this.ctx.strokeStyle = "green";
        this.ctx.lineWidth = 1;
        this.ctx.strokeRect(minX - padding, minY - padding, maxX - minX + 2 * padding, maxY - minY + 2 * padding);

        // Draw title
        this.ctx.font = "14px Arial";
        this.ctx.fillStyle = "black";
        this.ctx.fillText(title, x, y);
    }
}
