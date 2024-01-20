const boxes = document.querySelectorAll(".box"); 
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");
const player = document.querySelector(".player1");
const comp = document.querySelector(".player2");
const mainPage = document.querySelector(".introd");

let currPlayer;
let gameGrid;

mainPage.addEventListener("click" , () => {
    mainPage.classList.add("onclickk");
})

const winningPosition = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

function initGame(){
    currPlayer = "X";
    gameGrid = ["","","","","","","","",""];
    boxes.forEach((box , index) => {
        box.innerText = "";
        boxes[index].style.pointerEvents = "all";
        box.classList = `box box${index +1}`;
        player.classList = `player player1`;
        comp.classList = `player player2`;
    });
    newGameBtn.classList.remove("active");
    gameInfo.textContent = `Current Player - ${currPlayer}`;
}

initGame();

function checkGameOver(){
    let answer = "";
    winningPosition.forEach((position) =>{
        if( ( gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "" ) 
        && (gameGrid[position[0]] === gameGrid[position[1]]) && (gameGrid[position[1]] === gameGrid[position[2]]) ){
        
        if(gameGrid[position[0]] === "X") {
            answer = "X";
            player.classList.add("zoom");}
        else {
            answer = "O";
            comp.classList.add("zoom");}

        boxes[position[0]].classList.add("win");
        boxes[position[1]].classList.add("win");
        boxes[position[2]].classList.add("win");

        boxes.forEach((box) =>{
            box.style.pointerEvents = "none";
        })
    }
    });

    if( answer !== ""){
        gameInfo.innerText = `Winner - ${answer}`;
        newGameBtn.classList.add("active");
    }

    let count = 0;
    gameGrid.forEach((box) =>{
        if(box !== "" ) count++;
    })

    if(count === 9 ){
        gameInfo.innerText = `Game Tied`;
    }
}


function swapTurn(){
    if(currPlayer === "X") currPlayer = "O";
    else currPlayer = "X";
    gameInfo.innerText = `Current Player - ${currPlayer}`;
    newGameBtn.classList.add("active");
}

function handleClick(index){
    if(gameGrid[index] === ""){
        gameGrid[index] = currPlayer;
        boxes[index].innerText = currPlayer;
        boxes[index].style.pointerEvents = "none";
        swapTurn();
        checkGameOver();
    }
}

boxes.forEach((box , index) => {
    box.addEventListener("click" , () =>{
        handleClick(index);
    })
})

newGameBtn.addEventListener("click" , initGame);