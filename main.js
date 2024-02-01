import {Renderer} from './renderer.js';
import {Circle} from './circle.js';

const canv = document.getElementById("canvas");
const ctx = canv.getContext("2d");

const renderer = new Renderer(canv, ctx);

//MAIN LOOP
function updateAndDraw() {

    //make objects
    const circle = new Circle({x: 50, y: 60}, 10, 0);
    //draw objects
    renderer.clearFrame();
    renderer.drawCircle(circle, "black");
    renderer.drawRect({position: {x: 70, y: 90}, width: 50, height: 100}, "blue", "green"); //command-z undo, command-s save


}
let renderInterval = setInterval(updateAndDraw, 1000 / 60);
