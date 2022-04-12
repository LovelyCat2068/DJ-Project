songHP = "";
songPP = "";
xatleft = 0;
xatright = 0;
yatleft = 0;
yatright = 0;
score_left =0;
canarycream = "";


function preload(){
    songHP = loadSound("Harry Potter.mp3");
    songPP = loadSound("music2.mp3");
}

function setup(){
    canvas = createCanvas(300, 300);
    video = createCapture(VIDEO);
    video.hide();
    pumpkin = ml5.poseNet(video, modelLoaded);
    pumpkin.on('pose', gotPoses);
}

function gotPoses(results){
    if(results<0){
        xatleft = results[0].pose.leftWrist.x;
        yatleft = results[0].pose.leftWrist.y;
        xatright = results[0].pose.rightWrist.x;
        yatright = results[0].pose.rightWrist.y;
        score_left = results[0].pose.keypoints[9].score;
        score_right = results[0].pose.keypoints[10].score;
    }
}

function modelLoaded(){
    console.log("PoseNet is initialised");
}

function draw(){
    image(video, 0, 0, 300, 300);
    fill("#000080");
    noFill();
    stroke("#3232a8");

    canarycream = songPP.isPlaying(true, false);

    if(score_left < 0.2){
        circle(xatleft, yatleft, 20);
        songHP.stop();
        if(canarycream = false){
            songPP.start();
            document.getElementById("spongy").innerHTML = "Song Name = PeterPan Theme Song";
        }
    }
}