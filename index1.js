var gameStart=false;
var level=1;
var randomNumber=[];
var currentSequenceIndex=0;
var currentTarget=null;
var i=0;
var gameOver=false;
var audio=null;
const keyMapping={
    0:"green",
    1:"red",
    2:"yellow",
    3:"blue"
};

function resetGame(){
    gameStart=false;
    level=1;
    randomNumber=[];
    currentSequenceIndex=0;
    currentTarget=null;
    i=0;
    audio=null;
    $("h1").text("Press A key to Start");
}

function nextSequence(){
    currentSequenceIndex=0;
    $("h1").text("Level " + level);
    randomNumber.push(Math.floor(Math.random()*4));
    sequenceLength=(randomNumber.length)-1;
    $("#"+ keyMapping[randomNumber[sequenceLength]]).fadeOut();
    $("#"+ keyMapping[randomNumber[sequenceLength]]).fadeIn();
    audio=new Audio("./sounds/"+ keyMapping[randomNumber[sequenceLength]]+".mp3");
    audio.play();
}

$(".btn").click(function(event)
{
    currentTarget=event.target.id;
    $(currentTarget).addClass("pressed");
    setTimeout(function(){
        $(currentTarget).removeClass("pressed");
    },150);
    audio=new Audio("./sounds/"+ currentTarget +".mp3");
    audio.play();
    if(currentTarget===keyMapping[randomNumber[currentSequenceIndex]])
    {   
        currentSequenceIndex++;
        if(currentSequenceIndex==randomNumber.length)
        {
            setTimeout(function(){
                level++;
                nextSequence();
            },600);
        }
    }
    else{
        gameStart=false;
        audio=new Audio("./sounds/wrong.mp3");
        audio.play();
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        resetGame();
    }
});

$(document).keypress(function (){
    if(!gameStart)
    {
    gameStart=true;
    nextSequence();
    }
});
