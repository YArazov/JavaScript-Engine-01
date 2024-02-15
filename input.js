import {Vec} from './vector.js';

export class Input {
    constructor(canv, win, dt) {
        this.canv = canv;
        this.window = win;
        this.dt = dt;
        //here we will store the inputs including left click and position of mouse
        this.inputs = {mouse: {position: new Vec(0, 0), velocity: new Vec(0, 0)}, lclick: false, rclick: false, space: false, touches: 0};
        
        //ignore this code
        this.mouseDown = this.mouseDown.bind(this);
        this.mouseUp = this.mouseUp.bind(this);
        this.onContextMenu = this.onContextMenu.bind(this);
        this.mouseMove = this.mouseMove.bind(this);
        this.resizeCanvas = this.resizeCanvas.bind(this);
    }

    addListeners() {    //in one method, add all listeners - listen for the user's input, if detected run functions
        this.canv.addEventListener("mousedown", this.mouseDown);    //mouse down listens for mouse button pressed 
        this.canv.addEventListener("mouseup", this.mouseUp);    //mouseUp listens for releasing the m button
        this.canv.addEventListener('contextmenu', this.onContextMenu);  //context menu appears when we r click
        this.canv.addEventListener('mousemove', this.mouseMove);    //1st input - type of listener, 2nd input - function you run
        this.window.addEventListener('resize', this.resizeCanvas, false);
    }

    mouseDown(e) {
        if (e.button==0) {
            this.inputs.lclick = true;
            
        } else if (e.button==2)	{
            this.inputs.rclick = true;
        }
    }

    mouseUp(e) {
        if (e.button==0) {
            this.inputs.lclick = false;
        } else if (e.button==2)	{
            this.inputs.rclick = false;
        }
    }
    
    onContextMenu(e) {
        e.preventDefault(); //default is bring up the context menu when you r click
    }

    mouseMove(e) {
        this.window.clearTimeout(this.inputs.mouseTimer);

        const x = e.pageX - this.canv.offsetLeft;   //calculate the position of the mouse
        const y = e.pageY - this.canv.offsetTop;
        const dx = x - this.inputs.mouse.position.x;
        const dy = y - this.inputs.mouse.position.y;
        this.inputs.mouse.position.x = x;   //store the new position of the mouse when it moves
        this.inputs.mouse.position.y = y;
        this.inputs.mouse.velocity.x = dx / this.dt;
        this.inputs.mouse.velocity.y = dy / this.dt;
        this.inputs.mouseTimer = this.window.setTimeout(function () {
            this.inputs.mouse.velocity.x = 0; 
            this.inputs.mouse.velocity.y = 0;
        }.bind(this), 100);
    }

    resizeCanvas() {
    }

    resizeCanvas() {
        this.canv.width = this.window.innerWidth;
        this.canv.height = this.window.innerHeight;
    }
}