import {Renderer} from './renderer.js';
import {Circle} from './circle.js';
import {Rect} from './rect.js';
import {Input} from './input.js';
import {RigidBody} from './rigidBody.js';
import {Collisions} from './collisions.js';
import {Vec} from './vector.js';

const SMALLEST_RADIUS = 10;
const dt = 1/60;    //time per frame

const canv = document.getElementById("canvas");
const ctx = canv.getContext("2d");

const renderer = new Renderer(canv, ctx);
const fillCol = "darkGray";
const bordCol = "black";

const col = new Collisions();

//inputs
const inp = new Input(canv, window, dt);
inp.resizeCanvas();
inp.addListeners();

const objects = [];
let shapeBeingMade = null;
//button variables
let shapeSelected = 'r';
const circleButton = document.getElementById("c");
const rectButton = document.getElementById("r");
circleButton.onclick = function() {
    shapeSelected = 'c';
};
rectButton.onclick = function() {
    shapeSelected = 'r';
};

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

    //add objects - lesson 03
    if (shapeBeingMade && !inp.inputs.lclick) {
        addObject(shapeBeingMade);
        shapeBeingMade = null;
    }

    //move objects with mouse
    if(!inp.inputs.lclick && inp.inputs.rclick && !inp.inputs.mouse.movedObject) {
        const closestObject = findClosestObject(objects, inp.inputs.mouse.position);
        inp.inputs.mouse.movedObject = closestObject == null ? null : closestObject;
    }
    if(!inp.inputs.rclick || inp.inputs.lclick) {
        inp.inputs.mouse.movedObject = null;
    }
    if(inp.inputs.mouse.movedObject) {
        moveObjectWithMouse(inp.inputs.mouse.movedObject);
    }

    //Lesson 03 - update object positions with velocity
    for(let i=0; i<objects.length; i++) {
        objects[i].updateShape(dt);
    }

    //COLLISIONS
    col.clearCollisions();
    col.narrowPhazeDetection(objects);  //detect all possible collisions
    col.resolveCollisions();    //push off

    //draw objects
    renderer.clearFrame();
    renderer.drawFrame(objects, fillCol, bordCol);
    //draw shape
    if (shapeBeingMade) {
        shapeBeingMade.draw(ctx, bordCol, null);
    }

    //test vectors
    const vector1 = new Vec(100, 200);
    vector1.renderOrigin = new Vec(50, 60);
    vector1.draw(ctx, "blue")

    const vector2 = new Vec(200, 200);
    vector2.renderOrigin = new Vec(50, 60);
    vector2.draw(ctx, "red")

    const sumVector1Vector2 = vector1.add(vector2);
    sumVector1Vector2.renderOrigin = new Vec(50, 60);
    sumVector1Vector2.draw(ctx, "black");
    ctx.fillText("Vector Addition", 50, 50);

    const vector3 = new Vec(150, 160);
    vector3.renderOrigin = new Vec(600, 200);
    vector3.draw(ctx, "green");

    const vector4 = new Vec(150, -160);
    vector4.renderOrigin = new Vec(600, 200);
    vector4.draw(ctx, "pink");

    const differenceVector = vector3.clone().subtract(vector4);
    differenceVector.renderOrigin = new Vec(600, 200);
    differenceVector.draw(ctx, "purple");
    ctx.fillText("Vector subtraction", 600, 180);

    const multiplyVector = vector3.clone().multiply(vector4);
    multiplyVector.renderOrigin = new Vec(400, 200);
    multiplyVector.draw(ctx, "red");
    ctx.fillText("Vector multiplication", 800, 180);

    const divideVector = vector3.divide(vector4);
    divideVector.renderOrigin = new Vec(600, 200);
    divideVector.draw(ctx, "purple");
    ctx.fillText("Vector division", 700, 180);
}
let renderInterval = setInterval(updateAndDraw, 1000 / 60);

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
}

function addObject(shape) {
    const object = new RigidBody(shape);  
    objects.push(object);
} 

let score = 0;
let studentName = "Kentaro";
switch (studentName) {
    case "Seikoh": score = 100; break;
    case "Darya": score = 99; break;
    case "Kentaro": score = 100; break;
    default: score = 0;
}
console.log(score);

let grade;

// switch (true) {
//     case (score >= 90): grade = "A"; break;
//     case (score >= 80): grade = "B"; break;
//     case (score >= 70): grade = "C"; break;
//     case (score >= 60): grade = "D"; break;
//     default: grade = "F";
// }
// console.log(grade);

switch (true) {
    case (score < 60): grade = "F"; break;
    case (score < 70): grade = "D"; break;
    case (score < 80): grade = "C"; break;
    case (score < 90): grade = "B"; break;
    case (score < 100): grade = "A"; break;
    default: grade = "A";
}
console.log(grade);
