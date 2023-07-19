let reset = document.getElementById("reset");
reset.addEventListener('click', resetGame, false);
let secretCode = null;
let colors = ["red", "blue", "yellow", "green", "orange", "purple"];
let selects = document.getElementsByTagName("select");
let gEasy = document.getElementById("easy");
let gMedium = document.getElementById("medium");
let gHard = document.getElementById("hard");
let gLevel = document.getElementById("level"); 
gEasy.addEventListener('click',easyLevel, false); 
gMedium.addEventListener('click',mediumLevel, false); 
gHard.addEventListener('click',hardLevel, false); 
let steps = document.getElementById("steps"); 

function easyLevel() { 
    gLevel.textContent = "EASY"; 
    document.getElementById("menu").className = "hide";
    gEasy.className = "hide";
    gMedium.className = "hide";
    gHard.className = "hide";
    stepsLeft = 20;
    steps.textContent = "Steps left: " + stepsLeft;
    submitButton.addEventListener("click",func,false);
}

function mediumLevel() {
    gLevel.textContent = "MEDIUM"; 
    document.getElementById("menu").className = "hide";
    gEasy.className = "hide";
    gMedium.className = "hide";
    gHard.className = "hide";
    stepsLeft = 12;
    steps.textContent = "Steps left: " + stepsLeft;
    submitButton.addEventListener("click",func,false);
    
}

function hardLevel() {
    gLevel.textContent = "HARD"; 
    document.getElementById("menu").className = "hide";
    gEasy.className = "hide";
    gMedium.className = "hide";
    gHard.className = "hide";
    stepsLeft = 5;
    steps.textContent = "Steps left: " + stepsLeft;
    submitButton.addEventListener("click",func,false);
}

//The background of each select tag should reflect the color option that the user chooses
for(let select of selects) {
    select.addEventListener('change', changeColor, false);
}
//change the background color of the select tag to match its value
function changeColor() {
    let color = this.value;
    this.style.setProperty("background-color", color);
    this.style.setProperty("color", "white");
    if(color === "yellow") {
        this.style.setProperty("color", "black");
    }
}
let submitButton = document.getElementById("submit");
//reset the game
resetGame();
function resetGame() {
    //pick a random code when resetting the game
    pickRandomCode();
    // You'll need to activate the submit button
    // You'll want to clear any rows from a previous game if they exist
    mmrow = document.getElementsByClassName("mmRow");
    mrow = []
    for (let i = 1;i<mmrow.length;i++){
        mrow.push(mmrow[i]);
    }
    for (let i of mrow){
        document.getElementById("gameBoard").removeChild(i);
    }
    document.getElementById("menu").className = "";
    gEasy.className = "choose";
    gMedium.className = "choose";
    gHard.className = "choose";
    steps.textContent = ""; 
    gLevel.textContent = "";
}
//a function here that will pick a random 4-color code and
//store it as an array in the variable named secretCode.
function pickRandomCode() {
    //first make sure there is nothing in the secretCode array by making it an empty array
    secretCode = [];
    //push 4 random strings from the colors array into the secretCode array
    for(let i = 0; i < 4; i++) {
        secretCode.push(colors[Math.floor(6 * Math.random())]);
    }
}
//You'll need to create an event listener on the submit button for when
//the user makes a guess.
function func(){
    row = document.createElement("div");
    row.className = "mmRow";
    document.getElementById("gameBoard").appendChild(row);
    gues = document.createElement("div");
    gues.className = "guess";
    row.appendChild(gues);
    for (let i=0;i<4;i++){
        four = document.createElement("div");
        four.className = selects[i].value + " indicator";
        gues.appendChild(four);
    }
    feedback = document.createElement("div");
    feedback.className = "feedback";
    row.appendChild(feedback);
    choice = [];
    black = 0;
    white = 0;
    copy = secretCode.slice();
    for (let i = 0;i<selects.length;i++){
        choice.push(selects[i].value);
        if (choice[i] == secretCode[i]){
            black++;
            delete copy[i];
            delete choice[i];
        }
    }
    for (let i=0;i<selects.length;i++){
        let j = 0;
        whetherFound = false;
        while (j<secretCode.length && !whetherFound){
            if (copy[j]==choice[i] && choice[i]){
                white++;
                delete copy[j];
                whetherFound = true;
            }
            j++;
        }
    }
    for (let i = 0;i<black;i++){
        result = document.createElement("div");
        result.className = "black indicator";
        feedback.appendChild(result);
    }
    for (let i = 0;i<white;i++){
        result = document.createElement("div");
        result.className = "white indicator";
        feedback.appendChild(result);
    }
    stepsLeft --; 
    steps.textContent = "Steps left: " + stepsLeft;
    if (stepsLeft == 1){
        steps.textContent = "Warning!! " + stepsLeft + " step left";
    }
    else if (stepsLeft == 0){ 
        steps.textContent = "000 Game Over! "; 
        submitButton.removeEventListener("click", func, false); 
    }
    if (black==4){
        submitButton.removeEventListener("click", func, false);
        steps.textContent = "YOU WIN!"
    }
    
}
//Every time the user makes a guess, you need to append a new row in the board.
//I suggest that you make a row look something like this:

/*
    <div class="mmRow">
        <div class="guess">
            <div class="color indicator"></div>
            <div class="color indicator"></div>
            <div class="color indicator"></div>
            <div class="color indicator"></div>
        </div>
        <div class="feedback">
            <div class="color indicator"></div>
            <div class="color indicator"></div>
        </div>
    </div>
*/

/* The color class name would be the color that you want the indicator to be
such as "red", "blue", "black", "white", etc. The CSS is already set up
so that the indicator divs will look like circles*/