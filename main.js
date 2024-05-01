function setup(){
    canvas = createCanvas(600, 500);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(600, 500);
    video.hide();
}
check = "";
objects = [];

function preload(){}

function draw(){
    image(video, 0, 0, 600, 500);
    //fill("#FF0000");
    //text("Dog", 50, 90);
    //noFill();
    //stroke("#FF0000");
    //rect(30, 50, 450, 437);

    //fill("#AA0000");
    //text("Cat", 500, 90);
    //noFill();
    //stroke("#AA0000");
    //rect(280, 80, 270, 390);

    if(check == true){
        objectdetector.detect(video, gotResults);
        r = random(255);
        g = random(255);
        b = random(255);
        for(i = 0; i < objects.length; i++){
            document.getElementById("status").innerHTML = "Status: Object Detected!"
            fill(r, g, b);
            percent = Math.floor(objects[i].confidence*100);
            text(objects[i].label + " " + percent + "%", objects[i].x, objects[i].y);
            noFill();
            stroke(r, g, b);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            document.getElementById("no").innerHTML= "Number of objects detected is " + objects.length;
        }
    }
}

function modelLoaded(){
    console.log("Model Loaded");
    check = true;
}

function play(){
    objectdetector = ml5.objectDetector('cocssd', modelLoaded);
    document.getElementById("status").innerHTML="Status = Detecting Objects";
}

function gotResults(error, results){
    if(error){
        console.log(error);
    }
    else{
        console.log(results);
        objects = results;
    }
}