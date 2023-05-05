let Engine = Matter.Engine,
    // Render = Matter.Render,
    Runner = Matter.Runner,
    Bodies = Matter.Bodies,
    World = Matter.World;

let engine = Engine.create();
let runner = Runner.create();
let world = engine.world;

let box = [];



function setup(){
    createCanvas(windowWidth, windowHeight);
    
    rectMode(CENTER);
    Runner.run(runner,engine);
    
}

function Boxes(x,y,w,h){
    this.w = w;
    this.h = h;
    //Create a rectangle starts x,y - width w - height h
    this.body = Bodies.rectangle(x,y,w,h);

    //Add to physical world
    World.add(world,this.body);

    this.show = function () {
        let pos = this.body.position;
        let angle = this.body.angle;
        push();
        translate(pos.x,pos.y);
        //Draw a rectangle with this.body.position.x and this.body.position.y
        rect(0,0,this.w,this.h);
        pop();
    }
}

function mousePressed(){
    box.push(new Boxes(mouseX,mouseY,80,80));
}

function draw(){
    background(220);
    // Loops through the array of boxes and show the objects
    for(let i = 0; i < box.length; i++){
        //Called show() since declare as a function
        box[i].show();
    }
}

