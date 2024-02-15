import {Vec} from './vector.js';

export class Input {
    constructor(canv, win, dt) {
        this.canv = canv;
        this.window = win;
        this.dt = dt;
        this.inputs = {
            mouse: {position: new Vec(0, 0), velocity: new Vec(0, 0), movedObject: null, dragStart: new Vec(0, 0),dragStartTime: 0,}, 
            lclick: false, rclick: false, space: false, touches: 0
        };
        
        this.mouseDown = this.mouseDown.bind(this);
        this.mouseUp = this.mouseUp.bind(this);
        this.onContextMenu = this.onContextMenu.bind(this);
        this.mouseMove = this.mouseMove.bind(this);
        this.resizeCanvas = this.resizeCanvas.bind(this);
    }

    addListeners() {
        this.canv.addEventListener("mousedown", this.mouseDown);
        this.canv.addEventListener("mouseup", this.mouseUp);
        this.canv.addEventListener('contextmenu', this.onContextMenu);
        this.canv.addEventListener('mousemove', this.mouseMove);
        this.window.addEventListener('resize', this.resizeCanvas, false);
    }

    mouseDown(e) {
        if (e.button==0) {
            this.inputs.lclick = true;
            const clickedObject = findClosestObject(objects, this.inputs.mouse.position);
            if (clickedObject) {
                this.inputs.mouse.movedObject = clickedObject;
                this.inputs.mouse.dragStart = this.inputs.mouse.position.clone();
                this.inputs.mouse.dragStartTime = Date.now();
            }
        } else if (e.button==2)	{
            this.inputs.rclick = true;
        }
    }

    mouseUp(e) {
        if (e.button==0) {
            this.inputs.lclick = false;
            if (this.inputs.mouse.movedObject) {
                const dt = Date.now() - this.inputs.mouse.dragStartTime;
                const vx = (this.inputs.mouse.position.x - this.inputs.mouse.dragStart.x) / dt;
                const vy = (this.inputs.mouse.position.y - this.inputs.mouse.dragStart.y) / dt;

                this.inputs.mouse.movedObject.velocity = new Vec(vx, vy);
                this.inputs.mouse.movedObject = null;
            }
        } else if (e.button==2)	{
            this.inputs.rclick = false;
        }
    }
    
    onContextMenu(e) {
        e.preventDefault();
    }

    mouseMove(e) {
        this.window.clearTimeout(this.inputs.mouseTimer);

        const x = e.pageX - this.canv.offsetLeft;
        const y = e.pageY - this.canv.offsetTop;

        const dx = x - this.inputs.mouse.position.x;
        const dy = y - this.inputs.mouse.position.y;
        this.inputs.mouse.velocity.x = dx / this.dt;
        this.inputs.mouse.velocity.y = dy / this.dt;

        this.inputs.mouse.position.x = x;
        this.inputs.mouse.position.y = y;
        
        if (this.inputs.mouse.movedObject) {
            this.inputs.mouse.movedObject.position = this.inputs.mouse.position.clone();
        }
        
        this.inputs.mouseTimer = this.window.setTimeout(function () {
            this.inputs.mouse.velocity.x = 0; 
            this.inputs.mouse.velocity.y = 0;
        }.bind(this), 100);
    }

    resizeCanvas() {
        this.canv.width = this.window.innerWidth;
        this.canv.height = this.window.innerHeight;
    }
}