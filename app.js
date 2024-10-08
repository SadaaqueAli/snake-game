let inputDir = { x: 0, y: 0 };
const foodSound = new Audio('food.mp3');
const gameOverSound = new Audio('gameover.mp3');
const moveSound = new Audio('move.mp3');
const musicSound = new Audio('music.mp3');
let speed = 5;
let lastPrintTime = 0;
let snakeArr = [
    { x: 13, y: 15 }
];
let food = { x: 6, y: 7 };
let score = 0;

//game function
function main(ctime) {
    window.requestAnimationFrame(main)
    //console.log(ctime)
    if ((ctime - lastPrintTime) / 1000 < 1 / speed) {
        return;
    }
    lastPrintTime = ctime;
    gameEngine();
}
function isCollide(snake) {
    // agr snake khud se takrae to
    for (let i = 1; i < snake.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true;
        }
    }

    // agr dewar main takraya
    if (snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0) {
        return true;
    }
    return false;

}
function gameEngine() {
    //part 1 update snke arr & food
    if (isCollide(snakeArr)) {
        gameOverSound.play();
        musicSound.pause();
        inputDir = { x: 0, y: 0 };
        alert('Game over ! press any for play again')
        snakeArr = [{ x: 13, y: 15 }];
        // musicSound.play();
        score = 0;
    }
    // agr sanke ne food ko kha lia or score barha phr dubara food show hona chiye
    if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
        foodSound.play();
        score += 1;
        if (score > hiscoreval) {
            hiscoreval = score;
            localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
            hiScoreBox.innerHTML = "HiScore: " + hiscoreval;
        }
        scoreBox.innerHTML = "score: " + score;
        snakeArr.unshift({ x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y })
        let a = 2;
        let b = 16;
        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) }
    }
    //snake moving 
    for (let i = snakeArr.length - 2; i >= 0; i--) {
        snakeArr[i + 1] = { ...snakeArr[i] };
    }

    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;
    // part 2 display snake & food

    //sanke display
    board.innerHTML = "";
    snakeArr.forEach((e, index) => {
        snakeElement = document.createElement('div')
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if (index === 0) {
            snakeElement.classList.add('head')
        }
        else (snakeElement.classList.add('snake'))
        board.appendChild(snakeElement);
    })
    //display food
    foodElement = document.createElement('div')
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food')
    board.appendChild(foodElement);
}



//logic starts here
let hiscore = localStorage.getItem("hiscore");
if (hiscore === null) {
    let hiscoreval = 0;
    localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
} else {
    hiscoreval = JSON.parse(hiscore);
    hiScoreBox.innerHTML = "HiScore: " + hiscore;
}
window.requestAnimationFrame(main)
window.addEventListener('keydown', e => {
    inputDir = { x: 0, y: 1 }
    moveSound.play();
    switch (e.key) {
        case "ArrowUp":
            inputDir.x = 0;
            inputDir.y = -1;
            break;
        case "ArrowDown":
            inputDir.x = 0;
            inputDir.y = 1;
            break;
        case "ArrowLeft":
            inputDir.x = -1;
            inputDir.y = 0;
            break;
        case "ArrowRight":
            inputDir.x = 1;
            inputDir.y = 0;
            break;
        default:
            break;
    }
})