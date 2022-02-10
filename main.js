song = "";
leftwristX = "";
leftWristY ="";
rightWristX = "";
rightWristY = "";
scoreleftwrist ="";
function preload(){
    song = loadSound("music.mp3");
}

function setup(){
    canvas = createCanvas(600,500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video,modelLoaded);
    poseNet.on('results',gotposes);
}

function modelLoaded(){
    console.log('POSENET IS INITIALIZED');
}

function draw(){
    image(video,0,0,600,500);

    fill('#FF0000');
    stroke('#FF0000');
    if(scoreleftwrist > 0.2){
        circle(leftWristX,leftWristY,20);
        InNumberleftWristY = Number(leftWristY);
        remove_decimals = floor(InNumberleftWristY);
        volume = remove_decimals/500;
        document.getElementById("volume").innerHTML = "Volume -"+volume;
        song.setVolume(volume);
    }
}

function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}

function gotposes(results){
    if(results.length > 0){
        console.log(results);
        scoreleftwrist = results[0].pose.keypoints[9].score;
        console.log("scoreLeftWrist = "+scoreleftwrist);
        leftwristX = results[0].pose.leftWrist.x;
        leftwristY = results[0].pose.leftWrist.y;
        console.log("leftWristX = "+leftwristX+" leftWristY = "+leftWristY);
        rightwristX = results[0].pose.rightWrist.x;
        rightwristY = results[0].pose.rightWrist.y;
        console.log("rightWristX = "+rightWristX+"rightWristY = "+rightWristY);

    }
}