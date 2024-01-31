import {Renderer} from './renderer.js';
import {Circle} from './circle.js';

const canv = document.getElementById("canvas");
const ctx = canv.getContext("2d");

const renderer = new Renderer(canv, ctx);   //objects and classes
//new rederer creates a new object instance of the class Renderer, it inherits all the functionlaity of Renderer class
//MAIN LOOP
function updateAndDraw() {

    //make objects
    const circle = new Circle({x: 50, y: 60}, 10, 0);
    //draw objects
    renderer.clearFrame();
    renderer.drawCircle(circle, "black");
renderer.drawRect();    //calling the method, using it
}
let renderInterval = setInterval(updateAndDraw, 1000 / 60);