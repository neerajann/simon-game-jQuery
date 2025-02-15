var state="start";
function gameStateCheck(){
if(state==="start")
{
$(document).keypress(function(){
    if(gameOver)
    {
        resetGame();
    }
    gameStart();
});
state="started";
}
}
var randomNumber=[];
var gameOver=false;
var level=0;
var boxMapping={
    0:"green",
    1:"red",
    2:"yellow",
    3:"blue"
};
function resetGame(){
    randomNumber=[];
    gameOver=false;
    level=0;
};
function gameStart(){
    $("h1").text("Level "+ (level+1));

    randomNumber.push(Math.floor(Math.random()*4));
    $("#"+boxMapping[randomNumber[level]]).animate({opacity:"0%"});
    $("#"+boxMapping[randomNumber[level]]).animate({opacity:"100%"});

    for(var i=0;i<randomNumber.length;i++)
    {
    $(".btn").on("click",function(event){
    if(!$(event.currentTarget).hasClass(boxMapping[randomNumber[i-1]])){

        $("body").addClass("game-over");
        setTimeout(function() {
            $('body').removeClass('game-over');
        }, 350)
        gameOver=true;
        $("h1").text("Game Over! Press any key to restart");
        state="gameover"
        gameStateCheck();
    }
    });
    }
    if(!gameOver)
    {
        level++;

    }
}

