export class Renderer {
    constructor(canv, ctx, objects) {
        this.canvas = canv;
        this.ctx = ctx;
        this.objects = objects;
    }

    drawCircle(circle, strokeColor, fillColor) {
        this.ctx.beginPath();
        this.ctx.arc(circle.position.x, circle.position.y, circle.radius, 0, Math.PI*2, true);
        this.ctx.closePath();
        if (fillColor) {
            this.ctx.fillStyle = fillColor;
            this.ctx.fill();
        }
        this.ctx.strokeStyle = strokeColor;
        this.ctx.lineWidth = 3;
        this.ctx.stroke();
    }

    drawRect(rect, strokeColor, fillColor) {    //in () we have the input
        this.ctx.save();  //save the canvas origin and state          //inside {} we have code we can execute
        this.ctx.translate(rect.position.x, rect.position.y);   //translate the canvas to position of rectangle
        if (fillColor) {
            this.ctx.fillStyle = fillColor; //set colors
            this.ctx.fillRect(
                - rect.width/2, //start top left corner at half of width left of postion 
                - rect.height/2,    //up half height
                rect.width,
                rect.height,
            );
        }
        this.ctx.strokeStyle = strokeColor;
        this.ctx.lineWidth = 3;
        this.ctx.strokeRect(
            - rect.width/2,
            - rect.height/2,
            rect.width,
            rect.height,
        );
        this.ctx.restore(); //restore the canvas origin to the state that we saved earlier
    }

    drawFrame(objects, fillCol, bordCol) {
        //for loops - repeat the code a number of times
        //use the counter i, after every interation, i++ means add +1 to i, 
        //i<objects.length is condition for running the loop
        //if i becomes >= to the length of the objects array stop drawing
        for (let i = 0; i<objects.length; i++) {    
            this.drawCircle(objects[i].shape, bordCol, fillCol);
        } 
    }

    clearFrame() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}