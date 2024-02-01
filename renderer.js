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
    drawRect(rect, strokeColor, fillColor) {
        this.ctx.save();
        this.ctx.translate(rect.position.x, rect.position.y);
        if (fillColor) {
            this.ctx.fillStyle = fillColor;
            this.ctx.fillRect(
                - rect.width/2,
                - rect.height/2,
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
        this.ctx.restore();
    }


    clearFrame() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }//
}