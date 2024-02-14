import {Renderer} from './renderer.js';
import {Circle} from './circle.js';
import {Rect} from './rect.js';
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

let shapeSelected = 'r';
const circleButton = document.getElementById("c");
const rectButton = document.getElementById("r");
circleButton.onclick = function() {
    shapeSelected = 'c';
};
rectButton.onclick = function() {
    shapeSelected = 'r';
};

const objects = []; //array (list of things)
let shapeBeingMade = null;

//MAIN LOOP
function updateAndDraw() {

      //make objects
      if (inp.inputs.lclick && shapeBeingMade == null) {
        //lesson 03 - make rectangles with mouse
        if (shapeSelected == 'c') {
            shapeBeingMade = new Circle(inp.inputs.mouse.position.clone(), SMALLEST_RADIUS, 0);
        } else if (shapeSelected == 'r') {
            shapeBeingMade = new Rect(inp.inputs.mouse.position.clone(), SMALLEST_RADIUS*2, SMALLEST_RADIUS*2);
        }
        
    }
    //adjust radius
    if (inp.inputs.lclick && shapeBeingMade instanceof Circle) {
        const selectedRadius = shapeBeingMade.position.clone().subtract(inp.inputs.mouse.position).magnitude();
        shapeBeingMade.radius = selectedRadius < SMALLEST_RADIUS ? shapeBeingMade.radius : selectedRadius;
    } 
    //lesson 03 - adjust rectangle
    else if (inp.inputs.lclick && shapeBeingMade instanceof Rect) {
        const selectionVector = shapeBeingMade.position.clone().subtract(inp.inputs.mouse.position).absolute();
        shapeBeingMade.width = selectionVector.x > SMALLEST_RADIUS ? selectionVector.x * 2 : SMALLEST_RADIUS * 2;
        shapeBeingMade.height = selectionVector.y > SMALLEST_RADIUS ? selectionVector.y * 2 : SMALLEST_RADIUS * 2;
    }

    //add objects
    if (shapeBeingMade && !inp.inputs.lclick) {
        addObject(shapeBeingMade); //push means add to the array "objects"
        shapeBeingMade = null;
    }

     //move objects with mouse
     if(!inp.inputs.lclick && inp.inputs.rclick && !inp.inputs.mouse.movedObject) {
        const closestObject = findClosestObject(objects, inp.inputs.mouse.position);
        inp.inputs.mouse.movedObject = closestObject == null ? null : closestObject;

    for(let i=0; i<objects.length; i++) {
        objects[i].updateShape(dt);
    }
    
    if(inp.inputs.mouse.movedObject) {
        moveObjectWithMouse(inp.inputs.mouse.movedObject);

    if(!inp.inputs.rclick || inp.inputs.lclick) {
        inp.inputs.mouse.movedObject = null;

    //draw objects
    renderer.clearFrame();
    renderer.drawFrame(objects, fillCol, bordCol);
    //draw shape
    if (shapeBeingMade) {   //an if statement - test contion in (), if it is met, run the code in {}
        renderer.drawCircle(shapeBeingMade, bordCol, null);
    }

}
let renderInterval = setInterval(updateAndDraw, 1000 / 60);
    }}}

function findClosestObject(objects, vector) {
    let closestObject = null;
    let distance;
    let lowestDistance = 30;
    for(let i=0; i<objects.length; i++) {
        distance = objects[i].shape.position.distanceTo(vector);
        if (distance < lowestDistance) {
            lowestDistance = distance;
            closestObject = objects[i];
        }
    }
    return closestObject;
}

function moveObjectWithMouse(object) {
    object.shape.position.copy(inp.inputs.mouse.position);
    object.velocity.copy(inp.inputs.mouse.velocity);
const object = new RigidBody(shape);  
objects.push(object);
} 