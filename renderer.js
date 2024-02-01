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

    clearFrame() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }//
}