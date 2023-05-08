let Engine = Matter.Engine,
    // Render = Matter.Render,
    Runner = Matter.Runner,
    Bodies = Matter.Bodies,
    World = Matter.World;

let engine = Engine.create();
let runner = Runner.create({wireframes:false});
let world = engine.world;

let box = [];



function setup(){
    createCanvas(windowWidth, windowHeight);
    
    rectMode(CENTER);
    Runner.run(runner,engine);
    let options = {
        isStatic: true,
    }
    ground = Bodies.rectangle(windowWidth/2, windowHeight, windowWidth, 40, options);
    World.add(world, ground);
    
    
}

function Boxes(x,y,w,h){
    this.w = w;
    this.h = h;

    let options = {
        friction: 0.5,
        restitution: 2
    }
    //Create a rectangle starts x,y - width w - height h
    this.body = Bodies.rectangle(x,y,w,h, options);
    
    //Add to physical world
    World.add(world,this.body);
    let c = color(random(255), random(255), random(255));
    this.show = function () {
        let pos = this.body.position;
        let angle = this.body.angle;
        push();
        translate(pos.x,pos.y);
        rotate(angle);
        strokeWeight(1);
        stroke(255);
        fill(c);
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

    //Ground
    noStroke();
    fill(0);
    rect(windowWidth/2, windowHeight, windowWidth, 40);
}

