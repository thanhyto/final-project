let Engine = Matter.Engine,
    // Render = Matter.Render,
    Runner = Matter.Runner,
    Bodies = Matter.Bodies,
    World = Matter.World;

let engine = Engine.create();
let runner = Runner.create({wireframes:false});
let world = engine.world;

let box = [];
let boundary = [];
let circle = [];

function setup(){
    createCanvas(windowWidth, windowHeight);
    
    rectMode(CENTER);
    Runner.run(runner,engine);
    // ground1 = new Boundary(windowWidth/2, windowHeight, windowWidth, 100);
    // ground2 = new Boundary(windowWidth/2, windowHeight/2, windowWidth/2, 40)
    boundary.push(new Boundary(windowWidth*0.4, windowHeight*0.3, windowWidth*0.35, 70, PI/8));
    boundary.push(new Boundary(windowWidth*0.6, windowHeight*0.7, windowWidth*0.35, 70, -PI/8));
    boundary.push(new Boundary(windowWidth/2, windowHeight, windowWidth, 100,0))
}

//Boundary
function Boundary(x,y,w,h,a){
    this.w = w;
    this.h = h;
    let options = {
        friction: 0,
        isStatic:true,
        angle: a,
        isSensor: false
    }
    //Create a boundary centered x,y - width w - height h
    this.body = Bodies.rectangle(x,y,w,h, options);
    this.body.angle = a;

    //Add to physical world
    World.add(world, this.body);

    this.show = function() {
        let pos = this.body.position;
        let angle = this.body.angle;
        push();
        translate(pos.x, pos.y);
        rotate(angle);
        rectMode(CENTER);
        noStroke();
        fill(0);
        rect(0, 0, w,h);
        pop();
    }
}

//Boxes
function Boxes(x,y,w,h){
    this.w = w;
    this.h = h;

    let options = {
        friction: 0,
        restitution: 0.5
    }
    //Create a rectangle starts x,y - width w - height h
    this.body = Bodies.rectangle(x,y,this.w,this.h, options);
    
    //Add to physical world
    World.add(world,this.body);
    let c = color(random(255), random(255), random(255));
    this.show = function() {
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

//Circles
function Circle(x,y,r){
    this.r=r;
    let options = {
        friction:0,
    }
    this.body = Bodies.circle(x,y, this.r,options);
    World.add(world, this.body);
    let c = color(random(255), random(255), random(255));
    this.show = function(){
        let pos = this.body.position;
        push();
        translate(pos.x, pos.y);
        strokeWeight(1);
        stroke(255);
        fill(c);
        ellipse(0,0,this.r*2);
        pop();
    }
}

function mousePressed(){
    let num = random(-1,1);
    if(num > 0){
        box.push(new Boxes(mouseX,mouseY,random(20,50),random(20,50)));
    }
    else{
        circle.push(new Circle(mouseX, mouseY, random(20,40)));
    }
}

function draw(){
    background(220);
    // Loops through the array of boxes and show the objects
    for(let i = 0; i < box.length; i++){
        //Called show() since declare as a function
        box[i].show();
    }
    // Loops through array of circle
    for(let i = 0; i < circle.length;i++){
        circle[i].show();
    }
    //Same thing -> Render all boundaries
    for(let i = 0; i<boundary.length;i++){
        boundary[i].show();
    }
    
    //Draw the ground
    // ground1.show();
    // ground2.show();
   
}