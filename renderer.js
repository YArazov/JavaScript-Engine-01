export class Renderer {
    constructor(canv, ctx, objects) {
        this.canvas = canv;
        this.ctx = ctx;
        this.objects = objects;
    }

    drawCircle(circle, strokeColor, fillColor) {    //classes and methods
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

    drawRect() {    //declaring a method, not using it here
        
      
          this.ctx.fillRect(25, 25, 100, 100);
         this.ctx.clearRect(45, 45, 60, 60);
          this.ctx.strokeRect(50, 50, 50, 50);
    
      }
      

    clearFrame() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}
