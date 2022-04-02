video= "";
status="";
objects= [];

function setup(){
    canvas= createCanvas(480,380);
    canvas.center();
}

function preload(){
    video= createVideo("video.mp4");
    video.hide();
}

function draw(){
    image(video, 0, 0, 480,380);
    if(status != ""){
        objectDetector.detect(video, gotResult);
        for( i=0 ; i< objects.length; i++){
            document.getElementById("status").innerHTML= "Status : objects detected";
            document.getElementById("num_of_object").innerHTML= "Number of objects detected are :" + objects.length;
            fill("orange");
            percent= floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%" , objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke("orange");
            rect(objects[i].x , objects[i].y, objects[i].width , objects[i].height);
        }
    }
}

function start(){
    objectDetector= ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML= " Status : detecting objects";
}

function modelLoaded(){
    console.log("Model is Loaded");
    status= true;
    video.loop();
    video.speed(1);
    video.volume(0);
}

function gotResult(error, results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        objects= results;
    }
}
