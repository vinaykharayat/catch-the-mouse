var timer = 0;
var timerRunning = false;
var mTimer = document.querySelector("#timer");
var interval;
var mouseInterval;
var score = 0;
let highScores = new Map();
var url = new URL(window.location.href);

let username = url.searchParams.get("name");
console.log(window.localStorage.getItem(username))
function saveData() {
    if (typeof (Storage) !== "undefined") {
        // Code for localStorage/sessionStorage.
        
        if (window.localStorage.getItem(username) != null) {
            if (score > window.localStorage.getItem(username)) {
                window.localStorage.setItem(username, score);
            }
        }else{
            window.localStorage.setItem(username, score);
        }
    } else {
        // Sorry! No Web Storage support..
    }
}

document.querySelector("#startGame").addEventListener("click", startTimer);

document.querySelector("h1").textContent = "Welcome! " + username;
document.querySelector("h2").textContent = "High score: " + localStorage.getItem(username);
function mouseDisplay() {
    Array.from(document.querySelectorAll(".mMouse")).forEach(element => {
        element.style.display = "none";

    })
    var images = document.querySelectorAll(".mMouse");
    let image = images[Math.floor(Math.random() * 9)];
    image.style.display = "block";
    image.style.bottom = "0px";
    $(".mMouse").animate({ bottom: '120px' });
    // image.addEventListener("mouseup", function () {
    //     image.style.border = "none";
    // })
    image.addEventListener("click", updateScore, false);

}

function updateScore() {
    score = parseInt(document.querySelector("#score").textContent);
    score += 10;
    document.querySelector("#score").textContent = score;

}

function updateTimer() {
    timer++;
    mTimer.textContent = 10 - timer;
    if ((10 - timer) == 0) {
        stopTimer();
        saveData();
        
        timerRunning = false;
    }
}

function stopTimer() {
    window.alert("Time Over" + "\n Previous Score: " +
                                window.localStorage.getItem(username) +
                                "\n New Score: "+ score);
    clearInterval(interval);
    clearInterval(mouseInterval);
    timer = 0;
    mTimer.textContent = "60 sec";
    document.querySelector("#score").textContent = 0;
}

function startTimer() {
    if (!timerRunning) {
        mouseInterval = setInterval(mouseDisplay, 800);
        interval = setInterval(updateTimer, 1000);

    }
}

document.querySelector("#cleardata").addEventListener("click", function(){
    window.localStorage.removeItem(username);
})
