var buttoncolor=["red", "blue", "green", "yellow"];
var gamepattern=[];
var userpatten=[];
var start=false;
var level=0;

$(document).keypress(function(){
    if (!start) {
        $("#level-title").text("Level " + level);
        sequence();
        start = true;
      }

});
function sequence(){
    userpatten=[];;
    level++;
    $("#level-title").text("Level " + level);
    var numbers=Math.floor(Math.random()*4);
    var randomcolor=buttoncolor[numbers];
    gamepattern.push(randomcolor);
    $("#" +randomcolor).fadeIn(100).fadeOut(100).fadeIn(100);
    playmusic(randomcolor);
    animationpress(randomcolor);
}

$(".btn").click(function (){
    var ChosenColour=$(this).attr("id");
    userpatten.push(ChosenColour);
    playmusic(ChosenColour);
    animationpress(ChosenColour);
    checkanswer(userpatten.length-1);
    });
function playmusic(name){
var audio= new Audio("sounds/" + name + ".mp3");
audio.play();
}
function animationpress(colorselected){
    $("#"+colorselected).addClass("pressed");
    setTimeout(function () {
        $("#" + colorselected).removeClass("pressed");
      }, 100);
}

function checkanswer(currentlevel){
    if(gamepattern[currentlevel]==userpatten[currentlevel]){
        console.log("success");
        if(gamepattern.length==userpatten.length){
            setTimeout(function(){
                sequence();
            },1000);
        }
    }
    else{
        console.log("wrong");
        var noise=new Audio("sounds/wrong.mp3");
        noise.play();
        $("body").addClass("game-over");
        setTimeout(function () {
          $("body").removeClass("game-over");
        }, 200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startagain();
    }
}
function startagain(){
    gamepattern=[];
    start=false;
    level=0;
}