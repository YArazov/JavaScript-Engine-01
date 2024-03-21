import {Vec} from './vector.js';
export class VectorDrawer {
    constructor(canvas, ctx) {
        this.canvas = canvas;
        this.ctx = ctx;
    }

    // Draw vectors and their operations
    
    drawVectorAdding() {
        // Define vectors for addition operation
        const addVector1 = new Vec(70, 80);
        addVector1.renderOrigin = new Vec(200, 300);
        addVector1.draw(this.ctx, "blue");

        const addVector2 = new Vec(50, 200);
        addVector2.renderOrigin = new Vec(150, 100);
        addVector2.draw(this.ctx, "red");

        const addSumVector = addVector1.add(addVector2);
        addSumVector.renderOrigin = new Vec(150, 100);
        addSumVector.draw(this.ctx, "black");

        // Draw bounding box around related vectors
        this.drawBoundingBox([addVector1, addVector2, addSumVector], "Addition", 180, 80);
    }
    drawVectorSubtracting() {
        const subVector1 = new Vec(30, 100);
        subVector1.renderOrigin = new Vec(380, 100);
        subVector1.draw(this.ctx, "blue");
        
        const subVector2 = new Vec(60, 90);
        subVector2.renderOrigin = new Vec(380, 100);
        subVector2.draw(this.ctx, "red");
        
        const subDifferenceVector = subVector1.clone().subtract(subVector2);
        subDifferenceVector.renderOrigin = new Vec(410, 200);
        subDifferenceVector.draw(this.ctx, "black");
        
        // Draw bounding box around related vectors
        this.drawBoundingBox([subVector1, subVector2, subDifferenceVector], "Subtraction", 380, 80);
    }
    drawVectorMultiplying() {
        const mulVector = new Vec(10, 20);
        mulVector.renderOrigin = new Vec(580, 100);
        mulVector.draw(this.ctx, "blue");
        
        const multipliedVector = mulVector.clone().multiply(2);
        multipliedVector.renderOrigin = new Vec(580, 100);
        multipliedVector.draw(this.ctx, "black");
        
        // Draw bounding box around related vectors
        this.drawBoundingBox([mulVector, multipliedVector], "Multiplication", 580, 80);
    }
    drawVectorRotating() {
        const rotVector = new Vec(40, 40);
        rotVector.renderOrigin = new Vec(760, 100);
        rotVector.draw(this.ctx, "red");
        
        const rotatedVector = rotVector.clone().rotate(Math.PI / 2);
        rotatedVector.renderOrigin = new Vec(760, 100);
        rotatedVector.draw(this.ctx, "black");
        
        // Draw bounding box around related vectors
        this.drawBoundingBox([rotVector, rotatedVector], "Rotation", 780, 80);
    }

    // Draw bounding box around related vectors and add title
    drawBoundingBox(vectors, title, x, y) {
        let minX = Number.MAX_VALUE;
        let minY = Number.MAX_VALUE;
        let maxX = Number.MIN_VALUE;
        let maxY = Number.MIN_VALUE;

        vectors.forEach(vector => {
            minX = Math.min(minX, vector.x + vector.renderOrigin.x);
            minY = Math.min(minY, vector.y + vector.renderOrigin.y);
            maxX = Math.max(maxX, vector.x + vector.renderOrigin.x + vector.width);
            maxY = Math.max(maxY, vector.y + vector.renderOrigin.y + vector.height);
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
