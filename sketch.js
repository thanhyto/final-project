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

//Canvas width, height 
let canvasDiv = document.getElementById('p5Canvas');
let canvasWidth = canvasDiv.offsetWidth;
let canvasHeight = canvasDiv.offsetHeight;

//timer
let timer = 0;

//Rate control
function rateControl(){
    //Get all the radio inputs for rate
    let radio = document.querySelectorAll("input[name='rate']");
    for(const radioButton of radio){
        if(radioButton.checked){
            let rate = radioButton.value;
            return rate;
            }
        }
}


function setup(){
    let sketchCanvas = createCanvas(canvasWidth,canvasHeight);
    sketchCanvas.parent('p5Canvas');
    rectMode(CENTER);
    Runner.run(runner,engine);
    // ground1 = new Boundary(windowWidth/2, windowHeight, windowWidth, 100);
    // ground2 = new Boundary(windowWidth/2, windowHeight/2, windowWidth/2, 40)
    boundary.push(new Boundary(canvasWidth*0.4, canvasHeight*0.3, canvasWidth*0.35, 70, PI/8));
    boundary.push(new Boundary(canvasWidth*0.6, canvasHeight*0.7, canvasWidth*0.35, 70, -PI/8));
    // boundary.push(new Boundary(windowWidth/2, windowHeight, windowWidth, 100,0))
}

//Resize canvas
function windowResized(){
    resizeCanvas(canvasDiv.offsetWidth, canvasDiv.offsetHeight);
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
function Box(x,y,w,h, rectFric){
    this.w = w;
    this.h = h;
    this.rectFric = rectFric;
    // this.rectRest = rectRest;

    let options = {
        friction: 0,
        // restitution: 0
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
        strokeWeight(0);
        stroke(255);
        fill(c);
        //Draw a rectangle with this.body.position.x and this.body.position.y
        rect(0,0,this.w,this.h);
        pop();
    }

    this.isOffScreen = function () {
        let pos = this.body.position;
        return (pos.y > height + 100);
    }
    this.removeFromWorld = function () {
        World.remove(world, this.body);
    }
}

//Circles
function Circle(x,y,cirSize, cirFric){
    this.cirFric = cirFric;
    this.cirSize = cirSize;
    let options = {
        friction:cirFric,
        // restitution:cirRest,
    }
    this.body = Bodies.circle(x,y, this.cirSize,options);

    World.add(world, this.body);
    let c = color(random(255), random(255), random(255));
    this.show = function(){
        let pos = this.body.position;
        push();
        translate(pos.x, pos.y);
        strokeWeight(0);
        fill(c);
        ellipse(0,0,this.cirSize*2);
        pop();
    }

    this.isOffScreen = function () {
        let pos = this.body.position;
        return (pos.y > canvasHeight + 100 || pos.y < -100 ||
            pos.x > canvasWidth+100 || pos.x < -100);
    }
    this.removeFromWorld = function () {
        World.remove(world, this.body);
    }
}

function mousePressed(){
    let num = random(-1,1);
    if(num > 0){
        box.push(new Box(mouseX,mouseY,random(20,50),random(20,50), rectFric));
    }
    else{
        circle.push(new Circle(mouseX, mouseY, random(5,20), cirFric));
    }
}
//Sliders ID Event Listener
const sliders = document.getElementsByClassName('slider');
const outputs = document.getElementsByClassName('demo');

//Display initial value of sliders
for(let i = 0; i < outputs.length; i++){
    outputs[i].innerHTML = sliders[i].value;   
}

//Friction, Restitution inputs
let cirFric = 0;
let rectFric = 0;

//Update value of sliders when sliding
for(let i = 0; i < sliders.length; i++){
    sliders[i].addEventListener('click', e => {
        console.log(e.target.id);
        console.log(e.target.value);
        switch(e.target.id){
            case 'gravityY':
                engine.world.gravity.y = e.target.value;
                break;
            case 'gravityX':
                engine.world.gravity.x = e.target.value;
                break;
            case 'cirFric':
                cirFric = e.target.value;
                break;
            case 'rectFric':
                rectFric = e.target.value;
                break;
        }
    });
    sliders[i].oninput = function(){
        outputs[i].innerHTML = sliders[i].value;
    }
}
function drawBox(){
    //If gravity y < 0, spawn objects at the bottom of the canvas
    if(engine.world.gravity.y < 0){
        box.push(new Box(random(canvasWidth),canvasHeight,random(20,50),random(20,30), rectFric));
    }
    //Else, spawn at the top of the canvas
    else{
        box.push(new Box(random(canvasWidth),0,random(20,50),random(20,30), rectFric));
    }
}
function drawCircle(){
    //If gravity y < 0, spawn objects at the bottom of the canvas
    if(engine.world.gravity.y < 0){
        circle.push(new Circle(random(canvasWidth), canvasHeight, random(5,20), cirFric));
    }
    else{
        circle.push(new Circle(random(canvasWidth), 0, random(5,20), cirFric));
    }
    // circle.push(new Circle(random(canvasWidth), random(canvasHeight), random(5,20)));
}

function drawObject(){
    let radioCir = document.querySelector('input[id="cirOn"]');
    if(radioCir.checked){
        drawCircle();
    }
    let radioRect = document.querySelector('input[id="rectOn"]');
    if(radioRect.checked){
        drawBox();
    }
}

function draw(){
    background(220);
    switch(rateControl()){
        case 'slow':
            if(millis() >= 300+timer){
                drawObject();
                timer = millis();
            }
            break;
        case 'default':
            if(millis() >= 100+timer){
                drawObject();
                timer = millis();
            }
            break;
        case 'fast':
            if(millis() >= 5+timer){
                drawObject();
                timer = millis();
            }
            break;
    }
    // Loops through the array of boxes and show the objects
    for(let i = 0; i < box.length; i++){
        //Called show() since declare as a function
        box[i].show();
        if(box[i].isOffScreen()){
            box[i].removeFromWorld();
            box.splice(i,1);
            i--;
        }
    }
    // Loops through array of circle
    for(let i = 0; i < circle.length;i++){
        circle[i].show();
        if(circle[i].isOffScreen()){
            circle[i].removeFromWorld();
            circle.splice(i,1);
            i--;
        }
    }
    //Same thing -> Render all boundaries
    for(let i = 0; i<boundary.length;i++){
        boundary[i].show();
    }
}

