let gameSeq = [];
let userSeq = [];
let btns = ["red","yellow","green","blue"];
let highestScore = 0;

let started = false;
let level = 0;
let h2 = document.querySelector("h2");
let h3 = document.querySelector("h3");
const soundGameOver = new Audio("gameOver.wav");

//Background Music
let bgMusic = new Audio("bgMusic.mp3");
let musicBtn = document.querySelector("#bgMusic");
let isMusicPlaying = false;

function stopMusic(){
    bgMusic.pause();
    musicBtn.innerText = "🔇 Sound Off";
}
function startMusic(){
    bgMusic.play();
    musicBtn.innerText = "🔊 Sound On";
}

musicBtn.addEventListener("click", () => {
    if(isMusicPlaying)
        stopMusic();
    else
        startMusic();
    isMusicPlaying = !isMusicPlaying;
});

document.addEventListener("keypress",function(){
    if(!started){
        started = true;
        startMusic();
        levelUp();
    }
});

function gameFlash(btn){
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash");
    }, 250);
}

function levelUp(){
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;

    //Any random button
    let randomIndex = Math.floor(Math.random() * 3);
    let randomColor = btns[randomIndex];
    let randomBtn = document.querySelector(`.${randomColor}`);

    gameSeq.push(randomColor);
    //console.log(gameSeq);

    gameFlash(randomBtn);
}

function checkButton(idx){
    if(userSeq[idx] === gameSeq[idx]){
        if(userSeq.length == gameSeq.length)
            setTimeout(levelUp,1000);
    }else{
        stopMusic();
        h2.innerHTML = `Game Over! Your score was: <b> ${level} </b> <br> Press any key to restart`;
        highestScore = Math.max(level,highestScore);

        h3.innerHTML = `Your highest score is: ${highestScore}`;

        document.querySelector("body").style.backgroundColor = "red";

        setTimeout(function(){
            document.querySelector("body").style.backgroundColor = "aliceblue";
        },150);
        
        soundGameOver.play();
        reset();
    }
}

function btnPress(){
    let btn = this;
    gameFlash(btn);
    
    let userColor = btn.getAttribute("id");
    userSeq.push(userColor);

    checkButton(userSeq.length-1);
}

let allBtns = document.querySelectorAll(".btn");
for(btn of allBtns){
    btn.addEventListener("click",btnPress);
   
}

function reset(){
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
    isMusicPlaying = false;
}


let h5 = document.querySelector("h5 a");
h5.addEventListener("click",function(){
    this.parentElement.remove();
});