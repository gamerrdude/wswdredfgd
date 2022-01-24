objectDetector= "";

img = "";
objects = [];
status = "";

function preload(){
  img = loadImage('dog_cat.jpg');
}


function setup() {
  canvas = createCanvas(380, 380);
  canvas.center();
  objectDetector = ml5.objectDetector('cocossd', modelLoaded);
  document.getElementById("status").innerHTML = "Status : Detecting Objects";
  video = createCapture(VIDEO);
  video.hide();
  video.size(300,300);
}

function modelLoaded() {
  console.log("Model Loaded!")
  status = true;
  objectDetector.detect(video, gotResult);
}

function gotResult(error, results) {
  if (error) {
    console.log(error);
  }
  console.log(results);
  objects = results;
}


function draw() {
  image(video, 0, 0, 380, 380);

      if(status != "")
      {
        R = random(255);
        G = random(255);
        B = random(255);
        for (var i = 0; i < objects.length; i++) {
          document.getElementById("status").innerHTML = "Status : Object Detected";
          document.getElementById("number_of_objects").innerHTML = "Number of objects that are detected are:"+ objects.length;
    
          fill(R, G, B);
          percent = floor(objects[i].confidence * 100);
          text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
          noFill();
          stroke(R, G, B);
          rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
      }
}