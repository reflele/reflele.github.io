humanRock = document.getElementById("humanrock");
humanPaper = document.getElementById("humanpaper");
humanScissors = document.getElementById("humanscissors");

humanScore = document.getElementById("humanscore").textContent;
pcScore = document.getElementById("pcscore").innerHTML;

divHuman = document.createElement("img");
divHuman.classList.add("humanabsolute");

divPc = document.createElement("img");
divPc.classList.add("pcabsolute");

let resetButton = document.createElement("button");
resetButton.classList.add("btn");
resetButton.classList.add("btn-primary");
resetButton.classList.add("btn-lg");
resetButton.classList.add("fontt")
resetButton.style.backgroundColor = "black";
resetButton.style.border = "grey";
resetButton.textContent = "Click here to reset";
resetButton.setAttribute("id", "resetButton");



humanRock.addEventListener("click",function () {
    myFunction("rock")
})
humanPaper.addEventListener("click",function () {
    myFunction("paper")
})
humanScissors.addEventListener("click",function () {
    myFunction("scissors")
})

resetButton.addEventListener("click",function (){
    humanScore = 0;
    pcScore = 0;
    document.getElementById("humanscore").textContent = humanScore;
    document.getElementById("pcscore").textContent = pcScore;
    humanPaper.style.display = "block";
    appear();
    resetButton.remove();
})



let handContainer = document.getElementById("handContainer");
let leftDiv = document.getElementById("leftdiv");
let middleDiv = document.getElementById("middlediv");
let rightDiv = document.getElementById("rightdiv");


function playRound(hand, pcPlay){
    if (hand == "rock"){
        divHuman.src = "images/humanrock.png";
        leftDiv.append(divHuman);
    } else if (hand == "paper"){
        divHuman.src = "images/humanpaper.png";
        leftDiv.append(divHuman);
    } else if (hand == "scissors"){
        divHuman.src = "images/humanscissors.png";
        leftDiv.append(divHuman);
    }

    if (pcPlay == "rock"){
        divPc.src = "images/pcrock.png";
        rightDiv.append(divPc);
    } else if (pcPlay == "paper"){
        divPc.src = "images/pcpaper.png";
        rightDiv.append(divPc);
    } else if (pcPlay == "scissors"){
        divPc.src = "images/pcscissors.png";
        rightDiv.append(divPc);
    }
    setTimeout(removePlay,1500);

    return assignWinner(hand,pcPlay);
}
function removePlay(){
    divHuman.remove();
    divPc.remove();
}

function pcPlay() {
    let randomPlay = Math.random();
    let computerInput = "";
    if (randomPlay <= 0.33) {
        computerInput = "rock";
    } else if (randomPlay <= 0.66) {
        computerInput = "paper";
    } else if (randomPlay <= 1) {
        computerInput = "scissors";
    }
    return computerInput;
}

async function myFunction(hand) {

    disappear();
    playRound(hand, pcPlay());

    if (pcScore === 3){
        document.getElementById("msg").innerHTML = "You have been defeated by the machine :c";
        humanPaper.style.display = "none";
        middleDiv.append(resetButton);
        return;
    } else if (humanScore === 3){
        document.getElementById("msg").innerHTML = "Congratulations! You have beaten the machine";
        humanPaper.style.display = "none";
        middleDiv.append(resetButton);
        return;
    }
    setTimeout(appear,1700);
}

function disappear(){
    humanRock.style.opacity = 0;
    humanPaper.style.opacity = 0;
    humanScissors.style.opacity = 0;

}

function appear(){
    humanRock.style.opacity = 100;
    humanPaper.style.opacity = 100;
    humanScissors.style.opacity = 100;
    document.getElementById("msg").innerHTML = "Select your hand!";
}

function assignWinner(playerInput, computerInput) {

    let winner;

    if (playerInput == "rock" && computerInput == "scissors"
        || playerInput == "paper" && computerInput == "rock"
        || playerInput == "scissors" && computerInput == "paper") {
        winner = "player";
        document.getElementById("humanscore").innerHTML = ++humanScore;
        document.getElementById("msg").innerHTML = "You win! "+ playerInput + " beats " + computerInput;


    } else if (computerInput == "rock" && playerInput == "scissors"
        || computerInput == "paper" && playerInput == "rock"
        || computerInput == "scissors" && playerInput == "paper") {
        winner = "pc";
        document.getElementById("pcscore").innerHTML = ++pcScore;
        document.getElementById("msg").innerHTML = "You lose! "+ computerInput + " beats " + playerInput;
    } else if (computerInput == playerInput) {
        document.getElementById("msg").innerHTML = "Its a draw!";
        winner = "none";
    }




    return winner;
}
