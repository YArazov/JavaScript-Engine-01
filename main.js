import {Renderer} from './renderer.js';
import {Circle} from './circle.js';
import {Input} from './input.js';
import {RigidBody} from './rigidBody.js';

const SMALLEST_RADIUS = 10;
const dt = 1/60;

const canv = document.getElementById("canvas");
const ctx = canv.getContext("2d");

const renderer = new Renderer(canv, ctx);
const fillCol = "darkGray";
const bordCol = "black";

//inputs
const inp = new Input(canv, window, dt);
inp.resizeCanvas();
inp.addListeners();

const objects = []; //array (list of things)
let shapeBeingMade = null;

//MAIN LOOP
function updateAndDraw() {

    //make objects
    if (inp.inputs.lclick && shapeBeingMade == null) {
        shapeBeingMade = new Circle(inp.inputs.mouse.position.clone(), SMALLEST_RADIUS, 0);
    }
    if (inp.inputs.lclick && shapeBeingMade) {
        const selectedRadius = shapeBeingMade.position.clone().subtract(inp.inputs.mouse.position).magnitude();
        shapeBeingMade.radius = selectedRadius < SMALLEST_RADIUS ? shapeBeingMade.radius : selectedRadius;
    }

    //add objects
    if (shapeBeingMade && !inp.inputs.lclick) {
        addObject(shapeBeingMade); //push means add to the array "objects"
        shapeBeingMade = null;
    }

    for(let i=0; i<objects.length; i++) {
        objects[i].updateShape(dt);
    }
    
    //draw objects
    renderer.clearFrame();
    renderer.drawFrame(objects, fillCol, bordCol);
    //draw shape
    if (shapeBeingMade) {   //an if statement - test contion in (), if it is met, run the code in {}
        renderer.drawCircle(shapeBeingMade, bordCol, null);
    }

}
let renderInterval = setInterval(updateAndDraw, 1000 / 60);

function addObject(shape) {
    const object = new RigidBody(shape);  
    objects.push(object);
}

        //Assignment 3
        document.addEventListener('mousedown', function(event) {
            if (event.button == 2) {
                for (let i = 0; i < objects.length; i++) {
                    // calculate distance between mouse and objects[i]
                    if (distance < threshold) {
                        closestObject = objects[i];
                    }
                }
            }
        } );
        function calculateDistance(x1, y1, x2, y2) {
            // calculate and return the distance
            return Math.sqrt((x2-x1)**2 + (y2-y1)**2);
        }